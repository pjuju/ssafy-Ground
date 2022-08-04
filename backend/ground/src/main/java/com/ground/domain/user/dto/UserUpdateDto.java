package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import lombok.*;


@NoArgsConstructor
@Getter
@Data
public class UserUpdateDto {

    private String nickname;
    private boolean privateYN;
    private Age age;
    private Gender gender;
    private String introduce;

    @Builder
    public UserUpdateDto(String nickname, boolean privateYN, Age age, Gender gender, String introduce) {
        this.nickname = nickname;
        this.privateYN = privateYN;
        this.age = age;
        this.gender = gender;
        this.introduce = introduce;
    }
}

