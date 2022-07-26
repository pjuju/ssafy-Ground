package com.ground.ground.domain.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.w3c.dom.Text;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "t_user")
public class User {

//    @Id @GeneratedValue
//    @Column(name = "user_SEQ")
//    private Long userSEQ;

    @Column(length = 50, nullable = false, unique = true)
    private String id;

    @Column(name = "pass", nullable = false)
    private String pass;

    @Column(name= "email", length = 50, nullable = false)
    private String email;

    @Column(name= "nickname", length = 20, nullable = false)
    private String nickname;

    // 디폴트 값 넣어줄지
    @Column(name = "del_YN", nullable = false)
    private boolean delYN;

    @Column(name = "u_private", nullable = false)
    private boolean uPrivate;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Lob
    @Column(name = "introduce")
    private String introduce;

    @Id @GeneratedValue
    @Column(name = "user_SEQ")
    private Long userSEQ;

    // 이게 대체..
    @Column(name = "reg_user_SEQ", nullable = false)
    private int regUserSEQ;

    @Column(name = "mod_user_SEQ")
    private int modUserSEQ;

    // 임베디드 필요성
    @Column(name = "reg_dttm", nullable = false)
    private Date regDttm;

    @Column(name = "mod_dttm")
    private Date modDttm;


    // 이미지
    @Lob
    private String image;

    // ????????????
    @Lob
    private String ftoken;

}
