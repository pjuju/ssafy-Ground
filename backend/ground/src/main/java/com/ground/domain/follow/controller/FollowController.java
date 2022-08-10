package com.ground.domain.follow.controller;

import com.ground.domain.follow.dto.FollowDto;
import com.ground.domain.follow.entity.Follow;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import com.ground.domain.follow.service.FollowService;
import com.ground.domain.jwt.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/follow")
public class FollowController {
    private final FollowService followService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

//    @ApiOperation(value = "팔로우", response = String.class)
//    @PostMapping("/{toUserId}")
//    public ResponseEntity<?> followUser(@PathVariable long toUserId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
//        followService.follow(principalDetails.getUser().getId(), toUserId);
//        return new ResponseEntity<>("팔로우 성공", HttpStatus.OK);
//    }

    @PostMapping("/{toUserId}")
    @ApiOperation(value = "팔로우")
    public void followUser(@PathVariable Long toUserId, @RequestHeader String ftoken){
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long fromUserId = user.getId();

        followService.follow(fromUserId, toUserId);
    }

    // 팔로우 수락
    @PostMapping("/Accept/{fromUserId}")
    @ApiOperation(value = "팔로우 수락")
    public void followAccept(@PathVariable Long fromUserId, @RequestHeader String ftoken){
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long toUserId = user.getId();

        followService.followAccept(fromUserId, toUserId);
    }

    // 팔로우 거절
    @DeleteMapping("/Decline/{fromUserId}")
    @ApiOperation(value = "팔로우 거절")
    public void followDecline(@PathVariable Long fromUserId, @RequestHeader String ftoken){
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long toUserId = user.getId();

        followService.followDecline(fromUserId, toUserId);
    }

    // 언팔로우
    @DeleteMapping("/{toUserId}")
    @ApiOperation(value = "언팔로우")
    public void unFollowUser(@PathVariable Long toUserId, @RequestHeader String ftoken){
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long fromUserId = user.getId();

        followService.unFollow(fromUserId, toUserId);
    }

    // 팔로워 목록 조회
    @GetMapping("/{profileId}/follower/{userId}")
    @ApiOperation(value = "팔로워 목록 조회")
    public List<FollowDto> followerList(@PathVariable Long profileId, @RequestHeader String ftoken){
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long userId = user.getId();

        return followService.getFollower(profileId, userId);
    }

    // 팔로잉 목록 조회
    @GetMapping("/{profileId}/following/{userId}")
    @ApiOperation(value = "팔로잉 목록 조회")
    public List<FollowDto> followingList(@PathVariable Long profileId, @RequestHeader String ftoken){
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long userId = user.getId();

        return followService.getFollowing(profileId, userId);
    }
}
