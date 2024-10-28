'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Birthday } from '../../page';
import UserSidebar from './UserSidebar';
import UserContent from './UserContent';

interface WitchesSectionProps {
  birthdays: Birthday[];
  currentLocale: string;
}

export default function WitchesSection({ birthdays, currentLocale }: WitchesSectionProps) {
  const [selectedUser, setSelectedUser] = useState<Birthday | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslations('WitchesSection');

  const { scrollY } = useScroll();
  const scaleX = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSelectUser = (birthday: Birthday) => {
    setSelectedUser(birthday);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-80 bg-card shadow-lg z-30"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold">{t('userList')}</h2>
              <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-accent">
                <X className="w-6 h-6" />
              </button>
            </div>
            <UserSidebar
              birthdays={birthdays}
              handleSelectUser={handleSelectUser}
              t={t}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </motion.button>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX }}
      />

      <div className="p-4 lg:p-8">
        <motion.h1 
          className="text-2xl lg:text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('witchesSection')}
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          transition={{ staggerChildren: 0.1 }}
        >
          <UserContent
            selectedUser={selectedUser}
            currentLocale={currentLocale}
            t={t}
          />
        </motion.div>
      </div>
    </div>
  );
}