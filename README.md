# react-bali-calendar

A React datepicker component featuring **Balinese Calendar (Pawukon & Saka)** with Indonesian National Holidays.

![react-bali-calendar demo](https://raw.githubusercontent.com/synaiondigital/react-bali-calendar/main/assets/screenshot.png)

## Features

- 📅 **Balinese Calendar System** - Displays Pawukon (Wuku, Saptawara, Pancawara) and Saka calendar
- 🎉 **Bali Holidays** - Galungan, Kuningan, Nyepi, Saraswati, Pagerwesi, Tumpek
- 🇮🇩 **Indonesian National Holidays** - Including Cuti Bersama
- 🌗 **Moon Phases** - Purnama (full moon) and Tilem (new moon) indicators
- 🎨 **Light & Dark Themes** - Self-contained theming, no conflicts with your Tailwind config
- 🌐 **Bilingual** - Indonesian and English locale support
- ⚡ **Turbopack Compatible** - Works with Next.js 13+ App Router

## Installation

```bash
npm install react-bali-calendar
```

## Quick Start

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedDate` | `Date \| null` | - | Controlled selected date |
| `onDateChange` | `(date: Date) => void` | - | Callback when date is selected |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme |
| `locale` | `'id' \| 'en'` | `'id'` | Language (Indonesian/English) |
| `inheritTheme` | `boolean` | `false` | If `true`, inherits Tailwind dark mode from parent |
| `showBaliHolidays` | `boolean` | `true` | Show Bali holidays |
| `showNationalHolidays` | `boolean` | `true` | Show national holidays |
| `showCutiBersama` | `boolean` | `true` | Show cuti bersama |
| `className` | `string` | - | Additional CSS classes |

## Visual Indicators

| Indicator | Meaning |
|-----------|---------|
| 🔴 Red circle around date | Bali Holiday (Hari Raya) |
| 🔴 Red dot (bottom-right) | National Holiday |
| 🟡 Yellow dot (top-right) | Purnama (Full Moon) |
| ⚫ Dark dot (top-right) | Tilem (New Moon) |

**Hover** any date to see full Balinese calendar details in the tooltip.

## Headless Usage

Use the hook for custom UI:

```tsx
import { useBaliCalendar } from 'react-bali-calendar/hooks';

const { currentMonth, daysInMonth, nextMonth, prevMonth } = useBaliCalendar({
    initialDate: new Date(),
    showBaliHolidays: true,
});
```

## Utilities

Get holiday data programmatically:

```tsx
import { getBaliHolidays, getNationalHolidays } from 'react-bali-calendar/utils';

const baliHolidays2025 = getBaliHolidays(2025);
const nationalHolidays2025 = getNationalHolidays(2025);
```

## License

MIT

---

🏝️ Made with ❤️ for Bali
