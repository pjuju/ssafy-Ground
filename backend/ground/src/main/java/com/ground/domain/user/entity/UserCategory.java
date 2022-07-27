package com.ground.domain.user.entity;

import com.ground.domain.global.entity.Category;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="t_user_category")
public class UserCategory {

    @Id
    @GeneratedValue
    @Column(name = "user_category_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // 생성 메서드?
}
