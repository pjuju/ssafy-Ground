package com.ground.domain.notification.service;

import com.ground.domain.board.entity.Board;
import com.ground.domain.board.repository.BoardRepository;
import com.ground.domain.notification.dto.*;
import com.ground.domain.notification.entity.*;
import com.ground.domain.notification.repository.NotificationAccountRepository;
import com.ground.domain.notification.repository.NotificationBoardRepository;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.dto.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationAccountRepository notificationAccountRepository;
    private final NotificationBoardRepository notificationBoardRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

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

        List<NotificationAccountDto> result = notificationAccountRepository.findAllByToOrderByCheckYN(user);
        return result;
    }

    // 계정 알림 1개 확인
    @Transactional
    public void checkNotifyAccount(Long notiId) {
        NotificationAccount noti = notificationAccountRepository.findById(notiId).get();

        noti.NotificationAccountUpdate(true);
    }

    // 계정 알림 전체 확인
        @Transactional
    public void checkAllNotifyAccount(Long userId) {
        User user = userRepository.findById(userId).get();
        List<NotificationAccount> notiList = notificationAccountRepository.findAllByToAndCheckYN(user, false);

        for (NotificationAccount notiAcco : notiList) notiAcco.NotificationAccountUpdate(true);
    }

    // 계정 알림 삭제
    @Transactional
    public void deleteNotifyAccount(Long notiId) {
        NotificationAccount noti = notificationAccountRepository.findById(notiId).get();

        noti.NotificationAccountDelete(true);
    }

    // 게시글 알림 생성
    @Transactional
    public void postNotifyBoard(Long fromUserId, Long boardId, boolean params) {
        User from = userRepository.findById(fromUserId).get();
        Board board = boardRepository.findById(boardId).get();
        User to = board.getUser();

        notificationBoardRepository.save(new NotificationBoard(from, to, board, params, LocalDateTime.now()));
    }

    // 게시글 알림 조회
    @Transactional
    public List<NotificationBoardDto> getNotifyBoard(Long userId) {
        User user = userRepository.findById(userId).get();

        List<NotificationBoardDto> result = notificationBoardRepository.findAllByToOrderByCheckYN(user);
        return result;
    }

    // 게시글 알림 1개 확인
    @Transactional
    public void checkNotifyBoard(Long notiId) {
        NotificationBoard noti = notificationBoardRepository.findById(notiId).get();

        noti.NotificationBoardUpdate(true);
    }

    // 게시글 알림 전체 확인
    @Transactional
    public void checkAllNotifyBoard(Long userId) {
        User user = userRepository.findById(userId).get();
        List<NotificationBoard> notiList = notificationBoardRepository.findAllByToAndCheckYN(user, false);

        for (NotificationBoard notiBoard : notiList) notiBoard.NotificationBoardUpdate(true);

    }

    // 게시글 알림 삭제
    @Transactional
    public void deleteNotifyBoard(Long notiId) {
        NotificationBoard noti = notificationBoardRepository.findById(notiId).get();

        noti.NotificationBoardDelete(true);
    }

}
