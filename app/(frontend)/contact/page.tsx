'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const Contact = () => {
  const [projectStage, setProjectStage] = useState('');
  const [solutions, setSolutions] = useState<string[]>([]);
  const { t } = useLanguage();
  const [error, setError] = useState('');

  const handleSolutionChange = (solution: string) => {
    if (solutions.includes(solution)) {
      setSolutions(solutions.filter((s) => s !== solution));
    } else {
      setSolutions([...solutions, solution]);
    }
  };

  const projectStages = t.contact.stages;

  const solutionOptions = t.contact.solutionOptions;

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectStage,
          solutions
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(t.contact.errors.generic);
      }
    } catch (err) {
      alert(t.contact.errors.network);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F4F0] pt-[181px] pb-24 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md mx-6"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowRight size={40} className="rotate-[-45deg]" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{t.contact.success.title}</h2>
          <p className="text-gray-600 mb-8">{t.contact.success.desc}</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full h-12 bg-[#3871FF] text-white rounded-full font-bold hover:bg-[#2a5bd7] transition-colors"
          >
            {t.contact.success.button}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0] pt-[181px] pb-24">
      <div className="container-custom flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[994px] bg-[#DAECED]/75 rounded-[18px] p-8 md:p-16 shadow-sm"
        >
          <h1 className="text-3xl md:text-[32px] font-bold text-black mb-12">
            {t.contact.title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Name & Company Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-3">
                <label className="block text-base font-semibold text-black">
                  {t.contact.firstName}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={t.contact.placeholders.firstName}
                  className="w-full h-[54px] px-4 bg-white border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#3871FF] transition-colors placeholder:text-black/30"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-base font-semibold text-black">
                  {t.contact.lastName}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={t.contact.placeholders.lastName}
                  className="w-full h-[54px] px-4 bg-white border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#3871FF] transition-colors placeholder:text-black/30"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-base font-semibold text-black">
                  {t.contact.company}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={t.contact.placeholders.company}
                  className="w-full h-[54px] px-4 bg-white border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#3871FF] transition-colors placeholder:text-black/30"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-base font-semibold text-black">
                  {t.contact.jobTitle}
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder={t.contact.placeholders.jobTitle}
                  className="w-full h-[54px] px-4 bg-white border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#3871FF] transition-colors placeholder:text-black/30"
                  required
                />
              </div>
            </div>

            {/* Email - Full Width */}
            <div className="space-y-3">
              <label className="block text-base font-semibold text-black">
                {t.contact.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.contact.placeholders.email}
                className="w-full h-[54px] px-4 bg-white border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#3871FF] transition-colors placeholder:text-black/30"
                required
              />
            </div>

            {/* Project Stage - Radio Buttons */}
            <div className="space-y-6">
              <label className="block text-base font-semibold text-black">
                {t.contact.stage}
              </label>
              <div className="space-y-4">
                {projectStages.map((stage: string) => (
                  <label key={stage} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="projectStage"
                        value={stage}
                        checked={projectStage === stage}
                        onChange={(e) => setProjectStage(e.target.value)}
                        className="peer appearance-none w-5 h-5 border-2 border-[#D9D9D9] rounded-md checked:bg-[#3871FF] checked:border-[#3871FF] transition-all"
                        required
                      />
                      <svg
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-base text-black/80 group-hover:text-black transition-colors">
                      {stage}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Solutions - Checkboxes */}
            <div className="space-y-6">
              <label className="block text-base font-semibold text-black">
                {t.contact.solutions}
              </label>
              <div className="space-y-4">
                {solutionOptions.map((option: string) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={solutions.includes(option)}
                        onChange={() => handleSolutionChange(option)}
                        className="peer appearance-none w-5 h-5 border-2 border-[#D9D9D9] rounded-md checked:bg-[#3871FF] checked:border-[#3871FF] transition-all"
                      />
                      <svg
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-base text-black/80 group-hover:text-black transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-3">
              <label className="block text-base font-semibold text-black">
                {t.contact.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.contact.placeholders.message}
                className="w-full h-[220px] p-6 bg-white border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#3871FF] transition-colors resize-none placeholder:text-black/30"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 h-[48px] px-10 bg-white border border-[#3871FF] rounded-full text-black font-semibold text-base transition-all hover:bg-[#3871FF] hover:text-white active:scale-95 shadow-sm disabled:opacity-50"
              >
                <span>{loading ? t.contact.submitting : t.contact.submit}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
