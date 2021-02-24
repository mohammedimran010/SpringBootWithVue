<template>
    <div>
        <div class="card">
            <div class="card-header" v-bind:class="{'onHire':(getHireStatus(vehicle))}">
                {{vehicle.make}} - {{vehicle.model}}
            </div>
            <div class="card-body">
                <h5 class="card-title">{{vehicle.vrn}}</h5>
                {{vehicle.category}} - {{vehicle.fuelType}}
                <div>&pound;{{ parseFloat(vehicle.pricePerDay).toFixed(2)}}</div>
                <button class="btn btn-outline-primary" data-toggle="modal" 
                    data-target="#calculateModal" @click="reset">Get Quote</button>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="calculateModal" tabindex="-1" role="dialog" 
            aria-labelledby="calculateModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Get Quote</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Loader :isLoading="isLoading" :insideModal="true" />
                        <Error :hasError="hasError" />
                        Select Range
                        <date-range-picker
                            :locale-data="{
                                format: 'dd-mm-yyyy'
                            }"
                            :minDate="minDate"
                            :showDropdowns="showDropdowns"
                            :autoApply="autoApply"
                            v-model="dateRange"
                            :dateFormat="dateFormat"
                            :ranges="ranges"
                            @update="enableCalculateBtn">
                        </date-range-picker>
                        <div v-if="(calculatedResult.cost !== null && calculatedResult.days !== null)">
                            Price for <b className={classes.daysUnderline}>{{calculatedResult.days}}</b> day(s)
                            <h4>&pound;{{parseFloat(calculatedResult.cost).toFixed(2)}}</h4>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button :disabled="isCalculateBtnDisabled" type="button" 
                            class="btn btn-primary" @click="getQuote">Calculate</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>



<script>
import axios from 'axios';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import DateRangePicker from 'vue2-daterange-picker';
import getHireStatus from '@/utils/utils.js';
import Loader from '@/components/Loader/Loader.vue';
import Error from '@/components/Error/Error';

export default {
    props: {
        vehicle: Object
    },
    data () {
      return this.initialState();
    },
    components: {
        Loader, Error, DateRangePicker
    },
    methods: {
         initialState() {
            return {
                dateRange: {startDate: null, endDate : null},
                calculatedResult: {
                    cost: null,
                    days: null
                },
                isLoading:false,
                hasError: false,
                isCalculateBtnDisabled: true,
                autoApply: true, 
                showDropdowns:true,
                minDate: new Date(),
                ranges:false
            }
        },
        reset() {
            this.dateRange = this.initialState().dateRange;
            this.calculatedResult = this.initialState().calculatedResult;
            this.isLoading = false,
            this.hasError = false,
            this.isCalculateBtnDisabled = true
        },
        getHireStatus(vehicle, available) {
            return getHireStatus(vehicle, available);
        },
        async getQuote(){
            this.setLoading(true);
            try {
             const startDate = new Date(this.dateRange.startDate).toISOString().slice(0, 10);
             const endDate = new Date(this.dateRange.endDate).toISOString().slice(0, 10);
             const vehicleID = this.vehicle.id;
             const response = await axios.get(
                `/api/v1/vehicle/calculate?id=${vehicleID}&startDate=${startDate}&endDate=${endDate}`
             );
            const data = await response.data;
            this.calculatedResult.cost = data.cost;
            this.calculatedResult.days = data.days;
            } catch (error) {
                this.setHasError(true);
            } finally {
                this.setLoading(false);
            }
        },
        dateFormat(classes, date) {
            if (!classes.disabled) {
                classes.disabled = date.getTime() < new Date();
            }
            return classes;
        },
        setLoading(isLoading) {
            this.isLoading = isLoading;
        },
        setHasError(hasError) {
            this.hasError = hasError;
        },
        enableCalculateBtn(data) {
            const result = data.startDate === null && data.endDate === null;
            this.isCalculateBtnDisabled = result;
        }
    }
}
</script>

<style>
    h5.card-title{
        background-color: #ffff00;
        color: #000;
        border: 5px solid #000;
        text-align: center;
    }
    .card-header {
        background-color: red;
        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
    }
    .onHire {
        background-color: #10cc10;
    }
    .modal-body {
        text-align: center;
    }
</style>