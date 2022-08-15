package com.ground.domain.user.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ground.domain.jwt.JwtTokenProvider;
import com.ground.domain.user.dto.SocialOauth;
import com.ground.domain.user.dto.UserKakaoLoginDto;
import com.ground.domain.user.dto.UserLoginResponseDto;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KakaoService {
	//컨트롤러에서 사용할 메서드 만들기 
		//화면에서 파라미터로 넘겨준 code값을 받아오고 POST로 요청을 보내서 토큰을 발급받기 
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	private final SocialOauth socialOauth;
	
	
	public static String getAccessToken (String authorize_code, String kakao_client_id, String kakao_redirect_uri) {
		     System.out.println("----------------------------토큰발급---------------------------");
			 String access_Token = "";
		     String refresh_Token = "";
		     String id_token ="";
	
		     //토큰발급 요청을 보낼 주소
		     String reqURL = "https://kauth.kakao.com/oauth/token";
		        
		        try {
	                //URL객체 생성
		            URL url = new URL(reqURL);
		            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		            
		            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로 
	                //.setDoOutput(true): URLConnection이 서버에 데이터를 보내는데 사용할 수 있는 지의 여부를 설정하는 것
		            conn.setRequestMethod("POST");
		            conn.setDoOutput(true);
		            
		            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
		            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		            StringBuilder sb = new StringBuilder();
		            sb.append("grant_type=authorization_code");
		            sb.append("&client_id=" + kakao_client_id);
		            sb.append("&redirect_uri="+ kakao_redirect_uri);
		            sb.append("&code=" + authorize_code);
		            bw.write(sb.toString());
		            bw.flush();
		            
		            //응답확인 200이면 정상
		            int responseCode = conn.getResponseCode();
		            System.out.println("responseCode : " + responseCode);
		 
		            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
		            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		            String line = "";
		            String result = "";
		            
		            while ((line = br.readLine()) != null) {
		                result += line;
		            }
		            System.out.println("response body : " + result);
		            
		            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
		            JsonParser parser = new JsonParser();
		            JsonElement element = parser.parse(result);
		            
		            access_Token = element.getAsJsonObject().get("access_token").getAsString();
		            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
//		            id_token = element.getAsJsonObject().get("id_token").getAsString();
		            
		            System.out.println("access_token : " + access_Token);
		            System.out.println("refresh_token : " + refresh_Token);
//		            System.out.println("id_token: "+ id_token);
		            
		            br.close();
		            bw.close();
		        } catch (IOException e) {
		            // TODO Auto-generated catch block
		            e.printStackTrace();
		        } 
		        
		        return access_Token;
		 }
		 
	public UserKakaoLoginDto getUserInfo(String access_token){
			 
			 System.out.println("------Kakao - getUserinfo --------");

		     String reqURL = "https://kapi.kakao.com/v2/user/me";
		        
		        try {
	                //URL객체 생성
		            URL url = new URL(reqURL);
		            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		            
		            conn.setRequestMethod("POST");
		            conn.setDoOutput(true);
		            
		            conn.setRequestProperty("Authorization", "Bearer " + access_token);
		            
		            //응답확인 200이면 정상
		            int responseCode = conn.getResponseCode();
		            System.out.println("responseCode : " + responseCode);
		 
		            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
		            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		            String line = "";
		            String result = "";
		            
		            while ((line = br.readLine()) != null) {
		                result += line;
		            }
		            System.out.println("response body : " + result);
		            
		            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
		            JsonParser parser = new JsonParser();
		            JsonElement element = parser.parse(result);
		            
		            String id = ((JsonObject) element).get("id").toString();
		            String email = ((JsonObject) ((JsonObject) element).get("kakao_account")).get("email").toString();
		            String ftoken = jwtTokenProvider.createToken(id);
		            
		            UserKakaoLoginDto ukld = new UserKakaoLoginDto();
		            ukld.setUsername(id);
		            ukld.setEmail(email);
		            ukld.setFtoken(ftoken);
		           
		            
		            br.close();
		            return ukld;
		        } catch (IOException e) {
		            // TODO Auto-generated catch block
		            e.printStackTrace();
		        } 
		        
		        return null;
		 }
		 
		 @Transactional
		 public UserLoginResponseDto kakaoLogin(UserKakaoLoginDto params) {
			 Optional<User> user = userRepository.findByEmailAndUsername(params.getEmail(), params.getUsername());
			 UserLoginResponseDto ulrd = new UserLoginResponseDto();
			 System.out.println("ks user: " + user);
			 if(user.isEmpty()) {
				 userRepository.save(params.toEntity());
				 Optional<User> kakaoUser = userRepository.findByEmailAndUsername(params.getEmail(), params.getUsername());
				 ulrd.setResult("success signup");
				 ulrd.setFtoken(params.getFtoken());
				 ulrd.setRegisterYN(kakaoUser.get().isRegisterYN());
				 return ulrd;
			 }
			 else {
				 ulrd.setResult("success login");
				 ulrd.setFtoken(params.getFtoken());
				 ulrd.setRegisterYN(user.get().isRegisterYN());
				 return ulrd;
			 }
		 }
}
