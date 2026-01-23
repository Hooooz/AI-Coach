import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Users,
  Zap,
  Trophy,
  Check,
  X,
  MessageCircle,
  ShieldCheck,
  Clock,
  FileText,
  UserPlus,
  Rocket,
  Brain,
  Layers,
  Code,
  Video,
  Palette,
  GitBranch
} from 'lucide-react';
import AICoachDemo from './components/AICoachDemo';
import content from './content.json';
import qrcodeImg from './assets/qrcode.jpg';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Color mapping for Tailwind classes to avoid dynamic class name issues
const colorVariants = {
  blue: {
    bg50: "bg-blue-50",
    bg50_50: "bg-blue-50/50",
    bg100: "bg-blue-100",
    bg200: "bg-blue-200",
    bg400: "bg-blue-400",
    bg500: "bg-blue-500",
    text400: "text-blue-400",
    text500: "text-blue-500",
    text600: "text-blue-600",
    text700: "text-blue-700",
    text800: "text-blue-800",
    border100: "border-blue-100",
    border200: "border-blue-200",
    border500: "border-blue-500",
    groupHoverBorder: "group-hover:border-blue-500",
    groupHoverText: "group-hover:text-blue-400",
    iconColor: "text-blue-400"
  },
  indigo: {
    bg50: "bg-indigo-50",
    bg50_50: "bg-indigo-50/50",
    bg100: "bg-indigo-100",
    bg200: "bg-indigo-200",
    bg400: "bg-indigo-400",
    bg500: "bg-indigo-500",
    text400: "text-indigo-400",
    text500: "text-indigo-500",
    text600: "text-indigo-600",
    text700: "text-indigo-700",
    text800: "text-indigo-800",
    border100: "border-indigo-100",
    border200: "border-indigo-200",
    border500: "border-indigo-500",
    groupHoverBorder: "group-hover:border-indigo-500",
    groupHoverText: "group-hover:text-indigo-400",
    iconColor: "text-indigo-400"
  },
  purple: {
    bg50: "bg-purple-50",
    bg50_50: "bg-purple-50/50",
    bg100: "bg-purple-100",
    bg200: "bg-purple-200",
    bg400: "bg-purple-400",
    bg500: "bg-purple-500",
    text400: "text-purple-400",
    text500: "text-purple-500",
    text600: "text-purple-600",
    text700: "text-purple-700",
    text800: "text-purple-800",
    border100: "border-purple-100",
    border200: "border-purple-200",
    border500: "border-purple-500",
    groupHoverBorder: "group-hover:border-purple-500",
    groupHoverText: "group-hover:text-purple-400",
    iconColor: "text-purple-400"
  },
  red: {
    bg50: "bg-red-50",
    bg50_50: "bg-red-50/50",
    bg100: "bg-red-100",
    bg200: "bg-red-200",
    bg400: "bg-red-400",
    bg500: "bg-red-500",
    text400: "text-red-400",
    text500: "text-red-500",
    text600: "text-red-600",
    text700: "text-red-700",
    text800: "text-red-800",
    border100: "border-red-100",
    border200: "border-red-200",
    border500: "border-red-500",
    groupHoverBorder: "group-hover:border-red-500",
    groupHoverText: "group-hover:text-red-400",
    iconColor: "text-red-400"
  },
  yellow: {
    bg50: "bg-yellow-50",
    bg50_50: "bg-yellow-50/50",
    bg100: "bg-yellow-100",
    bg200: "bg-yellow-200",
    bg400: "bg-yellow-400",
    bg500: "bg-yellow-500",
    text400: "text-yellow-400",
    text500: "text-yellow-500",
    text600: "text-yellow-600",
    text700: "text-yellow-700",
    text800: "text-yellow-800",
    border100: "border-yellow-100",
    border200: "border-yellow-200",
    border500: "border-yellow-500",
    groupHoverBorder: "group-hover:border-yellow-500",
    groupHoverText: "group-hover:text-yellow-400",
    iconColor: "text-yellow-400"
  },
  green: {
    bg50: "bg-green-50",
    bg50_50: "bg-green-50/50",
    bg100: "bg-green-100",
    bg200: "bg-green-200",
    bg400: "bg-green-400",
    bg500: "bg-green-500",
    text400: "text-green-400",
    text500: "text-green-500",
    text600: "text-green-600",
    text700: "text-green-700",
    text800: "text-green-800",
    border100: "border-green-100",
    border200: "border-green-200",
    border500: "border-green-500",
    groupHoverBorder: "group-hover:border-green-500",
    groupHoverText: "group-hover:text-green-400",
    iconColor: "text-green-400"
  }
};

