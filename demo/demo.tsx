import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BaliCalendar } from '../src';

function Demo() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    🏝️ React Bali Calendar Demo
                </h1>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Test the calendar component before publishing
                </p>

                {/* Theme Toggle */}
                <div className="mb-6 flex gap-2">
                    <button
                        onClick={() => setTheme('light')}
                        className={`px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        ☀️ Light
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-200'}`}
                    >
                        🌙 Dark
                    </button>
                </div>

                {/* Calendar */}
                <div className="flex gap-8">
                    <BaliCalendar
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        theme={theme}
                        locale="id"
                    />

                    {/* Selected Date Info */}
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg h-fit`}>
                        <h3 className="font-bold mb-2">Selected Date</h3>
                        {selectedDate ? (
                            <p>{selectedDate.toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</p>
                        ) : (
                            <p className="text-gray-500">Click a date</p>
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div className={`mt-8 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
                    <h3 className="font-bold mb-3">Legend</h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full border-2 border-red-500 inline-flex items-center justify-center text-xs">19</span>
                            <span>Bali Holiday (Hari Raya)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span>National Holiday</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                            <span>Purnama (Full Moon)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-800"></span>
                            <span>Tilem (New Moon)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Demo />);
