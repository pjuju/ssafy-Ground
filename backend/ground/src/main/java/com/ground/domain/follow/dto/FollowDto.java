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
    private String memberImageUrl;
    private long followState;
    private long loginUser;


    public FollowDto(BigInteger id, String nickname, String memberImageUrl, BigInteger followState, BigInteger loginUser) {
        this.id = id.longValue();
        this.nickname = nickname;
        this.memberImageUrl = memberImageUrl;
        this.followState = followState.longValue();
        this.loginUser = loginUser.longValue();
    }
}
