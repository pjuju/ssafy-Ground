package com.ground.domain.board.controller;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {
        @ApiResponse(code = 200, message = "OK~!"),
        @ApiResponse(code = 401, message = "Unauthorized"),
        @ApiResponse(code = 403, message = "Forbidden"),
        @ApiResponse(code = 404, message = "Not Found"),
        @ApiResponse(code = 500, message = "Failure")
})
@RestController
@RequestMapping("/rest/comment")
public class CommentController {

    @ApiOperation(value = "댓글 수정")
    @ApiImplicitParam(name = "commentId", value = "댓글 PK", example = "1", required = true)
    @PutMapping("/{commentId}")
    public String updateComment(){ return "댓글 수정!"; }

    @ApiOperation(value = "댓글 삭제")
    @ApiImplicitParam(name = "commentId", value = "댓글 PK", example = "1", required = true)
    @DeleteMapping("/{commentId}")
    public String deleteComment(){ return "댓글 삭제!"; }

}
