package com.ground.domain.user.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.ground.domain.jwt.JwtTokenProvider;
import com.ground.domain.user.dto.*;
import com.ground.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.ground.domain.jwt.TokenResponse;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.service.GoogleService;
import com.ground.domain.user.service.KakaoService;
import com.ground.domain.user.service.MailSendService;
import com.ground.domain.user.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.log4j.Log4j2;


@Log4j2
@ApiResponses(value = { 
		@ApiResponse(code = 200, message = "Success"),
		@ApiResponse(code = 400, message = "Bad Request"),
		@ApiResponse(code = 401, message = "Unauthorized"),
        @ApiResponse(code = 403, message = "Forbidden"),
        @ApiResponse(code = 404, message = "Not Found"),
        @ApiResponse(code = 500, message = "Internal Server Error")
})
@RestController
@RequestMapping("/rest/user")
//@CrossOrigin(allowCredentials = "*", originPatterns = { "*" })
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    UserRepository userRepository;
	@Autowired
	UserService userService;
	@Autowired
	MailSendService mailService;
	@Autowired
	KakaoService kakaoService;
	@Autowired
	GoogleService googleService;
	@Autowired
	SocialOauth socialOauth;
	

	
	@PersistenceContext
	EntityManager em;
	
	@PostMapping("/signUp")
    @ApiOperation(value = "????????????", response = boolean.class)
    public boolean signUp(@RequestBody UserRegisterDto params){
		
    	return userService.saveUser(params);
    }
    
    @GetMapping("/isUsedUsername")
    @ApiOperation(value = "????????? ?????? ??????", response = boolean.class)
    public boolean isUsedUsername(String username){
    	
        return userService.checkUsername(username);
    }
    
    @GetMapping("/isUsedNickname")
    @ApiOperation(value = "????????? ?????? ??????", response = boolean.class)
    public boolean isUsedNickname(String nickname){
    	
        return userService.checkNickname(nickname);
    }
    
    @GetMapping("/isUsedEmail")
    @ApiOperation(value = "????????? ?????? ??????", response = boolean.class)
    public boolean isUsedEmail(String email){
    	
        return userService.checkEmail(email);
    }
    
    @GetMapping("/emailAuth")
    @ApiOperation(value = "????????? ??????", response = String.class)
    public String emailAuth(String email) throws UnsupportedEncodingException{
    	
        return mailService.joinEmail(email);
    }
    
    @PutMapping("/deleteUser")
    @ApiOperation(value = "?????? ??????", response = String.class)
    public boolean deleteUser(@RequestHeader String Authorization){
    	String ftoken = Authorization.substring(7);
    	
        return userService.deleteUser(jwtTokenProvider.getSubject(ftoken));
    }
    
    @GetMapping("/findId/{email}")
    @ApiOperation(value = "????????? ??????", response = String.class)
    public String findId(@PathVariable String email) {
    	
    	return userService.findId(email);
    }
    
    @PostMapping("/modifyPass")
    @ApiOperation(value = "???????????? ????????? ?????? ?????????, ????????? ??????", response = boolean.class)
    public boolean modifyPassCheck(@RequestBody UserFindPassDto params) {
    	
    	return userService.modifyPassCheck(params);
    }
    
    @PutMapping("/modifyPass")
    @ApiOperation(value = "???????????? ??????", response = boolean.class)
    //@RequestHeader String header, 
    public boolean modifyPass(@RequestHeader String Authorization, @RequestBody UserModifyPassDto params) {
        String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        
        return userService.modifyPass(user, params);
    }

    @PostMapping("/login")
    @ApiOperation(value = "?????????", response = UserStateDto.class)
    public UserLoginResponseDto login(@RequestBody UserLoginDto params){
    	
    	return userService.login(params);
    }

    @GetMapping("/state")
    @ApiOperation(value = "?????????????????? ??????", response = UserStateDto.class)
    public UserStateDto userState(@RequestHeader String Authorization) {
    	String ftoken = Authorization.substring(7);
    	
    	return userService.userState(ftoken);
    }
    
    @RequestMapping("/oauth/kakao")
    @ApiOperation(value = "????????? ?????????", response = UserLoginResponseDto.class)
    public UserLoginResponseDto kakaoLogin(@RequestParam("code") String code, HttpSession session) throws IOException {
    	log.info(code);
    	String kakao_client_id = socialOauth.getKakao_client_id();
    	String kakao_redirect_uri = socialOauth.getKakao_redirect_uri();
    	
    	String access_Token = KakaoService.getAccessToken(code, kakao_client_id, kakao_redirect_uri);
    	
    	UserKakaoLoginDto ukld = new UserKakaoLoginDto();
    	ukld = kakaoService.getUserInfo(access_Token);
    	
    	return kakaoService.kakaoLogin(ukld);
    }
    
    @RequestMapping("/oauth/google")
    @ApiOperation(value = "?????? ?????????", response = String.class)
    public UserLoginResponseDto googleLogin(@RequestParam("code") String access_token, HttpSession session) throws IOException {
    	UserKakaoLoginDto ukld = new UserKakaoLoginDto();
    	ukld = googleService.getUserInfo(access_token);
    	
    	return googleService.googleLogin(ukld);
    }
    
    @DeleteMapping("/logout")
    @ApiOperation(value = "????????????", response = boolean.class)
    public boolean logoutUser(@RequestHeader String Authorization) {
    	String ftoken = Authorization.substring(7);
    	
    	return userService.logoutUser(ftoken);
    }


    // -----------------BSH-----------------
    // ????????? ?????? ??????
    @GetMapping("/profile/{userId}")
    @ApiOperation(value = "????????? ??????", response = String.class)
    public UserProfileDto userProfile(@PathVariable Long userId, @RequestHeader String Authorization) {
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long loginUserId = user.getId();

        return userService.getUserProfile(userId, loginUserId);
    }

    // ?????? ?????? ?????? ???????????? ??????
    @GetMapping("/modifyUser")
    @ApiOperation(value = "???????????? ?????? ???????????? ??????", response = String.class)
    public UserUpdateDto getModifyUser(@RequestHeader String Authorization){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();

        return userService.getModifyUser(user);
    }

    // ?????? ?????? ??????
    @PutMapping("/modifyUser")
    @ApiOperation(value = "???????????? ??????", response = String.class)
    public void modifyUser(@RequestHeader String Authorization, @RequestBody UserUpdateDto userUpdateDto) {
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();

        userService.profileUpdate(user, userUpdateDto);
    }

    // ???????????? ??????
    @PutMapping("/category")
    @ApiOperation(value = "???????????? ??????")
    public void setUserCategory(@RequestHeader String Authorization, @RequestBody List<Long> userCategories) {
        String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();

        userService.setUserCategory(user, userCategories);
    }

    // ?????? ???????????? ??????
    @PostMapping("/userDetail")
    @ApiOperation(value = "?????? ???????????? ??????")
    public void firstLogin(@RequestHeader String Authorization, @RequestBody UserFirstLoginDto userFirstLoginDto) {
    	String ftoken = Authorization.substring(7);
        User loginUser = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();

        userService.firstLogin(loginUser, userFirstLoginDto);
    }

}