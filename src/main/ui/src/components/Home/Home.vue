<template>
  <div class="container p-3">
    <div class="row">
      <div class="col-sm-2">
        <form class="form-inline">
          <div class="form-group">
            <label for="viewByOptions">View</label>
            <select class="form-control" id="viewByOptions" 
              @change="filterResults($event.target.value)" v-model="viewBy">
              <option value="ALL">All</option>
              <option value="AVAILABLE">Available</option>
              <option value="ON_HIRE">On Hire</option>
            </select>
          </div>
        </form>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-xs btn-primary" @click="getVehicles">Refresh</button>
      </div>
    </div>
    <div class="row p-2" v-if="filteredResults">
      <div class="col-sm-3 p-2" v-for="vehicle in filteredResults" :key="vehicle.id">
        <Vehicle v-bind:vehicle="vehicle"/>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import Vehicle from '@/components/Vehicle/Vehicle.vue';
  import getHireStatus from '@/utils/utils.js';

  export default {
    name: 'Vehicles',
    components: { Vehicle },
    data() {
      return {
        VIEW_ALL: "ALL",
        VIEW_HIRED: "ON_HIRE",
        VIEW_AVAILABLE: "AVAILABLE",
        viewBy: 'AVAILABLE',
        vehicles: null,
        filteredResults: null
      };
    },
    created: function() {
      this.getVehicles();
    },
    inject: ['app'],
    methods:{
      async getVehicles() {
        this.setLoading(true);
        try{
           const response = await axios.get("/api/v1/vehicle?showHired=true");
           this.vehicles = await response.data;
           this.filterResults(this.viewBy);
        } catch(err){
          this.setHasError(true);
        } finally {
          this.setLoading(false);
        }
      },
      setLoading(isLoading) {
        this.app.isLoading = isLoading;
      },
      setHasError(hasError) {
        this.app.hasError = hasError;
      },
      setFilteredResults(results){
        this.filteredResults = results;
      },
      filterResults(value){
        if (value === this.VIEW_ALL) {
          this.setFilteredResults(this.vehicles);
        } else if (value === this.VIEW_AVAILABLE) {
          const available = this.vehicles.filter((vehicle) => this.getHireStatus(vehicle));
          this.setFilteredResults(available);
        } else if (value === this.VIEW_HIRED) {
          const onHire = this.vehicles.filter((vehicle) => this.getHireStatus(vehicle, true));
          this.setFilteredResults(onHire);
        }
      },    
      getHireStatus(vehicle, available) {
        return getHireStatus(vehicle, available);
      }
    }
  }
</script>
<style>
  label[for="viewByOptions"] { 
    padding-right:20px
  }
</style>