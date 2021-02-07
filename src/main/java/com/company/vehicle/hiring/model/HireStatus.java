package com.company.vehicle.hiring.model;

import java.util.Date;
import java.util.UUID;

public class HireStatus {
    private final UUID id;
    private final Customer customer;
    private final Date startDate;
    private final Date endDate;

    public HireStatus(Customer customer, Date startDate, Date endDate) {
        this.id = UUID.randomUUID();
        this.customer = customer;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public HireStatus() {
        this.id = UUID.randomUUID();
        this.customer = null;
        this.startDate = null;
        this.endDate = null;
    }

    public UUID getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }
}
