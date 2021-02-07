package com.company.vehicle.hiring.model;

import java.util.UUID;

import com.company.vehicle.hiring.model.enums.CustomerType;

public class Customer {
    private final UUID id;
    private final String name;
    private final CustomerType customerType;

    public Customer(String name, CustomerType customerType) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.customerType = customerType;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }
}
