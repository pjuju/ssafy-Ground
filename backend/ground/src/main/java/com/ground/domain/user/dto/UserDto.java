package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String nickname;
    private Boolean u_private;


}
