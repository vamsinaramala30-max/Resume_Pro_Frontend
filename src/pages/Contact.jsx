export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-royal-gold font-black text-4xl">👑 Contact Me</div>
      <div className="text-slate-200/90 mt-4">
        This page is ready for integration with your backend/CRM. For now, it’s a premium contact UI.
      </div>

      <div className="mt-8 rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-6 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-bold text-slate-200">Name</label>
            <input className="mt-2 w-full rounded-2xl bg-black/20 border border-white/15 px-4 py-3 outline-none focus:border-royal-gold" placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-200">Email</label>
            <input className="mt-2 w-full rounded-2xl bg-black/20 border border-white/15 px-4 py-3 outline-none focus:border-royal-gold" placeholder="you@example.com" />
          </div>
        </div>
        <div className="mt-5">
          <label className="text-sm font-bold text-slate-200">Message</label>
          <textarea className="mt-2 w-full rounded-2xl bg-black/20 border border-white/15 px-4 py-3 outline-none focus:border-royal-gold min-h-[140px]" placeholder="Write your message..." />
        </div>
        <div className="mt-6 flex">
          <button className="rounded-2xl px-6 py-3 font-bold bg-royal-gold text-royal-navy hover:brightness-110 transition shadow-2xl">Send Message</button>
        </div>
      </div>
    </div>
  )
}

