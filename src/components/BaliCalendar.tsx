"use client";

import React from 'react';
import { BaliCalendarProps } from '../types';
import { useBaliCalendar } from '../hooks/useBaliCalendar';
import { DateCell } from './DateCell';

// CSS variables for self-contained theming
const lightThemeVars = {
    '--bc-bg': '#ffffff',
    '--bc-bg-alt': '#f9fafb',
    '--bc-bg-muted': '#f3f4f6',
    '--bc-bg-hover': '#f3f4f6',
    '--bc-border': '#e5e7eb',
    '--bc-border-light': '#f3f4f6',
    '--bc-text': '#111827',
    '--bc-text-muted': '#6b7280',
    '--bc-text-subtle': '#9ca3af',
    '--bc-accent': '#f97316',
    '--bc-accent-bg': '#fff7ed',
    '--bc-accent-border': '#fed7aa',
} as React.CSSProperties;

const darkThemeVars = {
    '--bc-bg': '#000000',
    '--bc-bg-alt': '#111827',
    '--bc-bg-muted': '#1f2937',
    '--bc-bg-hover': '#1f2937',
    '--bc-border': '#1f2937',
    '--bc-border-light': '#1f2937',
    '--bc-text': '#ffffff',
    '--bc-text-muted': '#9ca3af',
    '--bc-text-subtle': '#6b7280',
    '--bc-accent': '#f97316',
    '--bc-accent-bg': 'rgba(249, 115, 22, 0.1)',
    '--bc-accent-border': 'rgba(249, 115, 22, 0.2)',
} as React.CSSProperties;

// Fixed calendar dimensions for consistency
const CALENDAR_MIN_WIDTH = '320px';
const CELL_WIDTH = '44px';
const CELL_HEIGHT = '44px';

export const BaliCalendar: React.FC<BaliCalendarProps> = ({
    selectedDate: propsSelectedDate,
    onDateChange,
    initialMonth = new Date(),
    yearRange = { start: 2020, end: 2030 },
    showBaliHolidays = true,
    showNationalHolidays = true,
    showCutiBersama = true,
    locale = 'id',
    theme = 'light',
    inheritTheme = false,
    className = '',
    onMonthChange
}) => {
    const {
        currentMonth,
        daysInMonth,
        nextMonth,
        prevMonth,
        selectDate,
        selectedDate: hookSelectedDate
    } = useBaliCalendar({
        initialDate: initialMonth,
        yearRange,
        showBaliHolidays,
        showNationalHolidays,
        showCutiBersama
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

    const currentSelectedDate = propsSelectedDate || hookSelectedDate;
    const isDark = theme === 'dark';

    // Apply CSS variables for self-contained theming (when inheritTheme is false)
    const themeStyles = !inheritTheme
        ? (isDark ? darkThemeVars : lightThemeVars)
        : {};

    // For inheritTheme mode, use Tailwind dark: classes
    if (inheritTheme) {
        return (
            <div
                className={`bali-calendar-container selection-none p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm ${className}`}
                style={{ minWidth: CALENDAR_MIN_WIDTH }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-none mb-1">
                            {monthNames[currentMonth.getMonth()]}
                        </h2>
                        <p className="text-xs text-gray-500 font-medium">
                            {currentMonth.getFullYear()} • Saka {daysInMonth.find(d => d.isCurrentMonth)?.baliInfo?.saka.year || ''}
                        </p>
                    </div>

                    <div className="flex gap-1">
                        <button
                            onClick={prevMonth}
                            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Week Day Labels */}
                <div className="grid grid-cols-7 mb-1">
                    {dayNames.map((day, idx) => (
                        <div
                            key={idx}
                            className={`text-center text-[10px] font-bold uppercase tracking-wider py-1 ${idx === 0 ? 'text-red-500' : 'text-gray-400 dark:text-gray-600'}`}
                            style={{ width: CELL_WIDTH }}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Grid - Fixed dimensions */}
                <div
                    className="grid grid-cols-7 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                    {daysInMonth.map((day, idx) => (
                        <DateCell
                            key={idx}
                            day={day}
                            onClick={handleDateClick}
                            locale={locale}
                            inheritTheme={true}
                            cellWidth={CELL_WIDTH}
                            cellHeight={CELL_HEIGHT}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Self-contained theming using CSS variables
    return (
        <div
            className={`bali-calendar-container selection-none p-4 rounded-xl shadow-sm ${className}`}
            style={{
                ...themeStyles,
                minWidth: CALENDAR_MIN_WIDTH,
                backgroundColor: 'var(--bc-bg)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--bc-border)',
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2
                        className="text-xl font-bold leading-none mb-1"
                        style={{ color: 'var(--bc-text)' }}
                    >
                        {monthNames[currentMonth.getMonth()]}
                    </h2>
                    <p
                        className="text-xs font-medium"
                        style={{ color: 'var(--bc-text-muted)' }}
                    >
                        {currentMonth.getFullYear()} • Saka {daysInMonth.find(d => d.isCurrentMonth)?.baliInfo?.saka.year || ''}
                    </p>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={prevMonth}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'var(--bc-border)',
                            color: 'var(--bc-text-muted)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'var(--bc-border)',
                            color: 'var(--bc-text-muted)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Week Day Labels */}
            <div className="grid grid-cols-7 mb-1">
                {dayNames.map((day, idx) => (
                    <div
                        key={idx}
                        className="text-center text-[10px] font-bold uppercase tracking-wider py-1"
                        style={{
                            color: idx === 0 ? '#ef4444' : 'var(--bc-text-subtle)',
                            width: CELL_WIDTH
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid - Fixed dimensions */}
            <div
                className="grid grid-cols-7 rounded-lg overflow-hidden"
                style={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--bc-border-light)'
                }}
            >
                {daysInMonth.map((day, idx) => (
                    <DateCell
                        key={idx}
                        day={day}
                        onClick={handleDateClick}
                        locale={locale}
                        inheritTheme={false}
                        isDark={isDark}
                        cellWidth={CELL_WIDTH}
                        cellHeight={CELL_HEIGHT}
                    />
                ))}
            </div>
        </div>
    );
};
