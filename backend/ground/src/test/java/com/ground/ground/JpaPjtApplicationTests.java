package com.ground.ground;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ground.domain.user.dto.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
class JpaPjtApplicationTests {
	
	@Autowired
	UserRepository userRepository;

//	@Test
//	@Order(1)
//	void save() { // User 객체를 생성하여 User 테이블에 저장한다.
//		User user = new User();
//		user.setUsername("kim ori");
//		userRepository.save(user);
//		
//		user = new User();
//		user.setUsername("lee ori");
//		userRepository.save(user);
//		
//		user = new User();
//		user.setUsername("kim ental");
//		userRepository.save(user);
//		
//		user = new User();
//		user.setUsername("lee ental");
//		userRepository.save(user);
//		
//		user = new User();
//		user.setUsername("kim samuel");
//		userRepository.save(user);
//	}
	
//	@Test
//	@Order(1)
//	void select() { // 저장된 데이터 모두를 Spring JPA에 미리 구현된 findAll 명령을 통해 불러온다.
//		List<User> userList = userRepository.findAll();
//		for(User u : userList) log.info("[FindAll]: " +u.getUsername());
//	}
//	
//	
//	@Test
//	@Order(2)
//	void select2() { // Like 검색으로 2개만 값을 가져오는 내가 작성한 명령을 실행해본다.
//		List<User> userList = userRepository.findFirst3ByUsernameLikeOrderByIDDesc("kim%");
//		for(User u : userList) log.info("[FindSome]: "  +u.getUsername());
//	}

}
