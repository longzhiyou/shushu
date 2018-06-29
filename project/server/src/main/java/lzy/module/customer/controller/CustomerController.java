package lzy.module.customer.controller;

import org.apache.log4j.Logger;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

/**
 * 设备管理控制器
 * [2017-10-12 add by longzhiyou]
 */
@RepositoryRestController
@RequestMapping(value = "/customers")
@Transactional
public class CustomerController {

    private static Logger logger = Logger.getLogger(CustomerController.class);
//    @Autowired
//    RepositoryEntityLinks repositoryEntityLinks;
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    @Autowired
//    private RuleRepository ruleRepository;
//
//    @Autowired
//    BaZiService baZiService;
//
//    @Autowired
//    JsonMapper jsonMapper;

//    @GetMapping(value = "/filter")
//    public @ResponseBody ResponseEntity<?> filterByRule(@RequestParam(value="filter", required = false) String filter) {
//
////        List<Customer> customers = customerRepository.findAll();
////        if (filter!=null) {
////            List<Long> ids = jsonMapper.json2JavaCollection(filter, List.class, Long.class);
////            List<Rule> rules = ruleRepository.findAll(ids);
////            for (Customer customer : customers){
////                BaZiNew baZi = new BaZiNew(customer.getBazi());
////
////                for (Rule rule : rules){
////
////                    baZiService.parseRule(baZi,rule.getAlgorithm())
////
////                }
////            }
////        }
////
//
////        String uriString = ServletUriComponentsBuilder.fromCurrentRequest().build().toUriString();
////
////
//////        links.linkToSearchResource()
////
////        List<Resource> list = new ArrayList<>();
////        for (Customer customer:all){
////            Resource resource = new Resource<>(customer);
////            repositoryEntityLinks.linksToSearchResources()
////            resource.add(repositoryEntityLinks.linkToSingleResource(Customer.class, customer.getCustomerId()));
////            list.add(resource);
////        }
////
////        Resources resources = new Resources<>(list);
//
//
//        //
//        // do some intermediate processing, logging, etc. with the producers
//        //
//
//
//
////        resources.add(new Link(uriString, "self"));
////        resources.add(linkTo(CustomerRepository.class).all);
////        add(linkTo(methodOn(GymMembershipController.class).all(id)).withRel("memberships"));
////        add(linkTo(methodOn(PersonController.class).get(id)).withSelfRel());
//
////        resources.add(links.linkToSearchResource(Customer.class,"").withSelfRel());
//
//
//
////        resources.add(linkTo(methodOn(CustomerRepository.class)).slash(Id));
//
////        resources.add(linkTo(methodOn(CustomerRepository.class).getOne()).withSelfRel());
//
////        resources.add(linkTo(Customer.class).withSelfRel());
//
//        // add other links as needed
//
//        return ResponseEntity.ok();
//    }


//    @RequestMapping(method= RequestMethod.POST,consumes = "application/json")
//    public ResponseEntity create(@RequestBody CustomerController one) {
//
//
//
//        return new ResponseEntity<>( HttpStatus.CREATED);
//
//
//    }



}
