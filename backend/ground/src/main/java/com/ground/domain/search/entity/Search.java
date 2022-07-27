package com.ground.domain.search.entity;

import java.sql.Date;

import javax.persistence.*;

import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_search")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Search {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User userId;

    @Lob
    @Column(name = "word")
    private String word;

    @Column(name = "reg_dttm")
    private Date regDttm;

    @Column(name = "type")
    private int type;

}


