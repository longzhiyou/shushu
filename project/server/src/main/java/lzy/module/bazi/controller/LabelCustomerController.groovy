package lzy.module.bazi.controller;

import lzy.module.bazi.entity.Label;
import lzy.module.bazi.repository.LabelRepository;
import lzy.module.customer.domain.BaZi;
import lzy.module.customer.entity.Customer;
import lzy.module.customer.repository.CustomerRepository;
import lzy.module.customer.service.BaZiService;
import lzy.utils.JsonMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping(value = "/labels")
@Transactional
public class LabelCustomerController {

    private static Logger logger = Logger.getLogger(LabelCustomerController.class);


    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private LabelRepository labelRepository;

    @Autowired
    BaZiService baZiService;

    @Autowired
    JsonMapper jsonMapper;

    @GetMapping()
    ResponseEntity index(@RequestParam(value="filter", required = false) String filter) {

        def customers = customerRepository.findAll()

        if (filter!=null) {
            List<Long> ids = jsonMapper.json2JavaCollection(filter, List.class, Long.class)
            if(ids.size()>0){


                def rules = labelRepository.findAll(ids)
                def customersFilter=[]
                for (customer in customers){

                    def baZi = baZiService.getBaZi(customer.getBazi())

                    if (baZi==null) {
                        continue;
                    }
                    def count=0
                    for (rule in rules){

                        def result = baZiService.parseRule(baZi, rule.getAlgorithm())
                        if (result!=null&&result.size()>0) {
                            count++
                        }

                    }
                    if (count==rules.size()) {
                        customersFilter.push(customer)
                    }

                }
                customers=customersFilter
            }

        }

        return ResponseEntity.ok(customers);

    }



}
