package com.ground.domain.global.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
   Optional<Location> findById(Long id);
}
