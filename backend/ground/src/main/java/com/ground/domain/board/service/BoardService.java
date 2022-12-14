package com.ground.domain.board.service;

import com.ground.domain.board.dto.BoardRequestDto;
import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.dto.CommentRequestDto;
import com.ground.domain.board.entity.*;
import com.ground.domain.board.repository.*;
import com.ground.domain.follow.entity.Follow;
import com.ground.domain.global.entity.Category;
import com.ground.domain.global.entity.Location;
import com.ground.domain.global.repository.CategoryRepository;
import com.ground.domain.global.repository.LocationRepository;
import com.ground.domain.notification.entity.NotificationBoard;
import com.ground.domain.notification.repository.NotificationBoardRepository;
import com.ground.domain.search.repository.sUserRepository;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.entity.UserCategory;
import com.ground.domain.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final sUserRepository userRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardSaveRepository boardSaveRepository;
    private final NotificationBoardRepository notificationBoardRepository;

    private final BoardFollowRepository followRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private final CommentRepository commentReository;


    // ????????? ??????
    @Transactional
    public Board addBoard(BoardRequestDto params, User user) {

        Board board = params.toEntity();

        //????????????, ??????
        Category category = categoryRepository.findById(params.getCategoryId()).get();
        Location location = locationRepository.findById(params.getLocationId()).get();
        board.setCategory(category);
        board.setLocation(location);

        // ??????, ????????????, ????????????
        board.setUser(user);
        board.setPrivateYN(params.isPrivateYN());
        board.setRegDttm(LocalDateTime.now());

        Board entity = boardRepository.save(board);

        // ????????? ????????? ???????????? setBoard ?????????
        for (BoardImage image : params.getImages()) {
           BoardImage boardImage = BoardImage.builder()
                   .board(entity)
                   .imageType(image.getImageType())
                   .imageUrl(image.getImageUrl()).build();
           boardImageRepository.save(boardImage);
        }
        return entity;
    }

    // ????????? ??????
    @Transactional
    public Board getBoard(Long boardId) {

        // ????????? ??????
        Board board = boardRepository.findById(boardId).get();
        return board;
    }


    // ????????? ??????
    @Transactional
    public Board updateBoard(Long boardId, BoardRequestDto params, User user) {
        // ????????? ??????
        Board board = boardRepository.findById(boardId).get();

        if (user != board.getUser()) {
            throw new RuntimeException("???????????? ?????? ?????? ???????????? ????????????.");
        }


        // ????????????, ??????
        Category category = categoryRepository.findById(params.getCategoryId()).get();
        Location location = locationRepository.findById(params.getLocationId()).get();
        board.setCategory(category);
        board.setLocation(location);

        //????????? ??????, ??????, ????????????
        board.setModUser(user);
        board.setModDttm(LocalDateTime.now());
        board.setPrivateYN(params.isPrivateYN());

        // ????????? ??????
        board.setContent(params.getContent());

        // ?????? ????????? ??????
        final List<BoardImage> boardImages = boardImageRepository.findAllByBoard(board);
        if (boardImages != null) {
            board.getImages().clear();
            for (BoardImage boardImage : boardImages) {
                boardImageRepository.delete(boardImage);
            }
        }

        // ????????? ????????? ???????????? setBoard ?????????
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


    // ????????? ??????
    // ????????? ?????? ?????? ????????? (?????????)
    @Transactional
    public void deleteBoard(Long boardId, User user) {
        Board board = boardRepository.findById(boardId).get();

        if (user != board.getUser()) {
            throw new RuntimeException("???????????? ?????? ?????? ???????????? ????????????.");
        }

        boardRepository.delete(board);

    }

    // ????????? ?????????
    // ????????? ?????? ?????? ????????? (?????????)
    @Transactional
    public void likeBoard(Long boardId, User user) {
        Board board = boardRepository.findById(boardId).get();
        for (BoardLike boardLike : board.getBoardLikes()) {
            if (boardLike.getUser().equals(user)) {
                throw new RuntimeException("?????? ???????????? ??????????????????.");
            }
        }
        board.setLikeCnt(board.getLikeCnt()+1);
        boardLikeRepository.save(new BoardLike(user, board));

        User to = board.getUser();
        notificationBoardRepository.save(new NotificationBoard(user, to, boardId, true, LocalDateTime.now()));
    }

    // ????????? ????????? ??????
    // ????????? ?????? ?????? ?????????
    @Transactional
    public void unLikeBoard(Long boardId, User user) {

        Board board = boardRepository.findById(boardId).get();
        BoardLike boardLike = boardLikeRepository.findByUserAndBoard(user, board).get();
        boardLikeRepository.delete(boardLike);
        board.setLikeCnt(board.getLikeCnt()-1);

    }


    // ????????? ??????
    @Transactional
    public void saveBoard(Long boardId, User user) {
        Board board = boardRepository.findById(boardId).get();
        for (BoardSave boardSave : board.getBoardSaves()) {
            if (boardSave.getUser().equals(user)) {
                throw new RuntimeException("?????? ????????? ??????????????????.");
            }
        }
        boardSaveRepository.save(new BoardSave(user, board));
        board.setSaveCnt(board.getSaveCnt()+1);
    }

    // ????????? ?????? ??????
    // ????????? ?????? ?????? ?????????
    @Transactional
    public void unSaveBoard(Long boardId, User user) {

        Board board = boardRepository.findById(boardId).get();
        BoardSave boardSave = boardSaveRepository.findByUserAndBoard(user, board).get();
        board.setSaveCnt(board.getSaveCnt()-1);
        boardSaveRepository.delete(boardSave);
    }



    // ================= ???????????? ?????? ?????? ========================
    @Transactional
    public List<BoardResponseDto> getInterestBoard(User user, int pageNumber) {

        // ????????????
        List<Long> categoryIdList = new ArrayList<>();
        List<BoardResponseDto> lst = new ArrayList<>();
        for (UserCategory userCategory : user.getUserCategories()) { categoryIdList.add(userCategory.getCategory().getId()); }

        List<User> userList = new ArrayList<>();
        // ???????????? ????????????
        List<User> openUserList = userRepository.findAllByPrivateYN(false);
        userList.addAll(openUserList);
        // ???????????? ????????? ??????
        List<Follow> followList = followRepository.findAllByFromUserIdAndFlag(user, true);
        for (Follow follow : followList) userList.add(follow.getToUserId());
        // ???????????? ???
        userList.add(user);

        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by("id").descending());

        // ???????????? ?????? AND ???????????? ?????? ??? AND ???????????? ???????????? OR ???????????? ????????? ?????? OR ???????????? ???
        Page<Board> boardList = boardRepository.findAllByCategoryIdInAndUserInAndPrivateYN(categoryIdList, userList, false, pageable);
        for (Board board : boardList) { lst.add(new BoardResponseDto(board, user)); }
//        Collections.sort(lst, boardComparator);
        return lst;
    }



    // ================= ????????? ?????? ?????? ====================
    @Transactional
    public List<BoardResponseDto> getFollowBoard(User user, int pageNumber) {

        List<Follow> followList = followRepository.findAllByFromUserIdAndFlag(user, true);
        List<User> userList = new ArrayList<>();
        for (Follow follow : followList) userList.add(follow.getToUserId());

        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by("id").descending());
        Page<Board> boardList = boardRepository.findAllByUserInAndPrivateYN(userList, false, pageable);
        List<BoardResponseDto> lst = new ArrayList<>();

        for (Board board : boardList) {
            lst.add(new BoardResponseDto(board, user));
        }

