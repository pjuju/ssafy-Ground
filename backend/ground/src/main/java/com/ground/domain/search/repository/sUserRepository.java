package com.ground.domain.search.repository;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface sUserRepository extends JpaRepository<User, Long> {
    List<User> findByNicknameStartingWithIgnoreCase(String wordA);
}


