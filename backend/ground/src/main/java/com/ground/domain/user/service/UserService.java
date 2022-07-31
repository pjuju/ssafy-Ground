package com.ground.domain.user.service;


import com.ground.domain.user.dto.UserUpdateDto;
import com.ground.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Transactional
    public void getModifyUser(UserUpdateDto userUpdateDto) {
    }

    public void modifyUser(UserUpdateDto userUpdateDto) {
    }
}
