const interest = [
  { id: 1, value: "헬스", checked: true },
  { id: 2, value: "요가", checked: true },
  { id: 3, value: "필라테스", checked: true },
  { id: 4, value: "러닝", checked: true },
  { id: 5, value: "홈트레이닝", checked: true },
  { id: 6, value: "축구", checked: true },
  { id: 7, value: "야구", checked: true },
  { id: 8, value: "농구", checked: true },
  { id: 9, value: "테니스", checked: true },
  { id: 10, value: "배드민턴", checked: true },
  { id: 11, value: "등산", checked: true },
  { id: 12, value: "수영", checked: true },
  { id: 13, value: "골프", checked: true },
  { id: 14, value: "볼링", checked: true },
  { id: 15, value: "자전거/사이클", checked: true },
  { id: 16, value: "기타", checked: true },
];

const gender = [
  { id: "MALE", value: "남", checked: true },
  { id: "FEMALE", value: "여", checked: true },
];

const age = [
  { id: "teenager", value: "10대", checked: true },
  { id: "twenty", value: "20대", checked: true },
  { id: "thirty", value: "30대", checked: true },
  { id: "forty", value: "40대", checked: true },
  { id: "fifty", value: "50대", checked: true },
  { id: "sixty", value: "60대 이상", checked: true },
];

const location = [
  { id: 1, value: "서울", checked: true },
  { id: 2, value: "경기", checked: true },
  { id: 3, value: "인천", checked: true },
  { id: 4, value: "강원", checked: true },
  { id: 5, value: "충북", checked: true },
  { id: 6, value: "세종", checked: true },
  { id: 7, value: "대전", checked: true },
  { id: 8, value: "충남", checked: true },
  { id: 9, value: "경북", checked: true },
  { id: 10, value: "대구", checked: true },
  { id: 11, value: "울산", checked: true },
  { id: 12, value: "경남", checked: true },
  { id: 13, value: "부산", checked: true },
  { id: 14, value: "광주", checked: true },
  { id: 15, value: "전남", checked: true },
  { id: 16, value: "제주", checked: true },
];

const date = [
  { value: "whole", label: "전체" },
  { value: "today", label: "오늘" },
  { value: "week", label: "1주일" },
  { value: "month", label: "1개월" },
  { value: "year", label: "1년" },
  { value: "custom", label: "직접 입력" },
];

export { interest, gender, age, location, date };
