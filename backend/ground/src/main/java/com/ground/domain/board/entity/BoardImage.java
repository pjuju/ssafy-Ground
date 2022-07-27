'package com.ground.domain.board.entity;

import com.ground.domain.global.entity.Image;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "t_board_images")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "imageUrl", column = @Column(name = "post_image_url")),
            @AttributeOverride(name = "imageType", column = @Column(name = "post_image_type")),
            @AttributeOverride(name = "imageName", column = @Column(name = "post_image_name")),
            @AttributeOverride(name = "imageUUID", column = @Column(name = "post_image_uuid"))
    })
    private Image image;

//    @Column(name = "post_image_alt_text")
//    private String altText;

    @Builder
    public BoardImage(Board board, Image image) {
        this.board = board;
        this.image = image;

    }

}
