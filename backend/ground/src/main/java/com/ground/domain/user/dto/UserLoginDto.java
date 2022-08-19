package com.ground.domain.user.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserLoginDto {
	private String username;
	private String pass;
	
	@Builder
	public UserLoginDto(String username, String pass) {
		this.username = username;
		this.pass = pass;
	}


}

