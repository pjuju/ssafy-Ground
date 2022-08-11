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
import com.ground.domain.jwt.JwtTokenProvider;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
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
    private final BoardService boardService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;


    // =================== 게시글 작성 ===================
    @ApiOperation(value = "게시물 작성")
    @PostMapping
    public BoardResponseDto addBoard(@RequestHeader String Authorization, @RequestBody final BoardRequestDto params){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Board board = boardService.addBoard(params, user);
        return new BoardResponseDto(board, user);
        // 유저도 넣어야함
    }



    // =================== 게시글 조회===================
    @ApiOperation(value = "게시물 조회")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @GetMapping("/{boardId}")
    public BoardResponseDto findBoard(@RequestHeader String Authorization, @PathVariable Long boardId){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Board board = boardService.getBoard(boardId);
        return new BoardResponseDto(board, user);
    }



    // =================== 게시글 수정===================
    @ApiOperation(value = "게시물 수정")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PutMapping("/{boardId}")
    public BoardResponseDto updateBoard(@RequestHeader String Authorization, @PathVariable Long boardId, @RequestBody final BoardRequestDto params){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Board board = boardService.updateBoard(boardId, params, user);
        return new BoardResponseDto(board, user);
    }


    // =================== 게시글 삭제===================
    @ApiOperation(value = "게시물 삭제")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@RequestHeader String Authorization, @PathVariable Long boardId){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        boardService.deleteBoard(boardId, user);
    }

    // =================== 게시글 좋아요===================
    @ApiOperation(value = "게시글 좋아요")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/{boardId}/like")
    public void likeBoard(@RequestHeader String Authorization, @PathVariable Long boardId){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        boardService.likeBoard(boardId, user);
    }

    // =================== 게시글 좋아요 취소===================
    @ApiOperation(value = "게시물 좋아요 취소")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/{boardId}/like")
    public void unlikeBoard(@RequestHeader String Authorization, @PathVariable Long boardId){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        boardService.unLikeBoard(boardId, user);
    }

    // ================== 게시글 저장 ========================
    @ApiOperation(value = "게시물 저장")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/{boardId}/save")
    public void saveBoard(@RequestHeader String Authorization, @PathVariable Long boardId){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        boardService.saveBoard(boardId, user);
    }

    // ================== 게시글 저장 취소========================
    @ApiOperation(value = "게시물 저장 취소")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/{boardId}/save")
    public void unsaveBoard(@RequestHeader String Authorization, @PathVariable Long boardId){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        boardService.unSaveBoard(boardId, user);
    }

    // ================= 관심종목 피드 조회 ========================
    @ApiOperation(value = "관심종목 피드 조회")
    @GetMapping("/interest/{pageNumber}")
    public List<BoardResponseDto> getInterestBoard(@RequestHeader String Authorization, @PathVariable int pageNumber){
    	String ftoken = Authorization.substring(7);

        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();

        return boardService.getInterestBoard(user, pageNumber);
    }

    // ================= 팔로우 피드 조회 ========================
    @ApiOperation(value = "팔로우 피드 조회")
    @GetMapping("/follow/{pageNumber}")
    public List<BoardResponseDto> getFollowBoard(@RequestHeader String Authorization, @PathVariable int pageNumber){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        return boardService.getFollowBoard(user, pageNumber);
    }

    // ================== 게시글 댓글 생성 =============================
    @ApiOperation(value = "댓글 생성")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/{boardId}/comment")
    public CommentResponseDto addComment(@RequestHeader String Authorization, @PathVariable Long boardId, @RequestBody final CommentRequestDto params){
    	String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Comment comment = boardService.addComment(params, boardId, user);

        return new CommentResponseDto(comment);
    }

    // -----------------BSH-----------------
    // 유저가 쓴 피드 조회
    @ApiOperation(value = "유저가 쓴 피드 조회")
    @GetMapping("/list/me/{userId}")
    public List<BoardResponseDto> getMyBoard(@PathVariable long userId, @PageableDefault(size=12) Pageable pageable, @RequestHeader String Authorization) {
    	String ftoken = Authorization.substring(7);
        User loginUser = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        return boardService.getMyBoard(userId, pageable, loginUser);
    }

    // 저장한 피드 조회
    @ApiOperation(value = "저장한 피드 조회")
    @GetMapping("/list/save/{userId}")
    public List<BoardResponseDto> getSaveBoard(@PathVariable long userId, @PageableDefault(size=12) Pageable pageable, @RequestHeader String Authorization) {
    	String ftoken = Authorization.substring(7);
        User loginUser = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        return boardService.getSaveBoard(userId, pageable, loginUser);
    }

}
