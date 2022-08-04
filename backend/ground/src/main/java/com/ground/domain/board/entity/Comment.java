package com.ground.domain.board.entity;

import com.ground.domain.user.entity.User;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.w3c.dom.Text;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Setter
@Table(name = "t_board_comment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Lob
    @Column(name = "reply")
    private String reply;

    @Column(name = "reg_dttm")
    private LocalDateTime regDttm;

    @Column(name = "mod_dttm")
    private LocalDateTime modDttm;



    @Builder
    public Comment(String reply) {
        this.reply = reply;
    }
}