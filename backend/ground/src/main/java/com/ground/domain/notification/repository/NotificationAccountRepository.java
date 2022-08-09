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
import java.util.Optional;

public interface NotificationAccountRepository extends JpaRepository<NotificationAccount, Long>{

    Optional<NotificationAccount> findById(Long id);
    List<NotificationAccount> findAllByToAndCheckYN(User user, boolean c);

    List<NotificationAccountDto> findAllByToAndDelYNOrderByCheckYN(User user, boolean d);
}
