package com.company.vehicle.hiring.dao;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.company.vehicle.hiring.model.Customer;
import com.company.vehicle.hiring.model.HireStatus;
import com.company.vehicle.hiring.model.Vehicle;
import com.company.vehicle.hiring.model.enums.Category;
import com.company.vehicle.hiring.model.enums.CustomerType;
import com.company.vehicle.hiring.model.enums.FuelType;

import org.springframework.stereotype.Repository;

@Repository("fakeVehcileDAO")
public class FakeVehicleDataAccessService implements VehicleDAO {
    private static List<Vehicle> DB = new ArrayList<>();

    private static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static LocalDate localDate = LocalDate.parse(LocalDate.now().format(dtf));
    private static Date todayStartDate = java.sql.Date.valueOf(localDate);

    private static Date someEndDate = java.sql.Date.valueOf(localDate.plusDays(14));

    // Prepoulate initial Data
    static {
        // 2 ON HIRE
        DB.add(new Vehicle("AA01 DVX", "Ford", "Transit", FuelType.DIESEL, Category.VAN,
                new HireStatus(new Customer("Alan", CustomerType.INDIVIDUAL), todayStartDate, someEndDate)));

        DB.add(new Vehicle("BB01 DVX", "Nissan", "Nv200", FuelType.DIESEL, Category.VAN,
                new HireStatus(new Customer("BEC Ltd", CustomerType.COMPANY), todayStartDate, someEndDate)));

        // 6 AVAILABLE
        DB.add(new Vehicle("BB01 PSX", "Audi", "A1", FuelType.PETROL, Category.SMALL, new HireStatus()));
        DB.add(new Vehicle("BB01 DSX", "BMW", "M1", FuelType.DIESEL, Category.SMALL, new HireStatus()));
        DB.add(new Vehicle("CC01 PEX", "Ford", "Focus", FuelType.PETROL, Category.ESTATE, new HireStatus()));
        DB.add(new Vehicle("CC01 DEX", "Toyota", "Picnic", FuelType.DIESEL, Category.ESTATE, new HireStatus()));
        DB.add(new Vehicle("DD01 PVX", "Jaguar", "XE", FuelType.PETROL, Category.VAN, new HireStatus()));
        DB.add(new Vehicle("DD01 DVX", "Mercedes-Benz", "E Class", FuelType.DIESEL, Category.VAN, new HireStatus()));
    }

    @Override
    public List<Vehicle> getVehicles(boolean showHired) {
        if (showHired) {
            return DB;
        }

        List<Vehicle> available = DB.stream()
                .filter(vehicle -> vehicle.getHireStatus().getCustomer() == null
                        && vehicle.getHireStatus().getStartDate() == null
                        && vehicle.getHireStatus().getEndDate() == null)
                .collect(Collectors.toList());
        return available;
    }

    @Override
    public HashMap<String, Object> calculatePrice(String id, String startDate, String endDate) {
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<Vehicle> selectedVehicle = getVehicleById(UUID.fromString(id));

        if (selectedVehicle.isPresent()) {
            // calculating number of days in between
            long noOfDaysBetween = ChronoUnit.DAYS.between(LocalDate.parse(startDate), LocalDate.parse(endDate));
            BigDecimal days = new BigDecimal(noOfDaysBetween);
            responseMap.put("days", days);

            BigDecimal cost = selectedVehicle.get().getPricePerDay().multiply(days);
            responseMap.put("cost", cost);
        }
        return responseMap;
    }

    @Override
    public Optional<Vehicle> getVehicleById(UUID id) {
        return DB.stream().filter(vehicle -> vehicle.getId().equals(id)).findFirst();
    }
}
