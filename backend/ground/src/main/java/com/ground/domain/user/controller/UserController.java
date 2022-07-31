package com.ground.domain.user.controller;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ground.domain.user.entity.User;
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
	UserService userService;
	
	@PersistenceContext
	EntityManager em;

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
    
    @GetMapping("/practice/{username}")
    @ApiOperation(value = "연습해보자get", response = User.class)
    public List<User> hello1(@PathVariable("username") String username){
    	
    	List<User> user = userService.findFirstByUsernameLikeOrderByIdDesc(username);
    	log.info(username);
    	//log.warn("watch out!");
   
        return user;
    }
    
    @PostMapping("/practice")
    @ApiOperation(value = "연습해보자post", response = User.class)
    public User hello2(@RequestBody User user){
    	// 회원가입
    	
    	
//    	if(true)
//    	{
//    		// 이미 중복된 아이디 확인하는작업
//        	// ex) if(crudEntityRepository.findById(name).isPresent())
//    	}
//    	else {
//    		
//    	}
    	
    	
        return userService.save(user);
    }
}