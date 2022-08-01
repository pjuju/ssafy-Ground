package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class UserProfileDto {

    private Long id;
    private String username;
    private String nickname;
    private Boolean privateYN;
    private String introduce;

    public UserProfileDto(User entity) {
        this.id = entity.getId();
        this.username = entity.getUsername();
        this.nickname = entity.getNickname();
        this.privateYN = entity.isPrivateYN();
        this.introduce = entity.getIntroduce();
    }
}

