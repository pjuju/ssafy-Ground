package com.ground.domain.board.repository;

import com.ground.domain.follow.entity.Follow;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardFollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findAllByFromUserIdAndFlag(User user, boolean f);


}
