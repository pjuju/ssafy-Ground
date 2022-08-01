package com.ground.domain.board.controller;

import com.ground.domain.board.dto.BoardAddRequestDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.board.service.BoardService;
import com.ground.domain.user.entity.User;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

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

    private final BoardService boardService;


    // =================== 게시글 작성 ===================
    @ApiOperation(value = "게시물 작성")
    @PostMapping
    public Long addBoard(@RequestBody final BoardAddRequestDto params){

        return boardService.addBoard(params);
        // 유저도 넣어야함
    }





    // =================== 게시글 조회회===================
    @ApiOperation(value = "게시물 조회")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @GetMapping
    public String findBoard(){ return "게시물 조회!"; }

    @ApiOperation(value = "게시물 수정")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PutMapping
    public String updateBoard(){
        return "게시물 수정!";
    }

    @ApiOperation(value = "게시물 삭제")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping
    public String deleteBoard(){
        return "게시물 삭제!";
    }

    @ApiOperation(value = "게시글 좋아요")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/like")
    public String likeBoard(){
        return "게시글 좋아요!";
    }

    @ApiOperation(value = "게시물 좋아요 취소")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/like")
    public String unlikeBoard(){
        return "게시물 좋아요 취소!";
    }

    @ApiOperation(value = "게시물 저장")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PostMapping("/save")
    public String saveBoard(){
        return "게시물 저장!";
    }

    @ApiOperation(value = "게시물 저장 취소")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping("/save")
    public String unsaveBoard(){
        return "게시물 저장 취소!";
    }

    @ApiOperation(value = "팔로우 피드 조회")
    @ApiImplicitParam(name = "page", value = "게시물 page", example = "1", required = true)
    @GetMapping("/follow")
    public String getFollowBoard(){
        return "팔로우 피드 조회!";
    }

    @ApiOperation(value = "관심종목 피드 조회")
    @ApiImplicitParam(name = "page", value = "게시물 page", example = "1", required = true)
    @GetMapping("/interest")
    public String geInterestBoard(){
        return "관심종목 피드 조회!";
    }







}
