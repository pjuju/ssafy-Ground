package com.ground.domain.board.controller;

import com.ground.domain.board.service.BoardService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
//@CrossOrigin(allowCredentials = "true", originPatterns = { "*" })
public class BoardController {
    @ApiOperation(value = "게시물 생성")
    @PostMapping
    public String addBoard(){
        return "add Board!";
    }

    @ApiOperation(value = "게시물 조회")
    @ApiImplicitParam(
            name = "boardId", value = "게시물 PK", example = "1", required = true)
    @GetMapping
    public String findBoard(){
        return "find one Board!";
    }

    @ApiOperation(value = "게시물 수정")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @PutMapping
    public String updateBoard(){
        return "update one Board!";
    }

    @ApiOperation(value = "게시물 삭제")
    @ApiImplicitParam(name = "boardId", value = "게시물 PK", example = "1", required = true)
    @DeleteMapping
    public String deleteBoard(){
        return "delete one Board!";
    }






}
