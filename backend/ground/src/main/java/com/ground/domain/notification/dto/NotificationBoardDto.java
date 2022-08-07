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
    private String nickname;
    private Board boardId;
    //    private String profileImgUrl;
    private boolean checkYN;
    private int type;
    private LocalDateTime regDttm;

    public NotificationBoardDto(NotificationBoard entity) {
        this.id = entity.getId();
        this.nickname = entity.getFrom().getNickname();
        this.boardId = entity.getBoardId();
        this.checkYN = entity.isCheckYN();
        this.type = entity.getType();
        this.regDttm = entity.getRegDttm();
    }
}
