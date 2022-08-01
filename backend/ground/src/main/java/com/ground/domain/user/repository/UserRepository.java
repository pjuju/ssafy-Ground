package com.ground.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ground.domain.user.entity.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findById();
}
