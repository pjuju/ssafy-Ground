package com.ground.domain.board.dto;


import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardImage;
import com.ground.domain.user.entity.User;
import lombok.*;

import java.util.List;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardRequestDto {


    private String content; // 제목
    private User user;
    private Long categoryId; // 카테고리 id
    private Long locationId; // 지역 id
    private boolean privateYN; // 공개 여부
    private List<BoardImage> images;

    public Board toEntity() {
        return Board.builder()
                .content(content)
                .privateYN(privateYN)
                .build();
    }


}


