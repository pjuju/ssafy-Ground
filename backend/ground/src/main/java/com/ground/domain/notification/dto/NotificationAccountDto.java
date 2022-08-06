package com.ground.domain.notification.dto;

import com.ground.domain.notification.dto.*;

import com.ground.domain.notification.entity.NotificationAccount;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
@Data
public class NotificationAccountDto {
    private long id;
    private String nickname;
//    private String profileImgUrl;
    private boolean checkYN;
    private boolean type;
    private LocalDateTime regDttm;

    public NotificationAccountDto(NotificationAccount entity) {
        this.id = entity.getId();
        this.nickname = entity.getFrom().getNickname();
        this.checkYN = entity.isCheckYN();
        this.type = entity.isType();
        this.regDttm = entity.getRegDttm();
    }
}
