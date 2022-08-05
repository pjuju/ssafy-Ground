package com.ground.domain.board.repository;

import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardLike;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

    Optional<BoardLike> findByUserAndBoard(User user, Board board);
}
