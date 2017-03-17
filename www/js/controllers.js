angular.module('controllers',['ngResource','services'])

  .controller('LoginCtrl',['UserService','$scope','$state','Storage', function(UserService,$scope,$state,Storage){
      $scope.logdisable = false;
      if(Storage.get('USERNAME')!=null){
          $scope.login = { username : Storage.get('USERNAME'),
              password : ""
          };
      }
      else{
          $scope.logn = { username : "",
              password : ""
          };
      }
      var  count = 0 //记录总次数
      // UserService.Login("2323","12345678")
      $scope.logStatus = " ";
      $scope.LogIn = function(login) {
          //显示登陆的进程
          $scope.logStatus = " ";

          // 如果都输入完全的信息了 开始下一步
          if (login.username != "" && login.password != "") {
              UserService.Login("2323","12345678").then(function (data) {
                  if (data == "1"){ //成功
                      $scope.logStatus = " 登陆成功";
                      Storage.set('USERNAME', login.username);
                      $timeout(function(){$state.go('main.data');} , 500);
                  }
                  else{ //失败
                      if(count++ <5){ //超过五次 禁止登陆
                          $scope.logStatus = " 信息有误";
                      }else{
                          $scope.logStatus = " 稍后再试";
                          $scope.logdisable = true;
                          $timeout(function(){$scope.logdisable=false;count=0;} , 60000);
                      }
                  }
              },function (err) { //有其他错误
                  if(count++ <5){ //超过五次 禁止登陆
                      $scope.logStatus =  "网络连接有误";
                  }else{
                      $scope.logStatus = "稍后再试";
                      $scope.logdisable = true;
                      $timeout(function(){$scope.logdisable=false;count=0;} , 60000);
                  }

              })
              var saveUID
          }
          else {
              if(count++ <5){   //超过五次 禁止登陆
                  $scope.logStatus =  "请输入完整信息";
              }else{
                  $scope.logStatus = "请输入完整信息";
                  $scope.logdisable = true;
                  $timeout(function(){$scope.logdisable=false;count=0;} , 60000);
              }
              // $scope.logStatus = "请输入完整信息！";
          }
      }
          //否则提示应该输入完整信息
      //     if((logOn.username != "") && (logOn.password != "")){
      //         var cont = 0;
      //
      //         var saveUID = function(){
      //             var UIDpromise = UserService.UID('PhoneNo',logOn.username);
      //             UIDpromise.then(function(data){
      //                 loading.loadingBarFinish($scope);
      //                 if(data.result != null){
      //                     // Storage.set('USERNAME', .username);
      //                     // Storage.set('PASSWORD', logOn.password);
      //                     Storage.set('isSignIN','YES');
      //                     $scope.logStatus="登录成功";
      //                     Storage.set('UID', data.result);
      //                     $timeout(function(){$state.go('coach.patients');} , 500);
      //                     //window.plugins.jPushPlugin.setAlias(data.result);
      //                 }
      //             },function(data){
      //                 if(cont++<5){
      //                     saveUID();
      //                 }else{
      //                     loading.loadingBarFinish($scope);
      //                     $scope.logStatus="网络错误"
      //                 }
      //             });
      //         }
      //
      //         var promise=userservice.userLogOn('PhoneNo' ,logOn.username,logOn.password,'HealthCoach');
      //         if(promise==7){
      //             $scope.logStatus='手机号验证失败！';
      //             return;
      //         }
      //         // loading.loadingBarStart($scope);
      //         promise.then(function(data){
      //             // loading.loadingBarFinish($scope);
      //             // $scope.logStatus=data.result.substr(0,4);
      //             if(data.result.substr(0,4)=="登陆成功"){
      //                 Storage.set('TOKEN', data.result.substr(12));
      //                 saveUID();
      //                 // $timeout(function(){$state.go('coach.patients');} , 1000);
      //             }
      //         },function(data){
      //             loading.loadingBarFinish($scope);
      //             if(data.data==null && data.status==0){
      //                 $scope.logStatus='网络错误！';
      //                 return;
      //             }
      //             if(data.status==404){
      //                 $scope.logStatus='连接服务器失败！';
      //                 return;
      //             }
      //             if(data.data.result=='暂未激活'){
      //                 //Storage.set('TOKEN', data.result.substr(12));
      //                 saveUID();
      //                 return;
      //             }
      //             $scope.logStatus=data.data.result;
      //         });
      //     }else{
      //         $scope.logStatus="请输入完整信息！";
      //     }
      // }
      //
      $scope.toRegister = function(){
          $state.go('phoneValid');
          Storage.set('setPasswordState','register');
      }

      $scope.toReset = function() {
          $state.go('phoneValid');
          Storage.set('setPasswordState', 'reset');
      }




  }])

.controller('analysisCtrl',['$scope','$sce', 'CONFIG', 'deckInfoDetail', 'Info', 'MstUser', 'TrnOrderingSurgery',
  function($scope,$sce,CONFIG,deckInfoDetail,Info,MstUser,TrnOrderingSurgery){

}])

