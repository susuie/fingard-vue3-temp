<template>
  <div class="login-page">
    <el-row>
      <el-col :span="12" class="login-back">
        <h1 class="title">后台管理系统</h1>
      </el-col>
      <el-col :span="6" :offset="3" class="login-panel">
        <h1 class="title">登录</h1>
        <el-tabs type="border-card" stretch v-model="currentTab">
          <el-tab-pane name="account">
            <template #label>
              <span><i class="el-icon-user-solid"></i> 账号登录</span>
            </template>
            <login-account ref="accountRef" />
          </el-tab-pane>
          <el-tab-pane name="phone">
            <template #label>
              <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
            </template>
            <login-phone ref="phoneRef" />
          </el-tab-pane>
        </el-tabs>

        <div class="account-control">
          <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
          <el-link type="primary">忘记密码</el-link>
        </div>

        <el-button type="primary" class="login-btn" @click="handleLoginClick"
          >立即登录</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    const currentTab = ref('account');

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        phoneRef.value?.loginAction();
      }
    };

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    };
  }
});
</script>

<style scoped lang="less">
.login-page {
  height: 100%;
  width: 100%;
  .el-row {
    height: 100%;
  }
  .login-back {
    background: url('../../../assets/images/login-back.png') 100% repeat;
    h1 {
      margin-top: 50%;
    }
  }
  .title {
    text-align: center;
    color: #3e9fff;
  }
  .login-panel {
    box-shadow: 0 0 2px 2px;
    max-width: 350px;
    height: 400px;
    overflow: hidden;
    border-radius: 4px;
    background-color: #fff;
    padding: 10px 30px 0;
    margin-top: 25%;
    transform: translateY(-50%);
    :deep(.login-account) {
      .el-form-item.is-required {
        .el-form-item__label:before {
          content: '';
        }
      }
    }

    .account-control {
      margin: 10px 0 0 30px;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      padding: 10px 50px;
      margin-top: 10px;
    }
  }
}
</style>
