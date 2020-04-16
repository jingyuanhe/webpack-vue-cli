<template>
  <div>
    <div>demo</div>
    <div>{{count}}</div>
    <button @click="add"></button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState('common', ['count'])
  },
  methods: {
    ...mapMutations('common', ['add'])
  }
};
</script>
