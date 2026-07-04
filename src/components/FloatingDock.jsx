import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, Crown, Layout, Eye, Download, Activity } from 'lucide-react'

const DOCK_ITEMS = [
  {id:'snapshot',label:'Resume Snapshot',icon:FileText,to:'/normal'},
  {id:'royal',label:'Royal Resume',icon:Crown,to:'/premium'},
  {id:'template',label:'Modern Template',icon:Layout,to:'/templates'},
  {id:'preview',label:'Instant Preview',icon:Eye,to:'/normal/preview'},
  {id:'export',label:'Export Ready',icon:Download,to:'/normal/download'},
  {id:'status',label:'Live Status',icon:Activity,to:'/premium/dashboard'},
]

export default function FloatingDock() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <motion.div
      initial={{y:100,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration:0.5,delay:0.8}}
      className='fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]'
    >
      <div className='relative'>
        <div className='absolute inset-0 -inset-y-4 -inset-x-2 rounded-[32px] bg-gradient-to-r from-royal-gold/20 via-royal-gold/10 to-royal-gold/20 blur-xl opacity-60' />
        <div className='relative rounded-[28px] border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden'>
          <div className='absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-royal-gold/40 to-transparent' />
          <div className='flex items-center gap-1 px-3 py-2'>
            {DOCK_ITEMS.map((item, index) => {
              const Icon = item.icon
              const isHovered = hoveredId === item.id
              return (
                <motion.div key={item.id} className='relative' onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)}>
                  <Link to={item.to} className='group relative flex flex-col items-center justify-center rounded-2xl px-3 py-2 transition-all duration-300'>
                    <motion.div initial={{opacity:0}} animate={{opacity:isHovered?1:0}} className='absolute inset-0 rounded-2xl bg-royal-gold/10' />
                    <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.95}} className='relative z-10'>
                      <Icon className={isHovered ? 'h-5 w-5 text-royal-gold' : 'h-5 w-5 text-slate-400 group-hover:text-slate-200'} />
                    </motion.div>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:5}} transition={{duration:0.2}} className='absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-2 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-xl border border-white/10'>
                          {item.label}
                          <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-slate-900/95 border-r border-b border-white/10' />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                  {index < DOCK_ITEMS.length - 1 && <div className='h-8 w-px bg-white/10 mx-1' />}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
