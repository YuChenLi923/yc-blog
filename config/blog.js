module.exports = {
  devHost: 'http://localhost:8081/',
  serverHost: 'http://123.207.150.18/',
  rootPath: '/',
  title: '宇宸的博客',
  subTitle: '我不是一个伟大的前端工程师，我只是一个具有良好习惯的前端工程师',
  myselfInfo: {
    name: '宇宸'
  },
  adminLeftNavList: [{
    value: '发布文章',
    url: '/admin/publish'
  }, {
    value: '文章管理',
    url: '/admin/manage'
  }, {
    value: '分类管理',
    url: '/admin/sort'
  }, {
    value: '退出'
  }
  ],
  leftNavList: [{
    value: '主页',
    url:'/'
  },{
    value: '分类',
    url: '/sort'
  },{
    value: '归档',
    url: '/archives'
  }],
  otherPlatform:[{
    name: 'github',
    url: 'https://github.com/YuChenLi923',
    target: '_blank'
  }],
  shareType: ['JavaScript','CSS','HTML','Node','其他']
}
