'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const { t } = useLanguage();
  // 1.5s 延迟加载视频，防止抢占首屏带宽
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      // 严禁使用 import，统一使用绝对路径
      setVideoSrc("/assets/banner.mp4");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;

    const video = videoRef.current;
    
    const attemptPlay = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setShowPlayButton(false))
          .catch(() => {
            setShowPlayButton(true);
          });
      }
    };

    // 微信自动播放逻辑
    const handleWechatReady = () => {
      if (typeof window !== 'undefined' && (window as any).WeixinJSBridge) {
        (window as any).WeixinJSBridge.invoke('getNetworkType', {}, attemptPlay);
      }
    };

    if (typeof window !== 'undefined' && (window as any).WeixinJSBridge) {
      handleWechatReady();
    } else {
      document.addEventListener("WeixinJSBridgeReady", handleWechatReady, false);
    }

    attemptPlay();

    const handlePause = () => { if (!video.ended) setShowPlayButton(true); };
    const handlePlay = () => setShowPlayButton(false);

    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);

    return () => {
      document.removeEventListener("WeixinJSBridgeReady", handleWechatReady);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);
    };
  }, [videoSrc]);

  const handleManualPlay = () => {
    if (videoRef.current) videoRef.current.play();
  };

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none" // 物理隔离，不准预加载流量
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoSrc ? 'opacity-60' : 'opacity-0'
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      {/* Play Button */}
      <AnimatePresence>
        {showPlayButton && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleManualPlay}
              className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20"
            >
              <Play className="text-white fill-white ml-1" size={32} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main UI Content - 文字内容由 SSR 渲染 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="mb-4 md:mb-6 text-4xl md:text-[64px] font-bold leading-[1.1]">
            {t.hero.title} <span className="text-[#3871FF]">{t.hero.titleAccent}</span>
          </h1>
          <p className="mb-8 md:mb-12 text-lg md:text-[24px] font-medium text-white/90 leading-relaxed">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row items-center justify-start gap-3 md:gap-6"
        >
          <Link 
            href="/contact"
            className="px-6 md:w-48 h-10 md:h-12 rounded-full font-semibold text-xs md:text-sm transition-all flex items-center justify-center bg-[#3871FF] text-white hover:bg-[#2a5cd9] active:scale-95"
          >
            {t.hero.bookDemo}
          </Link>
          <Link 
            href="/technology"
            className="px-6 md:w-48 h-10 md:h-12 rounded-full font-semibold text-xs md:text-sm transition-all flex items-center justify-center border border-white text-white hover:bg-white/10 active:scale-95"
          >
            {t.hero.explore}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
