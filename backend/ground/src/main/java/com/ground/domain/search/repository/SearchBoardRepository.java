package com.ground.domain.search.repository;

import com.ground.domain.search.entity.SearchBoard;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchBoardRepository extends JpaRepository<SearchBoard, Long> {
        List<SearchBoard> findAllByUserOrderByIdDesc(User user);
        void deleteById(Long id);
        void deleteAllByUser(User user);


}
