package com.ground.domain.board.entity;

import com.ground.domain.global.entity.Category;

import com.ground.domain.global.entity.Location;
import com.ground.domain.user.entity.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static javax.persistence.CascadeType.ALL;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    //== 게시글을 삭제하면 달려있는 댓글 모두 삭제 ==//
    @OneToMany(mappedBy = "board", cascade = ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = ALL, orphanRemoval = true)
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = ALL, orphanRemoval = true)
    private List<BoardSave> boardSaves = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = ALL, orphanRemoval = true)
    private List<BoardImage> images = new ArrayList<>();

    @Column(name = "private_YN" ,columnDefinition="tinyint(1) default 0")
    private boolean privateYN;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;


    @Builder
    public Board(String content, boolean privateYN){
        this.content = content;
        this.privateYN = privateYN;

//        for ()
    }

    //==연관관계 메서드==//
    public void setUser(User user) {
        this.user = user;
//        user.getBoard().add(this);
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
//


//    public void addOrderItem(OrderItem orderItem) {
//        orderItems.add(orderItem);
//        orderItem.setOrder(this);
//    }
//
//    public void setDelivery(Delivery delivery) {
//        this.delivery = delivery;
//        delivery.setOrder(this);
//    }

}
