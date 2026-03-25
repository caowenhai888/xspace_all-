'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/app/context/LanguageContext';
import type { TranslationType } from '@/app/lib/translations';

type PartnerNameKey = keyof TranslationType['home']['partners']['names'];

/** Matches ~/workspace/jack/src/components/Partners.tsx + public/assets/ */
const PARTNER_ROWS: { nameKey: PartnerNameKey; src: string; w: number; h: number }[] = [
  { nameKey: 'alibaba', src: '/assets/alibaba.png', w: 120, h: 40 },
  { nameKey: 'bytedance', src: '/assets/betydance.png', w: 120, h: 40 },
  { nameKey: 'nvidia', src: '/assets/nvidia.png', w: 120, h: 40 },
  { nameKey: 'shanghai', src: '/assets/shanghai.png', w: 120, h: 40 },
  { nameKey: 'tsinghua', src: '/assets/qinghua.png', w: 120, h: 40 },
  { nameKey: 'hku', src: '/assets/hk.png', w: 120, h: 40 },
];

export default function Partners() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const names = t.home.partners.names;

  const partners = PARTNER_ROWS.map((row) => ({
    name: names[row.nameKey],
    ...row,
  }));

  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container-custom text-center mb-16 md:mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-3xl md:text-4xl font-bold text-black"
        >
          {t.home.partners.title}{' '}
          <span className="text-[#B8B8B8]">{t.home.partners.titleAccent}</span>
        </motion.h2>
      </div>

      {reduceMotion ? (
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 px-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center min-w-[150px] h-16 opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image
                src={p.src}
                alt={p.name}
                width={p.w}
                height={p.h}
                className="max-w-full max-h-full w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          <motion.div
            className="flex items-center gap-16 md:gap-24 whitespace-nowrap w-max"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center justify-center min-w-[150px] h-16 opacity-50 hover:opacity-100 transition-opacity shrink-0"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.w}
                  height={partner.h}
                  className="max-w-full max-h-full w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
