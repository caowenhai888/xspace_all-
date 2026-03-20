'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  // 使用 useCallback 确保函数引用稳定，并在挂载时执行一次
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    // 1. 页面加载或刷新时，立即执行一次检查
    handleScroll();

    // 2. 监听后续滚动
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { name: t.nav.technology, href: '/technology' },
    { name: t.nav.company, href: '/' },
    { name: t.nav.careers, href: '#' },
    { name: t.nav.community, href: '#' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 transition-all duration-300 px-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1140px] relative mx-auto z-40">
        <div
          className={cn(
            'flex items-center justify-between h-16 px-6 md:px-12 rounded-full transition-all duration-500 relative border',
            scrolled 
              ? 'bg-white/80 backdrop-blur-[10px] border-[#D9D9D9] shadow-md' 
              : 'bg-transparent border-transparent'
          )}
        >
          <Link href="/" className="flex items-center group h-[38px]">
            <Logo 
              variant={pathname === '/' && !scrolled ? 'light' : 'dark'} 
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href && link.href !== '/';
              const isHome = pathname === '/';
              
              return (
                <div key={link.name} className="relative h-full flex items-center">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-sm font-semibold transition-colors duration-200 flex flex-col items-center justify-center group",
                      isActive 
                        ? "text-[#3871FF]" 
                        : (isHome && !scrolled ? "text-white" : "text-[#252432]"),
                      "hover:text-[#3871FF]"
                    )}
                  >
                    <span>{link.name}</span>
                    {/* 辅助元素：防止加粗时抖动 */}
                    <span className="invisible block h-0 font-bold overflow-hidden select-none" aria-hidden="true">
                      {link.name}
                    </span>
                  </Link>

                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3871FF]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={toggleLanguage}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#0E41BF]",
                pathname === '/' && !scrolled ? "text-white" : "text-[#252432]"
              )}
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'EN' : '中文'}</span>
            </button>
            <Link 
              href="/contact"
              className="px-5 py-1.5 rounded-[18px] text-sm font-semibold transition-all flex items-center justify-center border border-[#3871FF] bg-[#3871FF] text-white hover:bg-[#2a5cd9]"
            >
              {t.nav.bookDemo}
            </Link>
          </div>

          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-colors relative z-50",
              pathname === '/' && !scrolled 
                ? "text-white hover:bg-white/10" 
                : "text-[#252432] hover:bg-black/5"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 md:hidden bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl z-40 border border-white/20"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === '/' && pathname === '/');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-lg font-semibold transition-colors",
                      isActive ? "text-[#3871FF]" : "text-[#252432] hover:text-[#3871FF]"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="h-px bg-black/10 w-full" />
              <div className="flex items-center justify-between">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 font-semibold"
                >
                  <Globe size={20} />
                  {language === 'en' ? 'English' : '中文'}
                </button>
                <Link 
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#3871FF] text-white px-6 py-3 rounded-full font-bold text-center"
                >
                  {t.nav.bookDemo}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;