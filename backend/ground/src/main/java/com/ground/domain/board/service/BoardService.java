package com.ground.domain.board.service;

import com.ground.domain.board.dto.BoardAddRequestDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardImage;
import com.ground.domain.board.repository.BoardImageRepository;
import com.ground.domain.board.repository.BoardRepository;
import com.ground.domain.global.entity.Category;
import com.ground.domain.global.entity.CategoryRepository;
import com.ground.domain.global.entity.Location;
import com.ground.domain.global.entity.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CategoryRepository categoryRepository;
    private final LocationRepository locationRepository;
    private final BoardImageRepository boardImageRepository;
    // 게시글 생성
    @Transactional
    public Long addBoard(BoardAddRequestDto params) {

        // 유저 추가

        Optional<Category> category = categoryRepository.findById(params.getCategoryId());
        Optional<Location> location = locationRepository.findById(params.getLocationId());

        Board board = params.toEntity();
        board.setCategory(category.get());
        board.setLocation(location.get());
        Board entity = boardRepository.save(board);

        // 사진들 엔티티 생성하고 setBoard 해주기
        for (BoardImage image : params.getImages()) {
           BoardImage boardImage = BoardImage.builder()
                   .board(entity)
                   .imageType(image.getImageType())
                   .imageUrl(image.getImageUrl()).build();
           boardImageRepository.save(boardImage);
        }
        return entity.getId();
    }
}
