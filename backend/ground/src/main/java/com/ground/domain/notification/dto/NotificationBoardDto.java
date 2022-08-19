package com.ground.domain.notification.dto;

import com.ground.domain.board.entity.Board;
import com.ground.domain.notification.entity.NotificationBoard;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
@Data
public class NotificationBoardDto {

    private long id;
    private String username;
    private String nickname;
    private long boardId;
    private String memberImageUrl;
    private boolean checkYN;
    private boolean type;
    private LocalDateTime regDttm;

    public NotificationBoardDto(NotificationBoard entity) {
        this.id = entity.getId();
        this.username = entity.getFrom().getUsername();
        this.nickname = entity.getFrom().getNickname();
        this.memberImageUrl = entity.getFrom().getUserImage();
        this.boardId = entity.getBoardId();
        this.checkYN = entity.isCheckYN();
        this.type = entity.isType();
        this.regDttm = entity.getRegDttm();
    }
}
