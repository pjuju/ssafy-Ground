package com.ground.domain.board.repository;

import com.ground.domain.board.entity.Board;
import com.ground.domain.global.entity.Category;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findById(Long id);
    // 관심종목
    Page<Board> findAllByCategoryIdInAndUserInAndPrivateYN(List<Long> categoryId, List<User> userList, boolean a, Pageable pageable);
    // 팔로우 피드
    Page<Board> findAllByUserInAndPrivateYN(List<User> userList, boolean a, Pageable pageable);

    // 최신순
//    List<Board> findAllByContentContainingIgnoreCaseAndGenderInAndAgeInAndCategoryInAndLocationInAndRegDttmBetweenOrderById(
//            String word, List<Gender> gender, List<String> age, List<Integer> category, List<Integer> location, LocalDate startDate, LocalDate endDate, Pageable pageable);
    // 좋아요 순
//    List<Board> findFirstByContentContainingIgnoreCasAndGenderInAndAgeInAndCategoryInAndLocationInAndRegDttmBetweenOrderById(
//            String word, List<Gender> gender, List<String> age, List<Integer> category, List<Integer> location, LocalDate startDate, LocalDate endDate, Pageable pageable);

}
