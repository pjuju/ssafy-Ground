package com.ground.ground.domain.board;

import com.ground.ground.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "t_like")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_like_id")
    private Long boardLikeSEQ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_SEQ")
    private User userSEQ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_SEQ")
    private Board boardSEQ;

    @Builder
    public BoardLike(User user, Board board) {
        this.boardSEQ = board;
        this.userSEQ = user;
    }
}
