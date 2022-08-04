insert into t_category(id, event) values (1, "축구");
insert into t_category(id, event) values (2, "야구");
insert into t_category(id, event) values (3, "농구");
insert into t_location(id, location) values (1, "서울");
insert into t_location(id, location) values (2, "대구");
insert into t_location(id, location) values (3, "경북");
insert into t_user (id, username, pass, nickname, gender, introduce) values (1, '배시현', '1234', '배시현닉네임', 'FEMALE', "배시현소개입니다");
insert into t_user (id, username, pass, nickname, gender, introduce) values (2, '박주현', '1234', '박주현닉네임', 'MALE', "박주현 소개입니다");
insert into t_user (id, username, pass, nickname, gender, introduce) values (3, '박종욱', '1234', '박종욱닉네임', 'MALE', "박종욱 소개 입니다");
insert into t_user (id, username, pass, nickname, gender, introduce, private_yn) values (4, '김주영', '1234', '김주영닉네임', 'FEMALE', "김주영 소개 입니다", true);

{
  "content": "글 작성 test",
  "images": [
    {"imageType": "PNG", "imageUrl": "image1111"},
    {"imageType": "PNG", "imageUrl": "image2222"}
    ],
  "locationId": 1,
  "categoryId": 1,
  "privateYN": true
}