package com.ground.domain.board.repository;

import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardSave;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardSaveRepository extends JpaRepository<BoardSave, Long> {

    Optional<BoardSave> findByUserAndBoard(User user, Board board);

    List<BoardSave> findAllByUser(User user);
}
