import React from "react";

interface DateInputProps {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onClick }) => {
  return (
    <button className="date-picker-button" onClick={onClick}>
      {value || "날짜 선택"}
    </button>
  );
};

export default DateInput;
