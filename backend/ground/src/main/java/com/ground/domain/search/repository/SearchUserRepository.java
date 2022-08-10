package com.ground.domain.search.repository;

import com.ground.domain.search.entity.SearchUser;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchUserRepository extends JpaRepository<SearchUser, Long> {
    List<SearchUser> findAllByUserOrderByIdDesc(User user);
    void deleteById(Long id);
    void deleteAllByUser(User user);
}
