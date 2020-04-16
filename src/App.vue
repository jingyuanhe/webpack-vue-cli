<template>
    <div id="app" :key="appKey">
      <transition>
        <!-- <router-view v-wechat-title='$route.meta.title'></router-view> -->
        <router-view></router-view>
      </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      appKey: 1
    };
  },
  watch: {
    $route: function (newUrl, oldUrl) {
      this.appKey = new Date().getTime();
    }
  }
};
</script>
