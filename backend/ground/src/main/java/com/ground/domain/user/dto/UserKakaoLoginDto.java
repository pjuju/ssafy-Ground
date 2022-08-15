package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserKakaoLoginDto {
	private String username;
	private String email;
	private String ftoken;
	
	@Builder
	public UserKakaoLoginDto(String username, String email, String ftoken) {
		this.username = username;
		this.email = email;
		this.ftoken = ftoken;
	}
	
	public User toEntity() {
		return User.builder()
				.username(username)
				.email(email)
				.ftoken(ftoken)
				.build();
	}



}
