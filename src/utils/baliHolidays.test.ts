import { describe, it, expect } from 'vitest';
import { calculateBaliDate } from '../utils/baliHolidays';

describe('Balinese Holiday Logic', () => {
    it('should correctly identify Galungan on 2025-04-23', () => {
        const date = new Date(2025, 3, 23); // April is index 3
        const info = calculateBaliDate(date);

        expect(info.pawukon.wuku).toBe('Dungulan');
        expect(info.pawukon.saptawara).toBe('Buda');
        expect(info.pawukon.pancawara).toBe('Kliwon');

        const galungan = info.holidays.find(h => h.name === 'Galungan');
        expect(galungan).toBeDefined();
    });

    it('should correctly identify Kuningan on 2025-05-03', () => {
        const date = new Date(2025, 4, 3); // May is index 4
        const info = calculateBaliDate(date);

        expect(info.pawukon.wuku).toBe('Kuningan');
        const kuningan = info.holidays.find(h => h.name === 'Kuningan');
        expect(kuningan).toBeDefined();
    });

    it('should identify Saraswati on 2024-07-13', () => {
        const date = new Date(2024, 6, 13);
        const info = calculateBaliDate(date);

        expect(info.pawukon.wuku).toBe('Watugunung');
        const saraswati = info.holidays.find(h => h.name === 'Saraswati');
        expect(saraswati).toBeDefined();
    });
});
