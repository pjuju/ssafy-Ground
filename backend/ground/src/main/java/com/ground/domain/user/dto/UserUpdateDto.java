package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@NoArgsConstructor
@Getter
@Data
public class UserUpdateDto {
    private String nickname;
    private boolean privateYN;
    private Age age;
    private Gender gender;
    private String introduce;
    private String userImage;

    @Builder
    public UserUpdateDto(UserUpdateDto entity) {
        this.nickname = entity.getNickname();
        this.privateYN = entity.isPrivateYN();
        this.age = entity.getAge();
        this.gender = entity.getGender();
        this.introduce = entity.getIntroduce();
        this.userImage = entity.getUserImage();
    }
}



