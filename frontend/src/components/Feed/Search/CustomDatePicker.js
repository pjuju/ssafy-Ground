import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useState, forwardRef } from "react";
import "moment/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      ref={ref}
    >
      {value}
    </button>
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale={ko}
      dateFormat="yyyy-MM-dd"
      customInput={<ExampleCustomInput />}
    />
  );
}

export default CustomDatePicker;
