package com.ground.domain.notification.repository;

import com.ground.domain.board.entity.Board;
import com.ground.domain.notification.dto.*;
import com.ground.domain.notification.entity.*;
import com.ground.domain.user.entity.User;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationAccountRepository extends JpaRepository<NotificationAccount, Long>{

    List<NotificationAccountDto> findAllByTo(User user);
}
