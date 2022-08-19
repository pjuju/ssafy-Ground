package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.board.entity.Board;
import lombok.*;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@Getter
@Data
public class GroundCategoryDto {
    private Long id;
    private Long count;

    public GroundCategoryDto(Long id, Long count) {
        this.id = id;
        this.count = count;
    }
}
