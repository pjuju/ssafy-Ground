package com.ground.domain.board.dto;

import com.ground.domain.board.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponseDto {
    private Long id;
    private BoardUserDto user;
    private String content;
    private BoardUserDto modUser;
    private LocalDateTime regDttm;
    private LocalDateTime modDttm;
    private boolean privateYN;
    private String category;
    private String location;
    private List<CommentResponseDto> comments = new ArrayList<>();
    private int commentCnt;
    private List<BoardLikeDto> boardLikes = new ArrayList<>();
    private int likeCnt;
    private List<BoardSaveDto> boardSaves = new ArrayList<>();
    private int saveCnt;
    private List<BoardImageDto> images = new ArrayList<>();

    public BoardResponseDto(Board entity) {
        this.id = entity.getId();
        this.user = new BoardUserDto(entity.getUser());
        if (this.modUser != null) {
        this.modUser = new BoardUserDto(entity.getModUser());}
        this.content = entity.getContent();
        this.regDttm = entity.getRegDttm();
        this.modDttm = entity.getModDttm();
        this.privateYN = entity.isPrivateYN();
        this.category = entity.getCategory().getEvent();
        this.location = entity.getLocation().getLocation();

        for (Comment comment : entity.getComments()) {
            this.comments.add(new CommentResponseDto(comment));
        }
        this.commentCnt = entity.getComments().size();

        for (BoardLike boardLike : entity.getBoardLikes()) {
            this.boardLikes.add(new BoardLikeDto(boardLike));
        }
        this.likeCnt = entity.getBoardLikes().size();

        for (BoardSave boardSave : entity.getBoardSaves()) {
            this.boardSaves.add(new BoardSaveDto(boardSave));
        }
        this.saveCnt = entity.getBoardSaves().size();

        for (BoardImage boardImage : entity.getImages()) {
            this.images.add(new BoardImageDto(boardImage));
        }
    }
}
