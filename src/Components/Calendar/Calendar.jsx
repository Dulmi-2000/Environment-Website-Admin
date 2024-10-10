import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { styled } from '@mui/material/styles';

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  '& .MuiDayPicker-day': {
    position: 'relative',
  },
  '& .today': {
    backgroundColor: '#d4f4dd !important', // Light green background for today's date
    color: '#388e3c !important',            // Dark green color for text
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function DateCalendarReferenceDate() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar']}>
          <StyledDateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            dayComponent={(props) => {
              const isToday = props.day.isSame(dayjs(), 'day');
              return (
                <div
                  {...props}
                  className={isToday ? 'today' : undefined}
                >
                  {props.day.date()}
                </div>
              );
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
