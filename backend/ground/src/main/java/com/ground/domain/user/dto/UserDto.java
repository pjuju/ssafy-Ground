package com.ground.domain.user.dto;

import java.time.LocalDateTime;

import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDto {
	private Long id;
	private String username;
	private String pass;
	private String email;
	private String nickname;
	private boolean firstYN;
	private boolean delYN;
	private boolean privateYN;
	private Age age;
	private Gender gender;
	private String introduce;
	private LocalDateTime regDttm;
	private LocalDateTime modDttm;
	private String modUser;
	private String imageUrl;
	private String imagetype;
	private String ftoken;
	
}

