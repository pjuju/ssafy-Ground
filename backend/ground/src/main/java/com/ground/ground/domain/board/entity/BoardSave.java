package com.ground.ground.domain.board.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.ground.ground.domain.user.entity.User;

@Getter
@Entity
@Table(name = "t_save")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardSave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "save_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Builder
    public BoardSave(User user, Board board) {
        this.user = user;
        this.board = board;
    }
}
