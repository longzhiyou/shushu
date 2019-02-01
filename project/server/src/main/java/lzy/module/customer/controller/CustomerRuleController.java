package lzy.module.customer.controller;

import lzy.module.customer.entity.Customer;
import lzy.module.customer.repository.CustomerRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

/**
 * 设备管理控制器
 * [2017-10-12 add by longzhiyou]
 */
@RestController

@RequestMapping(value = "/api/rest/customers")
@Transactional
public class CustomerRuleController {

    private static Logger logger = Logger.getLogger(CustomerRuleController.class);


    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping(value = "/filter")
    public ResponseEntity index() {

        List<Customer> customers = customerRepository.findAll();

        return ResponseEntity.ok(customers);

    }

}
