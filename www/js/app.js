'use strict';

angular.module('IntelligentDetector',['ui.router','controllers','services','directives','ngTable'])

.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise("/login");
    $urlRouterProvider.when('/main', '/main/data/sampling');
    $urlRouterProvider.when('/data', '/main/data/sampling');
    $urlRouterProvider.when('/monitors', '/main/monitors');
    $urlRouterProvider.when('/settings', '/main/settings');
    $urlRouterProvider.when('/sampling', '/main/data/sampling');
    $urlRouterProvider.when('/testResult', '/main/data/testResult');
    $urlRouterProvider.when('/instrument', '/main/data/instrument');
    $urlRouterProvider.when('/reagent', '/main/data/reagent');
    $stateProvider
    // 登录
        .state('login',{
            url:"/login",
            templateUrl:"templates/login.html",
            controller:"LoginCtrl"
        })
        //注册
        .state('register',{
            url:"/register",
            templateUrl:"templates/register.html",
            controller:"RegisterCtrl"
        })
        // 主页面
        .state('main',{
            // abstract:true,
            url:"/main",
            templateUrl:"templates/main.html"
        })
        .state('main.data',{
            url:"/data",
            templateUrl:'templates/data.html'
        })
        .state('main.monitors',{
            url:"/monitors",
            templateUrl:'templates/monitors.html',
            controller:'MonitorCtrl'
        })
        .state('main.settings',{
            url:"/settings",
            templateUrl:'templates/settings.html',
            controller:'SettingsCtrl'
        })
        // 汇总数据
        .state('main.data.testResult',{
            url:"/testResult",
            templateUrl:'templates/data/testResult.html',
            controller:'testResultCtrl'
        })
        .state('main.data.instrument',{
            url:"/instrument",
            templateUrl:'templates/data/instrument.html',
            controller:'instrumentCtrl'
        })
        .state('main.data.reagent',{
            url:"/reagent",
            templateUrl:'templates/data/reagent.html',
            controller:'reagentCtrl'
        })
        .state('main.data.sampling',{
            url:"/sampling",
            templateUrl:'templates/data/sampling.html',
            controller:'samplingCtrl'
        })
      // 监控
      .state('main.monitorDebug',{
        url:"/monitorDebug",
        templateUrl:'templates/monitors/monitorDebug.html',
        controller: 'MonitorCtrl'
      })
      .state('main.realTime',{
        url:"/realTime",
        templateUrl:'templates/monitors/realTime.html',
          controller:"RealTimeCtrl"
      })
      // 设置
      .state('main.personalInfo',{
        url:"/personalInfo",
        templateUrl:'templates/settings/personalInfo.html',
          controller:"PersonalInfoCtrl"
      })
      .state('setPassword',{
        url:"/setPassword",
        templateUrl:'templates/settings/setPassword.html',
        controller:"SetPasswordCtrl"
      })
      .state('changePassword',{
        url:"/changePassword",
        templateUrl:'templates/settings/changePassword.html',
        controller:"ChangePasswordCtrl"
      })
      .state('phoneValid',{
        url:"/phoneValid",
        templateUrl:'templates/settings/phoneValid.html',
        controller:'phoneValidCtrl'
      })
      .state('userDetail',{
        url:"/userDetail",
        templateUrl:'templates/settings/userdetail.html'
      })
}])
