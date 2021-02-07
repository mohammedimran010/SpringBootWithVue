package com.company.vehicle.hiring.model.enums;

import java.math.BigDecimal;

public enum Category {
    SMALL(new BigDecimal("25.00")), ESTATE(new BigDecimal("35.00")), VAN(new BigDecimal("50.00"));

    private BigDecimal price;

    private Category(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getPrice() {
        return price;
    }
}
