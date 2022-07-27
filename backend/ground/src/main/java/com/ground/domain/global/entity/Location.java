package com.ground.domain.global.entity;

import lombok.Getter;
import javax.persistence.*;

@Entity
@Getter
@Table(name="t_location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10)
    private String location;

}