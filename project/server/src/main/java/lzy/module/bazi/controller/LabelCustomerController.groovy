package lzy.module.bazi.controller

import lzy.module.bazi.entity.Rule
import lzy.module.bazi.repository.LabelRepository
import lzy.module.bazi.repository.RuleRepository
import lzy.module.customer.repository.CustomerRepository
import lzy.module.customer.service.BaZiService
import lzy.utils.JsonMapper
import org.apache.log4j.Logger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import javax.transaction.Transactional

@RestController
@RequestMapping(value = "/api/labels")
@Transactional
public class LabelCustomerController {

    private static Logger logger = Logger.getLogger(LabelCustomerController.class);


    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private LabelRepository labelRepository;

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    BaZiService baZiService;

    @Autowired
    JsonMapper jsonMapper;

    @GetMapping()
    ResponseEntity index() {

        return ResponseEntity.ok(labelRepository.combox())

    }

    @GetMapping(value = "/comboxs")
    public ResponseEntity comboxs() {

        return ResponseEntity.ok(ruleRepository.findAll());


    }

    @GetMapping(value = "/filter")
    ResponseEntity index(@RequestParam(value="ids", required = false) String ids) {

        def customers = customerRepository.findAll()

        if (ids!=null) {
            List<Integer> idsLabel = jsonMapper.json2JavaCollection(ids, List.class, Integer.class)
            if(idsLabel.size()>0){


                def rules = labelRepository.findAll(idsLabel)
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
