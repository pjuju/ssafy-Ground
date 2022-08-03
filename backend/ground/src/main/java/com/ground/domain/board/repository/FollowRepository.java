package com.ground.domain.board.repository;

import com.ground.domain.board.entity.BoardSave;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FollowRepository {

}
//public interface FollowRepository extends JpaRepository<Follow, Long> {
//    List<Follow> findAllByFrom(User user);
//}
