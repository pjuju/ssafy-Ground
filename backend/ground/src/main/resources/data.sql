-- 운동 종목
insert into t_category(id, event) values (1,"헬스");
insert into t_category(id, event) values (2,"요가");
insert into t_category(id, event) values (3,"필라테스");
insert into t_category(id, event) values (4,"러닝");
insert into t_category(id, event) values (5,"홈트레이닝");
insert into t_category(id, event) values (6,"축구");
insert into t_category(id, event) values (7,"야구");
insert into t_category(id, event) values (8,"농구");
insert into t_category(id, event) values (9,"테니스");
insert into t_category(id, event) values (10,"배드민턴");
insert into t_category(id, event) values (11,"등산");
insert into t_category(id, event) values (12,"수영");
insert into t_category(id, event) values (13,"골프");
insert into t_category(id, event) values (14,"볼링");
insert into t_category(id, event) values (15,"자전거/사이클");
insert into t_category(id, event) values (16,"기타");

-- 지역
insert into t_location(id, location) values (1, "서울");
insert into t_location(id, location) values (2, "경기");
insert into t_location(id, location) values (3, "인천");
insert into t_location(id, location) values (4, "강원");
insert into t_location(id, location) values (5, "충북");
insert into t_location(id, location) values (6, "세종");
insert into t_location(id, location) values (7, "대전");
insert into t_location(id, location) values (8, "충남");
insert into t_location(id, location) values (9, "경북");
insert into t_location(id, location) values (10, "대구");
insert into t_location(id, location) values (11, "울산");
insert into t_location(id, location) values (12, "경남");
insert into t_location(id, location) values (13, "부산");
insert into t_location(id, location) values (14, "광주");
insert into t_location(id, location) values (15, "전남");
insert into t_location(id, location) values (16, "제주");

-- 유저
insert into t_user (id, age, username, pass, nickname, gender, introduce) values (1, 'twenty', '배시현', '1234', '배시현닉네임', 'FEMALE', "배시현소개입니다");
insert into t_user (id, age, username, pass, nickname, gender, introduce) values (2, 'thirty', '박주현', '1234', '박주현닉네임', 'MALE', "박주현 소개입니다");
insert into t_user (id, age, username, pass, nickname, gender, introduce) values (3, 'forty', '박종욱', '1234', '박종욱닉네임', 'MALE', "박종욱 소개 입니다");

insert into t_user (id, age, username, pass, nickname, gender, introduce) values (4, 'forty', '한유빈', '1234', '한유빈닉네임', 'MALE', "한유빈 소개 입니다");
insert into t_user (id, age, username, pass, nickname, gender, introduce) values (5, 'forty', '김주영', '1234', '김주영닉네임', 'FEMALE', "김주영 소개 입니다");
insert into t_user (id, age, username, pass, nickname, gender, introduce) values (6, 'forty', '조인후', '1234', '조인후닉네임', 'FEMALE', "조인후 소개 입니다");

-- 유저 카테고리 설정
insert into t_user_category(id, user_id, category_id) values (1, 1, 1);
insert into t_user_category(id, user_id, category_id) values (2, 1, 3);
insert into t_user_category(id, user_id, category_id) values (3, 1, 3);
insert into t_user_category(id, user_id, category_id) values (4, 1, 3);
insert into t_user_category(id, user_id, category_id) values (5, 1, 3);
insert into t_user_category(id, user_id, category_id) values (6, 1, 3);

