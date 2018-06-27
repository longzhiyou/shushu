package lzy.module.bazi.controller

import lzy.module.bazi.repository.RuleRepository
import lzy.module.customer.domain.BaZi
import lzy.module.customer.repository.CustomerRepository
import lzy.module.customer.service.BaZiService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 *
 * User: longzhiyou 
 * Date: 2017/6/22 
 * Time: 11:05 
 */
@RestController
@RequestMapping(value = "api/bazis")
class BaZiController {

    @Autowired
    private CustomerRepository customerRepository

    @Autowired
    private RuleRepository ruleRepository
    @Autowired
    BaZiService baZiService

    @RequestMapping(method= RequestMethod.GET)
    def index() {
        //获取所有客户信息
        //执行对应规则

        def customers = customerRepository.findAll()
        def ids = [1011153728809467904,1011155031212163072]
        def rules = ruleRepository.findAll(ids)
        for (customer in customers){
            BaZi baZi = new BaZi(customer.getBazi())

            for (rule in rules){

                baZiService.parseRule(baZi,rule.getAlgorithm())

            }
        }

        return  rules

    }
}
