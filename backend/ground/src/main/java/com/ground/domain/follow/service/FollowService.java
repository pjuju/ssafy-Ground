package com.ground.domain.follow.service;

import com.ground.domain.follow.entity.Follow;
import com.ground.domain.user.entity.User;
import com.ground.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;

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

    private final FollowRepository followRepository;
    private final EntityManager em;

    @Transactional
    public void follow(Long fromUserId, Long toUserId) {
//        if(followRepository.findFollowByFromUserIdAndToUserId(fromUserId, toUserId) != null) throw new CustomApiException("이미 팔로우 하였습니다.");
        followRepository.follow(fromUserId, toUserId);
    }

    @Transactional
    public void unFollow(long fromUserId, long toUserId) {

        followRepository.unFollow(fromUserId, toUserId);
    }
    @Transactional
    public List<FollowDto> getFollower(long profileId, long userId) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT u.id, u.nickname, ");
        sb.append("if ((SELECT 1 FROM t_user_follow WHERE from_user_id = ? AND to_user_id = u.id), TRUE, FALSE) AS followState, ");
        sb.append("if ((?=u.id), TRUE, FALSE) AS loginUser ");
        sb.append("FROM t_user u, t_user_follow f ");
        sb.append("WHERE u.id = f.from_user_id AND f.to_user_id = ?");

        Query query = em.createNativeQuery(sb.toString())
                .setParameter(1, userId)
                .setParameter(2, userId)
                .setParameter(3, profileId);

        JpaResultMapper result = new JpaResultMapper();
        List<FollowDto> followDtoList = result.list(query, FollowDto.class);
        return followDtoList;
    }

    @Transactional
    public List<FollowDto> getFollowing(long profileId, long userId) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT u.id, u.nickname, ");
        sb.append("if ((SELECT 1 FROM t_user_follow WHERE from_user_id = ? AND to_user_id = u.id), TRUE, FALSE) AS followState, ");
        sb.append("if ((?=u.id), TRUE, FALSE) AS loginUser ");
        sb.append("FROM t_user u, t_user_follow f ");
        sb.append("WHERE u.id = f.to_user_id AND f.from_user_id = ?");

        Query query = em.createNativeQuery(sb.toString())
                .setParameter(1, userId)
                .setParameter(2, userId)
                .setParameter(3, profileId);

        JpaResultMapper result = new JpaResultMapper();
        List<FollowDto> followDtoList = result.list(query, FollowDto.class);
        return followDtoList;
    }
}
