package com.ground.domain.user.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class UserService {
	
	@Autowired 
	private UserRepository userRepository;
	
	@Transactional
	public List<User> findFirstByUsernameLikeOrderByIdDesc(String username){
		return userRepository.findFirstByUsernameLikeOrderByIdDesc(username);
//		return userRepository.findAll();
	}
	
	
	@Transactional
	public User save(User user) {
		userRepository.save(user);
		return user;
	}
}
