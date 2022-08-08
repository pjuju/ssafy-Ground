package com.ground.domain.board.controller;

import com.ground.domain.board.dto.BoardRequestDto;
import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.dto.CommentRequestDto;
import com.ground.domain.board.dto.CommentResponseDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.board.entity.Comment;
import com.ground.domain.board.service.BoardService;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// bsh

@ApiResponses(value = {
        @ApiResponse(code = 200, message = "OK~!"),
        @ApiResponse(code = 401, message = "Unauthorized"),
        @ApiResponse(code = 403, message = "Forbidden"),
        @ApiResponse(code = 404, message = "Not Found"),
        @ApiResponse(code = 500, message = "Failure")
})
@RestController
@RequestMapping("/rest/board")
@RequiredArgsConstructor
//@CrossOrigin(allowCredentials = "true", originPatterns = { "*" })
public class BoardController {

    @Autowired
    BoardService boardService;
    @Autowired
    UserRepository userRepository;


    // =================== 게시글 작성 ===================
    @ApiOperation(value = "게시물 작성")
    @PostMapping
    public BoardResponseDto addBoard(@RequestBody final BoardRequestDto params){
        User user = userRepository.findById(new Long(1)).get();
        Board board = boardService.addBoard(params, user);
        return new BoardResponseDto(board);
        // 유저도 넣어야함
    }



    // =================== 게시글 조회===================
    @ApiOperation(value = "게시물 조회")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @GetMapping("/{boardId}")
    public BoardResponseDto findBoard(@PathVariable Long boardId){
        Board board = boardService.getBoard(boardId);
        return new BoardResponseDto(board);
    }



    // =================== 게시글 수정===================
    @ApiOperation(value = "게시물 수정")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PutMapping("/{boardId}")
    public BoardResponseDto updateBoard(@PathVariable Long boardId, @RequestBody final BoardRequestDto params){
        Board board = boardService.updateBoard(boardId, params);
        return new BoardResponseDto(board);
    }


    // =================== 게시글 삭제===================
    @ApiOperation(value = "게시물 삭제")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable Long boardId){
        boardService.deleteBoard(boardId);
    }

    // =================== 게시글 좋아요===================
    @ApiOperation(value = "게시글 좋아요")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/{boardId}/like")
    public void likeBoard(@PathVariable Long boardId){
        boardService.likeBoard(boardId);
    }

    // =================== 게시글 좋아요 취소===================
    @ApiOperation(value = "게시물 좋아요 취소")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/{boardId}/like")
    public void unlikeBoard(@PathVariable Long boardId){

        boardService.unLikeBoard(boardId);
    }

    // ================== 게시글 저장 ========================
    @ApiOperation(value = "게시물 저장")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/{boardId}/save")
    public void saveBoard(@PathVariable Long boardId){
        boardService.saveBoard(boardId);
    }

    // ================== 게시글 저장 취소========================
    @ApiOperation(value = "게시물 저장 취소")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/{boardId}/save")
    public void unsaveBoard(@PathVariable Long boardId){
        boardService.unSaveBoard(boardId);;
    }



    // ================= 관심종목 피드 조회 ========================
    @ApiOperation(value = "관심종목 피드 조회")
    @GetMapping("/interest")
    public List<BoardResponseDto> getInterestBoard(@PageableDefault(size=3) Pageable pageable){
        User user = userRepository.findById(new Long(1)).get();
        return boardService.getInterestBoard(user, pageable);
    }

    // ================= 팔로우 피드 조회 ========================
    @ApiOperation(value = "팔로우 피드 조회")
    @GetMapping("/follow")
    public List<BoardResponseDto> getFollowBoard(@PageableDefault(size=10) Pageable pageable){
        User user = userRepository.findById(new Long(1)).get();
        return boardService.getFollowBoard(user, pageable);
    }

    // ================== 게시글 댓글 생성 =============================
    @ApiOperation(value = "댓글 생성")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/{boardId}/comment")
    public CommentResponseDto addComment(@PathVariable Long boardId, @RequestBody final CommentRequestDto params){

        User user = userRepository.findById(new Long(1)).get();
        Comment comment = boardService.addComment(params, boardId, user);

        return new CommentResponseDto(comment);
    }


    // -----------------BSH-----------------
    // 유저가 쓴 피드 조회
    @ApiOperation(value = "유저가 쓴 피드 조회")
    @GetMapping("/list/me/{userId}")
    public List<BoardResponseDto> getMyBoard(@PathVariable long userId, @PageableDefault(size=12) Pageable pageable) {
        return boardService.getMyBoard(userId, pageable);
    }

    // 저장한 피드 조회
    @ApiOperation(value = "저장한 피드 조회")
    @GetMapping("/list/save/{userId}")
    public List<BoardResponseDto> getSaveBoard(@PathVariable long userId, @PageableDefault(size=12) Pageable pageable) {
        return boardService.getSaveBoard(userId, pageable);
    }
}
