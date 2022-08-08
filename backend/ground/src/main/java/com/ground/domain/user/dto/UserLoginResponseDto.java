package com.ground.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginResponseDto {
	
	private String result;
	private String ftoken = null;
	private boolean registerYN;
	
	@Builder
	public UserLoginResponseDto(String result, String ftoken, boolean registerYN) {
		this.result = result;
		this.ftoken = ftoken;
		this.registerYN = registerYN;
	}

}
