// ============================================
// package.json
// ============================================
{
  "name": "react-bali-calendar",
  "version": "1.0.0",
  "description": "React datepicker for Balinese Calendar with Indonesian National Holidays",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md"],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils.esm.js",
      "require": "./dist/utils.js",
      "types": "./dist/utils.d.ts"
    },
    "./hooks": {
      "import": "./dist/hooks.esm.js",
      "require": "./dist/hooks.js",
      "types": "./dist/hooks.d.ts"
    }
  },
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "lint": "eslint src/**/*.{ts,tsx}",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  },
  "dependencies": {
    "balinese-date-js-lib": "^0.4.3",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^25.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "@rollup/plugin-typescript": "^11.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "rollup": "^4.0.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.0",
    "typescript": "^5.0.0"
  },
  "keywords": [
    "react",
    "calendar",
    "datepicker",
    "bali",
    "balinese",
    "pawukon",
    "saka",
    "indonesia",
    "holiday",
    "galungan",
    "kuningan",
    "nyepi"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-bali-calendar"
  }
}

// ============================================
// src/types/index.ts
// ============================================
export type HolidayType = 
  | 'galungan' 
  | 'kuningan' 
  | 'tumpek' 
  | 'nyepi' 
  | 'saraswati' 
  | 'pagerwesi' 
  | 'national';

export interface BaliHoliday {
  date: string;
  name: string;
  type: HolidayType;
  description?: string;
  color: string;
  saka?: SakaDate;
  pawukon?: PawukonDate;
}

export interface NationalHoliday {
  date: string;
  name: string;
  type: 'national';
  isCutiBersama?: boolean;
  color: string;
}

export type Holiday = BaliHoliday | NationalHoliday;

export interface SakaDate {
  year: number;
  sasih: string;
  penanggal: number;
  isPurnama: boolean;
  isTilem: boolean;
}

export interface PawukonDate {
  wuku: string;
  saptawara: string;
  pancawara: string;
  triwara: string;
  ekawara?: string;
  dwiwara?: string;
  caturwara?: string;
}

export interface BaliDateInfo {
  gregorian: string;
  saka: SakaDate;
  pawukon: PawukonDate;
  holidays: Holiday[];
}

export interface NextGalungan {
  date: string;
  daysUntil: number;
  kuningan: string;
}

export interface YearRange {
  start: number;
  end: number;
}

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  holidays: Holiday[];
  baliInfo?: BaliDateInfo;
}

export interface BaliCalendarProps {
  selectedDate?: Date | null;
  onDateChange?: (date: Date) => void;
  initialMonth?: Date;
  yearRange?: YearRange;
  showBaliHolidays?: boolean;
  showNationalHolidays?: boolean;
  highlightHolidays?: HolidayType[];
  locale?: 'id' | 'en';
  theme?: 'light' | 'dark';
  className?: string;
  onMonthChange?: (date: Date) => void;
}

// ============================================
// src/utils/baliHolidays.ts
// ============================================
import { BalineseDate } from 'balinese-date-js-lib';
import { BaliHoliday, NationalHoliday, Holiday } from '../types';

// Galungan calculation (210-day cycle)
export function calculateGalunganDates(year: number): BaliHoliday[] {
  const galungans: BaliHoliday[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  // Reference Galungan: 2025-01-01
  const referenceGalungan = new Date('2025-01-01');
  const galunganCycle = 210; // days
  
  let currentDate = new Date(referenceGalungan);
  
  // Go backward to find first Galungan before year
  while (currentDate > startDate) {
    currentDate = new Date(currentDate.getTime() - galunganCycle * 24 * 60 * 60 * 1000);
  }
  
  // Go forward to collect all Galungans in the year
  while (currentDate <= endDate) {
    if (currentDate >= startDate) {
      const dateStr = formatDate(currentDate);
      galungans.push({
        date: dateStr,
        name: 'Galungan',
        type: 'galungan',
        description: 'Hari kemenangan Dharma melawan Adharma',
        color: 'bg-yellow-500'
      });
      
      // Add Kuningan (10 days after Galungan)
      const kuningan = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);
      galungans.push({
        date: formatDate(kuningan),
        name: 'Kuningan',
        type: 'kuningan',
        description: '10 hari setelah Galungan',
        color: 'bg-orange-500'
      });
    }
    currentDate = new Date(currentDate.getTime() + galunganCycle * 24 * 60 * 60 * 1000);
  }
  
  return galungans;
}

