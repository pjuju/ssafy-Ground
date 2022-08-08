package com.ground.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserFindPassDto {
	private String username;
	private String email;
	
	@Builder
	public UserFindPassDto(String username, String email) {
		this.username = username;
		this.email = email;
	}


}
