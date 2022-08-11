package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.UserCategory;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class UserCategoryDto {
    private long categoryId;
    private String categoryName;

    public UserCategoryDto(UserCategory entity) {
        this.categoryId = entity.getCategory().getId();
        this.categoryName = entity.getCategory().getEvent();
    }
}
