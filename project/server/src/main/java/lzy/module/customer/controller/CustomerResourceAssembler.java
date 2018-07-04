package lzy.module.customer.controller;

import lzy.module.customer.entity.Customer;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

/**
 * User: longzhiyou
 * Date: 2018/7/4
 * Time: 17:30
 */
@Component
public class CustomerResourceAssembler extends ResourceAssemblerSupport<Customer, Resource> {

    public CustomerResourceAssembler() {
        super(CustomerController.class, Resource.class);
    }

    @Override
    public List<Resource> toResources(Iterable<? extends Customer> customers) {
        List<Resource> resources = new ArrayList<Resource>();
        for(Customer customer : customers) {
            resources.add(new Resource<>(customer,
                    linkTo(CustomerController.class).slash(customer.getCustomerId()).withSelfRel()));
        }
        return resources;
    }


    @Override
    public Resource toResource(Customer entity) {
        return new Resource<>(entity,linkTo(CustomerController.class).slash(entity.getCustomerId()).withSelfRel());
    }
}
