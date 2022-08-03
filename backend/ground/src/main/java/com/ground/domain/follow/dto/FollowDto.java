package com.ground.domain.follow.dto;

import lombok.*;

import java.math.BigInteger;

@Builder
@AllArgsConstructor
@Getter
@Data
public class FollowDto {

    private long id;
    private String nickname;
//    private String profileImgUrl;
    private int followState;
//    private int loginUser;


    public FollowDto(BigInteger id, String name, int followState) {
        this.id = id.longValue();
        this.nickname = nickname;
//        this.profileImgUrl = profileImgUrl;
        this.followState = followState;
//        this.loginUser = loginUser;
    }
}
