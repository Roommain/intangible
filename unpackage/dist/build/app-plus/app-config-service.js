
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/main/main","pages/music/music","pages/classify/classify","pages/user/user","pages/search/search","pages/index/index","pages/singerSong/singerSong","pages/login/login"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F7F7F7","backgroundColor":"#F7F7F7"},"tabBar":{"color":"#7A7E83","selectedColor":"#b4282d","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/main/main","iconPath":"static/tab-bar/home.png","selectedIconPath":"static/tab-bar/home-active.png","text":"主页"},{"pagePath":"pages/classify/classify","iconPath":"static/tab-bar/icon1.png","selectedIconPath":"static/tab-bar/icon.png","text":"分类"},{"pagePath":"pages/search/search","iconPath":"static/tab-bar/sousuo1.png","selectedIconPath":"static/tab-bar/sousuo.png","text":"搜索"},{"pagePath":"pages/user/user","iconPath":"static/tab-bar/geren1.png","selectedIconPath":"static/tab-bar/geren.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"非遗","compilerVersion":"2.6.11","entryPagePath":"pages/main/main","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"非遗","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}},{"path":"/pages/music/music","meta":{},"window":{"navigationBarTitleText":"音乐馆","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}},{"path":"/pages/classify/classify","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}},{"path":"/pages/search/search","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"搜索","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"第一个uniapp","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}},{"path":"/pages/singerSong/singerSong","meta":{},"window":{"navigationBarTitleText":"详情","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录/注册","navigationBarBackgroundColor":"#b4282d","navigationBarTextStyle":"white"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});