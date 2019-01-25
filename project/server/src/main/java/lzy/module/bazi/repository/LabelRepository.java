package lzy.module.bazi.repository;

import lzy.module.bazi.entity.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface LabelRepository extends JpaRepository<Label, Integer> {

    @Query(value = "select new Label(t.id, t.title) " +
            "from Label t ")
    List<Label> combox();


}
