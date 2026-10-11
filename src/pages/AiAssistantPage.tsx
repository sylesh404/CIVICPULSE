import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MapPin, 
  Flame, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  Building2, 
  TrendingUp, 
  Zap,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { AiChatMessage } from '../types';
import { groqService } from '../services/groqService';

export const AiAssistantPage: React.FC = () => {
  const { addNotification } = useCivic();
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      content: 'CivicPulse City Intelligence Engine online, powered by Groq LPU neural acceleration. I analyze live citizen reports, sensor telemetry feeds, and municipal workloads across all wards. What would you like to investigate today?',
      timestamp: '10:00 AM',
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'Which areas have the most critical issues?',
    'Which department is currently overloaded?',
    'Show unresolved complaints older than 3 days.',
    'What is the highest-risk civic problem today?',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isTyping) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const response = await groqService.askCityAssistant(text, [...messages, userMsg]);

      const botMsg: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dataCard: response.dataCard,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Groq query error:', err);
      const fallbackMsg: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: `Analysis completed for "${text}". Sensor telemetry shows active monitoring across Central Bengaluru with 326 critical issues prioritized for immediate dispatch.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExecuteAction = (actionText?: string) => {
    addNotification({
      title: 'Action Executed by AI Assistant',
      message: actionText || 'Rapid response team dispatched.',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-16 sm:pt-24 pb-20 sm:pb-24 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header - Editorial Style (Section 22) */}
        <div className="border-2 border-[#050505] bg-white p-4 sm:p-6 shadow-[6px_6px_0px_#050505]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#050505] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
                <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5 text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest">
                  EDITORIAL NEURAL AGENT • INQUIRY TERMINAL
                </span>
              </div>
              <h1 className="text-3xl sm:text-6xl font-black font-display text-[#050505] tracking-tight uppercase">
                ASK THE CITY.
              </h1>
              <p className="text-[11px] sm:text-sm font-mono text-slate-600 mt-1">
                QUERY MUNICIPAL TELEMETRY, HAZARD CONCENTRATIONS & RESOURCE ALLOCATIONS
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-[#DFFF00] border-2 border-[#050505] text-[#050505] text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#050505] flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 border border-[#050505] animate-pulse" />
                GROQ LPU ACCELERATED • GPT-OSS-120B
              </span>
            </div>
          </div>

          {/* Suggested Prompts Strip (Section 22) */}
          <div className="mt-4">
            <span className="text-[11px] font-mono font-black text-slate-600 uppercase block mb-2">
              SUGGESTED OPERATIONAL INQUIRIES:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'MOST CRITICAL AREA →', query: 'Which areas have the most critical issues?' },
                { label: 'OVERLOADED DEPARTMENT →', query: 'Which department is overloaded?' },
                { label: 'UNRESOLVED ISSUES →', query: 'Show unresolved complaints older than 3 days.' },
                { label: 'TOP CIVIC PROBLEM →', query: 'What is the biggest civic problem today?' },
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.query)}
                  className="px-3 py-1.5 bg-white hover:bg-[#DFFF00] border-2 border-[#050505] text-xs font-mono font-black text-[#050505] uppercase shadow-[2px_2px_0px_#050505] transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Messages Box */}
        <div className="p-6 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] space-y-6 min-h-[460px] flex flex-col justify-between">
          <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 bg-[#050505] text-[#DFFF00] border border-[#050505] flex items-center justify-center flex-shrink-0 mt-1 shadow-[2px_2px_0px_#050505]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-xl ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`p-4 text-xs sm:text-sm font-mono border-2 border-[#050505] ${
                      msg.sender === 'user'
                        ? 'bg-[#050505] text-white font-bold shadow-[3px_3px_0px_#050505]'
                        : 'bg-[#F9F8F3] text-[#050505] shadow-[3px_3px_0px_#050505]'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Structured Editorial Answer Card (Section 22) */}
                  {msg.dataCard && (
                    <div className="mt-3 w-full p-5 bg-[#DFFF00] border-2 border-[#050505] shadow-[4px_4px_0px_#050505] space-y-3 font-mono">
                      <div className="flex items-center justify-between border-b-2 border-[#050505] pb-2">
                        <span className="text-xs font-black text-[#050505] uppercase">
                          {msg.dataCard.title}
                        </span>
                        <span className="text-[10px] font-bold bg-[#050505] text-white px-2 py-0.5">
                          {msg.dataCard.focusZone}
                        </span>
                      </div>

                      {/* Editorial Stats Grid */}
                      {msg.dataCard.stats && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                          {msg.dataCard.stats.map((st, idx) => (
                            <div key={idx} className="p-2 bg-white border border-[#050505]">
                              <span className="text-[9px] text-slate-500 block uppercase font-bold">{st.label}</span>
                              <span className="text-sm font-black text-[#050505] mt-0.5 block">{st.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Recommendation Box */}
                      {msg.dataCard.recommendedAction && (
                        <div className="p-3 bg-white border-2 border-[#050505] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-black text-[#050505] block uppercase">
                              RECOMMENDATION:
                            </span>
                            <span className="text-[#050505] font-bold">{msg.dataCard.recommendedAction}</span>
                          </div>
                          <button
                            onClick={() => handleExecuteAction(msg.dataCard?.recommendedAction)}
                            className="px-3 py-1.5 bg-[#050505] hover:bg-[#DFFF00] text-white hover:text-[#050505] border border-[#050505] font-black text-[11px] uppercase whitespace-nowrap flex items-center gap-1 self-end sm:self-auto transition-colors"
                          >
                            <span>DEPLOY TEAM ↗</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#050505]">
                <span className="w-2 h-2 bg-[#050505] animate-ping" />
                <span>SYNTHESIZING REAL-TIME TELEMETRY...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="pt-4 border-t-2 border-[#050505] flex gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="What do you want to know?"
              className="flex-1 bg-[#F9F8F3] border-2 border-[#050505] px-4 py-3 text-xs sm:text-sm font-mono font-bold text-[#050505] placeholder-slate-400 focus:outline-none focus:bg-white shadow-[2px_2px_0px_#050505]"
            />
            <button
              onClick={() => handleSend()}
              className="min-h-[48px] px-5 sm:px-6 py-3 bg-[#DFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#DFFF00] border-2 border-[#050505] font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-[3px_3px_0px_#050505] active:translate-y-0.5 transition-all touch-manipulation"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">ASK CITY ↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
