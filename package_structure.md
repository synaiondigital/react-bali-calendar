// ============================================
// rollup.config.js
// ============================================
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default [
  // Main bundle
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
      }),
      postcss({
        extensions: ['.css'],
        minimize: true,
      }),
    ],
    external: ['react', 'react-dom', 'balinese-date-js-lib'],
  },
  // Utils bundle
  {
    input: 'src/utils/index.ts',
    output: [
      {
        file: 'dist/utils.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/utils.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
      }),
    ],
    external: ['balinese-date-js-lib'],
  },
  // Hooks bundle
  {
    input: 'src/hooks/index.ts',
    output: [
      {
        file: 'dist/hooks.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/hooks.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
      }),
    ],
    external: ['react', 'balinese-date-js-lib'],
  },
];

// ============================================
// tsconfig.json
// ============================================
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "lib": ["ES2019", "DOM"],
    "jsx": "react",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}

// ============================================
// .npmignore
// ============================================
src/
node_modules/
.git/
.gitignore
tsconfig.json
rollup.config.js
*.test.ts
*.test.tsx
.eslintrc.js
.prettierrc
examples/

// ============================================
// PROJECT STRUCTURE
// ============================================
/*
react-bali-calendar/
├── src/
│   ├── components/
│   │   ├── BaliCalendar.tsx          # Main calendar component
│   │   ├── CalendarGrid.tsx          # Calendar grid layout
│   │   ├── DateCell.tsx              # Individual date cell
│   │   └── HolidayBadge.tsx          # Holiday indicator
│   ├── hooks/
│   │   ├── useBaliCalendar.ts        # Main hook for calendar logic
│   │   └── index.ts
│   ├── utils/
│   │   ├── baliHolidays.ts           # Bali holiday calculations
│   │   ├── nationalHolidays.ts       # Indonesian national holidays
│   │   ├── baliDate.ts               # Balinese date conversions
│   │   ├── helpers.ts                # Helper functions
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   └── index.ts                      # Main entry point
├── dist/                             # Build output
├── examples/                         # Usage examples
│   ├── basic/
│   ├── custom-styling/
│   └── headless/
├── package.json
├── tsconfig.json
├── rollup.config.js
├── README.md
└── LICENSE
*/

// ============================================
// src/utils/index.ts (Barrel export)
// ============================================
export * from './baliHolidays';
export * from './nationalHolidays';
export * from './helpers';

// ============================================
// src/hooks/index.ts (Barrel export)
// ============================================
export * from './useBaliCalendar';

// ============================================
// Example: examples/basic/App.tsx
// ============================================
import React, { useState } from 'react';
import { BaliCalendar } from 'react-bali-calendar';

function BasicExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Kalendar Bali</h1>
      
      <BaliCalendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        showBaliHolidays={true}
        showNationalHolidays={true}
        locale="id"
      />

      {selectedDate && (
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Tanggal Dipilih:</h3>
          <p>{selectedDate.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      )}
    </div>
  );
}

export default BasicExample;

// ============================================
// Example: examples/headless/App.tsx
// ============================================
import React from 'react';
import { useBaliCalendar } from 'react-bali-calendar/hooks';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayCell = styled.div<{ isToday?: boolean; isSelected?: boolean }>`
  padding: 12px;
  border: 2px solid ${props => props.isSelected ? '#3b82f6' : '#e5e7eb'};
  border-radius: 8px;
  background: ${props => props.isToday ? '#dbeafe' : 'white'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

function HeadlessExample() {
  const {
    currentMonth,
    daysInMonth,
    nextMonth,
    prevMonth,
    selectDate
  } = useBaliCalendar({
    initialDate: new Date(),
    showBaliHolidays: true,
    showNationalHolidays: true
  });

  return (
    <CalendarContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={prevMonth}>← Previous</button>
        <h2>{currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>Next →</button>
      </div>

      <Grid>
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold' }}>{day}</div>
        ))}
        
        {daysInMonth.map((day, idx) => (
          <DayCell
            key={idx}
            isToday={day.isToday}
            isSelected={day.isSelected}
            onClick={() => day.isCurrentMonth && selectDate(day.date)}
            style={{ opacity: day.isCurrentMonth ? 1 : 0.4 }}
          >
            <div style={{ fontWeight: 'bold' }}>{day.dayNumber}</div>
            {day.holidays.map((h, i) => (
              <div key={i} style={{ fontSize: '10px', marginTop: '4px' }}>
                {h.name}
              </div>
            ))}
          </DayCell>
        ))}
      </Grid>
    </CalendarContainer>
  );
}

export default HeadlessExample;

// ============================================
// Example: examples/utils-only/App.tsx
// ============================================
import React, { useEffect, useState } from 'react';
import { 
  getBaliHolidays, 
  getNationalHolidays,
  getNextGalungan 
} from 'react-bali-calendar/utils';

function UtilsExample() {
  const [holidays, setHolidays] = useState([]);
  const [nextGalungan, setNextGalungan] = useState(null);

  useEffect(() => {
    // Get all holidays for 2025
    const baliHolidays = getBaliHolidays(2025);
    const nationalHolidays = getNationalHolidays(2025);
    setHolidays([...baliHolidays, ...nationalHolidays]);

    // Get next Galungan
    const next = getNextGalungan(new Date());
    setNextGalungan(next);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hari Raya 2025</h1>
      
      {nextGalungan && (
        <div className="mb-6 p-4 bg-yellow-50 rounded">
          <h2 className="font-semibold">Galungan Mendatang</h2>
          <p>Tanggal: {nextGalungan.date}</p>
          <p>{nextGalungan.daysUntil} hari lagi</p>
          <p>Kuningan: {nextGalungan.kuningan}</p>
        </div>
      )}

      <div className="space-y-2">
        {holidays.map((h, i) => (
          <div key={i} className="p-3 border rounded flex justify-between">
            <span className="font-medium">{h.name}</span>
            <span className="text-gray-600">{h.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UtilsExample;

// ============================================
// INSTALLATION & PUBLISHING COMMANDS
// ============================================

/*
# 1. Initialize the project
npm init -y

# 2. Install dependencies
npm install balinese-date-js-lib date-fns

# 3. Install dev dependencies
npm install -D @rollup/plugin-commonjs @rollup/plugin-node-resolve \
  @rollup/plugin-typescript @types/react @types/react-dom rollup \
  rollup-plugin-peer-deps-external rollup-plugin-postcss typescript

# 4. Build the package
npm run build

# 5. Test locally with npm link
npm link

# In your test project:
npm link react-bali-calendar

# 6. Publish to NPM
npm login
npm publish

# 7. Install in projects
npm install react-bali-calendar
*/

// ============================================
// USAGE IN PROJECTS
// ============================================

/*
// Method 1: Full component
import { BaliCalendar } from 'react-bali-calendar';

<BaliCalendar 
  selectedDate={date}
  onDateChange={setDate}
/>

// Method 2: Headless hook
import { useBaliCalendar } from 'react-bali-calendar/hooks';

const { daysInMonth, holidays } = useBaliCalendar();

// Method 3: Utils only
import { getBaliHolidays, getNextGalungan } from 'react-bali-calendar/utils';

const holidays = getBaliHolidays(2025);
const next = getNextGalungan(new Date());
*/