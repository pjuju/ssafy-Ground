package com.ground.domain.user.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Component
@RequiredArgsConstructor
public class SocialOauth {
	@Value("${kakao.client_id}")
	private String kakao_client_id;
	
	@Value("${kakao.redirect_uri}")
	private String kakao_redirect_uri;
	
	@Value("${google.token_url}")
	private String google_token_url;
	
	@Value("${google.redirect_uri}")
	private String google_redirect_uri;
	
	@Value("${google.client_id}")
	private String google_client_id;
	
	@Value("${google.client_secret}")
	private String google_client_secret;
	

	
	
	
}
