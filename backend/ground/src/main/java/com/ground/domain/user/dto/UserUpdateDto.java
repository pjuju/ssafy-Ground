package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data

public class UserUpdateDto {

    private long id;
    private String pass;
    private String nickname;
    private boolean privateYN;
    private Age age;
    private Gender gender;
    private String introduce;

}
