package lzy.module.bazi.controller;

import lzy.module.bazi.entity.ComboxRule;
import lzy.module.bazi.entity.Rule;
import lzy.module.bazi.repository.RuleRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * 设备管理控制器
 * [2017-10-12 add by longzhiyou]
 */
@RepositoryRestController
@RequestMapping(value = "/rules")
@Transactional
public class RuleController {

    private static Logger logger = Logger.getLogger(RuleController.class);

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    RepositoryEntityLinks entityLinks;

    @GetMapping(value = "/combox")
    public ResponseEntity combox() {
        List<ComboxRule> comboxRules = ruleRepository.findAllBy();
        List<Resource> list = new ArrayList<>();

        for (ComboxRule item:comboxRules){
            Resource resource = new Resource<>(item);
            resource.add(entityLinks.linkToSingleResource(Rule.class, item.getId()));
            list.add(resource);
        }

        return ResponseEntity.ok(list);


    }



}
