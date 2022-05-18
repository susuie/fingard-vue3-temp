<template>
  <el-form label-width="60px" ref="formRef">
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="phone.mobile" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElForm } from 'element-plus';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const phone = reactive({
      mobile: '',
      code: ''
    });
    const store = useStore();
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('login/accountLoginAction', { ...phone });
        }
      });
    };
    return {
      phone,
      formRef,
      loginAction
    };
  }
});
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
