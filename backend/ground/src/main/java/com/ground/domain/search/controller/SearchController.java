package com.ground.domain.search.controller;
import com.ground.domain.board.dto.BoardRequestDto;
import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.board.service.BoardService;
import com.ground.domain.search.dto.SearchBoardDto;
import com.ground.domain.search.dto.SearchUserDto;
import com.ground.domain.search.dto.sUserDto;
import com.ground.domain.search.service.SearchService;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
	UserRepository userRepository;
	@Autowired
	SearchService searchService;

	// ============================ 유저 검색 ========================
	@ApiOperation(value = "유저 검색")
	@PostMapping("/user")
	public List<sUserDto> searchUser(@RequestBody final SearchUserDto params){
		User user = userRepository.findById(new Long(1)).get();
		return searchService.searchUser(params, user);
	}



	// ============================ 유저 최근 검색어 조회========================
	@ApiOperation(value = "유저 최근 검색어 조회")
	@GetMapping("/user")
	public List<SearchUserDto> getSearchUser(){
		User user = userRepository.findById(new Long(1)).get();
		return searchService.getSearchUser(user);
	}





	// ============================ 유저 검색어 삭제 ========================
	@ApiOperation(value = "유저 검색어 삭제")
	@ApiImplicitParam(name = "searchUserId", value = "유저 검색 PK", example = "1", required = true)
	@DeleteMapping("/user/{searchUserId}")
	public void deleteSearchUser(@PathVariable Long searchUserId){
		User user = userRepository.findById(new Long(1)).get();
		searchService.deleteSearchUser(user, searchUserId);
	}





	// ============================ 유저 검색어 전체 삭제 ========================
	@ApiOperation(value = "유저 검색어 전체 삭제")
	@DeleteMapping("/user")
	public void deleteAllSearchUser(){
		User user = userRepository.findById(new Long(1)).get();
		searchService.deleteAllSearchUser(user);

	}



	// ============================ 게시글 검색! ========================
	@ApiOperation(value = "게시글 검색")
	@PostMapping("/board")
	public List<BoardResponseDto> searchBoard(@RequestBody final SearchBoardDto params, @PageableDefault(size=3) Pageable pageable){
		User user = userRepository.findById(new Long(1)).get();
		return searchService.searchBoard(params, user, pageable);
	}

	// ============================ 게시글 최근 검색어 조회 ========================
	@ApiOperation(value = "게시글 최근 검색어 조회")
	@GetMapping("/board")
	public String getSearchBoard(){ return "게시글 검색 리스트 조회!"; }

	// ============================ 게시글 검색어 삭제 ========================
	@ApiOperation(value = "게시글 검색어 삭제")
	@ApiImplicitParam(name = "searchBoardId", value = "게시글 검색 PK", example = "1", required = true)
	@DeleteMapping("/board/{searchBoardId}")
	public String deleteSearchBoard(){ return "게시글 검색 결과 삭제!"; }

}
