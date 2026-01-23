import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Bot, User, Sparkles, Loader2, MessageCircle, FileText,
  Target, Clock, RefreshCw, Mic, Upload, Play, CheckCircle2,
  ArrowRight, Shield, TrendingUp, Users, Video, Palette, Image as ImageIcon
} from 'lucide-react';
import { chatStream } from '../lib/api';

const TOOLS = [
  {
    id: 'marketing-script',
    title: '营销脚本',
    icon: <Video className="h-5 w-5" />,
    mode: 'iframe',
    iframeUrl: 'http://170.106.197.97/chatbot/83Tyj6np4FhNgklb',
    initialMsg: ''
  },
  {
    id: 'customer-service',
    title: '智能客服',
    icon: <MessageCircle className="h-5 w-5" />,
    mode: 'chat',
    quickActions: ['快门按钮有适配索尼的吗？', '发什么快递？', '热靴盖材质是什么？', '人工服务'],
    system: '你是一个专业的电商智能客服，服务于"彩友乐"品牌，主营相机装饰配件（如热靴盖、快门按钮、相机贴纸、镜头保护膜等）。\n\n店铺信息：\n1. 快递：默认发中通，急件可补差价发顺丰。\n2. 发货时间：48小时内发货。\n3. 售后：7天无理由退换。\n\n产品库（假数据）：\n- 黄铜热靴盖：59元，适配徕卡/富士/索尼，复古质感。\n- 纯木快门按钮：39元，黑檀木/红酸枝，手感温润。\n- 熊猫配色贴纸：29元，3M材质不留胶。\n\n对于询价，你会提供合理的优惠方案（如满99包邮）；对于物流，你会模拟查询系统给出虚构但合理的进度；对于人工，你会礼貌引导用户留言。',
    initialMsg: '您好！我是彩友乐相机配件智能助理，您可以咨询产品适配、材质或物流进度：'
  },
  {
    id: 'meeting-summary',
    title: '会议纪要',
    icon: <Clock className="h-5 w-5" />,
    mode: 'audio',
    system: '你是一个高效的行政秘书。根据转录的会议文本，整理出：1. 议题背景 2. 核心结论 3. 待办事项列表。',
    initialMsg: '上传会议录音或开启实时转录，我将为您自动整理纪要。'
  },
  {
    id: 'creative-workshop',
    title: '创意工坊',
    icon: <Palette className="h-5 w-5" />,
    mode: 'image-placeholder',
    initialMsg: '这里是创意工坊，即将上线...'
  }
];

const AICoachDemo = ({ activeId }) => {
  const [activeTab, setActiveTab] = useState(activeId || TOOLS[0].id);
  const currentTool = TOOLS.find(t => t.id === activeTab) || TOOLS[0];

  const [messages, setMessages] = useState([{ role: 'assistant', content: currentTool.initialMsg }]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (activeId) {
      setActiveTab(activeId);
      resetState(activeId);
    }
  }, [activeId]);

  useEffect(() => {
    if (!activeId && !activeTab) {
        setActiveTab(TOOLS[0].id);
    }
  }, []);

  const resetState = (id) => {
    const tool = TOOLS.find(t => t.id === id) || currentTool;
    setMessages([{ role: 'assistant', content: tool.initialMsg }]);
    setInput('');
    setIsRecording(false);
    setIsProcessing(false);
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isRecording, isProcessing]);

  const handleSend = async (customInput) => {
    const text = customInput || input;
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setIsLoading(true);

    const assistantMsg = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMsg]);

    try {
      await chatStream(history, (content) => {
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = content;
          return newMsgs;
        });
      }, currentTool.system);
    } catch (e) {
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: '连接后端出错，请重试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 会议纪要特有逻辑
  const startMeetingSimulation = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // 添加图片消息
        setMessages(prev => [
          ...prev, 
          { 
            role: 'user', 
            content: '上传了音频文件: client_meeting_0123.mp3' 
          },
          { 
            role: 'assistant', 
            content: '会议纪要已生成：',
            type: 'image',
            src: '/会议纪要.png'
          }
        ]);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.1)] relative">
      {/* 顶部工具栏 */}
      <div className="flex bg-slate-800/50 backdrop-blur-xl p-1.5 gap-1 border-b border-white/5 overflow-x-auto no-scrollbar">
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            onClick={() => { setActiveTab(tool.id); resetState(tool.id); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tool.id
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tool.icon} {tool.title}
          </button>
        ))}
      </div>

      {/* 主展示区 */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(30,41,59,1),rgba(15,23,42,1))]"
      >
        {currentTool.mode === 'iframe' ? (
          <iframe 
            src={currentTool.iframeUrl} 
            className="w-full h-full border-0"
            allow="microphone"
            title="Marketing Script Assistant"
          />
        ) : currentTool.mode === 'image-placeholder' ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
             <div className="w-3/4 h-3/4 bg-slate-800 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>创意工坊演示截图位</p>
                  <p className="text-xs opacity-50 mt-1">请在此处放置实际产品截图</p>
                </div>
             </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xl ${
                    msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-white/10'
                  }`}>
                    {msg.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-indigo-400" />}
                  </div>
                  <div className={`px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm overflow-hidden ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800/80 text-slate-200 border border-white/5'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    
                    {/* 图片消息支持 */}
                    {msg.type === 'image' && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
                        <img src={msg.src} alt="Result" className="w-full h-auto" />
                      </div>
                    )}

                    {/* 智能客服磁贴 */}
                    {msg.role === 'assistant' && i === 0 && currentTool.id === 'customer-service' && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {currentTool.quickActions.map(action => (
                          <button
                            key={action}
                            onClick={() => handleSend(action)}
                            className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-300 text-[11px] hover:bg-indigo-500/40 transition-all text-left"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* 动态交互层：录音中 */}
            {isRecording && (
              <div className="flex justify-center py-10">
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-full px-8 py-4 flex items-center gap-4 animate-pulse">
                  <div className="flex gap-1 h-4 items-center">
                    {[1,2,3,4,5,4,3,2,1].map((h, i) => (
                      <div key={i} className="w-1 bg-indigo-400 rounded-full" style={{ height: `${h * 4}px` }}></div>
                    ))}
                  </div>
                  <span className="text-indigo-400 text-xs font-bold font-mono">REC :: 正在转录实时语音...</span>
                </div>
              </div>
            )}

            {/* 动态交互层：处理中 */}
            {isProcessing && (
              <div className="flex items-center gap-3 text-slate-400 text-xs justify-center italic">
                <Loader2 className="h-4 w-4 animate-spin" /> 正在分析会议录音并生成可视化纪要...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 底部输入/控制台区 */}
      {currentTool.mode !== 'iframe' && currentTool.mode !== 'image-placeholder' && (
        <div className="p-5 bg-slate-800/80 border-t border-white/5 backdrop-blur-md">
          {/* 会议纪要控制 */}
          {currentTool.id === 'meeting-summary' && (
            <div className="flex gap-3">
              <button
                onClick={startMeetingSimulation}
                disabled={isRecording || isProcessing || isLoading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl py-3.5 flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-indigo-600/20"
              >
                <Upload className="h-5 w-5" /> 模拟客户上传音频
              </button>
            </div>
          )}

          {/* 通用对话输入（如智能客服） */}
          {currentTool.id === 'customer-service' && (
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="描述您的问题..."
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-indigo-500"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2.5 top-2.5 p-2.5 bg-indigo-600 rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-all"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AICoachDemo;
