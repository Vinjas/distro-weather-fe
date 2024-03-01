import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import { DateRangePicker as ReactDateRange, defaultStaticRanges, defaultInputRanges } from 'react-date-range';
import { useSolarSearch } from '@contexts/solar-search-context';
import { dateConvertToISO } from '@utils/date';
import './date-range-picker.scss';

export function DateRangePicker() {
  const { setCurrentStartDate, setCurrentEndDate } = useSolarSearch();

  const customRanges = defaultStaticRanges.filter((range) => range.label !== 'This Month' && range.label !== 'This Week');
  const customInputRanges = defaultInputRanges.filter((range) => range.label !== 'days starting today');

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
    setCurrentStartDate(dateConvertToISO(ranges.selection.startDate));
    setCurrentEndDate(dateConvertToISO(ranges.selection.endDate));
  }

  return (
    <div className='date-range-picker'>
    <ReactDateRange
        maxDate={new Date()}
        minDate={new Date('2023-10-01')}
        fixedHeight
        staticRanges={customRanges}
        inputRanges={customInputRanges}
        ranges={selectedRange}
        onChange={handleSelect}
    />
    </div>
  )
}