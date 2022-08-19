package com.ground.domain.board.repository;

import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {
    List<BoardImage> findAllByBoard(Board board);

}
