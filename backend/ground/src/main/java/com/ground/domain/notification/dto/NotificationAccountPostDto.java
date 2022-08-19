package com.ground.domain.notification.dto;
import com.ground.domain.notification.dto.*;

import com.ground.domain.notification.entity.NotificationAccount;
import com.ground.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Data
public class NotificationAccountPostDto {

    private User from;
    private User to;
    private boolean type;
    private LocalDateTime regDttm;

    public NotificationAccountPostDto(User from, User to, boolean type, LocalDateTime regDttm) {
        this.from = from;
        this.to = to;
        this.type = type;
        this.regDttm = regDttm;
    }
}
