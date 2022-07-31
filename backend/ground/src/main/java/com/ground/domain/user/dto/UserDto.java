package com.ground.domain.user.dto;

import com.ground.domain.user.entity.User;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class UserDto {

    private Long id;
    private String username;
    private String nickname;
    private Boolean u_private;
    private String introduce;

}
