package lzy.module.bazi.repository;

import lzy.module.bazi.entity.ComboxRule;
import lzy.module.bazi.entity.Rule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;


@RepositoryRestResource(collectionResourceRel = "rules", path = "rules")
public interface RuleRepository extends JpaRepository<Rule, Long> {

    @Modifying
    @Query("update Rule t set t.deleteFlag = 1 where t.id = ?1")
    @Override
    void delete(Long id);

    @RestResource(exported = false)
    List<ComboxRule> findAllBy();

//    @Query("select t.id as id,t.title as title from  Rule t")
//    List<ComboxRule> combox();

}
