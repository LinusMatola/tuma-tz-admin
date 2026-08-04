"use client";

import { useState } from "react";
import { FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
  placeholder?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBetween(date: Date, start: Date, end: Date) {
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

interface CalendarPanelProps {
  label: string;
  year: number;
  month: number;
  onYearChange: (y: number) => void;
  onMonthChange: (m: number) => void;
  onPrev: () => void;
  onNext: () => void;
  showPrev: boolean;
  showNext: boolean;
  selectingStart: boolean;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
  maxDate: Date;
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({
  year,
  month,
  onYearChange,
  onMonthChange,
  onPrev,
  onNext,
  showPrev,
  showNext,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayHover,
  maxDate,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const rangeEnd = endDate ?? hoverDate;

  return (
    <div className="flex flex-col min-w-[260px]">
      {/* Month / Year header */}
      <div className="flex items-center justify-between mb-3 gap-1">
        <button
          onClick={onPrev}
          className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${!showPrev ? "invisible" : ""}`}
        >
          <FaChevronLeft className="w-3 h-3 text-gray-500" />
        </button>

        <div className="flex items-center gap-2 flex-1 justify-center">
          <select
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="text-sm font-semibold text-gray-800 border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="text-sm font-semibold text-gray-800 border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onNext}
          className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${!showNext ? "invisible" : ""}`}
        >
          <FaChevronRight className="w-3 h-3 text-gray-500" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-gray-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const date = new Date(year, month, day);
          const isDisabled = date > maxDate;
          const isStart = startDate ? isSameDay(date, startDate) : false;
          const isEnd = endDate ? isSameDay(date, endDate) : false;
          const isInRange =
            startDate && rangeEnd && !isEnd && !isStart
              ? isBetween(date, startDate, rangeEnd)
              : false;
          const isHoverEnd =
            hoverDate && !endDate && startDate
              ? isSameDay(date, hoverDate)
              : false;

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => !isDisabled && onDayClick(date)}
              onMouseEnter={() => !isDisabled && onDayHover(date)}
              className={[
                "relative text-sm py-1.5 text-center transition-colors select-none",
                isDisabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "cursor-pointer",
                isStart || isEnd
                  ? "bg-blue-600 text-white font-semibold rounded-full z-10"
                  : isInRange
                    ? "bg-blue-100 text-blue-800"
                    : isHoverEnd
                      ? "bg-blue-200 text-blue-800 rounded-full"
                      : !isDisabled
                        ? "hover:bg-gray-100 rounded-full text-gray-700"
                        : "",
                isStart &&
                rangeEnd &&
                startDate &&
                !isSameDay(startDate, rangeEnd)
                  ? "rounded-r-none"
                  : "",
                isEnd && startDate ? "rounded-l-none" : "",
                isInRange && idx % 7 === 0 ? "rounded-l-full" : "",
                isInRange && idx % 7 === 6 ? "rounded-r-full" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function DateRangeFilter({
  value,
  onChange,
  placeholder = "Date range",
}: Props) {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);

  const [leftYear, setLeftYear] = useState(today.getFullYear());
  const [leftMonth, setLeftMonth] = useState(
    today.getMonth() === 0 ? 11 : today.getMonth() - 1,
  );
  const [rightYear, setRightYear] = useState(today.getFullYear());
  const [rightMonth, setRightMonth] = useState(today.getMonth());

  const [startDate, setStartDate] = useState<Date | null>(value.from);
  const [endDate, setEndDate] = useState<Date | null>(value.to);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStart, setSelectingStart] = useState(true);

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const syncRight = (year: number, month: number) => {
    if (month === 11) {
      setRightYear(year + 1);
      setRightMonth(0);
    } else {
      setRightYear(year);
      setRightMonth(month + 1);
    }
  };

  const handleLeftMonthChange = (m: number) => {
    setLeftMonth(m);
    syncRight(leftYear, m);
  };

  const handleLeftYearChange = (y: number) => {
    setLeftYear(y);
    syncRight(y, leftMonth);
  };

  const handleRightMonthChange = (m: number) => {
    setRightMonth(m);
    if (m === 0) {
      setLeftYear(rightYear - 1);
      setLeftMonth(11);
    } else {
      setLeftYear(rightYear);
      setLeftMonth(m - 1);
    }
  };

  const handleRightYearChange = (y: number) => {
    setRightYear(y);
    setLeftYear(leftMonth === 0 ? y - 1 : y);
  };

  const handlePrevMonth = () => {
    if (leftMonth === 0) {
      const newLeftYear = leftYear - 1;
      setLeftYear(newLeftYear);
      setLeftMonth(11);
      syncRight(newLeftYear, 11);
    } else {
      const nm = leftMonth - 1;
      setLeftMonth(nm);
      syncRight(leftYear, nm);
    }
  };

  const handleNextMonth = () => {
    if (rightMonth === 11) {
      setRightYear((y) => y + 1);
      setRightMonth(0);
      setLeftYear(rightYear);
      setLeftMonth(11);
    } else {
      const nm = rightMonth + 1;
      setRightMonth(nm);
      setLeftMonth(rightMonth);
      setLeftYear(rightYear);
    }
  };

  const handleDayClick = (date: Date) => {
    if (selectingStart) {
      setStartDate(date);
      setEndDate(null);
      setSelectingStart(false);
    } else {
      if (startDate && date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setSelectingStart(true);
      setHoverDate(null);
    }
  };

  const handleApply = () => {
    if (!startDate || !endDate) return;
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const start = new Date(startDate);
    start.setHours(sh, sm, 0, 0);
    const end = new Date(endDate);
    end.setHours(eh, em, 59, 999);
    onChange({ from: start, to: end });
    setIsOpen(false);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
    setSelectingStart(true);
    setStartTime("00:00");
    setEndTime("23:59");
    onChange({ from: null, to: null });
    setIsOpen(false);
  };

  const formatLabel = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const displayValue =
    value.from && value.to
      ? `${formatLabel(value.from)} → ${formatLabel(value.to)}`
      : value.from
        ? `From ${formatLabel(value.from)}`
        : "";

  const canApply = startDate && endDate;

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition whitespace-nowrap ${
          value.from
            ? "border-blue-300 bg-blue-50 text-blue-700"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {displayValue || placeholder}
        {value.from && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="ml-1 text-blue-400 hover:text-blue-700 font-bold text-base leading-none"
          >
            ×
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-max max-w-[95vw]">
          {/* Selection hint */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <div
              className={`flex-1 text-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectingStart
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {startDate ? formatLabel(startDate) : "Select start date"}
            </div>
            <span className="text-gray-400 text-sm">→</span>
            <div
              className={`flex-1 text-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                !selectingStart
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {endDate ? formatLabel(endDate) : "Select end date"}
            </div>
          </div>

          {/* Two calendar panels */}
          <div className="flex flex-col md:flex-row gap-6">
            <CalendarPanel
              label="Start"
              year={leftYear}
              month={leftMonth}
              onYearChange={handleLeftYearChange}
              onMonthChange={handleLeftMonthChange}
              onPrev={handlePrevMonth}
              onNext={() => {}}
              showPrev={true}
              showNext={false}
              selectingStart={selectingStart}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              maxDate={today}
            />

            <div className="hidden md:block w-px bg-gray-100 self-stretch" />

            <CalendarPanel
              label="End"
              year={rightYear}
              month={rightMonth}
              onYearChange={handleRightYearChange}
              onMonthChange={handleRightMonthChange}
              onPrev={() => {}}
              onNext={handleNextMonth}
              showPrev={false}
              showNext={true}
              selectingStart={selectingStart}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              maxDate={today}
            />
          </div>

          {/* Time pickers */}
          <div className="flex flex-col md:flex-row gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-400 w-3 h-3" />
              <span className="text-xs text-gray-500 whitespace-nowrap">
                Start time:
              </span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-400 w-3 h-3" />
              <span className="text-xs text-gray-500 whitespace-nowrap">
                End time:
              </span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!canApply}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
