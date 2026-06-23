<script setup lang="ts">
interface MetricItem {
  id: string
  label: string
  value: string
  tone: string
}

defineProps<{
  items: MetricItem[]
}>()
</script>

<template>
  <div class="metric-panel">
    <article v-for="item in items" :key="item.id" class="metric-card" :data-tone="item.tone">
      <span class="metric-label">{{ item.label }}</span>
      <strong class="metric-value">{{ item.value }}</strong>
    </article>
  </div>
</template>

<style scoped>
.metric-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.metric-card {
  border: 1px solid #d9dde7;
  border-radius: 6px;
  background: #ffffff;
  padding: 18px;
}

.metric-card[data-tone='green'] {
  border-left: 4px solid #0f766e;
}

.metric-card[data-tone='blue'] {
  border-left: 4px solid #155dfc;
}

.metric-card[data-tone='amber'] {
  border-left: 4px solid #b45309;
}

.metric-label {
  display: block;
  margin-bottom: 8px;
  color: #64748b;
}

.metric-value {
  font-size: 28px;
}

@media (max-width: 760px) {
  .metric-panel {
    grid-template-columns: 1fr;
  }
}
</style>
