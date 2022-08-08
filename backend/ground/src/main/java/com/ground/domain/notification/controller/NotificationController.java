package com.ground.domain.notification.controller;

import com.ground.domain.notification.dto.*;
import com.ground.domain.notification.entity.*;
import com.ground.domain.notification.service.*;

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

    // 계정 알림 생성
    @PostMapping("/account/{toUserId}/{fromUserId}")
    @ApiOperation(value = "계정 알림 생성")
    public void postNotifyAccount(@PathVariable Long toUserId, @PathVariable Long fromUserId, @RequestBody boolean params){
        notificationService.postNotifyAccount(fromUserId, toUserId, params);
    }

    // 계정 알림 조회
    @GetMapping("/account/{userId}")
    @ApiOperation(value = "계정 알림 조회")
    public List<NotificationAccountDto> getNotifyAccount(@PathVariable Long userId){
        return notificationService.getNotifyAccount(userId);
    }

    // 계정 알림 1개 확인
    @PostMapping("/account/check/noti/{notiId}")
    @ApiOperation(value = "계정 알림 1개 확인")
    public void checkNotifyAccount(@PathVariable Long notiId){
        notificationService.checkNotifyAccount(notiId);
    }

    // 계정 알림 전체 확인
    @PostMapping("/account/check/{userId}")
    @ApiOperation(value = "계정 알림 전체 확인")
    public void checkAllNotifyAccount(@PathVariable Long userId){
        notificationService.checkAllNotifyAccount(userId);
    }

    // 계정 알림 삭제
    @PostMapping("/account/delete/{notiId}")
    @ApiOperation(value = "계정 알림 삭제")
    public void deleteNotifyAccount(@PathVariable Long notiId){
        notificationService.deleteNotifyAccount(notiId);
    }

    // 게시글 알림 생성
    @PostMapping("/board/{boardId}/{fromUserId}")
    @ApiOperation(value = "게시글 알림 생성")
    public void postNotifyBoard(@PathVariable Long boardId, @PathVariable Long fromUserId, @RequestBody boolean params){
        notificationService.postNotifyBoard(fromUserId, boardId, params);
    }

    // 게시글 알림 조회
    @GetMapping("/board/{userId}")
    @ApiOperation(value = "게시글 알림 조회")
    public List<NotificationBoardDto> getNotifyBoard(@PathVariable Long userId){
        return notificationService.getNotifyBoard(userId);
    }

    // 게시글 알림 1개 확인
    @PostMapping("/board/check/noti/{notiId}")
    @ApiOperation(value = "게시글 알림 1개 확인")
    public void checkNotifyBoard(@PathVariable Long notiId){
        notificationService.checkNotifyBoard(notiId);
    }

    // 게시글 알림 전체 확인
    @PostMapping("/board/check/{userId}")
    @ApiOperation(value = "게시글 알림 전체 확인")
    public void checkAllNotifyBoard(@PathVariable Long userId){
        notificationService.checkAllNotifyBoard(userId);
    }


    // 게시글 알림 삭제
    @PostMapping("/board/delete/{notiId}")
    @ApiOperation(value = "게시글 알림 삭제")
    public void deleteNotifyBoard(@PathVariable Long notiId){
        notificationService.deleteNotifyBoard(notiId);
    }

}
