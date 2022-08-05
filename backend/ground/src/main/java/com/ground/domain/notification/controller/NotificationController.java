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
}
