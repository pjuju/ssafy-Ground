package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.UserCategory;
import lombok.*;

import java.util.List;


@NoArgsConstructor
@Getter
@Data
public class UserFirstLoginDto {
    private String userImage;
    private String introduce;
    private List<Long> userCategories;

    @Builder
    public UserFirstLoginDto(UserFirstLoginDto entity) {
        this.userImage = entity.getUserImage();
        this.introduce = entity.getIntroduce();
        this.userCategories = entity.getUserCategories();
    }
}
