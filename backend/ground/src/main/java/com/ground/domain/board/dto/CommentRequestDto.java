package com.ground.domain.board.dto;

import com.ground.domain.board.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {

    private String reply;

    public Comment toEntity() {
        return Comment.builder()
                .reply(reply)
                .build();

    }

}
