package com.company.vehicle.hiring.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.company.vehicle.hiring.model.Vehicle;

public interface VehicleDAO {
    List<Vehicle> getVehicles(boolean showHired);

    Optional<Vehicle> getVehicleById(UUID id);

    HashMap<String, Object> calculatePrice(String id, String startDate, String endDate);
}
