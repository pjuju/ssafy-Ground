package com.ground.domain.board.entity;

import com.ground.domain.global.entity.Category;
import com.ground.domain.global.entity.Location;
import com.ground.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "t_board")
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Lob
    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mod_user_id")
    private User modUser;

    @CreatedDate
    @Column(name = "reg_dttm")
    private Timestamp regDttm;

    @Column(name = "mod_dttm")
    private LocalDateTime modDttm;

    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardSave> boardSaves = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardImage> images = new ArrayList<>();

    @Column(name = "del_YN", columnDefinition="tinyint(1) default 1")
    private boolean delYN;

    @Column(name = "private_YN" ,columnDefinition="tinyint(1) default 1")
    private boolean privateYN;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;
}
