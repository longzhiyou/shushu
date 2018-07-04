package lzy.module.bazi.controller

import lzy.module.bazi.entity.ComboxRule
import lzy.module.bazi.repository.RuleRepository
import lzy.module.customer.domain.BaZi
import lzy.module.customer.entity.Customer
import lzy.module.customer.repository.CustomerRepository
import lzy.module.customer.service.BaZiService
import lzy.utils.JsonMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.Link
import org.springframework.hateoas.LinkBuilder
import org.springframework.hateoas.Links
import org.springframework.hateoas.Resource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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
    RepositoryEntityLinks entityLinks

    @Autowired
    JsonMapper jsonMapper


    @GetMapping(value ="/analyze")
    def analyze(@RequestParam(value="gender") String gender,@RequestParam(value="bazi") String strBaZi) {
        def ruleFilter=[]
        def bazi = baZiService.getBaZi(strBaZi)
        if (bazi!=null) {
            def rules = ruleRepository.findAll()

            for (rule in rules){

                def result = baZiService.parseRule(bazi, rule.getAlgorithm())
                if (result!=null&&result.size()>0) {
                    def analyzeResult = [:]
                    analyzeResult.put("title",rule.getTitle())
                    analyzeResult.put("result",result)
                    ruleFilter.push(analyzeResult)
                }

            }
        }
        if (ruleFilter.size()<=0) {
            ruleFilter=["没有匹配结果"]
        }
        return ruleFilter


    }

    @RequestMapping(method= RequestMethod.GET)
    def index(@RequestParam(value="filter", required = false) String filter) {
        //获取所有客户信息
        //执行对应规则


        def customers = customerRepository.findAll()

        if (filter!=null) {
            List<Long> ids = jsonMapper.json2JavaCollection(filter, List.class, Long.class)
            if(ids.size()>0){


                def rules = ruleRepository.findAll(ids)
                def customersFilter=[]
                for (customer in customers){

                    BaZi baZi = baZiService.getBaZi(customer.getBazi())

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

        List<Resource> list = new ArrayList<>()
        for (item in customers){
            Resource resource = new Resource<>(item)
            resource.add(entityLinks.linkToSingleResource(Customer.class, item.getCustomerId()))
            list.add(resource)
        }
        return  list




       

    }
}
