import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { useSeo, injectJsonLd } from '../lib/seo.js'
import {
  getBlogPostBySlug,
  getRelatedPosts,
  blogCategories,
  blogTags,
  normalizeSearch,
} from '../lib/content/blogData.js'

import { ArrowLeft, Clock, Tag } from 'lucide-react'

function renderBlock(block, idx) {
  if (!block || typeof block !== 'object') return null
  switch (block.type) {
    case 'h2':
      return <h2 key={idx} className="mt-8 text-2xl font-black text-white">{block.text}</h2>
    case 'p':
      return <p key={idx} className="mt-4 text-slate-300 leading-8">{block.text}</p>
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()

  const post = useMemo(() => getBlogPostBySlug(slug), [slug])
  const related = useMemo(() => getRelatedPosts(slug, 3), [slug])

  const breadcrumbs = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Blog', to: '/blog' },
      { label: post?.title || 'Article', to: `/blog/${slug || ''}` },
    ],
    [post?.title, slug],
  )

  useSeo({
    title: post ? `${post.title} | Resume PRO` : 'Article | Resume PRO',
    description: post?.excerpt || 'AI resume building guidance and career tips.',
    canonicalUrl: window.location?.href,
    openGraph: {
      type: 'article',
      title: post?.title,
      description: post?.excerpt,
      url: window.location?.href,
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.excerpt,
    },
  })

  injectJsonLd(
    `article-${slug}`,
    post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: { '@type': 'Organization', name: post.author || 'Resume PRO Team' },
          datePublished: post.publishedAt,
          keywords: Array.from(new Set([...(post.tags || []), post.category].filter(Boolean))).join(', '),
        }
      : {},
  )

  if (!post) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <h1 className="text-3xl font-black text-white">Article not found</h1>
            <p className="mt-4 text-slate-300 leading-7">The blog post you’re looking for doesn’t exist.</p>
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-2xl bg-royal-gold px-6 py-3 font-bold text-royal-navy shadow-2xl shadow-royal-gold/20 hover:brightness-110 transition"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                <Tag className="h-4 w-4 text-royal-gold" aria-hidden="true" />
                {post.category}
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-white">{post.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span>{post.author || 'Resume PRO Team'}</span>
                <span aria-hidden="true">•</span>
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-royal-gold" aria-hidden="true" />
                  {post.readingTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg leading-8 text-slate-300">{post.excerpt}</p>

          <div className="mt-8">
            {post.body.map((b, idx) => renderBlock(b, idx))}
          </div>
        </motion.article>

        {related.length ? (
          <section className="mt-10">
            <h2 className="text-2xl font-black text-white">Related posts</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="rounded-[32px] border border-white/10 bg-white/5 p-6 hover:border-royal-gold/40 hover:bg-white/10 transition"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{p.category}</div>
                  <div className="mt-3 text-lg font-bold text-white">{p.title}</div>
                  <div className="mt-3 text-sm text-slate-300 leading-7">{p.excerpt}</div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

