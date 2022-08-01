package com.ground.domain.board.repository;
import com.ground.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;


public interface BoardRepository extends JpaRepository<Board, Long> {

}
