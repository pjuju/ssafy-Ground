package com.ground.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ground.domain.board.entity.BoardImage;
import com.ground.domain.global.entity.Image;
import com.ground.domain.global.entity.Location;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "t_user")
public class User {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "pass")
    private String pass;

    @Column(name= "email")
    private String email;

    @Column(name= "nickname")
    private String nickname;

    // 디폴트 값 넣어줄지
    @Column(name = "del_YN", columnDefinition="tinyint(1) default 0")
    private boolean delYN;

    @Column(name = "private_YN" ,columnDefinition="tinyint(1) default 0")
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

    @CreatedDate
    @Column(name = "reg_dttm")
    private LocalDateTime regDttm;

    @Column(name = "mod_dttm")
    private LocalDateTime modDttm;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserCategory> userCategories = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mod_user_id")
    private User modUser;


    // 이미지
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "imageUrl", column = @Column(name = "member_image_url")),
            @AttributeOverride(name = "imageType", column = @Column(name = "member_image_type"))

    })
    private Image image;

    @Lob
    @Column(name = "ftoken")
    private String ftoken;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    // followers, followings, likeBoards, saveBoards, 등등 mappedBy로 가져와야 할 필요성 있음.


}
