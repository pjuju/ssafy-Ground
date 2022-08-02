package com.ground.domain.global.repository;

import com.ground.domain.global.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findById(Long id);

}