// Tumpek calculation (35-day cycle)
export function calculateTumpekDates(year: number): BaliHoliday[] {
  const tumpeks: BaliHoliday[] = [];
  const tumpekNames = [
    { name: 'Tumpek Landep', color: 'bg-blue-500', description: 'Hari suci untuk keris dan benda tajam' },
    { name: 'Tumpek Uduh', color: 'bg-green-500', description: 'Hari suci untuk tumbuhan' },
    { name: 'Tumpek Krulut', color: 'bg-purple-500', description: 'Hari suci untuk gamelan' },
    { name: 'Tumpek Kandang', color: 'bg-pink-500', description: 'Hari suci untuk hewan' },
    { name: 'Tumpek Wayang', color: 'bg-indigo-500', description: 'Hari suci untuk wayang' },
  ];
  
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  // Reference Tumpek Landep: 2025-01-25
  const referenceTumpek = new Date('2025-01-25');
  const tumpekCycle = 35; // days
  
  let currentDate = new Date(referenceTumpek);
  let tumpekIndex = 0;
  
  // Go backward
  while (currentDate > startDate) {
    currentDate = new Date(currentDate.getTime() - tumpekCycle * 24 * 60 * 60 * 1000);
    tumpekIndex = (tumpekIndex - 1 + tumpekNames.length) % tumpekNames.length;
  }
  
  // Go forward
  while (currentDate <= endDate) {
    if (currentDate >= startDate) {
      const tumpek = tumpekNames[tumpekIndex];
      tumpeks.push({
        date: formatDate(currentDate),
        name: tumpek.name,
        type: 'tumpek',
        description: tumpek.description,
        color: tumpek.color
      });
    }
    currentDate = new Date(currentDate.getTime() + tumpekCycle * 24 * 60 * 60 * 1000);
    tumpekIndex = (tumpekIndex + 1) % tumpekNames.length;
  }
  
  return tumpeks;
}

// Nyepi calculation (Saka New Year)
export function calculateNyepiDate(year: number): BaliHoliday[] {
  // Nyepi dates (approximate, should be calculated properly with lunar calendar)
  const nyepiDates: Record<number, string> = {
    2024: '2024-03-11',
    2025: '2025-03-29',
    2026: '2026-03-18',
    2027: '2027-03-07',
    2028: '2028-03-24',
    2029: '2029-03-13',
    2030: '2030-03-02',
  };
  
  const nyepiDate = nyepiDates[year];
  if (!nyepiDate) return [];
  
  const sakaYear = year - 78;
  
  return [{
    date: nyepiDate,
    name: `Nyepi (Tahun Baru Saka ${sakaYear})`,
    type: 'nyepi',
    description: 'Tahun Baru Saka, hari raya kesucian',
    color: 'bg-gray-800'
  }];
}

// Saraswati & Pagerwesi
export function calculateSaraswatiPagerwesi(year: number): BaliHoliday[] {
  const holidays: BaliHoliday[] = [];
  const galungans = calculateGalunganDates(year);
  
  galungans.forEach(g => {
    if (g.type === 'galungan') {
      const galunganDate = new Date(g.date);
      
      // Saraswati is 5 days before Galungan
      const saraswati = new Date(galunganDate.getTime() - 5 * 24 * 60 * 60 * 1000);
      holidays.push({
        date: formatDate(saraswati),
        name: 'Saraswati',
        type: 'saraswati',
        description: 'Hari raya pengetahuan dan ilmu',
        color: 'bg-cyan-500'
      });
      
      // Pagerwesi is 1 day before Galungan
      const pagerwesi = new Date(galunganDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      holidays.push({
        date: formatDate(pagerwesi),
        name: 'Pagerwesi',
        type: 'pagerwesi',
        description: 'Hari penguatan iman',
        color: 'bg-red-600'
      });
    }
  });
  
  return holidays;
}

export function getBaliHolidays(year: number): BaliHoliday[] {
  return [
    ...calculateGalunganDates(year),
    ...calculateTumpekDates(year),
    ...calculateNyepiDate(year),
    ...calculateSaraswatiPagerwesi(year)
  ].sort((a, b) => a.date.localeCompare(b.date));
}

// ============================================
// src/utils/nationalHolidays.ts
// ============================================
export function getNationalHolidays(year: number): NationalHoliday[] {
  const holidays: Record<number, NationalHoliday[]> = {
    2025: [
      { date: '2025-01-01', name: 'Tahun Baru Masehi', type: 'national', color: 'bg-red-500' },
      { date: '2025-01-29', name: 'Isra Miraj', type: 'national', color: 'bg-green-600' },
      { date: '2025-02-12', name: 'Tahun Baru Imlek', type: 'national', color: 'bg-red-600' },
      { date: '2025-03-29', name: 'Nyepi', type: 'national', color: 'bg-gray-800' },
      { date: '2025-03-31', name: 'Idul Fitri', type: 'national', color: 'bg-green-500' },
      { date: '2025-04-01', name: 'Idul Fitri', type: 'national', color: 'bg-green-500' },
      { date: '2025-04-18', name: 'Jumat Agung', type: 'national', color: 'bg-purple-600' },
      { date: '2025-05-01', name: 'Hari Buruh', type: 'national', color: 'bg-blue-600' },
      { date: '2025-05-12', name: 'Kenaikan Isa Al-Masih', type: 'national', color: 'bg-purple-500' },
      { date: '2025-05-29', name: 'Waisak', type: 'national', color: 'bg-orange-400' },
      { date: '2025-06-07', name: 'Idul Adha', type: 'national', color: 'bg-green-700' },
      { date: '2025-06-28', name: 'Tahun Baru Hijriyah', type: 'national', color: 'bg-teal-600' },
      { date: '2025-08-17', name: 'Hari Kemerdekaan RI', type: 'national', color: 'bg-red-700' },
      { date: '2025-09-06', name: 'Maulid Nabi Muhammad', type: 'national', color: 'bg-emerald-600' },
      { date: '2025-12-25', name: 'Hari Raya Natal', type: 'national', color: 'bg-red-500' },
    ],
    // Add more years as needed
  };
  
  return holidays[year] || [];
}

// ============================================
// src/utils/helpers.ts
// ============================================
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return formatDate(date1) === formatDate(date2);
}

