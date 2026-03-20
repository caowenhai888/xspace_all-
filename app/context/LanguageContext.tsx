'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
        setLanguage(savedLang);
      }
    } catch (e) {
      console.warn('localStorage access failed:', e);
    }
    setIsInitialized(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (e) {
      console.warn('localStorage set failed:', e);
    }
  };

  const t = translations[language];

  // We still render children immediately for SEO, but we use suppressHydrationWarning in layout.tsx
  // To be even safer, we could return null if !isInitialized, but that breaks SEO.
  // Instead, we'll just ensure the context is always available.

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
