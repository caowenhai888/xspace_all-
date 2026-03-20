'use client';

/** @jsxImportSource react */
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Building2, Briefcase, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Contact {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  message: string;
  projectStage: string;
  solutions: string[];
  date: string;
}

const stageMap: Record<string, string> = {
  'Concept': '概念阶段',
  'Prototype': '原型阶段',
  'Production': '生产阶段'
};

const solutionMap: Record<string, string> = {
  'Data Infrastructure': '数据基础设施',
  'Vision System': '视觉系统',
  'Robotics Platform': '机器人平台'
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data.sort((a: Contact, b: Contact) => 
          new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        ));
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const fullName = `${c.lastName}${c.firstName}`.toLowerCase();
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || 
             c.email?.toLowerCase().includes(search) || 
             c.company?.toLowerCase().includes(search);
    });
  }, [contacts, searchTerm]);

  const formatFullDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* 标题与搜索 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">联系记录</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="搜索姓名、邮箱或公司..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 h-11 w-full md:w-80 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3871FF] transition-all"
          />
        </div>
      </div>

      {/* 数据表格 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">姓名</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">邮箱</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">公司</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">职位</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">项目阶段</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">解决方案</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">咨询内容</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">提交时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-400">正在加载数据...</td></tr>
              ) : filteredContacts.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-400">未找到相关记录</td></tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-gray-900">{contact.lastName}{contact.firstName}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building2 size={14} className="text-gray-400" />
                        {contact.company || '-'}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase size={14} className="text-gray-400" />
                        {contact.jobTitle || '-'}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-bold uppercase border border-gray-200">
                        {stageMap[contact.projectStage] || contact.projectStage}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.solutions?.map(s => (
                          <span key={s} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-medium border border-blue-100">
                            {solutionMap[s] || s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-start gap-2">
                        <MessageSquare size={14} className="mt-0.5 text-gray-300 shrink-0" />
                        <p className="text-sm text-gray-600 line-clamp-2 hover:line-clamp-none transition-all cursor-default">
                          {contact.message || '-'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <p className="text-xs text-gray-500 font-mono">
                        {formatFullDate(contact.date)}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <p className="text-sm text-gray-500">共 {filteredContacts.length} 条记录</p>
        </div>
      </div>
    </div>
  );
}