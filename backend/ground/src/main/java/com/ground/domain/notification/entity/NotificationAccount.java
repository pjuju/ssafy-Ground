package com.ground.domain.notification.entity;

import com.ground.domain.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "t_notification_account")
public class NotificationAccount {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@JoinColumn(name = "from_user_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private User from;
	
	@JoinColumn(name = "to_user_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private User to;
	
	@Column(name = "type")
	private boolean type;
	
	@Column(name = "del_YN", columnDefinition="tinyint(1) default 1")
    private boolean delYN;

    @Column(name = "check_YN" ,columnDefinition="tinyint(1) default 1")
    private boolean checkYN;
    
    @CreatedDate
    @Column(name = "reg_dttm")
    private LocalDateTime regDttm;

	@Builder
	public NotificationAccount(User from, User to, boolean type, LocalDateTime regDttm) {
		this.from = from;
		this.to = to;
		this.type = type;
		this.regDttm = regDttm;
	}
}
