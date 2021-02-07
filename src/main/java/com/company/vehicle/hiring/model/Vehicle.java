package com.company.vehicle.hiring.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.company.vehicle.hiring.model.enums.Category;
import com.company.vehicle.hiring.model.enums.FuelType;

public class Vehicle {
    private final UUID id;
    private final String vrn;
    private final String make;
    private final String model;
    private final FuelType fuelType;
    private final Category category;
    private final HireStatus hireStatus;

    public Vehicle(String vrn, String make, String model, FuelType fuelType, Category category,
            HireStatus hireStatus) {
        this.id = UUID.randomUUID();
        this.vrn = vrn;
        this.make = make;
        this.model = model;
        this.fuelType = fuelType;
        this.category = category;
        this.hireStatus = hireStatus;
    }

    public UUID getId() {
        return id;
    }

    public String getVrn() {
        return vrn;
    }

    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public HireStatus getHireStatus() {
        return hireStatus;
    }

    public String getCategory() {
        return category.name();
    }

    public BigDecimal getPricePerDay() {
        return category.getPrice();
    }
}
