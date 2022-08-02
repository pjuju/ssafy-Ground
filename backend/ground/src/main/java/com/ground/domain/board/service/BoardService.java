package com.ground.domain.board.service;

import com.ground.domain.board.dto.BoardAddRequestDto;
import com.ground.domain.board.dto.BoardRequestDto;
import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.BoardImage;
import com.ground.domain.board.entity.BoardLike;
import com.ground.domain.board.entity.BoardSave;
import com.ground.domain.board.repository.BoardImageRepository;
import com.ground.domain.board.repository.BoardLikeRepository;
import com.ground.domain.board.repository.BoardRepository;
import com.ground.domain.board.repository.BoardSaveRepository;
import com.ground.domain.global.entity.Category;
import com.ground.domain.global.repository.CategoryRepository;
import com.ground.domain.global.entity.Location;
import com.ground.domain.global.repository.LocationRepository;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

//    private final UserRepository userRepository;

    private final BoardRepository boardRepository;
    private final CategoryRepository categoryRepository;
    private final LocationRepository locationRepository;
    private final BoardImageRepository boardImageRepository;
    private final UserRepository userRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardSaveRepository boardSaveRepository;

    // 게시글 생성
    @Transactional
    public Board addBoard(BoardAddRequestDto params) {

        Board board = params.toEntity();

        //카테고리, 지역
        Category category = categoryRepository.findById(params.getCategoryId()).get();
        Location location = locationRepository.findById(params.getLocationId()).get();
        board.setCategory(category);
        board.setLocation(location);

        // 유저, 작성시간, 공개유무
        User user = userRepository.findById(new Long(1)).get();
        board.setUser(user);
        board.setPrivateYN(params.isPrivateYN());
        board.setRegDttm(LocalDateTime.now());

        Board entity = boardRepository.save(board);

        // 사진들 엔티티 생성하고 setBoard 해주기
        for (BoardImage image : params.getImages()) {
           BoardImage boardImage = BoardImage.builder()
                   .board(entity)
                   .imageType(image.getImageType())
                   .imageUrl(image.getImageUrl()).build();
           boardImageRepository.save(boardImage);
        }
        return entity;
    }

    // 게시글 조회
    @Transactional
    public Board getBoard(Long boardId) {

        // 게시글 찾기
        Board board = boardRepository.findById(boardId).get();
        return board;
    }


    // 게시글 수정
    @Transactional
    public Board updateBoard(Long boardId, BoardAddRequestDto params) {
        // 게시글 찾기
        Board board = boardRepository.findById(boardId).get();

        // 카테고리, 지역
        Category category = categoryRepository.findById(params.getCategoryId()).get();
        Location location = locationRepository.findById(params.getLocationId()).get();
        board.setCategory(category);
        board.setLocation(location);

        //수정한 유저, 시간, 공개유무
        User user = userRepository.findById(new Long(1)).get();
        board.setModUser(user);
        board.setModDttm(LocalDateTime.now());
        board.setPrivateYN(params.isPrivateYN());

        // 기존 이미지 삭제
        final List<BoardImage> boardImages = boardImageRepository.findAllByBoard(board);
        if (boardImages != null) {
            board.getImages().clear();
            for (BoardImage boardImage : boardImages) {
                boardImageRepository.delete(boardImage);
            }
        }

        // 사진들 엔티티 생성하고 setBoard 해주기
        for (BoardImage image : params.getImages()) {
            BoardImage boardImage = BoardImage.builder()
                    .board(board)
                    .imageType(image.getImageType())
                    .imageUrl(image.getImageUrl()).build();
            boardImageRepository.save(boardImage);
        }
        Board entity = boardRepository.save(board);
        return entity;

    }


    // 게시글 삭제
    // 로그인 유저 확인 필요함 (수정도)
    @Transactional
    public void deleteBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).get();
        boardRepository.delete(board);

    }

    // 게시글 좋아요
    // 로그인 유저 확인 필요함 (수정도)
    @Transactional
    public void likeBoard(Long boardId) {
        User user = userRepository.findById(new Long(1)).get();
        Board board = boardRepository.findById(boardId).get();
        boardLikeRepository.save(new BoardLike(user, board));

    }

    // 게시글 좋아요 취소
    // 로그인 유저 확인 필요함
    @Transactional
    public void unLikeBoard(Long boardId) {
        User user = userRepository.findById(new Long(1)).get();
        Board board = boardRepository.findById(boardId).get();
        BoardLike boardLike = boardLikeRepository.findByUserAndBoard(user, board).get();
        boardLikeRepository.delete(boardLike);
    }


    // 게시글 저장
    @Transactional
    public void saveBoard(Long boardId) {
        User user = userRepository.findById(new Long(1)).get();
        Board board = boardRepository.findById(boardId).get();
        boardSaveRepository.save(new BoardSave(user, board));
    }

    // 게시글 저장 취소
    // 로그인 유저 확인 필요함
    @Transactional
    public void unSaveBoard(Long boardId) {
        User user = userRepository.findById(new Long(1)).get();
        Board board = boardRepository.findById(boardId).get();
        BoardSave boardSave = boardSaveRepository.findByUserAndBoard(user, board).get();
        boardSaveRepository.delete(boardSave);
    }

    @Transactional
    public List<BoardResponseDto> getSaveBoard(Long userId) {
        User user = userRepository.findById(new Long(1)).get();
        List<BoardSave> saveList = boardSaveRepository.findAllByUser(user);
        List<BoardResponseDto> lst = new ArrayList<>();

        for (BoardSave boardSave : saveList) {
            lst.add(new BoardResponseDto(boardSave.getBoard()));
        }

        return lst;

    }
}
