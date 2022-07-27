package com.ground.domain.follow.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import com.ground.domain.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "t_follow")
public class Follow  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "from_id")
    @ManyToOne
    private User from;

    @JoinColumn(name = "to_id")
    @ManyToOne
    private User to;

    @Builder
    public Follow(User from, User to) {
        this.from = from;
        this.to = to;
    }
}