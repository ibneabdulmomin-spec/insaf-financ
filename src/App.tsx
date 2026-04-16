/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Lock, Unlock, Phone, DollarSign, Building2, ShieldCheck, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { members } from './data/members';
import { Member } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [unlockedCode, setUnlockedCode] = useState<string | null>(null);

  // Total collection calculation
  const totalCollection = useMemo(() => {
    return members.reduce((sum, member) => sum + member.totalAmount, 0);
  }, []);

  // Filter members based on name or code
  const filteredMembers = useMemo(() => {
    if (!searchQuery) return members;
    return members.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.code.includes(searchQuery)
    );
  }, [searchQuery]);

  // Check if the search query matches any member's code exactly
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const matchingMember = members.find(m => m.code === value);
    if (matchingMember) {
      setUnlockedCode(matchingMember.code);
    } else {
      setUnlockedCode(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#10B981] p-2.5 rounded-xl shadow-sm">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#065F46]">আল-ইনসাফ ফাইনান্স</h1>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">সদস্যদের পেমেন্ট পোর্টাল</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="hover:text-[#10B981] cursor-pointer transition-colors">হোম</span>
            <span className="hover:text-[#10B981] cursor-pointer transition-colors">রিপোর্ট</span>
            <span className="hover:text-[#10B981] cursor-pointer transition-colors">যোগাযোগ</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section with Metric */}
        <section className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <Card className="bg-gradient-to-br from-[#065F46] to-[#10B981] text-white border-none shadow-xl px-8 py-6 rounded-3xl">
              <div className="flex items-center justify-center gap-3 mb-2 opacity-80">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-widest">সর্বমোট জমার পরিমাণ</span>
              </div>
              <div className="text-4xl md:text-5xl font-bold font-mono tracking-tighter flex items-center justify-center gap-2">
                <span>{totalCollection.toLocaleString('bn-BD', { minimumFractionDigits: 2 })}</span>
                <span className="text-2xl font-normal opacity-90">৳</span>
              </div>
            </Card>
          </motion.div>
          
          <h2 className="text-3xl font-serif font-bold mb-4 text-[#1F2937]">আপনার পেমেন্ট চেক করুন</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            আপনার সদস্য কোড নম্বরটি লিখুন (যেমন: <span className="font-mono font-bold text-primary">1001</span>) এবং আপনার পেমেন্ট স্ট্যাটাস দেখুন।
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-[#10B981] transition-colors" />
            </div>
            <Input 
              type="text"
              placeholder="এখানে কোড লিখুন..."
              className="pl-14 h-16 text-xl rounded-2xl border-2 border-[#E5E7EB] focus-visible:ring-[#10B981] focus-visible:border-[#10B981] shadow-lg transition-all bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-5 flex items-center">
              <AnimatePresence mode="wait">
                {unlockedCode ? (
                  <motion.div
                    key="unlocked"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Badge className="bg-[#D1FAE5] text-[#065F46] hover:bg-[#D1FAE5] border-[#A7F3D0] py-1.5 px-4 flex gap-2 items-center rounded-full">
                      <ShieldCheck className="w-4 h-4" />
                      ভেরিফাইড
                    </Badge>
                  </motion.div>
                ) : (
                  <motion.div
                    key="locked"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Badge variant="secondary" className="py-1.5 px-4 flex gap-2 items-center opacity-60 rounded-full">
                      <Lock className="w-3 h-3" />
                      সুরক্ষিত
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Member Results */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <MemberCard 
                  member={member} 
                  isUnlocked={unlockedCode === member.code} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMembers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-[#E5E7EB]"
          >
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#E5E7EB]">
              <Search className="text-muted-foreground w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">দুঃখিত!</h3>
            <p className="text-muted-foreground">এই কোড নম্বরটি আমাদের তালিকায় নেই।</p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white mt-20 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-[#10B981]/10 p-2 rounded-lg">
              <Building2 className="text-[#10B981] w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-xl text-[#065F46]">আল-ইনসাফ ফাইনান্স</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            © ২০২৫ আল-ইনসাফ ফাইনান্স | সিস্টেমটি AI দ্বারা তৈরি
          </p>
          <div className="flex justify-center gap-8 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <span className="hover:text-[#10B981] cursor-pointer transition-colors">গোপনীয়তা নীতি</span>
            <span className="hover:text-[#10B981] cursor-pointer transition-colors">শর্তাবলী</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MemberCard({ member, isUnlocked }: { member: Member; isUnlocked: boolean }) {
  return (
    <Card className={`overflow-hidden transition-all duration-500 border-2 ${isUnlocked ? 'ring-4 ring-[#10B981]/10 border-[#10B981] shadow-2xl scale-[1.02]' : 'border-[#E5E7EB] shadow-sm hover:shadow-md opacity-60 grayscale-[0.5]'}`}>
      <CardHeader className="pb-6 bg-gradient-to-r from-white to-secondary/10">
        <div className="flex justify-between items-start">
          <div className="flex gap-5 items-center">
            <div className="relative">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              {isUnlocked && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-[#10B981] text-white p-1.5 rounded-full border-4 border-white shadow-lg"
                >
                  <ShieldCheck className="w-5 h-5" />
                </motion.div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="font-mono text-xs font-bold text-[#065F46] border-[#A7F3D0] bg-[#F0FDF4]">
                  কোড: {member.code}
                </Badge>
              </div>
              <CardTitle className="font-serif text-2xl text-[#1F2937]">{member.name}</CardTitle>
            </div>
          </div>
          {isUnlocked && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">স্ট্যাটাস</p>
              <Badge className="bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]">সক্রিয় সদস্য</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Mobile Info */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Phone className="w-3 h-3" /> মোবাইল নম্বর
            </p>
            <div className="text-lg font-medium bg-secondary/30 p-4 rounded-xl border border-[#E5E7EB]">
              {isUnlocked ? member.mobile : '•••••••••••'}
            </div>
          </div>

          {/* Amount Info */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <DollarSign className="w-3 h-3" /> মোট জমার পরিমাণ
            </p>
            <div className={`text-2xl font-bold font-mono p-4 rounded-xl border transition-all duration-500 flex items-center justify-between ${isUnlocked ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]' : 'bg-secondary/30 border-[#E5E7EB] text-muted-foreground'}`}>
              <AnimatePresence mode="wait">
                {isUnlocked ? (
                  <motion.div
                    key="amount"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span>{member.totalAmount.toLocaleString('bn-BD')}</span>
                    <span className="text-lg font-normal">৳</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="masked"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-1.5"
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20 animate-pulse" />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {!isUnlocked ? (
                <Lock className="w-4 h-4 opacity-40" />
              ) : (
                <Unlock className="w-4 h-4 text-[#10B981]" />
              )}
            </div>
          </div>
        </div>

        {!isUnlocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] text-center"
          >
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> আপনার তথ্য দেখতে সদস্য কোডটি উপরে লিখুন
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