-- 게시글
insert into t_board values (1, 0, "test 글 내용111", 0, null, false, timestamp(now()), 0,1,1,null,1 );
insert into t_board values (2, 0, "test 글 내용11111", 0, null, false, timestamp(now()), 0,2,2,null,3 );
insert into t_board values (3, 0, "test 글 내용11111", 0, null, false, timestamp(now()), 0,3,3,null,1 );
insert into t_board values (4, 0, "test 글 내용1111111", 0, null, false, timestamp(now()), 0,1,3,null,3 );
insert into t_board values (5, 0, "test 글 내용1111111", 0, null, false, timestamp(now()), 0,1,2,null,1 );
insert into t_board values (6, 0, "test 글 내용13123123123", 0, null, true, timestamp(now()), 0,2,1,null,3 );
insert into t_board values (7, 0, "test 글 내용151251243123", 0, null, true, timestamp(now()), 0,3,2,null,1 );
insert into t_board values (8, 0, "test 글 내용123123123", 0, null, false, timestamp(now()), 0,2,3,null,3 );
insert into t_board values (9, 0, "test 글 123123123", 0, null, false, timestamp(now()), 0,1,1,null,3 );
insert into t_board values (10, 0, "test 글 내용123123123", 0, null, false, timestamp(now()), 0,3,1,null,1 );
insert into t_board values (11, 0, "test 글 내용123123123", 0, null, true, timestamp(now()), 0,2,1,null,1 );
insert into t_board values (12, 0, "test 글 내용12312312", 0, null, false, timestamp(now()), 0,1,1,null,3 );
insert into t_board values (13, 0, "test 글 내용3123123", 0, null, false, timestamp(now()), 0,1,1,null,3 );
insert into t_board values (14, 0, "test 글 내용123123", 0, null, false, timestamp(now()), 0,2,1,null,3 );
insert into t_board values (15, 0, "test 글 내용123123123", 0, null, false, timestamp(now()), 0,2,3,null,1 );
insert into t_board values (16, 0, "test 글 내용123123123", 0, null, true, timestamp(now()), 0,3,3,null,1 );
insert into t_board values (17, 0, "test 글 내용123213123", 0, null, true, timestamp(now()), 0,3,2,null,1 );
insert into t_board values (18, 0, "test 글 내용123123123", 0, null, false, timestamp(now()), 0,1,2,null,3 );
insert into t_board values (19, 0, "test 글 내용123123245125", 0, null, false, timestamp(now()), 0,2,2,null,1 );
insert into t_board values (20, 0, "test 글 내용234523452345", 0, null, true, timestamp(now()), 0,3,1,null,1 );
insert into t_board values (21, 0, "test 글 내용235234514234", 0, null, false, timestamp(now()), 0,1,2,null,3 );
insert into t_board values (22, 0, "test 글 내용1234234124", 0, null, false, timestamp(now()), 0,2,1,null,3 );
insert into t_board values (23, 0, "test 글 내용12341234124", 0, null, true, timestamp(now()), 0,1,2,null,3 );
insert into t_board values (24, 0, "test 글 내용12341241234213", 0, null, false, timestamp(now()), 0,2,1,null,3 );
insert into t_board values (25, 0, "test 글 내용412412342134124", 0, null, false, timestamp(now()), 0,3,2,null,1 );
insert into t_board values (26, 0, "test 글 내용12412341234123", 0, null, false, timestamp(now()), 0,3,2,null,1 );
insert into t_board values (27, 0, "test 글 내용412341234123", 0, null, false, timestamp(now()), 0,3,3,null,1 );
insert into t_board values (28, 0, "test 글 내용312412341234", 0, null, true, timestamp(now()), 0,1,1,null,3 );
insert into t_board values (29, 0, "test 글 내용12431243", 0, null, true, timestamp(now()), 0,1,2,null,3 );
insert into t_board values (30, 0, "test 글 내용123412341234", 0, null, true, timestamp(now()), 0,2,3,null,1 );
insert into t_board values (31, 0, "test 글 내용123412341", 0, null, false, timestamp(now()), 0,3,1,null,1 );
insert into t_board values (32, 0, "test 글 내용1234124124", 0, null, false, timestamp(now()), 0,3,2,null,3 );
insert into t_board values (33, 0, "test 글 내용12341241234124", 0, null, false, timestamp(now()), 0,2,1,null,1 );

-- 저장
insert into t_board_save(id, board_id, user_id) values (1, 2, 1);
insert into t_board_save(id, board_id, user_id) values (2, 3, 1);
insert into t_board_save(id, board_id, user_id) values (3, 5, 1);
insert into t_board_save(id, board_id, user_id) values (4, 6, 1);
insert into t_board_save(id, board_id, user_id) values (5, 7, 1);
insert into t_board_save(id, board_id, user_id) values (6, 9, 1);
insert into t_board_save(id, board_id, user_id) values (7, 10, 1);
insert into t_board_save(id, board_id, user_id) values (8, 11, 1);
insert into t_board_save(id, board_id, user_id) values (9, 16, 1);
insert into t_board_save(id, board_id, user_id) values (10, 17, 1);
insert into t_board_save(id, board_id, user_id) values (11, 18, 1);
insert into t_board_save(id, board_id, user_id) values (12, 20, 1);
insert into t_board_save(id, board_id, user_id) values (13, 30, 1);

-- 팔로우
insert into t_user_follow(id, from_user_id, to_user_id) values (1, 3, 1);
insert into t_user_follow(id, from_user_id, to_user_id) values (1, 1, 3);
