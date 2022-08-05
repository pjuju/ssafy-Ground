package com.ground.domain.board.repository;

import com.ground.domain.board.entity.BoardImage;
import com.ground.domain.follow.entity.Follow;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;


public interface BoardFollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findAllByfromUserId(User user);


}
