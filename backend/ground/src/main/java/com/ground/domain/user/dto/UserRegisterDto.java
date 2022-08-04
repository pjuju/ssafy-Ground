package com.ground.domain.user.dto;

import java.time.LocalDateTime;

import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRegisterDto {
	private String username;
	private String pass;
	private String email;
	private String nickname;
	private Age age;
	private Gender gender;
	private LocalDateTime regDttm;
	
	public User toEntity() {
		return User.builder()
				.username(username)
				.pass(pass)
				.email(email)
				.nickname(nickname)
				.age(age)
				.gender(gender)
				.regDttm(regDttm)
				.build();
	}

}
