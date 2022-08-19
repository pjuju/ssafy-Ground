package com.ground.domain.global.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class CategoryDto {
    private Long id;
    private String username;
    private String nickname;
    private Boolean privateYN;
    private String introduce;
}
