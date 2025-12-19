# react-bali-calendar

A comprehensive React datepicker component for Balinese Calendar (Pawukon & Saka) with Indonesian National Holidays support.

## Features

- 🗓️ **Balinese Calendar Integration** - Pawukon (210-day cycle) and Saka calendar system
- 🎉 **Hari Raya Bali** - Galungan, Kuningan, Tumpek series, Nyepi, Saraswati, Pagerwesi
- 🇮🇩 **Indonesian National Holidays** - All libur nasional with multi-year support
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Customizable Styling** - Tailwind CSS or custom CSS
- 📦 **Tree-shakeable** - Import only what you need
- 🔧 **TypeScript Support** - Full type definitions included
- 🌐 **Multi-year Support** - Historical and future dates (2020-2030+)

## Installation

```bash
npm install react-bali-calendar
# or
yarn add react-bali-calendar
# or
pnpm add react-bali-calendar
```

## Quick Start

### Basic Usage

```jsx
import { BaliCalendar } from 'react-bali-calendar';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <BaliCalendar
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
}
```

### With Holiday Filtering

```jsx
import { BaliCalendar } from 'react-bali-calendar';

function App() {
  return (
    <BaliCalendar
      showBaliHolidays={true}
      showNationalHolidays={true}
      highlightHolidays={['galungan', 'kuningan', 'nyepi']}
      yearRange={{ start: 2020, end: 2030 }}
    />
  );
}
```

### Headless Hook (Build Your Own UI)

```jsx
import { useBaliCalendar } from 'react-bali-calendar';

function CustomCalendar() {
  const {
    currentMonth,
    daysInMonth,
    holidays,
    nextMonth,
    prevMonth,
    selectDate,
    getBaliInfo
  } = useBaliCalendar({
    initialDate: new Date(),
    yearRange: { start: 2024, end: 2026 }
  });

  const baliInfo = getBaliInfo(new Date('2025-01-01'));
  console.log(baliInfo.wuku); // "Dungulan"
  console.log(baliInfo.saka); // 1947

  // Build your custom UI
  return <div>{/* Your custom calendar UI */}</div>;
}
```

### Utility Functions Only

```jsx
import { 
  getBaliHolidays, 
  getNationalHolidays,
  getNextGalungan,
  getTumpekSchedule,
  calculateBaliDate 
} from 'react-bali-calendar/utils';

// Get all holidays for a year
const holidays2025 = getBaliHolidays(2025);
const nationalHolidays = getNationalHolidays(2025);

// Get next Galungan from a date
const nextGalungan = getNextGalungan(new Date('2025-02-01'));
// Returns: { date: '2025-07-30', daysUntil: 179, kuningan: '2025-08-09' }

// Get complete Bali calendar info for any date
const baliInfo = calculateBaliDate(new Date('2025-01-01'));
console.log(baliInfo);
// {
//   gregorian: '2025-01-01',
//   saka: { year: 1947, sasih: 'Kasa', penanggal: 15 },
//   pawukon: { wuku: 'Dungulan', saptawara: 'Budha' },
//   holidays: [{ name: 'Galungan', type: 'galungan' }]
// }
```

## API Reference

### `<BaliCalendar />` Component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedDate` | `Date \| null` | `null` | Currently selected date |
| `onDateChange` | `(date: Date) => void` | - | Callback when date is selected |
| `initialMonth` | `Date` | `new Date()` | Initial month to display |
| `yearRange` | `{ start: number, end: number }` | `{ start: 2020, end: 2030 }` | Range of years to support |
| `showBaliHolidays` | `boolean` | `true` | Show Balinese holidays |
| `showNationalHolidays` | `boolean` | `true` | Show Indonesian national holidays |
| `highlightHolidays` | `string[]` | `[]` | Holiday types to highlight |
| `locale` | `'id' \| 'en'` | `'id'` | Display language |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme |
| `className` | `string` | `''` | Additional CSS classes |
| `onMonthChange` | `(date: Date) => void` | - | Callback when month changes |

#### Example with All Props

