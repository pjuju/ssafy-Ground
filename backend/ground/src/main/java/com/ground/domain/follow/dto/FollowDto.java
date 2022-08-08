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
    private String userImage;
    private long followState;
    private long loginUser;


    public FollowDto(BigInteger id, String nickname, String userImage, BigInteger followState, BigInteger loginUser) {
        this.id = id.longValue();
        this.nickname = nickname;
        this.userImage = userImage;
        this.followState = followState.longValue();
        this.loginUser = loginUser.longValue();
    }
}
