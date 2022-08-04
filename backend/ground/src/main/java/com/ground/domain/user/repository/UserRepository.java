package com.ground.domain.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ground.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	List<User> findFirstByUsernameLikeOrderByIdDesc(String username);
	//void save(SaveRequestUserDto params);
	Optional<User> findById(Long id);
	Optional<User> findByUsername(String username);
	Optional<User> findByNickname(String nickname);
	Optional<User> findByEmail(String email);
	
	List<User> findAllByPrivateYN(boolean b);

}
