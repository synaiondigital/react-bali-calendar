# react-bali-calendar

Komponen React datepicker dengan **Kalender Bali (Pawukon & Saka)** dan Hari Libur Nasional Indonesia.

![react-bali-calendar demo](https://raw.githubusercontent.com/synaiondigital/react-bali-calendar/main/assets/screenshot.png)

## Fitur

- 📅 **Sistem Kalender Bali** - Menampilkan Pawukon (Wuku, Saptawara, Pancawara) dan kalender Saka
- 🎉 **Hari Raya Bali** - Galungan, Kuningan, Nyepi, Saraswati, Pagerwesi, Tumpek
- 🇮🇩 **Hari Libur Nasional** - Termasuk Cuti Bersama
- 🌗 **Fase Bulan** - Indikator Purnama dan Tilem
- 🎨 **Tema Terang & Gelap** - Tema mandiri, tidak konflik dengan konfigurasi Tailwind Anda
- 🌐 **Dwibahasa** - Mendukung Bahasa Indonesia dan Inggris
- ⚡ **Kompatibel Turbopack** - Bekerja dengan Next.js 13+ App Router

## Instalasi

```bash
npm install react-bali-calendar
```

## Penggunaan Cepat

```tsx
"use client";

import { useState } from 'react';
import { BaliCalendar } from 'react-bali-calendar';

function MyComponent() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <BaliCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            theme="light"
            locale="id"
        />
    );
}
```

## Props

| Prop | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| `selectedDate` | `Date \| null` | - | Tanggal yang dipilih (controlled) |
| `onDateChange` | `(date: Date) => void` | - | Callback saat tanggal dipilih |
| `theme` | `'light' \| 'dark'` | `'light'` | Tema warna |
| `locale` | `'id' \| 'en'` | `'id'` | Bahasa (Indonesia/Inggris) |
| `inheritTheme` | `boolean` | `false` | Jika `true`, mengikuti dark mode Tailwind dari parent |
| `showBaliHolidays` | `boolean` | `true` | Tampilkan hari raya Bali |
| `showNationalHolidays` | `boolean` | `true` | Tampilkan hari libur nasional |
| `showCutiBersama` | `boolean` | `true` | Tampilkan cuti bersama |
| `className` | `string` | - | Class CSS tambahan |

## Indikator Visual

| Indikator | Arti |
|-----------|------|
| 🔴 Lingkaran merah pada tanggal | Hari Raya Bali |
| 🔴 Titik merah (kanan bawah) | Hari Libur Nasional |
| 🟡 Titik kuning (kanan atas) | Purnama |
| ⚫ Titik gelap (kanan atas) | Tilem |

**Arahkan kursor** ke tanggal mana saja untuk melihat detail kalender Bali lengkap di tooltip.

## Penggunaan Headless

Gunakan hook untuk UI kustom:

```tsx
import { useBaliCalendar } from 'react-bali-calendar/hooks';

const { currentMonth, daysInMonth, nextMonth, prevMonth } = useBaliCalendar({
    initialDate: new Date(),
    showBaliHolidays: true,
});
```

## Utilitas

Dapatkan data hari libur secara programatik:

```tsx
import { getBaliHolidays, getNationalHolidays } from 'react-bali-calendar/utils';

const hariRayaBali2025 = getBaliHolidays(2025);
const hariLiburNasional2025 = getNationalHolidays(2025);
```

## Lisensi

MIT

---

🏝️ Dibuat dengan ❤️ untuk Bali
