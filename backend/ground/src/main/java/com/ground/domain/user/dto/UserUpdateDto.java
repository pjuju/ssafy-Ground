package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import lombok.*;


@Builder
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

    @Builder
    public UserUpdateDto(long id, String pass, String nickname, boolean privateYN, Age age, Gender gender, String introduce) {
        this.id = id;
        this.pass = pass;
        this.nickname = nickname;
        this.privateYN = privateYN;
        this.age = age;
        this.gender = gender;
        this.introduce = introduce;
    }
}

