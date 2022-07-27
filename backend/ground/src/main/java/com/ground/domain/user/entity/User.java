package com.ground.domain.user.entity;

import com.ground.domain.global.image.Image;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "t_user")
public class User {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "pass")
    private String pass;

    @Column(name= "email")
    private String email;

    @Column(name= "nickname")
    private String nickname;

    // 디폴트 값 넣어줄지
    @Column(name = "del_YN", columnDefinition="tinyint(1) default 1")
    private boolean delYN;

    @Column(name = "private_YN" ,columnDefinition="tinyint(1) default 1")
    private boolean privateYN;

    @Column(name = "age")
    @Enumerated(EnumType.STRING)
    private Age age;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Lob
    @Column(name = "introduce")
    private String introduce;

    @Column(name = "mod_user_id")
    private int modUserId;

    @CreatedDate
    @Column(name = "reg_dttm")
    private LocalDateTime regDttm;

    @Column(name = "mod_dttm")
    private LocalDateTime modDttm;

    // 이미지
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "imageUrl", column = @Column(name = "member_image_url")),
            @AttributeOverride(name = "imageType", column = @Column(name = "member_image_type")),
            @AttributeOverride(name = "imageName", column = @Column(name = "member_image_name")),
            @AttributeOverride(name = "imageUUID", column = @Column(name = "member_image_uuid"))
    })
    private Image image;

    @Lob
    private String ftoken;

}
