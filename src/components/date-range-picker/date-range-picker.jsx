import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import { DateRangePicker as ReactDateRange } from 'react-date-range';
import './date-range-picker.scss';

export function DateRangePicker() {
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      color: '#15325B',
      key: 'selection',
    },
  ]);

  function handleSelect(ranges) {
    setSelectedRange([ranges.selection]);
    console.log('ranges :>> ', ranges);
  }

  return (
    <div className='date-range-picker'>
    <ReactDateRange
        maxDate={new Date()}
        ranges={selectedRange}
        onChange={handleSelect}
    />
    </div>
  )
}