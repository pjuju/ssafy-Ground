package com.ground.domain.board.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "t_board_images")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Column(name = "post_image_url")
    private String imageUrl;

    @Column(name = "post_image_type")
    private String imageType;


    @Builder
    public BoardImage(String imageUrl, String imageType, Board board) {
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.board = board;
        // 게시글에 현재 파일이 존재하지 않는다면
        if(!board.getImages().contains(this)) {
            // 파일 추가
            board.getImages().add(this);
        }
    }
//

}
