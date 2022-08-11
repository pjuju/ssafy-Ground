const interest = [
  { id: 1, value: "헬스", checked: false },
  { id: 2, value: "요가", checked: false },
  { id: 3, value: "필라테스", checked: false },
  { id: 4, value: "러닝", checked: false },
  { id: 5, value: "홈트레이닝", checked: false },
  { id: 6, value: "축구", checked: false },
  { id: 7, value: "야구", checked: false },
  { id: 8, value: "농구", checked: false },
  { id: 9, value: "테니스", checked: false },
  { id: 10, value: "배드민턴", checked: false },
  { id: 11, value: "등산", checked: false },
  { id: 12, value: "수영", checked: false },
  { id: 13, value: "골프", checked: false },
  { id: 14, value: "볼링", checked: false },
  { id: 15, value: "자전거/사이클", checked: false },
  { id: 16, value: "기타", checked: false },
];

const gender = [
  { id: "MALE", value: "남", checked: false },
  { id: "FEMALE", value: "여", checked: false },
];

const age = [
  { id: "teenager", value: "10대", checked: false },
  { id: "twenty", value: "20대", checked: false },
  { id: "thirty", value: "30대", checked: false },
  { id: "forty", value: "40대", checked: false },
  { id: "fifty", value: "50대", checked: false },
  { id: "sixty", value: "60대 이상", checked: false },
];

const location = [
  { id: 1, value: "서울", checked: false },
  { id: 2, value: "경기", checked: false },
  { id: 3, value: "인천", checked: false },
  { id: 4, value: "강원", checked: false },
  { id: 5, value: "충북", checked: false },
  { id: 6, value: "세종", checked: false },
  { id: 7, value: "대전", checked: false },
  { id: 8, value: "충남", checked: false },
  { id: 9, value: "경북", checked: false },
  { id: 10, value: "대구", checked: false },
  { id: 11, value: "울산", checked: false },
  { id: 12, value: "경남", checked: false },
  { id: 13, value: "부산", checked: false },
  { id: 14, value: "광주", checked: false },
  { id: 15, value: "전남", checked: false },
  { id: 16, value: "제주", checked: false },
];

const date = [
  { value: "all", label: "전체" },
  { value: "days", label: "오늘" },
  { value: "weeks", label: "1주일" },
  { value: "months", label: "1개월" },
  { value: "years", label: "1년" },
  { value: "custom", label: "직접 입력" },
];

const type = [
  { id: "id", value: "최신순" },
  { id: "likeCnt", value: "좋아요순" },
  { id: "commentCnt", value: "댓글순" },
  { id: "saveCnt", value: "스크랩순" },
];

export { interest, gender, age, location, date, type };
