package com.ground.domain.board.repository;

import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findById(Long id);
    // 관심종목
    Page<Board> findAllByCategoryIdInAndUserInAndPrivateYN(List<Long> categoryId, List<User> userList, boolean a, Pageable pageable);
    // 팔로우 피드
    Page<Board> findAllByUserInAndPrivateYN(List<User> userList, boolean a, Pageable pageable);

    Page<Board> findAllByCategoryIdInAndLocationIdInAndContentContainingIgnoreCaseAndRegDttmBetweenAndPrivateYNAndUserIn(List<Long> category, List<Long> location, String word, LocalDateTime startDate, LocalDateTime endDate, boolean b, List<User> userList, Pageable pageable);

    // -----------------BSH-----------------
    List<Board> findAllByUserId(long userId, Pageable pageable);
    List<Board> findAllByUserId(long userId);
    List<Board> findAllByIdInAndUserInAndPrivateYN(List<Long> Id, List<User> userList, boolean tf, Pageable pageable);
}
