import React, { useState } from "react";
import { Modal } from "bootstrap";
import Calendar from "react-calendar";
import "./scss/CalendarComponent.css";
import "react-calendar/dist/Calendar.css";
import NewBloodyComponent from "./NewBloodyComponent";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date()); // 記錄選擇的日期
  const handleDayClick = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
    // 獲取 modal元素
    var myModal = new Modal(document.getElementById("newBloodyBackdrop"), {
      keyboard: false,
    });
    // 開啟modal
    myModal.show();
  };

  return (
    <div className="container my-3">
      <div className="justify-content-center">
        <div className="col col-lg-10 d-flex my-3">
          <h3>行事曆</h3>
        </div>
        <div className="calendar">
          <Calendar value={date} onClickDay={handleDayClick} />
          <NewBloodyComponent id="newBloodyBackdrop" date={date} />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
