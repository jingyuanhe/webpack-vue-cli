<template>
  <div>
    <div class="demo">demo</div>
    <div v-wechat-title='title'>{{count}}</div>
    <button @click="add"></button>
    <img src="../assets/logo.png">
    <span>{{page}}</span>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { cube } from '@/lib/math.js';
import mixin from '@/lib/publicMethods';
export default {
  mixins: [mixin],
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
  },
  created () {
    console.log(cube(5));
  }
};
</script>
<style scoped lang="scss">
.demo {
  background: #fff;
  width: 20px;
  display: flex;
  transform: translateY(20);
}
</style>
