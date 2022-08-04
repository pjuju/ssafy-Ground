package com.ground.domain.user.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserModifyPassDto {
	private String username;
	private String pass;
	private String email;
	private LocalDateTime modDttm;
	
	@Builder
	public UserModifyPassDto(String username, String pass, String email, LocalDateTime modDttm) {
		this.username = username;
		this.pass = pass;
		this.email = email;
		this.modDttm = modDttm;
	}

}

