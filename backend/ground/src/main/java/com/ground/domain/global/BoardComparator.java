package com.ground.domain.global;

import com.ground.domain.board.dto.BoardResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import java.util.Comparator;


public class BoardComparator implements Comparator<BoardResponseDto> {
    @Override
    public int compare(BoardResponseDto a, BoardResponseDto b) {
        if (a.getRegDttm().isAfter(b.getRegDttm())) {
            return -1;
        }
        return 1;
    }
}
