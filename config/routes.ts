export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: 'Login', path: '/user/login', component: './User/Login' }],
  },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', name: 'Smart Analysis', icon: 'barChart', component: './AddChart' },
  { path: '/run_bse', name: 'Run BSE', icon: 'barChart', component: './RunBSE' },
  { path: '/my_chart', name: 'My Chart', icon: 'pieChart', component: './MyChart' },
  {
    path: '/admin',
    name: 'management page',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', name: 'sub-management page', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: 'sub-management page', component: './Admin' },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
