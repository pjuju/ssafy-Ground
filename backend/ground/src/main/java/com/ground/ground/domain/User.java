package com.ground.ground.domain;

import lombok.Getter;
import lombok.Setter;
import org.w3c.dom.Text;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "t_user")
public class User {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long AI;

    @Column(length = 50, nullable = false)
    private String id;

    @Column(length = 20, nullable = false)
    private String pass;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 20, nullable = false)
    private String nickname;

    @Column(nullable = false)
    private boolean del_YN;

    @Column(nullable = false)
    private boolean u_private;

    private String age;
    private String gender;
    @Lob
    private String image;
    @Lob
    private String introduce;
    @Lob
    private String ftoken;

    @Column(nullable = false)
    private Date reg_dttm;

    @Column(nullable = false)
    private int reg_user_SEQ;

    private Date mod_dttm;

    private int mod_user_SEQ;
}