const getColor = (colorName) => colorVariants[colorName] || colorVariants.blue;

// SVG Illustrations
const PyramidSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#4338ca', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Level 1 Base - Enhanced Gradient & Seamless fit */}
    <motion.path 
      d="M40 260 L360 260 L300 170 L100 170 Z" 
      fill="url(#grad1)"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="hover:brightness-110 transition-all cursor-pointer"
    />
    <text x="200" y="225" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
      {content.methodology.levels[0]?.title || "L1 认知突破"}
    </text>
    
    {/* Level 2 Middle - Seamless fit */}
    <motion.path 
      d="M100 170 L300 170 L250 90 L150 90 Z" 
      fill="url(#grad2)"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="hover:brightness-110 transition-all cursor-pointer"
    />
    <text x="200" y="140" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
      {content.methodology.levels[1]?.title || "L2 工具定制"}
    </text>
    
    {/* Level 3 Top - Seamless fit */}
    <motion.path 
      d="M150 90 L250 90 L200 20 Z" 
      fill="url(#grad3)"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="hover:brightness-110 transition-all cursor-pointer"
    />
    <text x="200" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
      {content.methodology.levels[2]?.title || "L3 自我进化"}
    </text>
  </svg>
);

const ComparisonScaleSVG = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
    {/* Base Stand */}
    <path d="M95 110 L105 110 L100 20 Z" fill="#cbd5e1" />
    <rect x="80" y="110" width="40" height="5" rx="2" fill="#94a3b8" />
    <circle cx="100" cy="20" r="3" fill="#64748b" />
    
    {/* Rotating Group - Centered at Pivot (100, 20) */}
    <motion.g 
      initial={{ rotate: 0 }} 
      whileInView={{ rotate: 15 }} 
      transition={{ type: "spring", stiffness: 60, damping: 8, mass: 1, delay: 0.2 }}
      style={{ x: 100, y: 20 }} // Move coordinate system to pivot point
    >
      {/* The Beam Bar - Drawn relative to center (0,0) */}
      <rect x="-80" y="-2" width="160" height="4" rx="2" fill="#64748b" />
      
      {/* Left Pan Group (Light Weight) - Positioned at left end (-70, 0) */}
      <motion.g
        initial={{ rotate: 0 }}
        whileInView={{ rotate: -15 }} // Counter-rotate
        transition={{ type: "spring", stiffness: 60, damping: 8, mass: 1, delay: 0.2 }}
        style={{ x: -70, y: 0 }}
      >
        <line x1="0" y1="0" x2="0" y2="30" stroke="#94a3b8" />
        <path d="M-15 30 Q0 45 15 30" fill="none" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="0" cy="25" r="5" fill="#ef4444" opacity="0.8" />
      </motion.g>
      
      {/* Right Pan Group (Heavy Weight) - Positioned at right end (70, 0) */}
      <motion.g
        initial={{ rotate: 0 }}
        whileInView={{ rotate: -15 }} // Counter-rotate
        transition={{ type: "spring", stiffness: 60, damping: 8, mass: 1, delay: 0.2 }}
        style={{ x: 70, y: 0 }}
      >
        <line x1="0" y1="0" x2="0" y2="40" stroke="#94a3b8" />
        <path d="M-15 40 Q0 55 15 40" fill="none" stroke="#94a3b8" strokeWidth="2" />
        <rect x="-10" y="25" width="20" height="15" fill="#3b82f6" />
      </motion.g>
    </motion.g>
  </svg>
);

