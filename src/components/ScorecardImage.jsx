import React, { forwardRef } from 'react';
import { Target, GraduationCap, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { getUniversityLogo } from '../data/universities';

const ScorecardImage = forwardRef(({ uni, aggregate, programGroup, campus, edSystem, eligiblePrograms = [] }, ref) => {
  if (!uni) return null;

  return (
    <div 
      ref={ref} 
      className="bg-[#F0FFFE] text-ink w-[800px] h-[800px] flex flex-col relative overflow-hidden font-sans"
    >
      {/* Premium Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#BEE3E1]/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header - Glassmorphism */}
      <div className="bg-[#BEE3E1]/30 p-8 flex items-center justify-between z-10 border-b border-ink/10 backdrop-blur-md">
        <div className="flex items-center gap-6 w-[75%]">
          <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden border border-ink/10 relative">
            <img 
              src={getUniversityLogo(uni.slug)} 
              alt={uni.name} 
              className="w-full h-full object-contain relative z-10"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
              }}
            />
          </div>
          <div className="flex flex-col justify-center font-sans">
            <h1 className="text-[22px] leading-snug font-black text-ink tracking-wide uppercase line-clamp-2">
              {uni.name}
            </h1>
            <p className="text-gold text-[13px] font-bold mt-1 tracking-[0.2em] uppercase font-sans">Admission Scorecard 2025</p>
          </div>
        </div>
        <div className="text-right w-[20%] font-sans">
          <p className="text-ink/50 text-[10px] font-black tracking-[0.2em] uppercase font-sans">Campus</p>
          <p className="text-ink text-xl font-black mt-0.5 truncate font-sans">{campus || 'Main'}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-10 py-8 z-10 flex flex-col justify-center gap-8 font-sans">
        
        {/* Main Aggregate & Details Card */}
        <div className="flex justify-between items-center bg-[#BEE3E1] p-8 rounded-[2rem] border border-white/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-50 pointer-events-none" />
          
          <div className="relative z-10 w-[45%] pr-4 border-r border-ink/10">
            <p className="text-ink/50 text-[11px] font-black tracking-[0.2em] uppercase mb-3 font-sans">Program Group</p>
            <h2 className="text-[22px] font-black text-ink leading-tight mb-3 line-clamp-2 font-sans">{programGroup || 'All Programs'}</h2>
            <p className="text-ink/70 text-sm font-bold flex items-center gap-2 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              System: <span className="text-ink font-black truncate">{edSystem}</span>
            </p>
          </div>
          
          <div className="relative z-10 w-[55%] flex flex-col items-end pl-6">
            <p className="text-ink/50 text-[11px] font-black tracking-[0.2em] uppercase mb-2 font-sans">Calculated Aggregate</p>
            <div className="flex items-start justify-end font-sans mt-2">
              <span className="text-7xl font-black text-ink tracking-tighter drop-shadow-sm font-sans leading-none">
                {aggregate}
              </span>
              <span className="text-4xl font-black text-gold ml-1 font-sans leading-none mt-1">%</span>
            </div>
          </div>
        </div>

        {/* Admission Feasibility Outlook */}
        <div className="bg-white/50 p-8 rounded-[2rem] border border-ink/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-[#BEE3E1] rounded-xl border border-white">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-xl font-black text-ink tracking-wide font-sans">Feasibility Outlook</h3>
          </div>
          
          {eligiblePrograms.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-ink/5 text-center">
              <p className="text-ink/40 font-bold tracking-[0.2em] uppercase text-[11px] font-sans">No program data available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {eligiblePrograms.slice(0, 6).map(p => {
                const cutoff = p.merits[2025] || 70.0;
                const diff = parseFloat(aggregate) - cutoff;
                
                let badgeCls = "bg-emerald-100 text-emerald-700 border-emerald-200";
                let statusText = "Likely";
                let StatusIcon = CheckCircle2;
                let diffCls = "text-emerald-600";
                
                if (diff < -2.0) {
                  badgeCls = "bg-rose-100 text-rose-700 border-rose-200";
                  statusText = "Tough";
                  StatusIcon = XCircle;
                  diffCls = "text-rose-600";
                } else if (diff < 1.0) {
                  badgeCls = "bg-amber-100 text-amber-700 border-amber-200";
                  statusText = "Borderline";
                  StatusIcon = AlertCircle;
                  diffCls = "text-amber-600";
                }
                
                return (
                  <div key={p.name} className="bg-white p-4 rounded-2xl border border-ink/10 flex items-center justify-between shadow-sm">
                    <div className="w-[60%] font-sans">
                      <p className="font-bold text-ink text-[15px] truncate pr-2 font-sans">{p.name}</p>
                      <p className="text-[10px] text-ink/50 font-bold mt-1 tracking-wide font-sans">2025 Cutoff: {cutoff}%</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 w-[40%] font-sans">
                      <span className={`text-[9px] font-black tracking-[0.15em] uppercase px-2 py-1 rounded-md border ${badgeCls} flex items-center gap-1 font-sans`}>
                        <StatusIcon className="w-2.5 h-2.5" />
                        {statusText}
                      </span>
                      <span className={`text-[13px] font-black font-mono tracking-tighter ${diffCls}`}>
                        {diff >= 0 ? '+' : ''}{diff.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                );
              })}
              {eligiblePrograms.length > 6 && (
                <div className="col-span-2 text-center text-[11px] text-ink/40 font-bold mt-3 uppercase tracking-[0.2em] font-sans">
                  + {eligiblePrograms.length - 6} more programs...
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="bg-ink px-8 py-6 flex items-center justify-between border-t border-ink/10 z-10 font-sans">
        <div className="flex items-center gap-4">
          <div className="h-10 flex items-center justify-center">
            <span className="logo-font-urdu text-[38px] text-[#BEE3E1] font-black tracking-wide leading-none pt-2 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              داخلہ
            </span>
          </div>
          <div>
            <p className="text-white/80 text-[10px] font-bold tracking-widest mt-0.5 font-sans">Calculate your merit at dakhala.site</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25A18E]"></span>
          <p className="text-[#BEE3E1]/80 text-[10px] font-black tracking-[0.2em] uppercase font-sans">Generated Securely</p>
        </div>
      </div>
      
    </div>
  );
});

ScorecardImage.displayName = 'ScorecardImage';

export default ScorecardImage;
