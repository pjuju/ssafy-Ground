package com.ground.domain.user.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

@Service
public class KakaoService {
	//컨트롤러에서 사용할 메서드 만들기 
		//화면에서 파라미터로 넘겨준 code값을 받아오고 POST로 요청을 보내서 토큰을 발급받기 
		 public static String getAccessToken (String authorize_code) {
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
		            sb.append("&client_id=본인의 REST_API_KEY");
		            sb.append("&redirect_uri=본인이 설정한 리다이렉트 경로");
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
		            id_token = element.getAsJsonObject().get("id_token").getAsString();
		            
		            System.out.println("access_token : " + access_Token);
		            System.out.println("refresh_token : " + refresh_Token);
		            System.out.println("id_token: "+ id_token);
		            
		            br.close();
		            bw.close();
		        } catch (IOException e) {
		            // TODO Auto-generated catch block
		            e.printStackTrace();
		        } 
		        
		        return access_Token;



		 }
}
