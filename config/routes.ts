export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: 'Login', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: 'management page',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', name: "sub-management page", redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: 'sub-management page', component: './Admin' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
