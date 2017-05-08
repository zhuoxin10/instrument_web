'use strict';

angular.module('IntelligentDetector',['ui.router','controllers','services','directives','ngTable'])

.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/login");
    $urlRouterProvider.when('/data', '/main/data/sampling');
    $urlRouterProvider.when('/sampling', '/main/data/sampling');
    $urlRouterProvider.when('/testResult', '/main/data/testResult');
    $urlRouterProvider.when('/instrument', '/main/data/instrument');
    $urlRouterProvider.when('/reagent', '/main/data/reagent');
    $urlRouterProvider.when('/newSample', '/main/data/newSample');
    $urlRouterProvider.when('/newReagent', '/main/data/newReagent');
    $urlRouterProvider.when('/monitors', '/main/monitors/realTime');
    $urlRouterProvider.when('/monitorDebug', '/main/monitors/monitorDebug');
    $urlRouterProvider.when('/realTime', '/main/monitors/realTime');
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
        url:"/main",
        templateUrl:"templates/main.html",
        controller:"MainCtrl"
    })
    .state('main.data',{
        abstract:true,
        url:"/data",
        templateUrl:'templates/data.html'
    })
    .state('main.monitors',{
        abstract:true,
        url:"/monitors",
        templateUrl:'templates/monitors.html',
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
    .state('main.data.newSample',{
        url:"/newSample",
        templateUrl:'templates/data/newSample.html',
        controller:'newSampleCtrl'
    })
    .state('main.data.newReagent',{
        url:"/newReagent",
        templateUrl:'templates/data/newReagent.html',
        controller:'newReagentCtrl'
    })
    // 监控
    .state('main.monitors.monitorDebug',{
    url:"/monitorDebug",
    templateUrl:'templates/monitors/monitorDebug.html',
    controller: 'MonitorCtrl'
    })
    .state('main.monitors.realTime',{
    url:"/realTime",
    templateUrl:'templates/monitors/realTime.html',
      controller:"RealTimeCtrl"
    })
    // 设置
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

.run(['$rootScope','$stateParams','Storage',function($rootScope,$stateParams,Storage){
    $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fronParams){
        // console.log(fromState);
        if(fromState.name=='main.data.testResult'){
            Storage.rm('ObjectNo');
            Storage.rm('ObjCompany');
            Storage.rm('ObjIncuSeq');
        }
        // console.log(toState.name);
        switch(toState.name){
            case 'main.data.sampling' : 
                $('#mytabs a[href="#data"]').tab('show');
                $('#mypills a[href="#sampling"]').tab('show');
                break;
            case 'main.data.testResult' : 
                // $('#mytabs a[href="#data"]').tab('show');
                $('#mypills a[href="#testResult"]').tab('show');
                break;
            case 'main.data.reagent' : 
                // $('#mytabs a[href="#data"]').tab('show');
                $('#mypills a[href="#reagent"]').tab('show');
                break;
            case 'main.data.instrument' : 
                // $('#mytabs a[href="#data"]').tab('show');
                $('#mypills a[href="#instrument"]').tab('show');
                break;
            case 'main.data.newSample' : 
                // $('#mytabs a[href="#data"]').tab('show');
                $('#mypills a[href="#newSample"]').tab('show');
                break;
            case 'main.data.newReagent' : 
                // $('#mytabs a[href="#data"]').tab('show');
                $('#mypills a[href="#newReagent"]').tab('show');
                break;
            case 'main.monitors.realTime' : 
                $('#mytabs a[href="#monitors"]').tab('show');
                $('#mypills a[href="#realTime"]').tab('show');
                break;
            case 'main.monitors.monitorDebug' : 
                // $('#mytabs a[href="#monitors"]').tab('show');
                $('#mypills a[href="#monitorDebug"]').tab('show');
                break;
            default:break;                
        }
    })
}])