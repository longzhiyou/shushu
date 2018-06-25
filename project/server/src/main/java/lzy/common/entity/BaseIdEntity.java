package lzy.common.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;



/**
 *
 * 快速实现时使用此类,默认主键名称都是id
 * [2017-01-16 add by longzhiyou]
 */

@MappedSuperclass
@EqualsAndHashCode(callSuper=true)
@Data
public abstract class BaseIdEntity  extends BaseEntity {

	@Id
	@GenericGenerator(name = "idGenerator", strategy = "lzy.common.entity.IdGenerator")
	@GeneratedValue(generator = "idGenerator")
	private Long id;

}
