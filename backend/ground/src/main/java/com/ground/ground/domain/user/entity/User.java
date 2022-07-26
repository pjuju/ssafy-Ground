package com.ground.ground.domain.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;


import java.util.Date;
import com.ground.ground.domain.follow.entity.Follow;

@Entity
@Getter @Setter
@Table(name = "t_user")
public class User {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long AI;

    @Column(name = "id", length = 50, nullable = false, unique = true)
    private String id;

    @Column(name = "pass", length = 20, nullable = false, unique = true)
    private String pass;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "nickname", length = 20, nullable = false)
    private String nickname;

    @Column(name = "del_YN", nullable = false)
    private boolean del_YN;

    @Column(name = "u_private", nullable = false)
    private boolean u_private;

    @Column(name = "age", length = 5)
    private String age;

    @Column(name = "gender", length = 5)
    private String gender;

    @Lob
    @Column(name = "introduce")
    private String introduce;

    @Lob
    private String image;
    @Lob
    private String ftoken;

    @Column(nullable = false)
    private Date reg_dttm;

    @Column(nullable = false)
    private int reg_user_SEQ;

    private Date mod_dttm;

    private int mod_user_SEQ;

//    @OneToMany(mappedBy = "user")
//    private List<Follow> followings = new ArrayList<>();

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    
}
