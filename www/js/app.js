'use strict';

angular.module('IntelligentDetector', ['ui.router', 'controllers', 'services', 'directives', 'ngTable', 'ngAnimate', 'filters'])

    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");
            $urlRouterProvider.when('/users', '/main/users/allusers');
            $urlRouterProvider.when('/monitors', '/main/monitors/realTime');
            $urlRouterProvider.when('/monitorDebug', '/main/monitors/monitorDebug');
            $urlRouterProvider.when('/realTime', '/main/monitors/realTime');

            $stateProvider
                // 登录
                .state('login', {
                    url: "/login",
                    templateUrl: "templates/login.html",
                    controller: "LoginCtrl"
                })
                //注册
                .state('register', {
                    url: "/register",
                    templateUrl: "templates/register.html",
                    controller: "RegisterCtrl"
                })
                // 主页面
                .state('main', {
                    url: "/main",
                    templateUrl: "templates/main.html",
                    controller: "MainCtrl"
                })
                .state('main.monitors', {
                    abstract: true,
                    url: "/monitors",
                    templateUrl: 'templates/monitors.html',
                })
                // 监控
                .state('main.monitors.monitorDebug', {
                    url: "/monitorDebug",
                    templateUrl: 'templates/monitors/monitorDebug.html',
                    controller: 'MonitorCtrl'
                })
                .state('main.monitors.realTime', {
                    url: "/realTime",
                    templateUrl: 'templates/monitors/realTime.html',
                    controller: "RealTimeCtrl"
                })
                // 设置
                .state('setPassword', {
                    url: "/setPassword",
                    templateUrl: 'templates/settings/setPassword.html',
                    controller: "SetPasswordCtrl"
                })
                .state('changePassword', {
                    url: "/changePassword",
                    templateUrl: 'templates/settings/changePassword.html',
                    controller: "ChangePasswordCtrl"
                })
                .state('phoneValid', {
                    url: "/phoneValid",
                    templateUrl: 'templates/settings/phoneValid.html',
                    controller: 'phoneValidCtrl'
                })
                .state('userDetail', {
                    url: "/userDetail",
                    templateUrl: 'templates/settings/userdetail.html'
                })
        }
    ])

    .run(['$rootScope', '$stateParams', 'Storage', function($rootScope, $stateParams, Storage) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fronParams) {
            // console.log(fromState);
            if (fromState.name == 'main.data.testResult') {
                Storage.rm('ObjectNo');
                Storage.rm('ObjCompany');
                Storage.rm('ObjIncuSeq');
            }
            // console.log(toState.name);
            switch (toState.name) {
                case 'main.monitors.realTime':
                    $('#mytabs a[href="#monitors"]').tab('show');
                    $('#mypills a[href="#realTime"]').tab('show');
                    break;
                case 'main.monitors.monitorDebug':
                    // $('#mytabs a[href="#monitors"]').tab('show');
                    $('#mypills a[href="#monitorDebug"]').tab('show');
                    break;
                default:
                    break;
            }
        })
    }])