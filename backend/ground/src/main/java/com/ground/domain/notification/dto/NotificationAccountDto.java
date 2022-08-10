package com.ground.domain.notification.dto;


import com.ground.domain.notification.entity.NotificationAccount;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
@Data
public class NotificationAccountDto {
    private long id;
    private long fromUserId;
    private String username;
    private String nickname;
    private String memberImageUrl;
    private boolean checkYN;
    private boolean type;
    private LocalDateTime regDttm;

    public NotificationAccountDto(NotificationAccount entity) {
        this.id = entity.getId();
        this.fromUserId = entity.getFrom().getId();
        this.username = entity.getFrom().getUsername();
        this.nickname = entity.getFrom().getNickname();
        this.memberImageUrl = entity.getFrom().getUserImage();
        this.checkYN = entity.isCheckYN();
        this.type = entity.isType();
        this.regDttm = entity.getRegDttm();
    }
}
