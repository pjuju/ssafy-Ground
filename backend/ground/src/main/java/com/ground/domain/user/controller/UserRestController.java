package com.ground.domain.user.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

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
@CrossOrigin(allowCredentials = "true", originPatterns = { "*" })
public class UserRestController {

    @PostMapping("/singUp")
    @ApiOperation(value = "회원가입", response = String.class)
    public String signUp(){
        return "test!";
    }
    
    @GetMapping("/isUsedId")
    @ApiOperation(value = "아이디 중복 체크", response = String.class)
    public String isUsedId(){
        return "test!";
    }
    
    @GetMapping("/isUsedNick")
    @ApiOperation(value = "닉네임 중복 체크", response = String.class)
    public String isUsedNick(){
        return "test!";
    }
    
    @GetMapping("/emailAuth")
    @ApiOperation(value = "이메일 인증", response = String.class)
    public String emailAuth(){
        return "test!";
    }
    
    @PutMapping("/deleteUser")
    @ApiOperation(value = "회원 탈퇴", response = String.class)
    public String deleteUser(){
        return "test!";
    }
    
    @PutMapping("/modifyUser")
    @ApiOperation(value = "회원정보 수정", response = String.class)
    public String modifyUser(){
        return "test!";
    }
    
    @GetMapping("/login")
    @ApiOperation(value = "로그인", response = String.class)
    public String login(){
        return "test!";
    }
    
    @PutMapping("/userDetail")
    @ApiOperation(value = "회원 상세정보 추가", response = String.class)
    public String userDetail(){
        return "test!";
    }
    
    @GetMapping("/profile/{user_id}")
    @ApiOperation(value = "프로필 조회", response = String.class)
    public String profile(){
        return "test!";
    }
}