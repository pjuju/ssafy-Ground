package com.ground.domain.board.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;

@Entity
@Getter @Setter
public class Category {
    @Id
    @GeneratedValue @Column(name = "category_SEQ")
    private Long categorySEQ;

    @Column(length = 10, nullable = false)
    private String event;

}
