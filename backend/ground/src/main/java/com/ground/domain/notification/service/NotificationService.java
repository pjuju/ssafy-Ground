package com.ground.domain.notification.service;

import com.ground.domain.notification.dto.*;
import com.ground.domain.notification.entity.*;
import com.ground.domain.notification.repository.NotificationAccountRepository;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationAccountRepository notificationAccountRepository;
    private final UserRepository userRepository;

    // 계정 알림 생성
    @Transactional
    public void postNotifyAccount(Long fromUserId, Long toUserId, boolean params) {
        User from = userRepository.findById(fromUserId).get();
        User to = userRepository.findById(toUserId).get();

        notificationAccountRepository.save(new NotificationAccount(from, to, params, LocalDateTime.now()));
    }


    // 계정 알림 조회
    @Transactional
    public List<NotificationAccountDto> getNotifyAccount(Long userId) {
//        List<NotificationAccountDto> result = new ArrayList<>();
        User user = userRepository.findById(userId).get();

        List<NotificationAccountDto> result = notificationAccountRepository.findAllByTo(user);
        return result;
    }
}
