package com.ground.domain.search.service;

import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.entity.Board;
import com.ground.domain.board.repository.BoardFollowRepository;
import com.ground.domain.board.repository.BoardRepository;
import com.ground.domain.follow.entity.Follow;
import com.ground.domain.search.dto.SearchBoardDto;
import com.ground.domain.search.dto.SearchBoardResponseDto;
import com.ground.domain.search.dto.SearchUserDto;
import com.ground.domain.search.dto.sUserDto;
import com.ground.domain.search.entity.SearchBoard;
import com.ground.domain.search.entity.SearchUser;
import com.ground.domain.search.repository.SearchBoardRepository;
import com.ground.domain.search.repository.SearchUserRepository;
import com.ground.domain.search.repository.sUserRepository;
import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchService {

    private final SearchUserRepository searchUserRepository;
    private final SearchBoardRepository searchBoardRepository;
    private final BoardRepository boardRepository;
    private final sUserRepository userRepository;
    private final UserComparator userComparator;
    private final BoardFollowRepository followRepository;


    // =========================== 유저 검색 =======================
    @Transactional
    public List<sUserDto> searchUser(SearchUserDto params, User user) {

        // 최근 유저 검색어 테이블 추가
        SearchUser now = params.toEntity();
        String word = params.getWord();
        now.setUser(user);
        searchUserRepository.save(now);

        List<SearchUser> searchUserList = searchUserRepository.findAllByUserOrderByIdDesc(user);

        // 하나라도 있으면
        if (searchUserList.size() >= 2) {
            SearchUser first = searchUserList.get(1);
            // 이전 첫번째꺼랑 같으면 그거 삭제해줌
            if (word.equals(first.getWord())) {
                searchUserList.remove(first);
                searchUserRepository.delete(first);
            }
            // 10개 넘어가면 삭제해줌(한 사람당 10개씩만 유지)
            if (searchUserList.size() == 11) {
                searchUserRepository.delete(searchUserList.get(10));
                searchUserList.remove(10);
            }
        }

        List<User> userList = userRepository.findByNicknameStartingWithIgnoreCase(word);
        List<sUserDto> result = new ArrayList<>();
        for (User searchUser : userList) {
            result.add(new sUserDto(searchUser));
        }

        Collections.sort(result, userComparator);
        return result;
    }



    // =========================== 유저 최근 검색어 조회=======================
    @Transactional
    public List<SearchUserDto> getSearchUser(User user) {
        List<SearchUserDto> result = new ArrayList<>();
        List<SearchUser> searchList = searchUserRepository.findAllByUserOrderByIdDesc(user);
        for (SearchUser searchUser : searchList) {
            result.add(new SearchUserDto(searchUser));
        }
        return result;
    }

    // =========================== 유저 검색어 삭제 =======================
    @Transactional
    public void deleteSearchUser(User user, Long searchUserId) {
        // 유저 확인 필요
        searchUserRepository.deleteById(searchUserId);
    }

    // ========================== 유저 검색어 전체 삭제 ========================
    @Transactional
    public void deleteAllSearchUser(User user) {

        // 유저 확인 필요
        searchUserRepository.deleteAllByUser(user);
    }



//     ========================= 게시글 검색 ================================
    @Transactional
    public List<BoardResponseDto> searchBoard(SearchBoardDto params, User user, int pageNumber) {
        SearchBoard now = params.toEntity();
        String word = params.getWord();
        now.setUser(user);
        searchBoardRepository.save(now);

        List<SearchBoard> searchBoardList = searchBoardRepository.findAllByUserOrderByIdDesc(user);

        // 하나라도 있으면
        if (searchBoardList.size() >= 2) {
            SearchBoard first = searchBoardList.get(1);
            // 이전 첫번째꺼랑 같으면 그거 삭제해줌
            if (word.equals(first.getWord())) {
                searchBoardList.remove(first);
                searchBoardRepository.delete(first);
            }
            // 10개 넘어가면 삭제해줌(한 사람당 10개씩만 유지)
            if (searchBoardList.size() == 11) {
                searchBoardRepository.delete(searchBoardList.get(10));
                searchBoardList.remove(10);
            }
        }

        List<Long> category = params.getCategory();
        List<Long> location = params.getLocation();
        LocalDateTime startDate = params.getStartDate().atTime(LocalTime.MIN);
        LocalDateTime endDate = params.getEndDate().atTime(LocalTime.MAX);

        List<String> age = params.getAge();
        List<String> gender = params.getGender();
        List<Age> ageEnum = new ArrayList<>();
        List<Gender> genderEnum = new ArrayList<>();
        for (String s : age) {
            ageEnum.add(Age.valueOf(s));
        }
        for (String s : gender) {
            genderEnum.add(Gender.valueOf(s));

        }

        // 팔로우 유저 Id들
        List<Long> followIdList = new ArrayList<>();
        List<Follow> followList = followRepository.findAllByfromUserId(user);
        for (Follow follow : followList) followIdList.add(follow.getToUserId().getId());
        followIdList.add(user.getId());
        // 작성자가 공개유저나 팔로우한 유저들이거나 나
        List<User> openUserList = userRepository.findAllByPrivateYNOrIdIn(false, followIdList);
        List<Long> openUserIdList = new ArrayList<>();
        for (User user1 : openUserList) {
            openUserIdList.add(user1.getId());
        }

        // 필터링 유저들
        List<User> filterUserList = userRepository.findAllByAgeInAndGenderIn(ageEnum, genderEnum);
        List<Long> filterUserIdList = new ArrayList<>();
        for (User user1 : filterUserList) {
            filterUserIdList.add(user1.getId());
        }

        // 작성자가 공개유저나 팔로우한 유저들이거나 나 + 필터링 적용
        List<User> userList = userRepository.findAllByIdInAndIdIn(filterUserIdList, openUserIdList);

        // 페이징, 정렬
        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by(params.getType()).descending());

        // 결과 리스트
        List<BoardResponseDto> lst = new ArrayList<>();

        // 카테고리 포함 AND 게시글이 공개 글 AND 작성자가 공개유저 OR 작성자가 팔로우 유저 OR 작성자가 나
        Page<Board> boardList = boardRepository.findAllByCategoryIdInAndLocationIdInAndContentContainingIgnoreCaseAndRegDttmBetweenAndPrivateYNAndUserIn(
                category, location, word, startDate, endDate, false, userList, pageable);
        for (Board board : boardList) { lst.add(new BoardResponseDto(board, user)); }
        return lst;
    }

    // =========================== 게시글 최근 검색어 조회=======================
    @Transactional
    public List<SearchBoardResponseDto> getSearchBoard(User user) {
        List<SearchBoardResponseDto> result = new ArrayList<>();
        List<SearchBoard> searchList = searchBoardRepository.findAllByUserOrderByIdDesc(user);
        for (SearchBoard searchBoard : searchList) {
            result.add(new SearchBoardResponseDto(searchBoard));
        }
        return result;
    }

    // =========================== 게시글 검색어 삭제 =======================
    @Transactional
    public void deleteSearchBoard(User user, Long searchBoardId) {
        // 유저 확인 필요
        searchBoardRepository.deleteById(searchBoardId);
    }

    // ========================== 유저 검색어 전체 삭제 ========================
    @Transactional
    public void deleteAllSearchBoard(User user) {

        searchBoardRepository.deleteAllByUser(user);
    }



//
    @Component
    public static class UserComparator implements Comparator<sUserDto> {
        @Override
        public int compare(sUserDto a, sUserDto b) {
            return  a.getNickname().length() - b.getNickname().length();

        }
    }
}
