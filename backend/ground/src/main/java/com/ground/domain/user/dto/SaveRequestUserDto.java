package com.ground.domain.user.dto;

import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaveRequestUserDto {
	private Long id;
	private String username;
	private String pass;
	private String email;
	private String nickname;
	private Age age;
	private Gender gender;
	private String introduce;
	
	@Builder
	public SaveRequestUserDto(Long id, String username, String pass, String email, String nickname, Age age, Gender gender, String introduce) {
		this.id = id;
		this.username = username;
		this.pass = pass;
		this.email = email;
		this.nickname = nickname;
		this.age = age;
		this.gender = gender;
		this.introduce = introduce;
	}
	
	public User toEntity() {
		return User.builder()
				.id(id)
				.username(username)
				.pass(pass)
				.email(email)
				.nickname(nickname)
				.age(age)
				.gender(gender)
				.introduce(introduce)
				.build();
	}

}
