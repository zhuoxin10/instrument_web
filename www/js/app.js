'use strict';

angular.module('IntelligentDetector',['ui.router','controllers','services','directives'])

.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  console.log(123);
  $urlRouterProvider.otherwise("/login");
  $urlRouterProvider.when('/main', '/main/data/testResult');
  $stateProvider
  // 登录
    .state('login',{
      url:"/login",
      templateUrl:"templates/login.html",
        controller:"LoginCtrl"
    })
  // 主页面
    .state('main',{
      abstract:true,
      url:"/main",
      templateUrl:"templates/main.html"
    })
    .state('main.data',{
      url:"/data",
      templateUrl:'templates/data.html'
    })
    .state('main.monitors',{
      url:"/monitors",
      templateUrl:'templates/monitors.html'
    })
    .state('main.settings',{
      url:"/settings",
      templateUrl:'templates/settings.html'
    })
    // 汇总数据
    .state('main.data.sampleList',{
        url:"/sampleList",
        templateUrl:'templates/data/sampleList.html'
    })
    .state('main.data.testResult',{
      url:"/testResult",
      templateUrl:'templates/data/testResult.html'
    })
    .state('main.data.instrument',{
      url:"/instrument",
      templateUrl:'templates/data/instrument.html'
    })
    .state('main.data.reagent',{
      url:"/reagent",
      templateUrl:'templates/data/reagent.html'
    })
    .state('main.data.sampling',{
      url:"/sampling",
      templateUrl:'templates/data/sampling.html'
    })
    // 监控
    .state('main.monitorDebug',{
      url:"/monitorDebug",
      templateUrl:'templates/monitors/monitorDebug.html'
    })
    .state('main.realTime',{
      url:"/realTime",
      templateUrl:'templates/monitors/realTime.html'
    })
    // 设置
    .state('main.personalInfo',{
      url:"/personalInfo",
      templateUrl:'templates/settings/personalInfo.html'
    })
    .state('setPassword',{
      url:"/setpassword",
      templateUrl:'templates/settings/setPassword.html'
    })
    .state('changePassword',{
      url:"/changepassword",
      templateUrl:'templates/settings/changePassword.html'
    })
    .state('phoneValid',{
      url:"/phonevalid",
      templateUrl:'templates/settings/phonevalid.html'
    })
    .state('userDetail',{
      url:"/userdetail",
      templateUrl:'templates/settings/userdetail.html'
    })
}])
