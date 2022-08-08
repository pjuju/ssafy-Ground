package com.ground.domain.follow.repository;

import com.ground.domain.follow.dto.FollowDto;
import com.ground.domain.follow.entity.Follow;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findFollowByFromUserIdAndToUserId(long from_user_id, long to_user_id);

    //
    @Query(value = "SELECT COUNT(*) FROM t_user_follow WHERE to_user_id = :profileId", nativeQuery = true)
    int findFollowerCountById(@Param("profileId")long profileId);

    @Query(value = "SELECT COUNT(*) FROM t_user_follow WHERE from_user_id = :profileId", nativeQuery = true)
    int findFollowingCountById(@Param("profileId")long profileId);

    @Modifying
    @Query(value = "INSERT INTO t_user_follow(from_user_id, to_user_id) VALUES(:fromId, :toId)", nativeQuery = true)
    void follow(@Param("fromId")long fromId, @Param("toId")long toId);

    @Modifying
    @Query(value = "DELETE FROM t_user_follow WHERE from_user_id = :fromId AND to_user_id = :toId", nativeQuery = true)
    void unFollow(@Param("fromId")long fromId, @Param("toId")long toId);

    Follow findByFromUserIdAndToUserId(User fromUserId, User toUserId);

}
