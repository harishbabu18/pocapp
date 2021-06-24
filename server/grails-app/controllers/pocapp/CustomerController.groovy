package pocapp

import grails.validation.ValidationException
import org.grails.datastore.mapping.query.api.Criteria

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class CustomerController {

    CustomerService customerService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST",filter:"POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond customerService.list(params), model:[customerCount: customerService.count()]
    }

    def show(Long id) {
        respond customerService.get(id)
    }


    def filter(CustomerFilter customerFilter){

        def c = Customer.createCriteria()

        def result = c.list{

            // eq("mobile","8667710055")

            customerFilter.filterValues.each {  value ->

                if(value.operation=="equal"){
                    eq(value.key,value.value)
                } else if (value.operation=="contains"){
                    like(value.key,"%"+value.value+"%")
                } else {
                    ne(value.key,value.value)

                }


            }
            if(customerFilter.sortColumn){
                order(customerFilter.sortColumn, customerFilter.sortDirection)
            }
        }

        respond result
    }

    @Transactional
    def save(Customer customer) {
        if (customer == null) {
            render status: NOT_FOUND
            return
        }
        if (customer.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond customer.errors
            return
        }

        try {
            customerService.save(customer)
        } catch (ValidationException e) {
            respond customer.errors
            return
        }

        respond customer, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Customer customer) {
        if (customer == null) {
            render status: NOT_FOUND
            return
        }
        if (customer.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond customer.errors
            return
        }

        try {
            customerService.save(customer)
        } catch (ValidationException e) {
            respond customer.errors
            return
        }

        respond customer, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || customerService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
