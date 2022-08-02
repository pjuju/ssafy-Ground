package com.ground.domain.board.repository;

import com.ground.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findById(Long id);
}
