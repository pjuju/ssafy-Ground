package com.ground.domain.follow.controller;

import org.springframework.web.bind.annotation.*;

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
@RequestMapping("/rest/follow")
public class FollowController {

    @PostMapping("/{to_user_id}")
    @ApiOperation(value = "팔로우", response = String.class)
    public String follow(){
        return "test!";
    }

    @DeleteMapping("/{to_user_id}")
    @ApiOperation(value = "언팔로우", response = String.class)
    public String unFollow(){
        return "test!";
    }

    @DeleteMapping("/{from_user_id}/follower")
    @ApiOperation(value = "팔로워 삭제", response = String.class)
    public String unFollower(){
        return "test!";
    }

    @GetMapping("/{user_id}/following")
    @ApiOperation(value = "팔로잉 목록 조회", response = String.class)
    public String followingList(){
        return "test!";
    }

    @GetMapping("/{user_id}/follower")
    @ApiOperation(value = "팔로워 목록 조회", response = String.class)
    public String followerList(){
        return "test!";
    }
}
