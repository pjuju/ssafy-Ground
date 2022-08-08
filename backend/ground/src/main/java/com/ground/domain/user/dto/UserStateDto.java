package com.ground.domain.user.dto;

import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class UserStateDto {
	private String username;
	private String email;
	private String nickname;
	private String ftoken;
	private String introduce;
	private String userImage;
	private Gender gender;
	private Age age;
	private boolean privateYN;
	private boolean registerYN;
		
	
	

}
