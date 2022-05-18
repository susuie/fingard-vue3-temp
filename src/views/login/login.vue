<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from './cpns/login-panel.vue';

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
