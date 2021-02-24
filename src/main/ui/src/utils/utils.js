const getHireStatus = (vehicle, available) => {
  const status = vehicle.hireStatus;
  const hasCustomer = status.customer !== null;
  const hasStartDate = status.startDate !== null;
  const hasEndDate = status.endDate !== null;

  if (available) {
    return hasCustomer && hasStartDate && hasEndDate;
  }
  return !hasCustomer && !hasStartDate && !hasEndDate;
};

export default getHireStatus;
