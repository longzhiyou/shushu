package lzy.module.bazi.entity;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lzy.common.entity.BaseIdEntity;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
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

   //类型 0-全部 1-分析 2-过滤
   @Builder.Default
   private Integer type = 0;

//   @Lob
   @Column(columnDefinition = "TEXT")
   private String algorithm;
   private boolean enable;

   public Rule(Long id,String title) {
      this.setId(id);
      this.title = title;
   }
}