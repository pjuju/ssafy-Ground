package com.ground.domain.search.entity;

import com.ground.domain.user.entity.User;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_search_user")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class SearchUser {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Lob
    @Column(name = "word")
    private String word;

    @Column(name = "reg_dttm")
    private LocalDateTime regDttm;

    @Builder
    public SearchUser(String word){
        this.word = word;
        this.regDttm = LocalDateTime.now();
    }
}


