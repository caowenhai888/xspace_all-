'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Hero from '@/app/components/Hero';
import { useLanguage } from '@/app/context/LanguageContext';

// 产品模块视频背景
const VideoBackground = ({ src, poster }: { src: string; poster: string }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        autoPlay loop muted playsInline poster={poster}
        className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
    </div>
  );
};

export default function Home() {
  const { t } = useLanguage();
  const router = useRouter();
  
  // Worldview 视频控制状态
  const worldviewVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const productConfigs = [
    { key: 'xego', video: '/assets/w1.mp4', poster: 'https://picsum.photos/seed/ego/1200/600', data: t.home.products.xego },
    { key: 'luminis', video: '/assets/s12.mp4', poster: 'https://picsum.photos/seed/lum/1200/600', data: t.home.products.luminis },
    { key: 'xone', video: '/assets/x_one.mp4', poster: 'https://picsum.photos/seed/xone/1200/600', data: t.home.products.xone },
  ];

  // 统一的播放/暂停逻辑
  const handlePlayAction = async () => {
    if (!worldviewVideoRef.current) return;
    try {
      if (worldviewVideoRef.current.paused) {
        await worldviewVideoRef.current.play();
        setIsPlaying(true);
      } else {
        worldviewVideoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.warn("Video playback interrupted");
    }
  };

  return (
    <div className="bg-[#F5F4F0] min-h-screen">
      <Hero />
      
      <div className="max-w-[1140px] mx-auto px-6">
        {/* 2. Mission Intro */}
        <section className="py-12 md:py-24">
          <div className="text-center mb-16 md:mb-24">
            <p className="max-w-4xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed">
              {t.home.mission}
            </p>
          </div>

          {/* 3. Product Grid */}
          <div className="space-y-8 md:space-y-12 mb-20 md:mb-32">
            {productConfigs.map((config) => (
              <div 
                key={config.key}
                onClick={() => router.push('/technology')}
                className="relative h-[400px] md:h-[565px] rounded-[18px] overflow-hidden shadow-xl bg-gray-900 group cursor-pointer"
              >
                <VideoBackground src={config.video} poster={config.poster} />
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center text-left">
                  <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">{config.data.title}</h3>
                  <p className="text-white/90 text-sm md:text-lg max-w-xl mb-6 md:mb-8">{config.data.desc}</p>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); router.push('/contact'); }}
                    className="inline-flex items-center justify-center gap-2 w-max h-9 md:h-10 px-5 md:px-6 bg-white/0 backdrop-blur-sm border border-white rounded-[48px] text-white text-sm md:text-base font-semibold transition-all hover:bg-white/40 active:scale-95"
                  >
                    {t.home.common.bookDemoArrow}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Worldview Section - 采用 Technology 页面的播放器逻辑 */}
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight text-black">
              {t.home.worldview.title} <br className="hidden md:block" /> 
              <span className="text-[#3871FF]">{t.home.worldview.titleAccent}</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-500 mb-12">
              {t.home.worldview.desc}
            </p>
            
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video group">
              <video 
                ref={worldviewVideoRef}
                src="/assets/s12.mp4" 
                playsInline
                loop
                // 只有在播放时才展示进度条，避免未播放时进度条遮挡中间按钮
                controls={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />
              
              {/* 未播放时的自定义 UI 覆盖层 */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all cursor-pointer z-10"
                  onClick={handlePlayAction}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. Layers Section */}
          <div className="space-y-12 md:space-y-16 max-w-5xl mx-auto">
            {t.home.layers.map((item: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-4 md:gap-12 items-start">
                <h4 className="text-xl md:text-2xl font-bold text-black">{item.title}</h4>
                <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. Team Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1140px] mx-auto px-6 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#B8B8B8] mb-8 md:mb-12">{t.home.team.title}</h2>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">{t.home.team.desc}</p>
        </div>
      </section>

      {/* 7. Partners Section */}
      {/* ... */}
    </div>
  );
}