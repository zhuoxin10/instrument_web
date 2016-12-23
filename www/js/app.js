'use strict';

angular.module('IntelligentDetector',['ui.router','controllers','services','directives'])

.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  console.log(123);
  $urlRouterProvider.otherwise("/login");
  $urlRouterProvider.when('/main', '/main/data');
  $stateProvider
  // 登录
    .state('login',{
      url:"/login",
      templateUrl:"templates/login.html",
    })
  // 主页面
    .state('main',{
      abstract:true,
      url:"/main",
      templateUrl:"templates/main.html"
    })
    .state('main.home',{
      url:"/home",
      templateUrl:'templates/home.html'
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
    .state('main.computerVision',{
      url:"/computerVision",
      templateUrl:'templates/data/computerVision.html'
    })
    .state('main.detection',{
      url:"/detection",
      templateUrl:'templates/data/detection.html'
    })
    .state('main.incubator',{
      url:"/incubator",
      templateUrl:'templates/data/incubator.html'
    })
    .state('main.instrument',{
      url:"/instrument",
      templateUrl:'templates/data/instrument.html'
    })
    .state('main.reagent',{
      url:"/reagent",
      templateUrl:'templates/data/reagent.html'
    })
    .state('main.sampling',{
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

    .state('phoneValid',{
      url:"/phonevalid",
      templateUrl:'templates/settings/phonevalid.html'
    })

}])
