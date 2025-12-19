import { describe, it, expect } from 'vitest';
import { getNationalHolidays } from '../utils/nationalHolidays';

describe('National Holidays Provider', () => {
    it('should return official holidays for 2025', () => {
        const holidays = getNationalHolidays(2025);
        expect(holidays.length).toBeGreaterThan(15);

        const nyepi = holidays.find(h => h.name.includes('Nyepi') && h.type === 'national');
        expect(nyepi?.date).toBe('2025-03-29');
        expect(nyepi?.type).toBe('national');
    });

    it('should include Cuti Bersama for 2025', () => {
        const holidays = getNationalHolidays(2025);
        const cutiIdulFitri = holidays.find(h => h.name.includes('Cuti Bersama Idul Fitri'));
        expect(cutiIdulFitri).toBeDefined();
        expect(cutiIdulFitri?.type).toBe('cuti-bersama');
    });

    it('should fall back to fixed holidays for future years (2030)', () => {
        const holidays = getNationalHolidays(2030);
        const independenceDay = holidays.find(h => h.name === 'Hari Kemerdekaan RI');
        expect(independenceDay?.date).toBe('2030-08-17');
        expect(independenceDay?.isProjected).toBe(true);
    });
});
