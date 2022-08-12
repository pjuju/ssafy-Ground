package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.board.entity.Board;
import lombok.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Getter
@Data
public class GroundBoardDto {
    private String date;
    private Long count;

    public GroundBoardDto(LocalDate date, Long count) {
        this.date = new String(date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        this.count = count;
    }
}
