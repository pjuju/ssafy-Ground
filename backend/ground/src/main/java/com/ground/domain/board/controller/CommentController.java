package com.ground.domain.board.controller;
import com.ground.domain.board.dto.CommentRequestDto;
import com.ground.domain.board.dto.CommentResponseDto;
import com.ground.domain.board.entity.Comment;
import com.ground.domain.board.service.BoardService;
import com.ground.domain.jwt.JwtTokenProvider;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequiredArgsConstructor

public class CommentController {

    @Autowired
    private final BoardService boardService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @ApiOperation(value = "댓글 수정")
    @ApiImplicitParam(name = "commentId", value = "댓글 PK", example = "1", required = true)
    @PutMapping("/{commentId}")
    public CommentResponseDto updateComment(@RequestHeader String Authorization, @PathVariable Long commentId, @RequestBody final CommentRequestDto params){
        String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        Comment comment = boardService.updateComment(params, commentId, user);

        return new CommentResponseDto(comment);
    }

    @ApiOperation(value = "댓글 삭제")
    @ApiImplicitParam(name = "commentId", value = "댓글 PK", example = "1", required = true)
    @DeleteMapping("/{commentId}")
    public String deleteComment(@RequestHeader String Authorization, @PathVariable Long commentId){
        String ftoken = Authorization.substring(7);
        User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
        boardService.deleteComment(commentId, user);
        return "댓글 삭제 완료!";
    }




}
