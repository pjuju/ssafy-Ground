package com.ground.domain;

import lombok.Getter;
import lombok.Setter;
import org.w3c.dom.Text;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "t_comment")
public class Comment {

    @Id @GeneratedValue
    @Column(name = "comment_id")
    private Long AI;

    @Column(nullable = false)
    private int user_SEQ;

    @Column(nullable = false)
    private int board_SEQ;

    @Lob
    @Column(nullable = false)
    private String reply;

    @Column(nullable = false)
    private Date reg_dttm;

    @Column(nullable = false)
    private int reg_user_SEQ;

    @Column(nullable = false)
    private Date mod_dttm;

    @Column(nullable = false)
    private int mod_user_SEQ;
}