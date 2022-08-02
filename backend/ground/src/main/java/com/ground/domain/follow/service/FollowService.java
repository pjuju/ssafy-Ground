package com.ground.domain.follow.service;

import com.ground.domain.follow.entity.Follow;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import com.ground.domain.follow.repository.FollowRepository;
import com.ground.domain.follow.dto.FollowDto;

import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FollowService {

    private FollowRepository followRepository;
    private EntityManager em;

    @Transactional
    public Long follow(long fromUserId, long toUserId) {
//        if(followRepository.findFollowByFromUserIdAndToUserId(fromUserId, toUserId) != null) throw new CustomApiException("이미 팔로우 하였습니다.");
        followRepository.follow(fromUserId, toUserId);

        return toUserId;
    }

    private UserRepository userRepository;
    @Transactional
    public Follow save(Long fromUserId, Long toUserId) {
        User fromUser = userRepository.findById(fromUserId).orElseThrow(()
                -> new IllegalArgumentException("해당 유저는 존재하지 않습니다."));
        User toUser = userRepository.findById(toUserId).orElseThrow(()
                -> new IllegalArgumentException("해당 유저는 존재하지 않습니다."));

        return followRepository.save(Follow.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .build());
    }

    @Transactional
    public void unFollow(long fromUserId, long toUserId) {
        followRepository.unFollow(fromUserId, toUserId);
    }

}
