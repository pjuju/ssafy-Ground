package com.ground.domain.board.repository;

import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardSave;
import com.ground.domain.global.entity.Category;
import com.ground.domain.user.entity.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findById(Long id);
    List<Board> findAllByCategoryIdInAndUserInAndPrivateYN(List<Long> categoryId, List<User> userList, boolean a, Pageable pageable);
    List<Board> findAllByUserInAndPrivateYN(List<User> userList, boolean a, Pageable pageable);

    // -----------------BSH-----------------
    List<BoardResponseDto> findAllByUserId(long userId, Pageable pageable);
    List<Board> findAllByIdInAndPrivateYN(List<Long> Id, boolean tf, Pageable pageable);
    List<Board> findAllByIdInAndUserInAndPrivateYN(List<Long> Id, List<User> userList, boolean tf, Pageable pageable);
}
