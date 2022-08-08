package com.ground.domain.board.dto;

import com.ground.domain.board.entity.BoardImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardImageDto {
    private Long id;
    private String imageUrl;
    private String imageType;

    public BoardImageDto(BoardImage entity) {
        this.id = entity.getId();
        this.imageUrl = entity.getImageUrl();
        this.imageType = entity.getImageType();

    }

}
