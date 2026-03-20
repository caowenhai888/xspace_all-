'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#F5F4F0] py-24 border-t border-[#E5E5E5]">
      <div className="container-custom flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex-1">
          <Link href="/" className="flex items-center">
            <Logo variant="dark" />
          </Link>
        </div>

        <div className="flex gap-24">
          <div>
            <h4 className="font-bold text-[#252432] mb-6 text-sm uppercase tracking-wider">{t.footer.explore}</h4>
            <ul className="space-y-4">
              <li><Link href="/technology" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">{t.footer.technology}</Link></li>
              <li><Link href="#" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">{t.footer.community}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#252432] mb-6 text-sm uppercase tracking-wider">{t.footer.about}</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">{t.footer.company}</Link></li>
              <li><Link href="#" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">{t.footer.careers}</Link></li>
              <li><Link href="/contact" className="text-gray-500 text-sm hover:text-[#0E41BF] transition-colors">{t.footer.contact}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-[#252432] hover:text-[#0E41BF] transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-[#252432] hover:text-[#0E41BF] transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
