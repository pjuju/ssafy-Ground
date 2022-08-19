package com.ground.domain.search.dto;

import com.ground.domain.search.entity.SearchUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserDto {
    private String word;
    // response에서만 쓰임.
    private Long id;

    public SearchUser toEntity() {
        return SearchUser.builder()
                .word(word)
                .build();
    }

    @Builder
    public SearchUserDto(SearchUser entity){
        this.word = entity.getWord();
        this.id = entity.getId();
    }

}
