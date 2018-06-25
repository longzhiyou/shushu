package lzy.module.customer.bazi.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lzy.common.entity.BaseIdEntity;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

/**
 * 八字规则
 * User: longzhiyou
 * Date: 2017/11/8
 * Time: 13:32
 */
@Where(clause="delete_flag=0")
@NoArgsConstructor
@EqualsAndHashCode(callSuper=true)
@Data
@Entity
public class Rule extends BaseIdEntity {

   private String title;
   private String subject;
   private String description;
   private String algorithm;
   private boolean enable;
}