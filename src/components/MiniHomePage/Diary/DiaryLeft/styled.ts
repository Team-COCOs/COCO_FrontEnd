import styled from "styled-components";

export const DiaryLeftStyled = styled.div`
  &.Diary_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    overflow-y: scroll;
    .DiaryLeft_folder_wrap {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .Diary_title {
      width: 100%;
      margin-left: 18px;
      color: rgb(120, 184, 183);
      font-size: 15px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .Diary_line {
      width: 95%;
      height: 1px;
      margin: 7px auto 0px auto;
      margin-bottom: 10px;
      background-color: rgb(221, 221, 221);
    }

    .Diary_footer {
      margin-top: auto;
      padding-top: 10px;
      .Diary_btn {
        text-align: left;
        font-size: 12px;
        display: flex;
        gap: 10px;
        align-items: center;
        position: relative;
        bottom: 5px;
        width: 95%;
        margin: 0 auto;
        padding: 3px 10px;
        background-color: white;
        border: 1px solid rgb(174, 174, 174);
        cursor: pointer;
      }
    }

    @media (max-width: 768px) {
      & {
        min-height: 80vh;
      }
    }

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  /* 달력 커스텀 */
  .DiaryLeft_Calendar_line {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 3px 3px;
    background-color: #62bfe1;
    position: relative;
    width: 90%;
  }
  .DiaryLeft_Calendar_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1.5px dashed white;
    border-radius: 5px;

    button {
      all: unset;
    }
    .DiaryLeft_Calendar_alldatebtn {
      position: absolute;
      bottom: 18px;
      font-size: 10px;
      color: ${({ theme }) => theme.colors.tabColor};
      cursor: pointer;
      span {
        color: rgb(163, 163, 163);
      }
    }
    .selected-date {
      background-color: ${({ theme }) => theme.colors.tabColor};
      color: ${({ theme }) => theme.colors.mainColor} !important;
      /* border-radius: 50%; */
    }
  }
  .react-calendar {
    background-color: #62bfe1;
    padding: 10px 10px;
    border-radius: 7px;
  }
  /* 월 */
  .react-calendar__navigation {
    display: flex;
    padding: 5px 0px;
  }
  /* 월 버튼 */
  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    display: flex;
    justify-content: center;
  }
  .react-calendar__navigation__label {
    border: none;
    font-size: 10px;
    padding: 0px 5px;
    background-color: ${({ theme }) => theme.colors.bookColor};
    text-decoration: none;
    border: none;
    cursor: pointer;
  }
  /* 달력 네비게이션 버튼 스타일 통일 */
  .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    border: none;
    color: white;
    font-size: 8px;
    background-color: #62bfe1;
    padding-left: 5px;
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__next2-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    border: none;
    color: white;
    font-size: 8px;
    background-color: #62bfe1;
    padding-right: 5px;
  }
  /* 연,월  */
  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: white;
    background-color: #62bfe1;
    font-size: 12px;
  }
  /* 달력 버튼 */
  .react-calendar__month-view__days {
    font-size: 10px;
    padding: 10px 10px 23px 0px;
    border-radius: 5px;
    margin-top: 5px;
    background-color: white;
  }
  .react-calendar__tile.react-calendar__month-view__days__day {
    background-color: white;
    color: #4b4b4b;
    font-size: 10px;
    padding: 3px 0px;
    text-align: right;
    cursor: pointer;
  }
  /* 요일 */
  /* .react-calendar__month-view__weekdays__weekday {
    font-size: 11px;
    color: white;
    padding: 5px 0px;
    text-align: center;
  } */
  .react-calendar__month-view__weekdays__weekday abbr {
    /* text-decoration: none; */
    display: none;
  }
  /* 반응형 */
  @media (max-width: 1024px) {
    .react-calendar {
      width: 100%;
    }
    .DiaryLeft_Calendar_wrap {
      width: 100%;
    }
    /* 달력 네비게이션 버튼 스타일 통일 */
    .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
      border: none;
      color: white;
      font-size: 6px;
      background-color: #62bfe1;
      padding-left: 3px;
    }

    .react-calendar__navigation__arrow.react-calendar__navigation__next2-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
      border: none;
      color: white;
      font-size: 6px;
      background-color: #62bfe1;
      padding-right: 3%;
    }
    .DiaryLeft_Calendar_wrap .DiaryLeft_Calendar_alldatebtn {
      font-size: 6px;
    }
  }

  @media (max-width: 769px) {
    .react-calendar {
      width: 100%;
    }
    .DiaryLeft_Calendar_wrap {
      width: 100%;
    }
    .DiaryLeft_Calendar_wrap .DiaryLeft_Calendar_alldatebtn {
      font-size: 10px;
    }
    .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
      font-size: 15px;
    }
    .react-calendar__navigation__arrow.react-calendar__navigation__next2-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
      font-size: 12px;
    }
    .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
      font-size: 12px;
    }
    .react-calendar__tile.react-calendar__month-view__days__day {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .react-calendar {
      width: 100%;
    }
    .DiaryLeft_Calendar_wrap {
      width: 100%;
    }
    .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
      font-size: 13px;
    }
    .react-calendar__navigation__arrow.react-calendar__navigation__next2-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
      font-size: 10px;
    }
    .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
      font-size: 10px;
    }
    .react-calendar__tile.react-calendar__month-view__days__day {
      font-size: 12px;
    }
  }
`;
