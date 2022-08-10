package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.UserCategory;
import lombok.*;

import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class UserProfileDto {


    private int follow;
    private User user;
    private int userFollowerCount;
    private int userFollowingCount;

//    public UserProfileDto(User entity) {
//        this.id = entity.getId();
//        this.username = entity.getUsername();
//        this.nickname = entity.getNickname();
//        this.privateYN = entity.isPrivateYN();
//        this.introduce = entity.getIntroduce();
//    }
}

