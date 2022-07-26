package com.ground.domain.board.entity;

import com.ground.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.w3c.dom.Text;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Setter
@Table(name = "t_comment")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_SEQ")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_SEQ")
    private User userSEQ;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "board_SEQ")
    private Board boardSEQ;

    @Lob
    @Column(name = "reply")
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