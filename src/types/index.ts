export type HolidayType =
    | 'galungan'
    | 'kuningan'
    | 'tumpek'
    | 'nyepi'
    | 'saraswati'
    | 'pagerwesi'
    | 'national'
    | 'cuti-bersama';

export interface BaseHoliday {
    date: string; // YYYY-MM-DD
    name: string;
    type: HolidayType;
    description?: string;
    isProjected?: boolean;
}

export interface BaliHoliday extends BaseHoliday {
    type: Exclude<HolidayType, 'national' | 'cuti-bersama'>;
    color: string;
}

export interface NationalHoliday extends BaseHoliday {
    type: 'national' | 'cuti-bersama';
    isCutiBersama?: boolean;
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
    showCutiBersama?: boolean;
    highlightHolidays?: HolidayType[];
    locale?: 'id' | 'en';
    theme?: 'light' | 'dark';
    /** If true, inherit theme from parent's Tailwind dark mode. Default: false (self-contained) */
    inheritTheme?: boolean;
    className?: string;
    onMonthChange?: (date: Date) => void;
}