function App() {
  const [activeTool, setActiveTool] = useState(null);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToolClick = (toolIndex) => {
    // 确保这里的顺序与 content.json 中的 items 顺序完全一致
    // 0: 营销脚本 (marketing-script)
    // 1: 智能客服 (customer-service)
    // 2: 会议纪要 (meeting-summary)
    // 3: 创意工坊 (creative-workshop)
    const toolMap = ['marketing-script', 'customer-service', 'meeting-summary', 'creative-workshop'];
    
    // 确保索引在有效范围内
    if (toolIndex >= 0 && toolIndex < toolMap.length) {
      setActiveTool(toolMap[toolIndex]);
      
      // 使用 setTimeout 确保状态更新后再滚动，或者直接滚动
      setTimeout(() => {
        const element = document.getElementById('demo-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const getIcon = (index) => {
    const icons = [<Target />, <Users />, <ShieldCheck />];
    return icons[index] || <Target />;
  };

  const getMethodologyIcon = (index) => {
    const icons = [<Brain />, <Layers />, <UserPlus />];
    return icons[index] || <Brain />;
  };

  const methodologyColors = ['blue', 'indigo', 'purple'];

  const getShowcaseIcon = (iconName) => {
    const icons = {
      MessageCircle: <MessageCircle />,
      FileText: <FileText />,
      Target: <Target />,
      Clock: <Clock />,
      Video: <Video />,
      Palette: <Palette />,
      Workflow: <GitBranch />
    };
    return icons[iconName] || <Code />;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-100">
      {/* 商务导航 */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2 flex-1 justify-center">
            <Rocket className="h-5 w-5 text-blue-600 hidden sm:block" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
              {content.header.title}
            </h1>
          </div>
          <div className="flex-1 flex justify-end gap-6 text-sm font-medium text-slate-500">
             {content.header.nav.map(item => (
               <button key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-blue-600 transition relative group">
                 {item.label}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
               </button>
             ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100/50 text-blue-700 text-sm font-semibold mb-8 border border-blue-200">
              <Zap className="h-4 w-4 mr-2 fill-blue-500 text-blue-500" />
              {content.hero.badge}
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.15]">
              {content.hero.title.prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{content.hero.title.highlight}</span>，<br/>
              {content.hero.title.suffix} <span className="relative whitespace-nowrap">
                <span className="relative z-10">{content.hero.title.underline}</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-200/60 -z-10 -rotate-1"></span>
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 whitespace-pre-line">
              {content.hero.description.replace("/n", "\n")}
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {content.hero.features.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="bg-slate-50 p-3 rounded-xl mb-4">
                    {React.cloneElement(getIcon(i), { className: "h-6 w-6 text-blue-600" })}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
      </section>

      {/* 核心差异对比 (The Scale Animation) */}
      <section id="comparison" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{content.comparison.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{content.comparison.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Bad Card (Left) */}
            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="bg-slate-50 rounded-2xl p-8 border border-slate-100 opacity-80 hover:opacity-100 transition-opacity order-1"
             >
               <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                 <div className="p-2 bg-slate-200 rounded-lg"><X className="h-5 w-5 text-slate-500" /></div>
                 <h3 className="font-bold text-slate-500">{content.comparison.badCard.title}</h3>
               </div>
               <ul className="space-y-4">
                 {content.comparison.badCard.items.map((t,i) => (
                   <li key={i} className="flex items-start gap-3 text-slate-500 text-sm">
                     <X className="h-4 w-4 mt-0.5 shrink-0 opacity-50" /> {t}
                   </li>
                 ))}
               </ul>
             </motion.div>

            {/* Visual (Center) */}
            <div className="flex justify-center order-2">
              <div className="w-full max-w-[280px] h-48">
                <ComparisonScaleSVG />
                <p className="text-center text-xs text-slate-400 mt-4">{content.comparison.chartLabel}</p>
              </div>
            </div>

            {/* Good Card (Right) */}
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-xl shadow-blue-500/10 relative overflow-hidden order-3"
             >
               <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-bl-xl font-bold">{content.comparison.goodCard.tag}</div>
               <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                 <div className="p-2 bg-blue-100 rounded-lg"><Check className="h-5 w-5 text-blue-600" /></div>
                 <h3 className="font-bold text-slate-900">{content.comparison.goodCard.title}</h3>
               </div>
               <ul className="space-y-4">
                 {content.comparison.goodCard.items.map((t,i) => (
                   <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                     <div className="mt-0.5 p-0.5 bg-green-100 rounded-full"><Check className="h-3 w-3 text-green-600" /></div>
                     {t}
                   </li>
                 ))}
               </ul>
             </motion.div>
          </div>
        </div>
      </section>

      {/* 实施逻辑 (The Pyramid) */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 md:pl-24">
              <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold mb-6 border border-indigo-500/30">
                {content.methodology.badge}
              </div>
              <h2 className="text-4xl font-bold mb-6">{content.methodology.title}</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {content.methodology.desc}
              </p>
              
              <div className="space-y-6">
                {content.methodology.levels.map((level, i) => {
                   const colorName = methodologyColors[i] || 'blue';
                   const colors = getColor(colorName);
                   return (
                    <div key={i} className="flex gap-4 group">
                      <div className={`h-12 w-12 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 ${colors.groupHoverBorder} transition-colors`}>
                        {React.cloneElement(getMethodologyIcon(i), { className: `h-6 w-6 ${colors.iconColor}` })}
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg mb-1 ${colors.groupHoverText} transition-colors`}>{level.title}</h4>
                        <p className="text-slate-400 text-sm">{level.desc}</p>
                      </div>
                    </div>
                   );
                })}
              </div>
            </div>
            
            <div className="md:col-span-7 relative h-[500px] w-full flex items-end justify-center pb-8">
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>
              <div className="relative z-10 w-full max-w-lg translate-y-8">
                <PyramidSVG />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 详细排期 (The Detailed Plan) */}
      <section id="plan" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{content.plan.title}</h2>
            <p className="mt-4 text-slate-600">{content.plan.subtitle}</p>
          </div>

          <div className="space-y-8 relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block"></div>

            {content.plan.phases.map((item, index) => {
              const colors = getColor(item.color);
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-100px" }}
                  className="relative md:pl-24"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 border-white ${colors.bg500} shadow-sm hidden md:block z-10`}></div>
                  
                  <div className="bg-white rounded-2xl p-0 shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`${colors.bg50_50} px-8 py-4 border-b ${colors.border100} flex flex-wrap justify-between items-center gap-4`}>
                      <div className="flex items-center gap-3">
                        <span className={`${colors.bg100} ${colors.text700} px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider`}>
                          {item.phase}
                        </span>
                        <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                      </div>
                      <div className="flex items-center text-slate-500 text-sm font-medium">
                        <Clock className="h-4 w-4 mr-1.5" /> {item.week}
                      </div>
                    </div>
                    
                    <div className="p-8 grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                          <Zap className="h-4 w-4" /> 关键动作
                        </h4>
                        <ul className="space-y-3">
                          {item.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                              <div className={`w-1.5 h-1.5 rounded-full ${colors.bg400} mt-1.5 shrink-0`}></div>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-5">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                          <FileText className="h-4 w-4" /> 交付成果
                        </h4>
                        <ul className="space-y-3">
                          {item.outputs.map((output, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                              <Check className={`h-4 w-4 ${colors.text500}`} />
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 顾问承诺 (Commitment) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{content.commitment.title}</h3>
            <p className="text-slate-600">{content.commitment.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {content.commitment.cards.map((card, i) => {
              const colors = getColor(card.color);
              return (
                <div key={i} className={`p-6 ${colors.bg50} rounded-2xl border ${colors.border100} flex items-center gap-4 text-left`}>
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    {i === 0 ? <MessageCircle className={`h-6 w-6 ${colors.text600}`} /> : <ShieldCheck className={`h-6 w-6 ${colors.text600}`} />}
                  </div>
                  <div>
                    <h4 className={`font-bold ${colors.text800}`}>{card.title}</h4>
                    <p className={`text-sm ${colors.text700} mt-1`}>{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 工具成果展示 (Showcase) */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-6 border border-indigo-500/30">
              <Code className="h-3 w-3 mr-2" />
              核心亮点
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {content.showcase.title}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {content.showcase.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.showcase.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleToolClick(i)}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all group cursor-pointer active:scale-95"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  {React.cloneElement(getShowcaseIcon(item.icon), { className: "h-6 w-6 text-white" })}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Preview Mockup */}
          <motion.div
            id="demo-section"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto scroll-mt-32"
          >
            <AICoachDemo activeId={activeTool} />
          </motion.div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
             <p className="text-slate-500 text-sm mb-2">{content.footer}</p>
             <p className="text-slate-600 text-xs">Designed by Howie AI Studio</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-lg p-1 mb-2 overflow-hidden">
              <img src={qrcodeImg} alt="QR Code" className="w-full h-full object-cover" />
            </div>
            <span className="text-slate-400 text-xs">扫码咨询</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
