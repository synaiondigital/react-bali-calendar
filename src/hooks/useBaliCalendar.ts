import { useState, useMemo, useCallback } from 'react';
import {
    CalendarDay,
    Holiday,
    YearRange,
    BaliCalendarProps
} from '../types';
import {
    getBaliHolidays,
    getNationalHolidays,
    formatDate,
    isSameDay,
    calculateBaliDate
} from '../utils';

interface UseBaliCalendarOptions {
    initialDate?: Date;
    yearRange?: YearRange;
    showBaliHolidays?: boolean;
    showNationalHolidays?: boolean;
    showCutiBersama?: boolean;
}

export function useBaliCalendar(options: UseBaliCalendarOptions = {}) {
    const {
        initialDate = new Date(),
        yearRange = { start: 2020, end: 2030 },
        showBaliHolidays = true,
        showNationalHolidays = true,
        showCutiBersama = true
    } = options;

    const [currentMonth, setCurrentMonth] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Get all holidays for current month's year
    const holidays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const allHolidays: Holiday[] = [];

        if (showBaliHolidays) {
            allHolidays.push(...getBaliHolidays(year));
        }
        if (showNationalHolidays) {
            const national = getNationalHolidays(year);
            allHolidays.push(...national.filter((h: Holiday) => h.type === 'national' || (showCutiBersama && h.type === 'cuti-bersama')));
        }

        return allHolidays;
    }, [currentMonth, showBaliHolidays, showNationalHolidays, showCutiBersama]);

    // Generate calendar days for current month
    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysCount = lastDay.getDate();

        // Day of week of first day (0-6)
        const startingDayOfWeek = firstDay.getDay();

        const days: CalendarDay[] = [];
        const today = new Date();

        // Padding from previous month
        const prevMonthLastDay = new Date(year, month, 0);
        const prevMonthDaysCount = prevMonthLastDay.getDate();

        for (let i = 0; i < startingDayOfWeek; i++) {
            const dayNum = prevMonthDaysCount - startingDayOfWeek + i + 1;
            const date = new Date(year, month - 1, dayNum);
            days.push({
                date,
                dayNumber: dayNum,
                isCurrentMonth: false,
                isToday: isSameDay(date, today),
                isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
                holidays: [] // We typically don't show holidays for padding days
            });
        }

        // Days of the month
        for (let day = 1; day <= daysCount; day++) {
            const date = new Date(year, month, day);
            const dateStr = formatDate(date);
            const dayHolidays = holidays.filter((h: Holiday) => h.date === dateStr);

            // Calculate Bali Info only for current month days to save performance
            const baliInfo = calculateBaliDate(date);

            days.push({
                date,
                dayNumber: day,
                isCurrentMonth: true,
                isToday: isSameDay(date, today),
                isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
                holidays: dayHolidays,
                baliInfo
            });
        }

        // Padding for next month to complete the row (total 42 days for 6 rows)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            days.push({
                date,
                dayNumber: i,
                isCurrentMonth: false,
                isToday: isSameDay(date, today),
                isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
                holidays: []
            });
        }

        return days;
    }, [currentMonth, holidays, selectedDate]);

    const nextMonth = useCallback(() => {
        setCurrentMonth((prev: Date) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }, []);

    const prevMonth = useCallback(() => {
        setCurrentMonth((prev: Date) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
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
        selectDate,
        getBaliInfo: calculateBaliDate
    };
}
