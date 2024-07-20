import React, { MouseEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import type { Value } from "react-calendar/dist/cjs/shared/types";

interface CalendarComponentProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  return (
    <div className="mb-4">
      <Calendar
        value={currentDate}
        onChange={(value: Value, event: MouseEvent<HTMLButtonElement>) => {
          if (value) {
            setCurrentDate(value as Date);
          }
        }}
      />
    </div>
  );
};

export default CalendarComponent;
