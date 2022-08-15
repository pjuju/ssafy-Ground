package com.ground.domain.search.controller;

import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.jwt.JwtTokenProvider;
import com.ground.domain.search.dto.SearchBoardDto;
import com.ground.domain.search.dto.SearchBoardResponseDto;
import com.ground.domain.search.dto.SearchUserDto;
import com.ground.domain.search.dto.sUserDto;
import com.ground.domain.search.service.SearchService;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequiredArgsConstructor
public class SearchController {
	private final UserRepository userRepository;
	@Autowired
	private final SearchService searchService;
	private final JwtTokenProvider jwtTokenProvider;

	// ============================ 유저 검색 ========================
	@ApiOperation(value = "유저 검색")
	@PostMapping("/user")
	public List<sUserDto> searchUser(@RequestHeader String Authorization, @RequestBody final SearchUserDto params){
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		return searchService.searchUser(params, user);
	}


	// ============================ 유저 최근 검색어 조회========================
	@ApiOperation(value = "유저 최근 검색어 조회")
	@GetMapping("/user")
	public List<SearchUserDto> getSearchUser(@RequestHeader String Authorization){
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		return searchService.getSearchUser(user);
	}


	// ============================ 유저 검색어 삭제 ========================
	@ApiOperation(value = "유저 검색어 삭제")
	@ApiImplicitParam(name = "searchUserId", value = "유저 검색 PK", example = "1", required = true)
	@DeleteMapping("/user/{searchUserId}")
	public void deleteSearchUser(@RequestHeader String Authorization, @PathVariable Long searchUserId){
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		searchService.deleteSearchUser(user, searchUserId);
	}


	// ============================ 유저 검색어 전체 삭제 ========================
	@ApiOperation(value = "유저 검색어 전체 삭제")
	@DeleteMapping("/user")
	public void deleteAllSearchUser(@RequestHeader String Authorization){
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		searchService.deleteAllSearchUser(user);

	}



//	 ============================ 게시글 검색! ========================
	@ApiOperation(value = "게시글 검색")
	@PostMapping("/board/{pageNumber}")
	public List<BoardResponseDto> searchBoard(@RequestHeader String Authorization, @PathVariable int pageNumber, @RequestBody final SearchBoardDto params) {
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		return searchService.searchBoard(params, user, pageNumber);
	}


	// ============================ 게시글 최근 검색어 조회 ========================
	@ApiOperation(value = "게시글 최근 검색어 조회")
	@GetMapping("/board")
	public List<SearchBoardResponseDto> getSearchBoard(@RequestHeader String Authorization){
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		return searchService.getSearchBoard(user);
	}
//

	// ============================ 게시글 검색어 삭제 ========================
	@ApiOperation(value = "게시글 검색어 삭제")
	@ApiImplicitParam(name = "searchBoardId", value = "게시글 검색 PK", example = "1", required = true)
	@DeleteMapping("/board/{searchBoardId}")
	public void deleteSearchBoard(@RequestHeader String Authorization, @PathVariable Long searchBoardId){
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		searchService.deleteSearchBoard(user, searchBoardId);
	}


	// ============================ 게시글 검색어 전체 삭제 ========================
	@ApiOperation(value = "게시글 검색어 전체 삭제")
	@DeleteMapping("/board")
	public void deleteAllSearchBoard(@RequestHeader String Authorization){
		String ftoken = Authorization.substring(7);
		User user = userRepository.findByUsername(jwtTokenProvider.getSubject(ftoken)).get();
		searchService.deleteAllSearchBoard(user);
	}
}
