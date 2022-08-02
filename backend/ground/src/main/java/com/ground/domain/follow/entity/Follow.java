package com.ground.domain.follow.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.ground.domain.user.entity.User;

import javax.persistence.*;
@Getter
@NoArgsConstructor
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name="subscribe_uk",
                        columnNames = {"from_user_id", "to_user_id"}
                )
        },
        name = "t_user_follow"
)
public class Follow  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name = "from_user_id")
    @ManyToOne
    private User fromUser;

    @JoinColumn(name = "to_user_id")
    @ManyToOne
    private User toUser;

//    @Column(name = "flag", columnDefinition="tinyint(1) default 0")
//    private boolean flag;
    @Builder
    public Follow(User fromUser, User toUser) {
        this.fromUser = fromUser;
        this.toUser = toUser;
    }
}