package com.ground.domain.follow.controller;

import com.ground.domain.follow.entity.Follow;

import lombok.RequiredArgsConstructor;
import com.ground.domain.follow.service.FollowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/follow")
public class FollowController {

    private FollowService followService;

//    @PostMapping("/{toUserId}")
//    @ApiOperation(value = "팔로우", response = String.class)
//    public ResponseEntity<?> followUser(@PathVariable long toUserId, @RequestBody long fromUserId){
//        followService.follow(fromUserId, toUserId);
//        return new ResponseEntity<>("팔로우 성공", HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{toUserId}")
//    @ApiOperation(value = "언팔로우", response = String.class)
//    public ResponseEntity<?> unFollowUser(@PathVariable long fromUserId, @PathVariable long toUserId){
//        followService.unFollow(fromUserId, toUserId);
//        return new ResponseEntity<>("팔로우 취소 성공", HttpStatus.OK);
//    }

    @PostMapping("/{toUserId}/{fromUserId}")
    @ApiOperation(value = "팔로우", response = String.class)
    public Follow followUser(@PathVariable long toUserId, @PathVariable long fromUserId){
        return followService.save(fromUserId, toUserId);
    }

    @DeleteMapping("/{toUserId}")
    @ApiOperation(value = "언팔로우", response = String.class)
    public ResponseEntity<?> unFollowUser(@PathVariable long fromUserId, @PathVariable long toUserId){
        followService.unFollow(fromUserId, toUserId);
        return new ResponseEntity<>("팔로우 취소 성공", HttpStatus.OK);
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
