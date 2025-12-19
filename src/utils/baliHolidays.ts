import { BalineseDate } from 'balinese-date-js-lib';
import { BaliHoliday, BaliDateInfo } from '../types';
import { formatDate, parseDate } from './helpers';

/**
 * Calculates Balinese holidays for a given year.
 * Focuses on Pawukon (210-day) and Saka cycles.
 */
export function getBaliHolidays(year: number): BaliHoliday[] {
    const holidays: BaliHoliday[] = [];
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    // Iterating through each day is the most reliable way given libraries usually handle one date at a time
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const info = calculateBaliDate(new Date(d));
        if (info.holidays.length > 0) {
            info.holidays.forEach(h => {
                if (h.type !== 'national' && h.type !== 'cuti-bersama') {
                    holidays.push(h as BaliHoliday);
                }
            });
        }
    }

    return holidays;
}

/**
 * Detailed Balinese date calculation using the library.
 */
export function calculateBaliDate(date: Date): BaliDateInfo {
    const bDate = new BalineseDate(date);

    // Pawukon Info
    const wuku = bDate.wuku.name;
    const saptawara = bDate.saptaWara.name;
    const pancawara = bDate.pancaWara.name;
    const triwara = bDate.triWara.name;

    // Saka Info
    const sakaYear = bDate.saka;
    const sasih = bDate.sasih.name;
    const penanggal = bDate.sasihDay[0];

    // Sasih Day Info IDs: 2 for Purnama, 3 for Tilem
    const isPurnama = bDate.sasihDayInfo.id === 2;
    const isTilem = bDate.sasihDayInfo.id === 3;

    const holidays: BaliHoliday[] = [];
    const dateStr = formatDate(date);

    // Logic for Galungan (Buda Kliwon Dungulan)
    if (wuku === 'Dungulan' && saptawara === 'Buda' && pancawara === 'Kliwon') {
        holidays.push({
            date: dateStr,
            name: 'Galungan',
            type: 'galungan',
            color: 'bg-yellow-500',
            description: 'Kemenangan Dharma melawan Adharma'
        });
    }

    // Kuningan (Saniscara Kliwon Kuningan)
    if (wuku === 'Kuningan' && saptawara === 'Saniscara' && pancawara === 'Kliwon') {
        holidays.push({
            date: dateStr,
            name: 'Kuningan',
            type: 'kuningan',
            color: 'bg-orange-500',
            description: '10 Hari setelah Galungan'
        });
    }

    // Saraswati (Saniscara Umanis Watugunung)
    if (wuku === 'Watugunung' && saptawara === 'Saniscara' && pancawara === 'Umanis') {
        holidays.push({
            date: dateStr,
            name: 'Saraswati',
            type: 'saraswati',
            color: 'bg-blue-500',
            description: 'Hari Ilmu Pengetahuan'
        });
    }

    // Pagerwesi (Buda Kliwon Sinta)
    if (wuku === 'Sinta' && saptawara === 'Buda' && pancawara === 'Kliwon') {
        holidays.push({
            date: dateStr,
            name: 'Pagerwesi',
            type: 'pagerwesi',
            color: 'bg-indigo-500',
            description: 'Hari Pemujaan Hyang Pramesti Guru'
        });
    }
    // Logic for Tumpek (Saniscara Kliwon)
    if (saptawara === 'Saniscara' && pancawara === 'Kliwon') {
        const tumpekNames: Record<string, string> = {
            'Sinta': 'Tumpek Landep',
            'Wariga': 'Tumpek Uduh',
            'Kuniggan': 'Tumpek Kuningan', // Already handled by Kuningan usually
            'Langkir': 'Tumpek Krulut',
            'Medangsia': 'Tumpek Kandang',
            'Wayang': 'Tumpek Wayang'
        };

        if (tumpekNames[wuku] && wuku !== 'Kuningan') {
            holidays.push({
                date: dateStr,
                name: tumpekNames[wuku],
                type: 'tumpek',
                color: 'bg-blue-400'
            });
        }
    }

    // Saraswati (Saniscara Umanis Watugunung)
    if (wuku === 'Watugunung' && saptawara === 'Saniscara' && pancawara === 'Umanis') {
        holidays.push({
            date: dateStr,
            name: 'Saraswati',
            type: 'saraswati',
            color: 'bg-cyan-500',
            description: 'Turunnya Ilmu Pengetahuan'
        });
    }

    // Pagerwesi (Budha Kliwon Sinta)
    if (wuku === 'Sinta' && saptawara === 'Budha' && pancawara === 'Kliwon') {
        holidays.push({
            date: dateStr,
            name: 'Pagerwesi',
            type: 'pagerwesi',
            color: 'bg-red-600'
        });
    }

    return {
        gregorian: dateStr,
        saka: {
            year: sakaYear,
            sasih,
            penanggal,
            isPurnama,
            isTilem
        },
        pawukon: {
            wuku,
            saptawara,
            pancawara,
            triwara
        },
        holidays
    };
}
