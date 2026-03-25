'use client';

import React from 'react';
import Link from 'next/link';
// 只保留 Linkedin，X 我们用原版 SVG
import { Linkedin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#F5F4F0] py-24 border-t border-[#E5E5E5]">
      <div className="container-custom flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Logo 区域 */}
        <div className="flex-1">
          <Link href="/" className="flex items-center">
            <Logo variant="dark" />
          </Link>
        </div>

        {/* 导航链接区域 */}
        <div className="flex gap-24">
          <div>
            <h4 className="font-bold text-[#252432] mb-6 text-sm uppercase tracking-wider">
              {t.footer.explore}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/technology" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">
                  {t.footer.technology}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">
                  {t.footer.community}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#252432] mb-6 text-sm uppercase tracking-wider">
              {t.footer.about}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">
                  {t.footer.company}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">
                  {t.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 社交媒体图标区域 */}
        <div className="flex items-center gap-6">
          {/* X (Twitter) - 使用你提供的官方原版 SVG */}
          <a 
            href="https://x.com/your_account" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#252432] hover:text-[#0E41BF] transition-all hover:scale-110"
            aria-label="Follow us on X"
          >
            <svg 
              viewBox="0 0 24 24" 
              aria-hidden="true" 
              className="w-5 h-5 fill-current" // 关键：使用 fill-current 跟随文字颜色
            >
              <g>
                <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
              </g>
            </svg>
          </a>
          
          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/your_profile" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#252432] hover:text-[#0E41BF] transition-all hover:scale-110"
            aria-label="Connect on LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;