//        Collections.sort(lst, boardComparator);
        return lst;
    }

    // =================== ?????? ?????? =======================
    @Transactional
    public Comment addComment(CommentRequestDto params, Long boardId, User user) {
        Comment comment = params.toEntity();
        comment.setUser(user);
        Board board = boardRepository.findById(boardId).get();
        comment.setBoard(board);
        comment.setRegDttm(LocalDateTime.now());
        Comment entity = commentReository.save(comment);
        board.setCommentCnt(board.getCommentCnt()+1);

        User to = board.getUser();

        notificationBoardRepository.save(new NotificationBoard(user, to, boardId, false, LocalDateTime.now()));

        return entity;
    }

    // ===================== ?????? ?????? ====================
    @Transactional
    public Comment updateComment(CommentRequestDto params, Long commentId, User user) {
        // ?????? == ????????? ????????? ?????? ??????
        Comment comment = commentReository.findById(commentId).get();
        if (user != comment.getUser()) {
            throw new RuntimeException("???????????? ?????? ????????? ???????????? ????????????.");
        }
        comment.setModDttm(LocalDateTime.now());
        comment.setReply(params.getReply());
        Comment entity = commentReository.save(comment);
        return entity;

    }
    // ===================== ?????? ?????? ======================
    @Transactional
    public void deleteComment(Long commentId, User user) {
        // ?????? == ????????? ????????? ?????? ??????
        Comment comment = commentReository.findById(commentId).get();
        if (user != comment.getUser()) {
            throw new RuntimeException("???????????? ?????? ?????? ???????????? ????????????.");
        }
        commentReository.deleteById(commentId);
        Board board = boardRepository.findById(comment.getBoard().getId()).get();
        board.setCommentCnt(board.getCommentCnt()-1);
    }

    // -----------------BSH-----------------
    // ????????? ??? ?????? ??????
    @Transactional
    public List<BoardResponseDto> getMyBoard(long userId, int pageNumber, User loginUser) {

        List<BoardResponseDto> result = new ArrayList<>();
        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by("id").descending());
        List<Board> boardList = boardRepository.findAllByUserIdOrderByRegDttmDesc(userId, pageable);

        for (Board board : boardList) {
            result.add(new BoardResponseDto(board, loginUser));
        }
        return result;
    }

    // ????????? ?????? ??????
    @Transactional
    public List<BoardResponseDto> getSaveBoard(long userId, int pageNumber, User loginUser) {
        List<Long> boardIdList = new ArrayList<>();
        List<BoardSave> saveList = boardSaveRepository.findAllByUserId(userId);
        for (BoardSave boardSave : saveList) boardIdList.add(boardSave.getBoard().getId());

        List<User> userList = new ArrayList<>();
        // ???????????? ????????????
        List<User> openUserList = userRepository.findAllByPrivateYN(false);
        userList.addAll(openUserList);
        // ???????????? ????????? ??????
        List<Follow> followList = followRepository.findAllByFromUserIdAndFlag(loginUser, true);
        for (Follow follow : followList) userList.add(follow.getToUserId());
        // ???????????? ???
        userList.add(loginUser);

        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by("id").descending());
        List<Board> boardList = boardRepository.findAllByIdInAndUserInAndPrivateYNOrderByRegDttmDesc(boardIdList, userList,false, pageable);
        List<BoardResponseDto> result = new ArrayList<>();
        for (Board board : boardList) result.add(new BoardResponseDto(board, loginUser));

        return result;
    }
}