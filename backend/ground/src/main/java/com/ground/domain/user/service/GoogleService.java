package com.ground.domain.user.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
	
	public static String getAccessToken (String code,String google_client_id, String google_client_secret, String google_redirect_uri, String google_token_url) {
		RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("client_id", google_client_id);
        params.put("client_secret", google_client_secret);
        params.put("redirect_uri", google_redirect_uri);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity =
                restTemplate.postForEntity(google_token_url, params, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
        	System.out.println("getaccesstoken(google): " + responseEntity.getBody());
            return responseEntity.getBody();
        }
        return "구글 로그인 요청 처리 실패";
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
		            
//		            access_Token = element.getAsJsonObject().get("access_token").getAsString();
//		            String user_email ="";
//		            element.getAsJsonObject().
		            String id = ((JsonObject) element).get("id").toString();
		            String email = ((JsonObject) ((JsonObject) element).get("kakao_account")).get("email").toString();
		            System.out.println("id: " + id);
		            System.out.println("email: " + email);
		            String ftoken = jwtTokenProvider.createToken(id);
		            System.out.println("ftoken: " + ftoken);
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
		 public UserLoginResponseDto googleLogin(UserKakaoLoginDto params) {
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