```jsx
<BaliCalendar
  selectedDate={selectedDate}
  onDateChange={(date) => setSelectedDate(date)}
  initialMonth={new Date('2025-01-01')}
  yearRange={{ start: 2024, end: 2026 }}
  showBaliHolidays={true}
  showNationalHolidays={true}
  highlightHolidays={['galungan', 'kuningan', 'nyepi']}
  locale="id"
  theme="light"
  className="my-custom-class"
  onMonthChange={(date) => console.log('Month changed:', date)}
/>
```

### `useBaliCalendar` Hook

Headless hook for building custom calendar UIs.

```typescript
const {
  currentMonth,      // Current displayed month
  daysInMonth,       // Array of day objects with holiday info
  holidays,          // All holidays in current month
  selectedDate,      // Currently selected date
  nextMonth,         // Function to go to next month
  prevMonth,         // Function to go to previous month
  goToDate,          // Function to jump to specific date
  selectDate,        // Function to select a date
  getBaliInfo,       // Get Bali calendar info for any date
  getHolidaysInRange // Get holidays in date range
} = useBaliCalendar({
  initialDate: new Date(),
  yearRange: { start: 2024, end: 2026 }
});
```

### Utility Functions

#### `getBaliHolidays(year: number): BaliHoliday[]`

Get all Balinese holidays for a specific year.

```javascript
const holidays = getBaliHolidays(2025);
// Returns array of:
// { date: '2025-01-01', name: 'Galungan', type: 'galungan', ... }
```

#### `getNationalHolidays(year: number): NationalHoliday[]`

Get all Indonesian national holidays for a specific year.

```javascript
const holidays = getNationalHolidays(2025);
// Returns array of national holidays
```

#### `getNextGalungan(fromDate: Date): NextGalungan`

Calculate the next Galungan date from a given date.

```javascript
const next = getNextGalungan(new Date('2025-02-01'));
// { date: '2025-07-30', daysUntil: 179, kuningan: '2025-08-09' }
```

#### `getTumpekSchedule(year: number): TumpekEvent[]`

Get all Tumpek dates for a year (35-day cycle).

```javascript
const tumpeks = getTumpekSchedule(2025);
// Returns array of all Tumpek dates with names and descriptions
```

#### `calculateBaliDate(date: Date): BaliDateInfo`

Get complete Balinese calendar information for any date.

```javascript
const info = calculateBaliDate(new Date('2025-01-01'));
// {
//   gregorian: '2025-01-01',
//   saka: { year: 1947, sasih: 'Kasa', penanggal: 15 },
//   pawukon: { 
//     wuku: 'Dungulan',
//     saptawara: 'Budha',
//     pancawara: 'Pon',
//     triwara: 'Pasah'
//   },
//   holidays: [...],
//   isPurnama: false,
//   isTilem: false
// }
```

#### `getHolidaysInRange(start: Date, end: Date): Holiday[]`

Get all holidays (Bali + National) within a date range.

```javascript
const holidays = getHolidaysInRange(
  new Date('2025-01-01'),
  new Date('2025-12-31')
);
```

#### `isGoodDay(date: Date, activity: string): DewasaAyu`

Check if a date is auspicious for specific activities (Dewasa Ayu).

```javascript
const result = isGoodDay(new Date('2025-02-15'), 'pernikahan');
// {
//   isGood: true,
//   score: 95,
//   reasons: ['Budha Wage', 'Wuku Sinta'],
//   warnings: []
// }
```

## TypeScript Types

```typescript
interface BaliHoliday {
  date: string;
  name: string;
  type: 'galungan' | 'kuningan' | 'tumpek' | 'nyepi' | 'saraswati' | 'pagerwesi';
  description?: string;
  color: string;
}

interface NationalHoliday {
  date: string;
  name: string;
  type: 'national';
  isCutiBersama?: boolean;
}

interface BaliDateInfo {
  gregorian: string;
  saka: {
    year: number;
    sasih: string;
    penanggal: number;
  };
  pawukon: {
    wuku: string;
    saptawara: string;
    pancawara: string;
    triwara: string;
  };
  holidays: Holiday[];
  isPurnama: boolean;
  isTilem: boolean;
}

interface NextGalungan {
  date: string;
  daysUntil: number;
  kuningan: string;
}

interface DewasaAyu {
  isGood: boolean;
  score: number;
  reasons: string[];
  warnings: string[];
}
```

