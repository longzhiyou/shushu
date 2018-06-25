package lzy.module.person.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lzy.common.entity.BaseEntity;

import javax.persistence.MappedSuperclass;

/**
 * 抽象实体类,后面追加Entity,因为不生成表
 * [2017-12-12 add by longzhiyou]
 */
@MappedSuperclass
@EqualsAndHashCode(callSuper=true)
@Data
public abstract class PersonEntity extends BaseEntity {

    private String name;
    private String gender;
    private String birth;


}
