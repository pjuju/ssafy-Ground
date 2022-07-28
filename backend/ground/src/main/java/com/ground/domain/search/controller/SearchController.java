package com.ground.domain.search.controller;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {
		@ApiResponse(code = 200, message = "OK~!"),
		@ApiResponse(code = 401, message = "Unauthorized"),
		@ApiResponse(code = 403, message = "Forbidden"),
		@ApiResponse(code = 404, message = "Not Found"),
		@ApiResponse(code = 500, message = "Failure")
})
@RestController
@RequestMapping("/rest/search")
public class SearchController {

	@ApiOperation(value = "유저 검색")
	@PostMapping("/user")
	public String searchUser(){ return "유저 검색!"; }

	@ApiOperation(value = "유저 검색 리스트 조회")
	@GetMapping("/user")
	public String getSearchUser(){ return "유저 검색 리스트 조회!"; }

	@ApiOperation(value = "유저 검색 결과 삭제")
	@ApiImplicitParam(name = "searchUserId", value = "유저 검색 PK", example = "1", required = true)
	@DeleteMapping("user/{searchUserId}")
	public String deleteSearchUser(){ return "댓글 수정!"; }



	@ApiOperation(value = "게시글 검색")
	@PostMapping("/board")
	public String searchBoard(){ return "게시글 검색!"; }

	@ApiOperation(value = "게시글 검색 리스트 조회")
	@GetMapping("/board")
	public String getSearchBoard(){ return "게시글 검색 리스트 조회!"; }

	@ApiOperation(value = "게시글 검색 결과 삭제")
	@ApiImplicitParam(name = "searchBoardId", value = "게시글 검색 PK", example = "1", required = true)
	@DeleteMapping("board/{searchBoardId}")
	public String deleteSearchBoard(){ return "게시글 검색 결과 삭제!"; }

}
