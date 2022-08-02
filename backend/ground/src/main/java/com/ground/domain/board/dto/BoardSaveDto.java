package com.ground.domain.board.dto;

import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardSave;
import com.ground.domain.user.dto.UserProfileDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardSaveDto {
    private Long id;
    private BoardUserDto user;

    public BoardSaveDto(BoardSave entity) {
        this.id = entity.getId();
        this.user = new BoardUserDto(entity.getUser());
    }
}

