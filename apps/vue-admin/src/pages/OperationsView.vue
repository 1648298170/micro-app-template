<script setup lang="ts">
import { computed } from 'vue'
import MetricPanel from '../components/MetricPanel.vue'

const metrics = [
  { id: 'orders', label: 'Open orders', value: '2,914', tone: 'blue' },
  { id: 'sla', label: 'SLA health', value: '98.7%', tone: 'green' },
  { id: 'incidents', label: 'Incidents', value: '4', tone: 'amber' },
]

const activeMetrics = computed(() => metrics.filter((metric) => metric.value !== '0'))
</script>

<template>
  <section class="operations-view">
    <MetricPanel :items="activeMetrics" />
  </section>
</template>

<style scoped>
.operations-view {
  display: grid;
  gap: 18px;
}
</style>
