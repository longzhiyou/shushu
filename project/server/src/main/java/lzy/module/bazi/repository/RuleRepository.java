package lzy.module.bazi.repository;

import lzy.module.bazi.entity.Rule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;


@RepositoryRestResource(collectionResourceRel = "rules", path = "rules")
public interface RuleRepository extends JpaRepository<Rule, Long> {

    @Modifying
    @Query("update Rule t set t.deleteFlag = 1 where t.id = ?1")
    @Override
    void delete(Long id);



    @RestResource(path = "filter", rel = "filterRel")
    @Query(value = "select c from Rule c where c.description like concat('%',:match,'%') or c.title like concat('%',:match,'%') or c.subject like concat('%',:match,'%') or c.algorithm like concat('%',:match,'%') ")
    Page filter(@Param("match") String match, Pageable p);

}
