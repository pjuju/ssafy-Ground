package com.ground.domain.board.entity;

import com.ground.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "t_save")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardSave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_save_id")
    private Long boardSaveSEQ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_SEQ")
    private User userSEQ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_SEQ")
    private Board boardSEQ;

    @Builder
    public BoardSave(User user, Board board) {
        this.boardSEQ = board;
        this.userSEQ = user;
    }
}
