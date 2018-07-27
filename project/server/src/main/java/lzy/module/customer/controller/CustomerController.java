package lzy.module.customer.controller;

import org.apache.log4j.Logger;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.transaction.Transactional;

/**
 * 设备管理控制器
 * [2017-10-12 add by longzhiyou]
 */
//@RestController
@RepositoryRestController
@RequestMapping(value = "/customers")
@Transactional
public class CustomerController {

    private static Logger logger = Logger.getLogger(CustomerController.class);

//
//    @Autowired
//    private ElasticsearchTemplate elasticsearchTemplate;
//
//    @Autowired
//    private CustomerElasticsearchRepository customerElasticsearchRepository;

//    @GetMapping("/singleWord")
//    public Object singleTitle(String word, @PageableDefault Pageable pageable) {
//
//
//
//        //使用queryStringQuery完成单字符串查询
//        SearchQuery searchQuery = new NativeSearchQueryBuilder().withQuery(queryStringQuery(word)).withPageable(pageable).build();
//
//        return customerElasticsearchRepository.search(searchQuery);
////        return elasticsearchTemplate.queryForList(searchQuery, Post.class);
//    }

//    @GetMapping()
//    public ResponseEntity index() {
//
//        List<Customer> customers = customerRepository.findAll();
//
//        return ResponseEntity.ok(customers);
//
//    }


//    @GetMapping(value = "/filter")
//    public  ResponseEntity index() {
//
//        List<Customer> customers = customerRepository.findAllGridBy();
//
//        return ResponseEntity.ok(customerResourceAssembler.toResources(customers));
//
//    }



//    @GetMapping()
//    public  ResponseEntity index(@PageableDefault Pageable pageable,
//                                 PagedResourcesAssembler assembler) {
//
//
//
////        Page<Customer> customers = customerRepository.findAll(pageable);
//        List<Customer> customers = customerRepository.findAll();
//
//
//
//        return ResponseEntity.ok(customerResourceAssembler.toResources(customers));
////        return ResponseEntity.ok(assembler.toResource(customers,customerResourceAssembler));
//
//    }

}