export function getNextGalungan(fromDate: Date = new Date()): NextGalungan {
  const year = fromDate.getFullYear();
  const galungans = calculateGalunganDates(year)
    .concat(calculateGalunganDates(year + 1))
    .filter(g => g.type === 'galungan')
    .map(g => parseDate(g.date))
    .filter(d => d > fromDate);
  
  if (galungans.length === 0) {
    throw new Error('No future Galungan found');
  }
  
  const nextGalungan = galungans[0];
  const daysUntil = Math.floor((nextGalungan.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
  const kuningan = new Date(nextGalungan.getTime() + 10 * 24 * 60 * 60 * 1000);
  
  return {
    date: formatDate(nextGalungan),
    daysUntil,
    kuningan: formatDate(kuningan)
  };
}

export { calculateGalunganDates, calculateTumpekDates, calculateNyepiDate };

// ============================================
// src/hooks/useBaliCalendar.ts
// ============================================
import { useState, useMemo, useCallback } from 'react';
import { CalendarDay, Holiday, YearRange, BaliDateInfo } from '../types';
import { getBaliHolidays, getNationalHolidays, formatDate, isSameDay } from '../utils';

interface UseBaliCalendarOptions {
  initialDate?: Date;
  yearRange?: YearRange;
  showBaliHolidays?: boolean;
  showNationalHolidays?: boolean;
}

export function useBaliCalendar(options: UseBaliCalendarOptions = {}) {
  const {
    initialDate = new Date(),
    yearRange = { start: 2020, end: 2030 },
    showBaliHolidays = true,
    showNationalHolidays = true
  } = options;

  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get all holidays for current month's year
  const holidays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const allHolidays: Holiday[] = [];
    
    if (showBaliHolidays) {
      allHolidays.push(...getBaliHolidays(year));
    }
    if (showNationalHolidays) {
      allHolidays.push(...getNationalHolidays(year));
    }
    
    return allHolidays;
  }, [currentMonth, showBaliHolidays, showNationalHolidays]);

  // Generate calendar days for current month
  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];
    const today = new Date();

    // Empty cells before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({
        date: prevMonthDay,
        dayNumber: prevMonthDay.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        holidays: []
      });
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = formatDate(date);
      const dayHolidays = holidays.filter(h => h.date === dateStr);

      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        holidays: dayHolidays
      });
    }

    return days;
  }, [currentMonth, holidays, selectedDate]);

  const nextMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToDate = useCallback((date: Date) => {
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  }, []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  return {
    currentMonth,
    daysInMonth,
    holidays,
    selectedDate,
    nextMonth,
    prevMonth,
    goToDate,
    selectDate
  };
}

// ============================================
// src/components/BaliCalendar.tsx
// ============================================
import React from 'react';
import { BaliCalendarProps } from '../types';
import { useBaliCalendar } from '../hooks/useBaliCalendar';

export const BaliCalendar: React.FC<BaliCalendarProps> = ({
  selectedDate,
  onDateChange,
  initialMonth = new Date(),
  yearRange = { start: 2020, end: 2030 },
  showBaliHolidays = true,
  showNationalHolidays = true,
  locale = 'id',
  className = ''
}) => {
  const {
    currentMonth,
    daysInMonth,
    nextMonth,
    prevMonth,
    selectDate
  } = useBaliCalendar({
    initialDate: initialMonth,
    yearRange,
    showBaliHolidays,
    showNationalHolidays
  });

  const monthNames = locale === 'id' 
    ? ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = locale === 'id'
    ? ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (date: Date) => {
    selectDate(date);
    onDateChange?.(date);
  };

  return (
    <div className={`bali-calendar ${className}`}>
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2">←</button>
        <h2 className="text-xl font-bold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button onClick={nextMonth} className="p-2">→</button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center font-semibold p-2">{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, idx) => (
          <div
            key={idx}
            onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
            className={`
              p-2 min-h-[80px] border cursor-pointer
              ${day.isCurrentMonth ? '' : 'opacity-40'}
              ${day.isToday ? 'bg-blue-100' : ''}
              ${day.isSelected ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            <div className="font-semibold">{day.dayNumber}</div>
            <div className="text-xs space-y-1">
              {day.holidays.slice(0, 2).map((h, i) => (
                <div key={i} className={`${h.color} text-white px-1 rounded truncate`}>
                  {h.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// src/index.ts
// ============================================
export { BaliCalendar } from './components/BaliCalendar';
export { useBaliCalendar } from './hooks/useBaliCalendar';
export * from './types';
export * from './utils';