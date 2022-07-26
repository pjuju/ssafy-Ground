package com.ground.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

//@RestController
//@RequestMapping("/rest/user")
//public class UserRestController {
//	@PostMapping
//	@ApiOperation(value = "사용자 정보를 추가한다.", response = Boolean.class)
//	public Boolean insert() {
//		//uService.join(user);
//		return true;
//	}
//	
//	
//	@RestController
//	@RequestMapping("/api")
//	public class MainController {
//
//	    @GetMapping("/test")
//	    public String test(){
//	        return "test!";
//	    }
//	}
//	
//
//}
@RestController
@RequestMapping("/api")
@CrossOrigin(allowCredentials = "true", originPatterns = { "*" })
public class UserRestController {

    @GetMapping("/test")
    public String test(){
        return "test!";
    }
}
