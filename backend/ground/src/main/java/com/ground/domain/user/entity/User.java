package com.ground.domain.user.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.ground.domain.user.dto.UserUpdateDto;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ground.domain.board.entity.BoardLike;
import com.ground.domain.board.entity.BoardSave;
import com.ground.domain.board.entity.Comment;
import com.ground.domain.global.entity.Image;
import com.ground.domain.global.entity.Location;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "t_user")
public class User {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "pass")
    private String pass;

    @Column(name= "email", unique = true)
    private String email;

    @Column(name= "nickname", unique = true)
    private String nickname;

    // 디폴트 값 넣어줄지
    @Column(name = "del_YN", columnDefinition="tinyint(1) default 0")
    private boolean delYN;
    
    @Column(name = "register_YN", columnDefinition="tinyint(1) default 0")
    private boolean registerYN;

    @Column(name = "private_YN" ,columnDefinition="tinyint(1) default 0")
    private boolean privateYN;

    @Column(name = "age")
    @Enumerated(EnumType.STRING)
    private Age age;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Lob
    @Column(name = "introduce")
    private String introduce;

    @CreatedDate
    @Column(name = "reg_dttm")
    private LocalDateTime regDttm;

    @Column(name = "mod_dttm")
    private LocalDateTime modDttm;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserCategory> userCategories = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BoardLike> boardLikes = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BoardSave> boardSaves = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
    
    @Column(name = "mod_user_id")
    private String modUser;
    
    @Lob
    @Column(name = "user_image")
    private String userImage;
    
//    @Lob
//    @Column(name = "member_image_type")
//    private String imageType;

    @Lob
    @Column(name = "ftoken")
    private String ftoken;
    
    
    
    public void modifyPass(String pass) {
    	this.pass = pass;
    }

    public void saveFtoken(String ftoken) {
    	this.ftoken = ftoken;
    }
    
    public void saveModDttm(LocalDateTime modDttm) {
    	this.modDttm = modDttm;
    }
    
    @Builder
	public User(String username, String pass, String email, String nickname, Age age, Gender gender, String introduce, 
			LocalDateTime regDttm, boolean delYN, boolean registerYN, String userImage) {
		this.username = username;
		this.modUser = username;
		this.pass = pass;
		this.email = email;
		this.nickname = nickname;
		this.age = age;
		this.gender = gender;
		this.introduce = introduce;
		this.regDttm = regDttm;
		this.delYN = delYN;
		this.registerYN = registerYN;
		this.userImage = userImage;
		
	}

    

    
    public void profileUpdate(UserUpdateDto entity, LocalDateTime modDttm) {
        this.nickname = entity.getNickname();
        this.privateYN = entity.isPrivateYN();
        this.age = entity.getAge();
        this.gender = entity.getGender();
        this.introduce = entity.getIntroduce();
        this.modDttm = modDttm;
    }


    public void deleteUser () {
        this.delYN = true;
    }


}
