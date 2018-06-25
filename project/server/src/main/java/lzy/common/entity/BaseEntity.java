package lzy.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import java.io.Serializable;
import java.util.Date;

/**
 * User: longzhiyou
 * Date: 2017/1/12
 * Time: 11:43
 */

/**
 * //查询的时候可以设置列为删除标志
 * http://stackoverflow.com/questions/19323557/handling-soft-deletes-with-spring-jpa
 * [2017-01-16 add by longzhiyou]
 */

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
public abstract class BaseEntity  implements Serializable {

    private static final long serialVersionUID = 1L;

//    @JsonIgnore
//    private Integer tenantId;

    @JsonIgnore
    @CreatedDate
    private Date createdAt ;

    @JsonIgnore
    @CreatedBy
    private String createdBy;


    @JsonIgnore
    @LastModifiedDate
    private Date updatedAt;

    @JsonIgnore
    @LastModifiedBy
    private String updatedBy;

    @JsonIgnore
    @Version
    private Integer lockVersion;

    @JsonIgnore
    @Builder.Default
    private Integer deleteFlag=0;

//    @JsonIgnore
//    protected LocalDateTime deletedOn;

//    @PreUpdate
//    public void preUpdate() {
//
//        this.updatedBy = "bsp";
//        this.updatedAt = new Date(System.currentTimeMillis());
//
//    }




}
