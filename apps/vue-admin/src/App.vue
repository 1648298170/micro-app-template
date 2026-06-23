<script setup lang="ts">
import type { MicroAppRuntimeProps } from '@packages/shared'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

const props = defineProps<{
  runtimeProps?: Partial<MicroAppRuntimeProps>
}>()

const tenantLabel = computed(() => props.runtimeProps?.getUserInfo?.().tenantId ?? 'standalone')
</script>

<template>
  <div class="vue-admin-root">
    <header class="vue-admin-header">
      <div>
        <p class="vue-admin-kicker">Vue micro app</p>
        <h2 class="vue-admin-title">Operations workspace</h2>
      </div>
      <span class="vue-admin-chip">{{ tenantLabel }}</span>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.vue-admin-root {
  min-height: calc(100vh - 89px);
  background: #fbfcfe;
  color: #182133;
  padding: 26px;
}

.vue-admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.vue-admin-kicker {
  margin: 0 0 4px;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.vue-admin-title {
  margin: 0;
  font-size: 24px;
}

.vue-admin-chip {
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  padding: 6px 10px;
  color: #334155;
  background: #ffffff;
}
</style>
