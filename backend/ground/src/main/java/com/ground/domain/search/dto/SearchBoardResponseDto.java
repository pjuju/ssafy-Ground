package com.ground.domain.search.dto;

import com.ground.domain.search.entity.SearchBoard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SearchBoardResponseDto {
    private Long id;
    private String word;

    @Builder
    public SearchBoardResponseDto(SearchBoard entity) {
        this.word = entity.getWord();
        this.id = entity.getId();
    }
}
