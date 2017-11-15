module.exports = {
  devHost: 'http://localhost:8081/',
  serverHost: 'http://123.207.150.18:8081/',
  rootPath: '/',
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
    value: '资源管理',
    url: '/admin/resource'
  }, {
    value: '退出'
  }
  ],
  leftNavList: [{
    value: '主页',
    url:'/'
  },{
    value: '技术',
    url: '/share'
  },{
    value: '随笔',
    url: '/essay'
  }],
  otherPlatform:[{
    name: 'github',
    url: 'https://github.com/YuChenLi923',
    target: '_blank'
  }],
  shareType: ['JavaScript','CSS','HTML','Node','其他']
}
