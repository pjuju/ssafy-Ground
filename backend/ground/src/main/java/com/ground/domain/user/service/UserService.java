package com.ground.domain.user.service;

import java.util.List;

import javax.transaction.Transactional;

import com.ground.domain.follow.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ground.domain.user.dto.SaveRequestUserDto;
import com.ground.domain.user.dto.UserProfileDto;
import com.ground.domain.user.dto.UserUpdateDto;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
	
	@Autowired 
	private final UserRepository userRepository;
	private final FollowRepository followRepository;

	@Transactional
	public List<User> findFirstByUsernameLikeOrderByIdDesc(String username){
//		return userRepository.findFirstByUsernameLikeOrderByIdDesc(username);
		return userRepository.findAll();
	}
	
	
	@Transactional
	public User save(User user) {
		userRepository.save(user);
		
		return user;
	}
	
	@Transactional
	public SaveRequestUserDto save(SaveRequestUserDto params) {
		userRepository.save(params.toEntity());
		
		return params;
	}
//	public User delete(User user) {
//		userRepository.delete(user);
//		
//		return user;
//	}
	
	@Transactional
    public UserProfileDto getUserProfile(Long id) {
		UserProfileDto userProfileDto = new UserProfileDto();

        User user = userRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 유저는 존재하지 않습니다."));

		userProfileDto.setUser(user);
		userProfileDto.setUserFollowerCount(followRepository.findFollowerCountById(id));
		userProfileDto.setUserFollowingCount(followRepository.findFollowingCountById(id));

        return userProfileDto;
    }

    @Transactional
    public void getModifyUser(UserUpdateDto userUpdateDto) {

    }
	@Transactional
    public Long profileUpdate(Long id, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 유저는 존재하지 않습니다."));

        user.profileUpdate(userUpdateDto.getNickname(),
                userUpdateDto.isPrivateYN(),
                userUpdateDto.getAge(),
                userUpdateDto.getGender(),
                userUpdateDto.getIntroduce());

        return id;
    }

}
