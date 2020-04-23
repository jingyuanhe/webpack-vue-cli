<template>
  <div>
    <div>demo</div>
    <div v-wechat-title='title'>{{count}}</div>
    <button @click="add"></button>
    <img src="../assets/logo.png">
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data () {
    return {
      title: 'demo'
    };
  },
  computed: {
    ...mapState('common', ['count'])
  },
  methods: {
    ...mapMutations('common', ['add'])
  }
};
</script>
