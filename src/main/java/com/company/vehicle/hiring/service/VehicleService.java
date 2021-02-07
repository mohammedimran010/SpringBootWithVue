package com.company.vehicle.hiring.service;

import java.util.HashMap;
import java.util.List;

import com.company.vehicle.hiring.dao.VehicleDAO;
import com.company.vehicle.hiring.model.Vehicle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class VehicleService {
    private final VehicleDAO vehicleDAO;

    @Autowired
    public VehicleService(@Qualifier("fakeVehcileDAO") VehicleDAO vehicleDAO) {
        this.vehicleDAO = vehicleDAO;
    }

    public List<Vehicle> getVehicles(boolean showHired) {
        return vehicleDAO.getVehicles(showHired);
    }

    public HashMap<String, Object> calculatePrice(String id, String startDate, String endDate) {
        return vehicleDAO.calculatePrice(id, startDate, endDate);
    }
}
