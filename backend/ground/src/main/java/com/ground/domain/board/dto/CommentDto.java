package com.ground.domain.board.dto;

import com.ground.domain.board.entity.Comment;
import com.ground.domain.user.dto.UserProfileDto;
import com.ground.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class CommentDto {
    private Long id;
    private BoardUserDto user;
    private String reply;
    private LocalDateTime regDttm;
    private LocalDateTime modDttm;

    public CommentDto(Comment entity) {
        this.id = entity.getId();
        this.user = new BoardUserDto(entity.getUser());
        this.reply = entity.getReply();
        this.regDttm = entity.getRegDttm();
        this.modDttm = entity.getModDttm();
    }
}
