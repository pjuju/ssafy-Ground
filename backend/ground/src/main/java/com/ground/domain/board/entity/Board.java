package com.ground.domain.board.entity;

import com.ground.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "t_board")
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    // 카테고리 설정 manytoone로 해야 할 듯
//    @Column(nullable = false)
//    private int categoryId;
    //dddddd

    @Lob
    @Column(name = "content")
    private String content;

    // 지역 Enum으로 해야하는 거 같음
    @Column(length = 30, nullable = false)
    private String location;

    // user_SEQ가 있는데 이게 필요한가?
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reg_user_SEQ")
    private User regUserSEQ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mod_user_SEQ")
    private User modUserSEQ;

    @CreatedDate
    @Column(name = "reg_dttm")
    private Timestamp regDttm;

    @Column(name = "mod_dttm")
    private LocalDateTime modDttm;

    @OneToMany(mappedBy = "boardSEQ")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "boardSEQ")
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "boardSEQ")
    private List<BoardSave> boardSaves = new ArrayList<>();

    @OneToMany(mappedBy = "boardSEQ")
    private List<BoardImage> images = new ArrayList<>();

    @Column(nullable = false)
    private boolean boardPrivate;
}
