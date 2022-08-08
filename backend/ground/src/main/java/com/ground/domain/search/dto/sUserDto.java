package com.ground.domain.search.dto;

import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class sUserDto {
    private Long id;
    private String username;
    private String email;
    private String nickname;
    private boolean delYN;
    private boolean privateYN;
    private Age age;
    private Gender gender;
    private String introduce;
    private String userImage;
    private String imagetype;



    public sUserDto(User entity) {
        this.id = entity.getId();
        this.username = entity.getUsername();
        this.email = entity.getEmail();
        this.nickname = entity.getNickname();
        this.delYN = entity.isDelYN();
        this.privateYN = entity.isDelYN();
        this.age = entity.getAge();
        this.gender = entity.getGender();
        this.introduce = entity.getIntroduce();
        this.userImage = entity.getUserImage();

    }
}

