package com.ground.domain.board.dto;

import com.ground.domain.board.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {
    private Long id;
    private BoardUserDto user;
    private String reply;
    private LocalDateTime regDttm;
    private LocalDateTime modDttm;

    public CommentResponseDto(Comment entity) {
        this.id = entity.getId();
        this.user = new BoardUserDto(entity.getUser());
        this.reply = entity.getReply();
        this.regDttm = entity.getRegDttm();
        this.modDttm = entity.getModDttm();
    }
}
