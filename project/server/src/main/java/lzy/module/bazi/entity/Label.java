package lzy.module.bazi.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lzy.common.entity.BaseEntity;
import lzy.common.entity.BaseIdEntity;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

import javax.persistence.*;

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
public class Label extends BaseEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Integer id;

   private String title;
   private String subject;
   private String description;

//   @Lob
   @Column(columnDefinition = "TEXT")
   private String algorithm;
   private boolean enable;

   public Label(Integer id, String title) {
      this.setId(id);
      this.title = title;
   }
}