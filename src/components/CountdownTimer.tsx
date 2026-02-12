'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  startDate: string;
}

export default function CountdownTimer({ startDate }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [nextMilestone, setNextMilestone] = useState('');

  useEffect(() => {
    setMounted(true);

    const calculateCountdown = () => {
      const start = new Date(startDate).getTime();
      const now = Date.now();
      const elapsed = now - start;

      const d = Math.floor(elapsed / (1000 * 60 * 60 * 24));
      const h = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((elapsed % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      if (d < 30) {
        setNextMilestone('1 month!');
      } else if (d < 100) {
        setNextMilestone('100 days!');
      } else if (d < 180) {
        setNextMilestone('6 months!');
      } else if (d < 365) {
        setNextMilestone('1 year!');
      } else {
        setNextMilestone('Forever together!');
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  if (!mounted) {
    return (
      <div className="w-full py-12 text-center">
        <div className="text-4xl sm:text-5xl font-bold text-gray-400 dark:text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 text-center">
      <div className="mb-4 text-sm sm:text-base font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
        Since February 9, 2026
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl font-bold text-violet-600 dark:text-violet-400 tabular-nums">
            {days}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
            {days === 1 ? 'Day' : 'Days'}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl font-bold text-violet-600 dark:text-violet-400 tabular-nums">
            {hours}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
            {hours === 1 ? 'Hour' : 'Hours'}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl font-bold text-violet-600 dark:text-violet-400 tabular-nums">
            {minutes}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
            {minutes === 1 ? 'Minute' : 'Minutes'}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl font-bold text-violet-600 dark:text-violet-400 tabular-nums">
            {seconds}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
            {seconds === 1 ? 'Second' : 'Seconds'}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-violet-100 dark:bg-violet-950 rounded-full">
          <span className="text-lg sm:text-xl font-bold text-violet-700 dark:text-violet-300">
            {nextMilestone}
          </span>
        </div>
      </div>

      <div className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
        <span>{days} days, {hours} hours, {minutes} minutes, {seconds} seconds together</span>
      </div>
    </div>
  );
}