## Styling

### Default Tailwind CSS

The component uses Tailwind CSS by default. Make sure you have Tailwind configured in your project.

### Custom CSS

You can override the default styles:

```css
.bali-calendar {
  --primary-color: #f97316;
  --secondary-color: #fb923c;
  --background: #fff;
  --border: #e5e7eb;
}

.bali-calendar.dark {
  --background: #1f2937;
  --border: #374151;
}
```

### Headless Approach

Use the `useBaliCalendar` hook with your own styling system (CSS-in-JS, styled-components, etc.).

## Examples

### 1. Simple Calendar

```jsx
import { BaliCalendar } from 'react-bali-calendar';

export default function App() {
  const [date, setDate] = useState(null);
  
  return (
    <div>
      <h1>Kalendar Bali</h1>
      <BaliCalendar
        selectedDate={date}
        onDateChange={setDate}
      />
      {date && (
        <p>Tanggal dipilih: {date.toLocaleDateString('id-ID')}</p>
      )}
    </div>
  );
}
```

### 2. Holiday Viewer

```jsx
import { useBaliCalendar, getBaliHolidays } from 'react-bali-calendar';

export default function HolidayViewer() {
  const holidays = getBaliHolidays(2025);
  
  return (
    <div>
      <h2>Hari Raya Bali 2025</h2>
      <ul>
        {holidays.map((h, i) => (
          <li key={i}>
            {h.date} - {h.name} ({h.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Next Galungan Countdown

```jsx
import { useEffect, useState } from 'react';
import { getNextGalungan } from 'react-bali-calendar/utils';

export default function GalunganCountdown() {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const next = getNextGalungan(new Date());
    setCountdown(next);
  }, []);

  if (!countdown) return <div>Loading...</div>;

  return (
    <div>
      <h2>Galungan Mendatang</h2>
      <p>Tanggal: {countdown.date}</p>
      <p>{countdown.daysUntil} hari lagi</p>
      <p>Kuningan: {countdown.kuningan}</p>
    </div>
  );
}
```

### 4. Custom Styled Calendar

```jsx
import { useBaliCalendar } from 'react-bali-calendar';
import styled from 'styled-components';

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayCell = styled.div`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #f0f0f0;
  }
`;

export default function CustomCalendar() {
  const { daysInMonth, selectDate } = useBaliCalendar({
    initialDate: new Date()
  });

  return (
    <CalendarGrid>
      {daysInMonth.map((day, i) => (
        <DayCell key={i} onClick={() => selectDate(day.date)}>
          <div>{day.dayNumber}</div>
          {day.holidays.map((h, j) => (
            <div key={j} style={{ fontSize: '10px' }}>
              {h.name}
            </div>
          ))}
        </DayCell>
      ))}
    </CalendarGrid>
  );
}
```

## Data Sources

- **Balinese Calendar**: Uses `balinese-date-js-lib` for Pawukon and Saka calculations
- **National Holidays**: Compiled from official Indonesian government decrees
- **Holiday Data**: Regularly updated with official announcements

## Multi-Year Support

The library supports dates from 2020 to 2030+ by default. You can configure the range:

```jsx
<BaliCalendar yearRange={{ start: 1990, end: 2050 }} />
```

## Internationalization

Currently supports:
- 🇮🇩 Indonesian (Bahasa Indonesia)
- 🇬🇧 English

```jsx
<BaliCalendar locale="en" /> // English
<BaliCalendar locale="id" /> // Indonesian (default)
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

## License

MIT © [Your Name]

## Support

- 📧 Email: support@react-bali-calendar.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/react-bali-calendar/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/react-bali-calendar/discussions)

## Credits

- Built with `balinese-date-js-lib` by [@peradnya](https://github.com/peradnya)
- Holiday data from Indonesian government sources
- Inspired by the rich cultural heritage of Bali

## Roadmap

- [ ] Add more Tumpek types
- [ ] Odalan (temple anniversary) tracking
- [ ] Export to ICS/Google Calendar
- [ ] Mobile app support (React Native)
- [ ] Good/bad days calculator (Dewasa Ayu/Dewasa Melah)
- [ ] Wewaran display
- [ ] More themes and customization options