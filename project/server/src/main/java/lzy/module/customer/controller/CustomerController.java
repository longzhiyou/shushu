package lzy.module.customer.controller;

import lzy.module.customer.entity.Customer;
import lzy.module.customer.repository.CustomerRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.LinkBuilder;
import org.springframework.hateoas.Links;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * 设备管理控制器
 * [2017-10-12 add by longzhiyou]
 */
@RepositoryRestController
@RequestMapping(value = "/customers")
@Transactional
public class CustomerController {

    private static Logger logger = Logger.getLogger(CustomerController.class);
    @Autowired
    RepositoryEntityLinks repositoryEntityLinks;

    @Autowired
    private CustomerRepository customerRepository;
//
//    @Autowired
//    private RuleRepository ruleRepository;
//
//    @Autowired
//    BaZiService baZiService;
//
//    @Autowired
//    JsonMapper jsonMapper;

    @GetMapping(value = "/filter")
    public @ResponseBody ResponseEntity<?> filterByRule(@RequestParam(value="filter", required = false) String filter) {
//
        List<Customer> customers = customerRepository.findAll();
        List<Resource> list = new ArrayList<>();

        Links links = repositoryEntityLinks.linksToSearchResources(Customer.class);
        Link link1 = repositoryEntityLinks.linkToCollectionResource(Customer.class);

        for (Customer customer:customers){
            Resource resource = new Resource<>(customer);

            Link link = repositoryEntityLinks.linkToSingleResource(customer.getClass(), customer.getCustomerId());
            resource.add(link);

            Link self = new Link(link.getHref(), Link.REL_SELF);
            resource.add(self);

            list.add(resource);
        }

        return ResponseEntity.ok(list);

    }

}
