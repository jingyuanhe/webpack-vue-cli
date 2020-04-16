export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state: {
    currentDate: new Date(Date.now() - 1000 * 3600 * 24),
    count: 0
  },
  getter () {},
  mutations: {
    add (state) {
      state.count++;
    }
  },
  actions: {
    add (context) {
      context.commit('add');
    }
  }
};
