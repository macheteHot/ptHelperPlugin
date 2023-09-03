<script setup lang="ts">
import { pick } from 'lodash'
import { reactive, ref, watchEffect } from 'vue'
import { DOWNLOAD_CLIENT_TYPE, DOWNLOAD_CLIENT_URL, DOWNLOAD_SAVEPATH } from '@/constants'
import useChromeStorage from '@/tools/useStorage'
import { type FormInstance, type FormRules } from 'element-plus'

type RuleForm = {
  [DOWNLOAD_CLIENT_TYPE]: '1' | '2'
  [DOWNLOAD_CLIENT_URL]: string
  [DOWNLOAD_SAVEPATH]: string
}
const ruleForm = reactive<RuleForm>({
  [DOWNLOAD_CLIENT_URL]: '',
  [DOWNLOAD_CLIENT_TYPE]: '1', // default type
  [DOWNLOAD_SAVEPATH]: ''
})

const [chromeData, setChromeData] = useChromeStorage()

watchEffect(() => {
  Object.assign(
    ruleForm,
    pick(chromeData, [DOWNLOAD_CLIENT_TYPE, DOWNLOAD_CLIENT_URL, DOWNLOAD_SAVEPATH])
  )
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  [DOWNLOAD_CLIENT_TYPE]: [{ required: true, message: '请选择下载器类型', trigger: 'blur' }],
  [DOWNLOAD_CLIENT_URL]: [
    { required: true, message: '请填写下载器地址', trigger: 'blur' },
    {
      pattern: /^((https?:)(\/\/\/?)([\d\w.-]+)(?::(\d+))?)?\/?$/,
      message: '下载器地址错误!',
      trigger: 'blur'
    }
  ],
  [DOWNLOAD_SAVEPATH]: [{ required: true, message: '请填写下载器地址', trigger: 'blur' }]
})

async function submit() {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate()
  setChromeData(ruleForm)
  ElMessage({
    message: '下载器配置保存成功!',
    type: 'success'
  })
}
</script>

<template>
  <el-card class="w-480">
    <template #header>
      <div class="h-20 flex-space-between-center fs-18">
        <span>下载器设置</span>
      </div>
    </template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      label-position="top"
      status-icon
    >
      <el-form-item label="下载器选择" :prop="DOWNLOAD_CLIENT_TYPE">
        <el-radio-group v-model="ruleForm[DOWNLOAD_CLIENT_TYPE]" class="ml-4">
          <el-radio label="1" size="large">qBittorrent</el-radio>
          <el-radio label="2" size="large">Transmission</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="下载器地址" :prop="DOWNLOAD_CLIENT_URL">
        <el-input
          v-model="ruleForm[DOWNLOAD_CLIENT_URL]"
          placeholder="请填写下载器地址"
          type="url"
        />
      </el-form-item>
      <el-form-item label="存储路径" :prop="DOWNLOAD_SAVEPATH">
        <el-input v-model="ruleForm[DOWNLOAD_SAVEPATH]" placeholder="请填写存储路径" />
      </el-form-item>
    </el-form>
    <el-button @click="submit">保存</el-button>
  </el-card>
</template>

<style scoped>
/**  */
</style>
@/service-worker
