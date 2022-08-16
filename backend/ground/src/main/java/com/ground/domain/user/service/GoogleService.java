package com.ground.domain.user.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ground.domain.jwt.JwtTokenProvider;
import com.ground.domain.user.dto.UserKakaoLoginDto;
import com.ground.domain.user.dto.UserLoginResponseDto;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoogleService {
	//컨트롤러에서 사용할 메서드 만들기 
		//화면에서 파라미터로 넘겨준 code값을 받아오고 POST로 요청을 보내서 토큰을 발급받기 
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
		 
	public UserKakaoLoginDto getUserInfo(String access_token){
			 
			 System.out.println("------Google - getUserinfo --------");
			 String GOOGLE_USERINFO_REQUEST_URL="https://www.googleapis.com/oauth2/v1/userinfo";

			 //header에 accessToken을 담는다.
			 HttpHeaders headers = new HttpHeaders();
			 headers.add("Authorization","Bearer "+ access_token);
			        
			 //HttpEntity를 하나 생성해 헤더를 담아서 restTemplate으로 구글과 통신하게 된다
			 RestTemplate restTemplate = new RestTemplate();
			 HttpEntity<MultiValueMap<String, String>> request = new HttpEntity(headers);
			 ResponseEntity<String> response= restTemplate.exchange(GOOGLE_USERINFO_REQUEST_URL, HttpMethod.GET,request,String.class);
			 
			 JsonParser parser = new JsonParser();
			 Object obj = parser.parse(response.getBody());
			 JsonObject jsonObj = (JsonObject) obj;
			 
			 UserKakaoLoginDto ukld = new UserKakaoLoginDto();
			 String id = jsonObj.get("id").toString();
			 
			 id = id.replace("\"", "");
			 String email = jsonObj.get("email").toString();
			 String ftoken = jwtTokenProvider.createToken(id);
			 
			 ukld.setUsername(id);
			 ukld.setEmail(email);
			 ukld.setFtoken(ftoken);
			 
			 return ukld;

		 }
		 
		 @Transactional
		 public UserLoginResponseDto googleLogin(UserKakaoLoginDto params) {
			 Optional<User> user = userRepository.findByEmailAndUsername(params.getEmail(), params.getUsername());
			 UserLoginResponseDto ulrd = new UserLoginResponseDto();
			 System.out.println("ks user: " + user);
			 if(user.isEmpty()) {
				 userRepository.save(params.toEntity());
				 Optional<User> kakaoUser = userRepository.findByEmailAndUsername(params.getEmail(), params.getUsername());
				 System.out.println("1success signup");
				 ulrd.setResult("success signup");
				 ulrd.setFtoken(params.getFtoken());
				 ulrd.setRegisterYN(kakaoUser.get().isRegisterYN());
				 return ulrd;
			 }
			 else {
				 ulrd.setResult("success login");
				 System.out.println("2success login");
				 String ftoken = jwtTokenProvider.createToken(user.get().getUsername());
				 ulrd.setFtoken(ftoken);
				 ulrd.setRegisterYN(user.get().isRegisterYN());
				 return ulrd;
			 }
		 }
}

