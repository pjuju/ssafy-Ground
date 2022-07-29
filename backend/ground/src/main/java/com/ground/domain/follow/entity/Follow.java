package com.ground.domain.follow.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.ground.domain.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "t_user_follow")
@NoArgsConstructor
public class Follow  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "from_user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User from;

    @JoinColumn(name = "to_user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User to;

    @Column(name = "flag")
    private boolean flag;

    @Builder
    public Follow(User from, User to) {
        this.from = from;
        this.to = to;
    }
}