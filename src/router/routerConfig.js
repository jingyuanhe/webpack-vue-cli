const demoRouterMap = [
  {
    path: '/',
    name: 'demo',
    component: () => import('@/views/demo'),
    meta: {
      title: 'demo'
    }
  }
];
export { demoRouterMap };
