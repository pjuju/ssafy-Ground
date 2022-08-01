package com.ground.domain.user.service;


import com.ground.domain.user.dto.UserDto;
import com.ground.domain.user.dto.UserUpdateDto;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private UserRepository userRepository;
    @Transactional
    public UserDto getUserProfile(long id) {
        User user = userRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 유저는 존재하지 않습니다."));

        return new UserDto(user);
    }

    @Transactional
    public void getModifyUser(UserUpdateDto userUpdateDto) {

    }

    public Long profileUpdate(Long id, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 유저는 존재하지 않습니다."));

        user.profileUpdate(userUpdateDto.getPass(),
                userUpdateDto.getNickname(),
                userUpdateDto.isPrivateYN(),
                userUpdateDto.getAge(),
                userUpdateDto.getGender(),
                userUpdateDto.getIntroduce());

        return id;
    }
}
