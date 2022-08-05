package com.ground.domain.search.entity;
import java.sql.Date;
import javax.persistence.*;
import com.ground.domain.user.entity.User;
import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_search_board")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class SearchBoard {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Lob
    @Column(name = "word")
    private String word;

    @Column(name = "reg_dttm")
    private Date regDttm;

}