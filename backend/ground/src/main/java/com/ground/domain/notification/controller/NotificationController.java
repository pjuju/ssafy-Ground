package com.ground.domain.notification.controller;

import com.ground.domain.jwt.JwtTokenProvider;
import com.ground.domain.notification.dto.*;
import com.ground.domain.notification.entity.*;
import com.ground.domain.notification.service.*;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/notification")
public class NotificationController {

    private final NotificationService notificationService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    // 계정 알림 생성
    @PostMapping("/account/{toUserId}")
    @ApiOperation(value = "계정 알림 생성")
    public void postNotifyAccount(@PathVariable Long toUserId, @RequestHeader String Authorization, @RequestBody boolean params){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long fromUserId = user.getId();

        notificationService.postNotifyAccount(fromUserId, toUserId, params);
    }

    // 계정 알림 조회
    @GetMapping("/account")
    @ApiOperation(value = "계정 알림 조회")
    public List<NotificationAccountDto> getNotifyAccount(@RequestHeader String Authorization){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long userId = user.getId();

        return notificationService.getNotifyAccount(userId);
    }

    // 계정 알림 전체 확인
    @PostMapping("/account/check")
    @ApiOperation(value = "계정 알림 전체 확인")
    public void checkAllNotifyAccount(@RequestHeader String Authorization){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long userId = user.getId();

        notificationService.checkAllNotifyAccount(userId);
    }

    // 계정 알림 삭제
    @DeleteMapping("/account/delete/{notiId}")
    @ApiOperation(value = "계정 알림 삭제")
    public void deleteNotifyAccount(@PathVariable Long notiId){
        notificationService.deleteNotifyAccount(notiId);
    }

    // 게시글 알림 생성
    @PostMapping("/board/{boardId}")
    @ApiOperation(value = "게시글 알림 생성")
    public void postNotifyBoard(@PathVariable Long boardId, @RequestHeader String Authorization, @RequestBody boolean params){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long fromUserId = user.getId();

        notificationService.postNotifyBoard(fromUserId, boardId, params);
    }

    // 게시글 알림 조회
    @GetMapping("/board")
    @ApiOperation(value = "게시글 알림 조회")
    public List<NotificationBoardDto> getNotifyBoard(@RequestHeader String Authorization){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long userId = user.getId();

        return notificationService.getNotifyBoard(userId);
    }

    // 게시글 알림 전체 확인
    @PostMapping("/board/check")
    @ApiOperation(value = "게시글 알림 전체 확인")
    public void checkAllNotifyBoard(@RequestHeader String Authorization){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Long userId = user.getId();

        notificationService.checkAllNotifyBoard(userId);
    }


    // 게시글 알림 삭제
    @DeleteMapping("/board/delete/{notiId}")
    @ApiOperation(value = "게시글 알림 삭제")
    public void deleteNotifyBoard(@PathVariable Long notiId){
        notificationService.deleteNotifyBoard(notiId);
    }

}
