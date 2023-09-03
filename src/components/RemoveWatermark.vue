<script setup lang="ts">
import useChromeStorage from '@/tools/useStorage'
import { REMOVE_WATERMARK } from '../constants'

const [chromeData, setChromeData] = useChromeStorage()

function toggleRemoveWatermark() {
  setChromeData({
    [REMOVE_WATERMARK]: !chromeData[REMOVE_WATERMARK]
  })
}
</script>

<template>
  <el-card class="w-480">
    <template #header>
      <div class="h-20 flex-space-between-center fs-18">
        <span>去除水印设置</span>
        <el-switch @click="toggleRemoveWatermark" v-bind:value="!!chromeData[REMOVE_WATERMARK]" />
      </div>
    </template>
    <div class="fs-16">
      <div class="flex-flex-start-center gap-16">
        <span class="br-50% square-8 bg-#409EFF"></span>
        <span>PTT</span>
      </div>
      <el-divider class="m-y-16" />
    </div>
  </el-card>
</template>

<style scoped>
/**  */
</style>
@/service-worker
