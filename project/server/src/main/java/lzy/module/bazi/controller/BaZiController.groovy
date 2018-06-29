package lzy.module.bazi.controller

import lzy.module.bazi.repository.RuleRepository
import lzy.module.customer.domain.BaZi
import lzy.module.customer.repository.CustomerRepository
import lzy.module.customer.service.BaZiService
import lzy.utils.JsonMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
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

    @Autowired
    JsonMapper jsonMapper

    @RequestMapping(method= RequestMethod.GET)
    def index(@RequestParam(value="filter", required = false) String filter) {
        //获取所有客户信息
        //执行对应规则


        def customers = customerRepository.findAll()

        if (filter!=null) {
            List<Long> ids = jsonMapper.json2JavaCollection(filter, List.class, Long.class)
            def rules = ruleRepository.findAll(ids)
            def customersFilter=[]
            for (customer in customers){
                BaZi baZi = new BaZi(customer.getBazi())

                def count=1
                for (rule in rules){

                    def result = baZiService.parseRule(baZi, rule.getAlgorithm())
                    if (result!=null&&result.length>0) {
                        count++
                    }

                }
                if (count==rules.size()) {
                    customersFilter.push(customer)
                }
                return customersFilter
            }
        }else {
            return  customers
        }



       

    }
}
