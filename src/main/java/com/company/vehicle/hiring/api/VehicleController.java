package com.company.vehicle.hiring.api;

import java.util.HashMap;
import java.util.List;

import com.company.vehicle.hiring.model.Vehicle;
import com.company.vehicle.hiring.service.VehicleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/v1/vehicle")
@RestController
public class VehicleController {
    private final VehicleService vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> getVehicles(@RequestParam(defaultValue = "false") boolean showHired) {
        return vehicleService.getVehicles(showHired);
    }

    @GetMapping("/calculate")
    public HashMap<String, Object> getCalculation(@RequestParam String id, @RequestParam String startDate,
            @RequestParam String endDate) {
        return vehicleService.calculatePrice(id, startDate, endDate);
    }
}
