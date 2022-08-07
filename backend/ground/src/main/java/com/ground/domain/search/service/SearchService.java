package com.ground.domain.search.service;

import com.ground.domain.board.dto.BoardResponseDto;
import com.ground.domain.board.service.BoardService;
import com.ground.domain.search.dto.SearchBoardDto;
import com.ground.domain.search.dto.SearchUserDto;
import com.ground.domain.search.dto.sUserDto;
import com.ground.domain.search.entity.SearchBoard;
import com.ground.domain.search.entity.SearchUser;
import com.ground.domain.search.repository.SearchBoardRepository;
import com.ground.domain.search.repository.sUserRepository;
import com.ground.domain.search.repository.SearchUserRepository;
import com.ground.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
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
    private final sUserRepository userRepository;
    private final UserComparator userComparator;


    // =========================== 유저 검색 =======================
    @Transactional
    public List<sUserDto> searchUser(SearchUserDto params, User user) {

        // 최근 유저 검색어 테이블 추가
        SearchUser now = params.toEntity();
        String word = now.getWord();
        now.setUser(user);
        searchUserRepository.save(now);

        List<SearchUser> searchUserList = searchUserRepository.findAllByUserOrderByIdDesc(user);

        // 하나라도 있으면
        if (searchUserList.size() >= 1) {
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
            result.add(new sUserDto(searchUser, word));
        }
        Comparator<? super sUserDto> UserComparator;
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



    // ========================= 게시글 검색 ================================
    @Transactional
    public List<BoardResponseDto> searchBoard(SearchBoardDto params, User user, Pageable pageable) {
        SearchBoard now = params.toEntity();
        String word = now.getWord();
        now.setUser(user);
        searchBoardRepository.save(now);

        List<SearchBoard> searchBoardList = searchBoardRepository.findAllByUserOrderByIdDesc(user);

        // 하나라도 있으면
        if (searchBoardList.size() >= 1) {
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


        List<String> age = params.getAge();
        List<Integer> category = params.getCategory();
        LocalDateTime startDate = params.getStartDate().atTime(LocalTime.MIN);
        LocalDateTime endDate = params.getEndDate().atTime(LocalTime.MAX);

        params.getStartDate();
        params.getLocation();
        List<String> gender = params.getGender();



    }


    @Component
    public static class UserComparator implements Comparator<sUserDto> {
        @Override
        public int compare(sUserDto a, sUserDto b) {
            if (a.getWord().length() > b.getWord().length()){
                return 1;
            }
            return -1;
        }
    }
}
