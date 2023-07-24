import { Modal } from "antd";
import moment from "moment/moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "../style/Calendar.css";

const Schedule = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  const [day, setDay] = useState(new Date());
  const 서버제목 = [
    {
      day: "2023-06-20",
      title: "밥먹자",
      price: 5000,
      imgPath:
        "http://image.kmib.co.kr/online_image/2020/1008/611811110015088768_1.jpg",
    },
    {
      day: "2023-06-16",
      title: "짜장면",
      price: 10000,
      imgPath:
        "http://image.kmib.co.kr/online_image/2020/1008/611811110015088768_1.jpg",
    },
    {
      day: "2023-06-05",
      title: "햄버거",
      price: 7500,
      imgPath:
        "http://image.kmib.co.kr/online_image/2020/1008/611811110015088768_1.jpg",
    },
  ];
  const handleClickDay = (day, event) => {
    // alert(moment(day).format("YY-MM-DD"))
    // console.log(event.target);
    const div = event.currentTarget.querySelector("div");
    if (div !== null) {
      // console.log(div.dataset.gogo);
      const 제목 = div.dataset.gogoTitle;
      const 날짜 = div.dataset.gogoDay;
      const 이미지 = div.dataset.gogoImgpath;
    }
    // showModal();
  };

  // 캘린더 내용 출력하기 기능
  const showScheduleJSX = ({ date, view }) => {
    // date는 Calendar 에서 출력해준다.
    // date를 우리가 가지고 있는 서버 제목와 비교하기 위해서
    // 포맷을 YYYY-MM-DD로 바꿔준다.
    let 날짜 = moment(date).format("YYYY-MM-DD");
    let result = 서버제목.find(item => {
      if (item.day === 날짜) {
        return item;
      }
    });
    if (result) {
      return (
        // js의 data 어트리뷰트에 제목 담기
        <div
          data-gogo-title={result.title}
          data-gogo-day={result.day}
          data-gogo-imgPath={result.imgPath}
        >
          <div>{result.title}</div>
          <div>{result.price}</div>
          <div>
            <img src={result.imgPath} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h1>Schedule</h1>
      {/* <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
      <div>
        <Calendar
          // 날짜 클릭했을 때
          onClickDay={(day, event) => {
            handleClickDay(day, event);
          }}
          onChange={setDay}
          value={day}
          // 일요일부터 출력하도록 설정
          calendarType="US"
          formatDay={(locale, date) => moment(date).format("D")}
          tileContent={showScheduleJSX}
          selectRange={true}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
        />
        <div>{moment(day).format("YYYY년 MM월 DD일")}</div>
      </div>
    </div>
  );
};

export default Schedule;
