<template lang="">
    <div class="mt-4">
        <h4 class="my-2">Visualisation graph</h4>
        <div class="row m-0">
            <div class="col-md-6">
                <BarChart />
            </div>
            <div class="col-md">
                <BarDonot />
            </div>
        </div>
    </div>
</template>
<script setup>
import BarChart from '../../../components/BarChart.vue'
import BarDonot from '../../../components/BarDonot.vue'
</script>