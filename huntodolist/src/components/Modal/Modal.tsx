import React, { useState } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import DateInput from "./DateInput";
import "react-datepicker/dist/react-datepicker.css";
import "./Modal.scss";

interface ModalProps {
  onClose: () => void;
  onSave: (task: string, date: Date) => void;
  selectedDate: Date | null;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave, open }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (selectedDate && inputValue.trim()) {
      onSave(inputValue.trim(), selectedDate);
      setInputValue("");
      setSelectedDate(null);
    }
  };

  return ReactDOM.createPortal(
    open ? (
      <div className="modal-overlay">
        <div className="modal">
          <h2>스케줄 추가</h2>
          <DatePicker
            customInput={
              <DateInput
                value={
                  selectedDate ? selectedDate.toLocaleDateString("ko-KR") : ""
                }
                onClick={() => {}}
              />
            }
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
          />
          <input value={inputValue} onChange={handleInputChange} />
          <div className="modal-buttons">
            <button onClick={onClose}>취소</button>
            <button onClick={handleSave}>저장</button>
          </div>
        </div>
      </div>
    ) : null,
    document.body
  );
};

export default Modal;
