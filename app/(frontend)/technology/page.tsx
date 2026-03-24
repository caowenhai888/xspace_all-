'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // 修正：Next.js 中通常使用 framer-motion
import { ChevronRight, Play, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/app/context/LanguageContext';

const Technology = () => {
  const { t } = useLanguage();
  
  const [activeEgoIndex, setActiveEgoIndex] = useState(0);
  const [luminisPage, setLuminisPage] = useState(0);
  
  const currentPlayingRef = useRef<HTMLVideoElement | null>(null);
  
  const [isEgoPlaying, setIsEgoPlaying] = useState(false);
  const [playingLuminisId, setPlayingLuminisId] = useState<number | null>(null);
  const [isXOnePlaying, setIsXOnePlaying] = useState(false);

  const egoVideoRef = useRef<HTMLVideoElement>(null);
  const xoneVideoRef = useRef<HTMLVideoElement>(null);
  const luminisRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});

  const egoVideos = Array.from({ length: 8 }, (_, i) => `/assets/w${i + 1}.mp4`);
  const luminisVideos = Array.from({ length: 12 }, (_, i) => `/assets/s${i + 1}.mp4`);

  const safeTogglePlay = async (video: HTMLVideoElement | null, shouldPlay: boolean) => {
    if (!video) return;
    try {
      if (shouldPlay) {
        if (currentPlayingRef.current && currentPlayingRef.current !== video) {
          currentPlayingRef.current.pause();
        }
        currentPlayingRef.current = video;
        await video.play();
      } else {
        video.pause();
        if (currentPlayingRef.current === video) currentPlayingRef.current = null;
      }
    } catch (err) {
      console.warn("Video interaction interrupted.");
    }
  };

  useEffect(() => {
    const clearAll = () => {
      [egoVideoRef.current, xoneVideoRef.current, ...Object.values(luminisRefs.current)].forEach(v => {
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      });
      setIsEgoPlaying(false);
      setPlayingLuminisId(null);
      setIsXOnePlaying(false);
      currentPlayingRef.current = null;
    };
    clearAll();
  }, [activeEgoIndex, luminisPage]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#F5F4F0] pt-24 md:pt-40 overflow-x-hidden">
      
      {/* Section 1: X-Ego */}
      <section className="container-custom mb-16 mt-10 md:mb-32 text-center text-black">
        <div className="mb-12">
          <h1 className="mb-6 md:mb-8 text-3xl md:text-[56px] font-bold leading-[1.1]">{t.technology.xego.title}</h1>
          <p className="text-base md:text-[24px] font-normal mb-8 md:mb-12 max-w-4xl mx-auto px-4 text-gray-700">{t.technology.xego.desc}</p>
          <Link href="/contact" className="flex items-center justify-center gap-2 w-[177px] h-[42px] bg-white border border-[#3871FF] rounded-[48px] text-black font-semibold text-[18px] hover:bg-gray-50 transition-all mx-auto shadow-sm">
            {t.technology.bookDemo}
          </Link>
        </div>

        {/* 主视频播放器 */}
        <div className="relative w-full aspect-[16/9] md:aspect-[1140/641] rounded-[12px] md:rounded-[18px] overflow-hidden mb-4 shadow-2xl bg-black group mx-auto">
          <video 
            ref={egoVideoRef}
            key={`ego-v-${activeEgoIndex}`} 
            src={egoVideos[activeEgoIndex]}
            className="w-full h-full object-cover"
            controls={isEgoPlaying}
            playsInline
            onEnded={() => setIsEgoPlaying(false)}
            onPlay={() => setIsEgoPlaying(true)}
            onPause={() => setIsEgoPlaying(false)}
          />
          {!isEgoPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition-all z-20"
              onClick={() => safeTogglePlay(egoVideoRef.current, true)}
            >
              <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
            </div>
          )}
        </div>

        {/* 预览图网格：核心修复区域 */}
        {/* py-6 提供了上下缩放空间，px-4 配合 gap 确保左右不被切断 */}
        <div className="flex overflow-x-auto gap-4 md:gap-6 px-2 md:px-2 py-8 no-scrollbar md:grid md:grid-cols-4 relative items-center">
          {egoVideos.map((src, i) => (
            <div 
              key={i} 
              onClick={() => setActiveEgoIndex(i)} 
              className={cn(
                "relative flex-shrink-0 w-36 sm:w-44 md:w-auto aspect-[4/3] rounded-[10px] md:rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 transform-gpu",
                activeEgoIndex === i 
                  ? "border-[3px] border-[#3871FF] scale-105 z-10 shadow-xl" 
                  : "opacity-60 hover:opacity-100 shadow-md scale-100"
              )}
            >
              <video 
                src={`${src}#t=0.1`} 
                className="w-full h-full object-cover pointer-events-none" 
                preload="metadata" 
                muted 
                playsInline
              />
              {/* 未激活时的蒙层 */}
              {activeEgoIndex !== i && <div className="absolute inset-0 bg-black/5" />}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Introduces Luminis */}
      <section className="bg-[#DAECED] py-16 md:py-24 mb-16 md:mb-32">
        <div className="container-custom text-center text-black px-4 md:px-0">
          <h2 className="mb-6 md:mb-8 text-2xl md:text-[56px] font-bold">Introduces Luminis</h2>
          <p className="text-base md:text-[20px] font-normal mb-10 md:mb-16 max-w-5xl mx-auto text-gray-800">
             Expanding beyond physical constraints. Bridging Reality and Simulation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-10">
            {[0, 1].map((offset) => {
              const index = luminisPage * 2 + offset;
              const isPlaying = playingLuminisId === index;
              return (
                <div key={`lum-wrap-${index}`} className="relative aspect-[16/10] md:aspect-[558/326] rounded-[12px] md:rounded-[18px] overflow-hidden shadow-xl bg-black group">
                  <video 
                    ref={(el) => { if(el) luminisRefs.current[index] = el }}
                    src={luminisVideos[index]} 
                    className="w-full h-full object-cover" 
                    controls={isPlaying}
                    playsInline
                    onEnded={() => setPlayingLuminisId(null)}
                    onPlay={() => setPlayingLuminisId(index)}
                    onPause={() => setPlayingLuminisId(null)}
                  />
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/5 hover:bg-black/15 transition-all z-10"
                      onClick={() => safeTogglePlay(luminisRefs.current[index], true)}
                    >
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="text-white fill-white ml-1" size={24} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 分页按钮 */}
          <div className="flex justify-center items-center gap-6">
            <button 
              onClick={() => setLuminisPage(prev => Math.max(0, prev - 1))} 
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30"
              disabled={luminisPage === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map(p => (
                <div 
                  key={p} 
                  onClick={() => setLuminisPage(p)} 
                  className={cn(
                    "w-2 h-2 rounded-full cursor-pointer transition-all", 
                    luminisPage === p ? "bg-[#3871FF] w-6" : "bg-black/20 hover:bg-black/40"
                  )} 
                />
              ))}
            </div>
            <button 
              onClick={() => setLuminisPage(prev => Math.min(5, prev + 1))} 
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30"
              disabled={luminisPage === 5}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: X-One */}
      <section className="container-custom pb-16 md:pb-32 text-center text-black px-4 md:px-0">
        <h2 className="mb-6 md:mb-8 text-2xl md:text-[56px] font-bold leading-[1.1]">{t.technology.xone.title}</h2>
        <p className="text-base md:text-[24px] mb-10 md:mb-12 max-w-4xl mx-auto text-gray-800">{t.technology.xone.desc}</p>
        <div className="relative w-full aspect-[16/9] md:aspect-[1140/641] rounded-[12px] md:rounded-[18px] overflow-hidden shadow-2xl bg-black group mx-auto">
          <video 
            ref={xoneVideoRef} 
            src="/assets/x_one.mp4" 
            className="w-full h-full object-cover" 
            controls={isXOnePlaying}
            onEnded={() => setIsXOnePlaying(false)}
            onPlay={() => setIsXOnePlaying(true)}
            onPause={() => setIsXOnePlaying(false)}
          />
          {!isXOnePlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/5 hover:bg-black/10 transition-all z-10"
              onClick={() => safeTogglePlay(xoneVideoRef.current, true)}
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Technology;