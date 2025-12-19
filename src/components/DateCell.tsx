"use client";

import React from 'react';
import { CalendarDay } from '../types';

interface DateCellProps {
    day: CalendarDay;
    onClick: (date: Date) => void;
    locale?: 'id' | 'en';
    inheritTheme?: boolean;
    isDark?: boolean;
    cellWidth?: string;
    cellHeight?: string;
}

// Bali holiday types that should show the red circle
const BALI_HOLIDAY_TYPES = ['galungan', 'kuningan', 'nyepi', 'saraswati', 'pagerwesi', 'tumpek'];

// Check if day has a Bali holiday
const hasBaliHoliday = (day: CalendarDay): boolean => {
    return day.holidays.some(h => BALI_HOLIDAY_TYPES.includes(h.type));
};

// Get Bali holiday names for tooltip
const getBaliHolidayNames = (day: CalendarDay): string => {
    return day.holidays
        .filter(h => BALI_HOLIDAY_TYPES.includes(h.type))
        .map(h => h.name)
        .join(', ');
};

// Build tooltip text with all info
const buildTooltip = (day: CalendarDay): string => {
    if (!day.baliInfo || !day.isCurrentMonth) return '';

    const parts: string[] = [];
    const { pawukon, saka } = day.baliInfo;

    // All holidays first
    if (day.holidays.length > 0) {
        day.holidays.forEach(h => {
            parts.push(`• ${h.name}`);
        });
    }

    // Wewaran info
    parts.push(`${pawukon.saptawara} ${pawukon.pancawara}`);
    parts.push(`Wuku: ${pawukon.wuku}`);
    parts.push(`${saka.penanggal} ${saka.sasih} (Saka ${saka.year})`);

    if (saka.isPurnama) parts.push('🌕 Purnama');
    if (saka.isTilem) parts.push('🌑 Tilem');

    return parts.join('\n');
};

export const DateCell: React.FC<DateCellProps> = ({
    day,
    onClick,
    locale = 'id',
    inheritTheme = false,
    isDark = false,
    cellWidth = '44px',
    cellHeight = '44px'
}) => {
    const isSunday = day.date.getDay() === 0;
    const tooltip = buildTooltip(day);
    const isBaliHoliday = day.isCurrentMonth && hasBaliHoliday(day);
    const hasNationalHoliday = day.holidays.some(h => h.type === 'national' || h.type === 'cuti-bersama');

    // Common cell styles for fixed dimensions
    const cellStyle: React.CSSProperties = {
        width: cellWidth,
        height: cellHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    };

    if (inheritTheme) {
        return (
            <div
                onClick={() => day.isCurrentMonth && onClick(day.date)}
                title={tooltip}
                className={`
                    transition-all cursor-pointer
                    ${day.isCurrentMonth ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-950 opacity-40'}
                    ${day.isSelected ? 'ring-2 ring-orange-500 ring-inset z-10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                    ${day.isToday ? 'bg-orange-50 dark:bg-orange-950/20' : ''}
                `}
                style={cellStyle}
            >
                <span
                    className={`
                        font-semibold text-sm inline-flex items-center justify-center
                        ${isSunday || hasNationalHoliday ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}
                        ${day.isToday ? 'text-orange-600 font-bold' : ''}
                        ${isBaliHoliday ? 'w-7 h-7 rounded-full border border-red-500' : ''}
                    `}
                >
                    {day.dayNumber}
                </span>


                {/* Moon phase indicator - top center (12 o'clock) */}
                {day.baliInfo?.saka.isPurnama && day.isCurrentMonth && (
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" title="Purnama" />
                )}
                {day.baliInfo?.saka.isTilem && day.isCurrentMonth && (
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-white" title="Tilem" />
                )}
            </div>
        );
    }

    // Self-contained theming
    const bgColor = day.isCurrentMonth
        ? (day.isToday ? 'var(--bc-accent-bg)' : 'var(--bc-bg)')
        : 'var(--bc-bg-alt)';

    const textColor = (isSunday || hasNationalHoliday)
        ? '#ef4444'
        : (day.isToday ? 'var(--bc-accent)' : 'var(--bc-text)');

    return (
        <div
            onClick={() => day.isCurrentMonth && onClick(day.date)}
            title={tooltip}
            className={`transition-all cursor-pointer ${day.isSelected ? 'ring-2 ring-orange-500 ring-inset z-10' : ''}`}
            style={{
                ...cellStyle,
                backgroundColor: bgColor,
                opacity: day.isCurrentMonth ? 1 : 0.4,
            }}
        >
            {/* Date number with optional Bali holiday circle */}
            <span
                className="font-semibold text-sm inline-flex items-center justify-center"
                style={{
                    color: textColor,
                    fontWeight: day.isToday ? 700 : 600,
                    ...(isBaliHoliday ? {
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid #ef4444',
                    } : {})
                }}
            >
                {day.dayNumber}
            </span>


            {/* Moon phase indicator - top center (12 o'clock) */}
            {day.baliInfo?.saka.isPurnama && day.isCurrentMonth && (
                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" title="Purnama" />
            )}
            {day.baliInfo?.saka.isTilem && day.isCurrentMonth && (
                <div
                    className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isDark ? '#ffffff' : '#1f2937' }}
                    title="Tilem"
                />
            )}
        </div>
    );
};
