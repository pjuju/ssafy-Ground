package com.ground.domain.board.dto;

import com.ground.domain.user.entity.User;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class BoardUserDto {

    private Long id;
    private String username;
    private String nickname;
    private Boolean privateYN;
    private String introduce;
    // 이미지
    private String imageUrl;
    private String imageType;

    public BoardUserDto(User entity) {
        this.id = entity.getId();
        this.username = entity.getUsername();
        this.nickname = entity.getNickname();
        this.privateYN = entity.isPrivateYN();
        this.introduce = entity.getIntroduce();
        if (entity.getImageUrl() != null) {
            this.imageUrl = entity.getImageUrl();
            this.imageType = entity.getImageType();
        }
    }
}