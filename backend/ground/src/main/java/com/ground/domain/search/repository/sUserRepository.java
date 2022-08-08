package com.ground.domain.search.repository;
import com.ground.domain.user.entity.Age;
import com.ground.domain.user.entity.Gender;
import com.ground.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface sUserRepository extends JpaRepository<User, Long> {
    List<User> findByNicknameStartingWithIgnoreCase(String wordA);
    List<User> findAllByPrivateYN(boolean b);

    List<User> findAllByAgeInAndGenderIn(List<Age> age, List<Gender> gender);

    @Query("select u from User u where u.privateYN = ?1 or u.id in ?2")
    List<User> findAllByPrivateYNOrIdIn(boolean b, List<Long> followIdList);

    List<User> findAllByIdInAndIdIn(List<Long> filterUserIdList, List<Long> openUserIdList);


//    List<User> findAllByAgeIn(String wordA);
//    List<User> findAllByAgeIn(String wordA);
//
//    userList.addAll(userRepository.findAllByAgeIn(age));
//    userList.addAll(userRepository.findAllByGenderIn(gender));
}


