package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.board.entity.Board;
import lombok.*;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class UserBoardDto {

    private long boardId;
    private long categoryId;
    private String categoryName;
    private LocalDate regDttm;

    public UserBoardDto(Board entity) {
        this.boardId = entity.getId();
        this.categoryId = entity.getCategory().getId();
        this.categoryName = entity.getCategory().getEvent();
        this.regDttm = entity.getRegDttm().toLocalDate();
    }
}
