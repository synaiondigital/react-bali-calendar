import { NationalHoliday } from '../types';

/**
 * Hardcoded official holidays for 2024-2026 based on SKB 3 Menteri.
 * This ensures 100% accuracy for the current/near years.
 */
const OFFICIAL_HOLIDAYS_DATA: Record<number, NationalHoliday[]> = {
    2024: [
        { date: '2024-01-01', name: 'Tahun Baru 2024 Masehi', type: 'national' },
        { date: '2024-02-08', name: 'Isra Mikraj Nabi Muhammad SAW', type: 'national' },
        { date: '2024-02-09', name: 'Cuti Bersama Tahun Baru Imlek', type: 'cuti-bersama' },
        { date: '2024-02-10', name: 'Tahun Baru Imlek 2575 Kongzili', type: 'national' },
        { date: '2024-03-11', name: 'Hari Suci Nyepi Tahun Baru Saka 1946', type: 'national' },
        { date: '2024-03-12', name: 'Cuti Bersama Hari Suci Nyepi', type: 'cuti-bersama' },
        { date: '2024-03-29', name: 'Wafat Yesus Kristus', type: 'national' },
        { date: '2024-03-31', name: 'Hari Paskah', type: 'national' },
        { date: '2024-04-08', name: 'Cuti Bersama Idul Fitri 1445 H', type: 'cuti-bersama' },
        { date: '2024-04-09', name: 'Cuti Bersama Idul Fitri 1445 H', type: 'cuti-bersama' },
        { date: '2024-04-10', name: 'Hari Raya Idul Fitri 1445 H', type: 'national' },
        { date: '2024-04-11', name: 'Hari Raya Idul Fitri 1445 H', type: 'national' },
        { date: '2024-04-12', name: 'Cuti Bersama Idul Fitri 1445 H', type: 'cuti-bersama' },
        { date: '2024-04-15', name: 'Cuti Bersama Idul Fitri 1445 H', type: 'cuti-bersama' },
        { date: '2024-05-01', name: 'Hari Buruh Internasional', type: 'national' },
        { date: '2024-05-09', name: 'Kenaikan Yesus Kristus', type: 'national' },
        { date: '2024-05-10', name: 'Cuti Bersama Kenaikan Yesus Kristus', type: 'cuti-bersama' },
        { date: '2024-05-23', name: 'Hari Raya Waisak 2568 BE', type: 'national' },
        { date: '2024-05-24', name: 'Cuti Bersama Hari Raya Waisak', type: 'cuti-bersama' },
        { date: '2024-06-01', name: 'Hari Lahir Pancasila', type: 'national' },
        { date: '2024-06-17', name: 'Hari Raya Idul Adha 1445 H', type: 'national' },
        { date: '2024-06-18', name: 'Cuti Bersama Idul Adha 1445 H', type: 'cuti-bersama' },
        { date: '2024-07-07', name: 'Tahun Baru Islam 1446 H', type: 'national' },
        { date: '2024-08-17', name: 'Hari Kemerdekaan RI', type: 'national' },
        { date: '2024-09-16', name: 'Maulid Nabi Muhammad SAW', type: 'national' },
        { date: '2024-12-25', name: 'Hari Raya Natal', type: 'national' },
        { date: '2024-12-26', name: 'Cuti Bersama Hari Raya Natal', type: 'cuti-bersama' },
    ],
    2025: [
        { date: '2025-01-01', name: 'Tahun Baru 2025 Masehi', type: 'national' },
        { date: '2025-01-27', name: 'Isra Mikraj Nabi Muhammad SAW', type: 'national' },
        { date: '2025-01-28', name: 'Cuti Bersama Tahun Baru Imlek', type: 'cuti-bersama' },
        { date: '2025-01-29', name: 'Tahun Baru Imlek 2576 Kongzili', type: 'national' },
        { date: '2025-03-28', name: 'Cuti Bersama Hari Suci Nyepi', type: 'cuti-bersama' },
        { date: '2025-03-29', name: 'Hari Suci Nyepi Tahun Baru Saka 1947', type: 'national' },
        { date: '2025-03-31', name: 'Hari Raya Idul Fitri 1446 H', type: 'national' },
        { date: '2025-04-01', name: 'Hari Raya Idul Fitri 1446 H', type: 'national' },
        { date: '2025-04-02', name: 'Cuti Bersama Idul Fitri 1446 H', type: 'cuti-bersama' },
        { date: '2025-04-03', name: 'Cuti Bersama Idul Fitri 1446 H', type: 'cuti-bersama' },
        { date: '2025-04-04', name: 'Cuti Bersama Idul Fitri 1446 H', type: 'cuti-bersama' },
        { date: '2025-04-07', name: 'Cuti Bersama Idul Fitri 1446 H', type: 'cuti-bersama' },
        { date: '2025-04-18', name: 'Wafat Yesus Kristus', type: 'national' },
        { date: '2025-04-20', name: 'Hari Paskah', type: 'national' },
        { date: '2025-05-01', name: 'Hari Buruh Internasional', type: 'national' },
        { date: '2025-05-12', name: 'Hari Raya Waisak 2569 BE', type: 'national' },
        { date: '2025-05-13', name: 'Cuti Bersama Hari Raya Waisak', type: 'cuti-bersama' },
        { date: '2025-05-29', name: 'Kenaikan Yesus Kristus', type: 'national' },
        { date: '2025-05-30', name: 'Cuti Bersama Kenaikan Yesus Kristus', type: 'cuti-bersama' },
        { date: '2025-06-01', name: 'Hari Lahir Pancasila', type: 'national' },
        { date: '2025-06-06', name: 'Hari Raya Idul Adha 1446 H', type: 'national' },
        { date: '2025-06-09', name: 'Cuti Bersama Idul Adha 1446 H', type: 'cuti-bersama' },
        { date: '2025-06-27', name: 'Tahun Baru Islam 1447 H', type: 'national' },
        { date: '2025-08-17', name: 'Hari Kemerdekaan RI', type: 'national' },
        { date: '2025-09-05', name: 'Maulid Nabi Muhammad SAW', type: 'national' },
        { date: '2025-12-25', name: 'Hari Raya Natal', type: 'national' },
        { date: '2025-12-26', name: 'Cuti Bersama Hari Raya Natal', type: 'cuti-bersama' },
    ],
    // 2026 dates are projected based on SKB trends and lunar cycles
    2026: [
        { date: '2026-01-01', name: 'Tahun Baru 2026 Masehi', type: 'national' },
        { date: '2026-01-16', name: 'Isra Mikraj Nabi Muhammad SAW', type: 'national', isProjected: true },
        { date: '2026-02-17', name: 'Tahun Baru Imlek 2577 Kongzili', type: 'national', isProjected: true },
        { date: '2026-03-18', name: 'Hari Suci Nyepi Tahun Baru Saka 1948', type: 'national', isProjected: true },
        { date: '2026-03-20', name: 'Hari Raya Idul Fitri 1447 H', type: 'national', isProjected: true },
        { date: '2026-03-21', name: 'Hari Raya Idul Fitri 1447 H', type: 'national', isProjected: true },
        { date: '2026-04-03', name: 'Wafat Yesus Kristus', type: 'national' },
        { date: '2026-05-01', name: 'Hari Buruh Internasional', type: 'national' },
        { date: '2026-05-14', name: 'Kenaikan Yesus Kristus', type: 'national' },
        { date: '2026-05-31', name: 'Hari Raya Waisak 2570 BE', type: 'national', isProjected: true },
        { date: '2026-05-27', name: 'Hari Raya Idul Adha 1447 H', type: 'national', isProjected: true },
        { date: '2026-06-01', name: 'Hari Lahir Pancasila', type: 'national' },
        { date: '2026-06-16', name: 'Tahun Baru Islam 1448 H', type: 'national', isProjected: true },
        { date: '2026-08-17', name: 'Hari Kemerdekaan RI', type: 'national' },
        { date: '2026-08-25', name: 'Maulid Nabi Muhammad SAW', type: 'national', isProjected: true },
        { date: '2026-12-25', name: 'Hari Raya Natal', type: 'national' },
    ]
};

/**
 * Generates fixed-date holidays for a given year.
 */
function getFixedHolidays(year: number): NationalHoliday[] {
    return [
        { date: `${year}-01-01`, name: 'Tahun Baru Masehi', type: 'national' },
        { date: `${year}-05-01`, name: 'Hari Buruh Internasional', type: 'national' },
        { date: `${year}-06-01`, name: 'Hari Lahir Pancasila', type: 'national' },
        { date: `${year}-08-17`, name: 'Hari Kemerdekaan RI', type: 'national' },
        { date: `${year}-12-25`, name: 'Hari Raya Natal', type: 'national' },
    ];
}

/**
 * Main provider for national holidays. 
 * Uses official data where available, otherwise falls back to a generator.
 */
export function getNationalHolidays(year: number): NationalHoliday[] {
    if (OFFICIAL_HOLIDAYS_DATA[year]) {
        return OFFICIAL_HOLIDAYS_DATA[year];
    }

    // For years outside the hardcoded data, return fixed holidays marked as projected
    return getFixedHolidays(year).map(h => ({ ...h, isProjected: true }));
}
