angular.module('controllers',['ngResource','services'])

.controller('LoginCtrl',['UserService','$scope','$state','Storage', '$timeout', function(UserService,$scope,$state,Storage,$timeout){

    //捆绑变量
    $scope.logdisable = false;
    $scope.logStatus = " ";

    // 判断当前本地是否缓存了手机号
    if(Storage.get('PHONENO')!=null){ //缓存了手机号 将其显示到输入栏
      $scope.login = { phoneno : Storage.get('PHONENO'),
          password : ""
      };
    }
    else{ //否则空白显示
      $scope.login = { phoneno : "",
          password : ""
      };
    }
    var  count = 0; //记录登录总次数,用于disable button

    // UserService.Login("2323","12345678")

    $scope.LogIn = function(login) {
      //显示登陆的进程
      $scope.logStatus = " ";

      // 如果都输入完全的信息了 开始下一步
      if (login.phoneno != "" && login.password != "") {

          //判断合法手机号
          var phonev = /^1(3|4|5|7|8)\d{9}$/;
          if(!phonev.test(login.phoneno) ){
              $scope.logStatus = '请输入正确手机号';
              return
          }

          //从手机号获得 UserId
          UserService.GetUserByPhoneNo(login.phoneno).then(function(data){

              data = data.toJSON();
              t = [];
              for(i in data){
                  t = t + data[i];
              }
              data = t;

              if(data != ""){ //获得UserId

                  // console.log(data.result);
                  Storage.set("UID",data);
                  UserService.SetUID(data);
                  //本地暂存
                  UserService.Login(data,login.password).then(function(data2){ //登陆
                      if(data2.result =="登录成功"){

                          $scope.logStatus = " 登录成功";
                          //获得个人信息
                          // UserService.GetUserInfo(login.phoneno).then(function(data){
                          //     console.log(data.result.split('|'))
                          // });
                          // 跳转到主页
                          $timeout(function(){$state.go('main.data');} , 500);

                      }
                      else{
                          switch(data2.result){
                              case 0: $scope.logStatus = "用户不存在";break;
                              case -1: $scope.logStatus = "密码错误";break;
                              case -2: $scope.logStatus = "连接数据库失败";break;
                              default: $scope.logStatus = "其他问题";break;

                          }

                          if(count++ >= 5){ //连续超过五次 禁止登陆60s
                              $scope.logStatus = "稍后再试";
                              $scope.logdisable = true;
                              $timeout(function(){$scope.logdisable=false;count=0;} , 60000);
                          }
                      }
                  })
              }

              }
          )

      }
      else{ //否则开始计算点击次数
          if(count++ <5){   //超过五次 禁止登陆
              $scope.logStatus =  "请输入完整信息";
          }else{
              $scope.logStatus = "请输入完整信息";
              $scope.logdisable = true;
              $timeout(function(){$scope.logdisable=false;count=0;} , 60000);
          }
      }
    };
    $scope.toRegister = function(){ //跳转到注册页面-电话验证

      Storage.set('setPasswordState','register');
      $state.go('phoneValid');

    }

    $scope.toReset = function() {//跳转到找回密码页面-电话验证

      Storage.set('setPasswordState', 'reset');
      $state.go('phoneValid');

    }




}])

.controller('phoneValidCtrl',['$scope','$timeout','$interval','Storage','$state','UserService',function($scope,$timeout,$interval,Storage,$state,UserService){

    $scope.telnumber = '';
    $scope.validnumber = '';
    $scope.check = '';
    $scope.validStatus = "点击发送验证码";
    $scope.title = " ";

    switch(Storage.get('setPasswordState')){
        case 'register':  $scope.title = "注册"; break;
        case 'reset': $scope.title = "找回密码"; break;
        default: $scope.title = "注册";
    }

    var uid_valid = /^UID\d{11}/;
    var RegisterNewUser = function(tel){

        UserService.CreateNewUserId(tel).then(function(data){
            // 转换成 json
            data = data.toJSON();
            var t = "";
            for(i in data){
                t = t + data[i];
            }
            data = t;

            // console.log(data);
            if(data == "该手机号已经注册" ){
                $scope.validStatus = "该手机号已经注册";
                return ;
            }
            else if(uid_valid.test(data)){
                $scope.validStatus = "生成新用户ID成功";
                Storage.set('UID', data);
                UserService.SetUID(data);
                UserService.SetPhenoNo(tel);
            }
            else{
                $scope.validStatus = "生成新用户ID失败";
            }
        },function(er){
            console.log(er)
        });
    }

    var ResetPassword = function(tel){
        //判断手机号是否存在
        UserService.GetUserByPhoneNo(tel).then(function(data){
            // 转换成 json

            data = data.toJSON();
            var t = "";
            for(i in data){
                t = t + data[i];
            }
            data = t;

            if(data == null){
                $scope.validStatus = "不存在该用户";
                return
            }
            else if(uid_valid.test(data)){
                Storage.set("UID",data);
                UserService.SetUID(data);
                $scope.validStatus = "已发送验证";
            }
        })
    };

    $scope.SendMSM = function(tel){

        var phonev = /^1(3|4|5|7|8)\d{9}$/;
        if(!phonev.test(tel) ){
            $scope.check = '请输入正确手机号';
            return
        }


        if(Storage.get('setPasswordState') == 'register'){
            RegisterNewUser(tel);
        }
        else{
            ResetPassword(tel);
        }

        //倒计时60s
        $timeout(function(){$scope.validStatus = "点击发送验证码";} , 60000);
        var second = 60;
        timePromise = undefined;

        timePromise = $interval(function(){
            if(second<=0){
                $interval.cancel(timePromise);
                timePromise = undefined;
                second = 60;
                $scope.validStatus = "重发验证码";
            }else{
                $scope.validStatus = String(second) + "秒后再发送";
                second--;

            }
        },1000,100);


    };

    $scope.validNext = function(number){

        var phonev = /^1(3|4|5|7|8)\d{9}$/;
        if(!phonev.test(number) ){
            $scope.check = '请输入正确手机号';
            return
        }

        var validNumberReg = /^\d{6}$/;
        if(!validNumberReg.test($scope.validnumber)){
            $scope.check = '请输入正确验证码';
            return
        }


        //调web Service 判断验证码正不正确


        switch(Storage.get('setPasswordState')){
            case 'register': $state.go('register');break;
            case 'reset': $state.go('setPassword');
        }
    }

    $scope.onClickCancel = function(){
       Storage.rm("UID");
       $state.go("login");
    }



}])


.controller('RegisterCtrl',['UserService','$scope','$state','Storage', '$timeout', function(UserService,$scope,$state,Storage,$timeout){

    $scope.registerInfo = {
        uid:UserService.GetUID(),
        username:'',
        id:'',
        password:'',
        password_rep:'',
        role:""
    };

    $scope.status = "";


    $scope.onClickReg = function(registerInfo){


        if(registerInfo.role == ""){
            $scope.status = "请选角色";
        }

        if(registerInfo.password != registerInfo.password){
            $scope.status = "两次密码不同";
        }

        registerInfo.role = registerInfo.role[0];
        console.log(registerInfo.role);
        UserService.RegisterUser(registerInfo).then(function(data){
            // console.log(data);
            if(data.result == "注册成功"){
                $timeout(function(){$state.go('main.data');} , 500);
                $scope.status = "注册成功";
            }
            else{
                $scope.status = "注册失败";
            }
        })
    }
}])

.controller('SetPasswordCtrl',['UserService','$scope','$state','Storage', '$timeout', function(UserService,$scope,$state,Storage,$timeout){

    $scope.Input = {
        password:'',
        password2:''
    };

    $scope.status = "";

    $scope.onClickCancel = function(){
        Storage.rm("UID");
        $state.go("login");
    };

    $scope.onClickConfirm = function(Input){


        if(Input.password != Input.password2){
            $scope.status = "两次密码不同";
            return
        }

        // console.log(Storage.get("UID"));
        UserService.GetUserInfo(Storage.get("UID")).then(function(data){
            // console.log(Storage.get("UID"));
            data = data.toJSON();
            var t = "";
            for(i in data){
                t = t + data[i];
            }
            data = t;

            data = data.split('|');

            // console.log(data);
            Input.password_old = data[4];

            UserService.ChangePassword(Input).then(function(res){
                if(res.result == "修改成功"){
                    $timeout(function(){$state.go('main.data');} , 500);
                }
                else{

                }
                // if(res){
                //     $timeout(function(){$state.go('main.data');} , 500);
                // }
            })

        })
    }
}])


.controller('ChangePasswordCtrl',['UserService','$scope','$state','Storage', '$timeout', function(UserService,$scope,$state,Storage,$timeout){

    $scope.Input = {
        password:'',
        password2:'',
        password_old:''
    };

    $scope.status = "";


    $scope.onClickConfirm = function(Input){


        if(Input.password != Input.password2){
            $scope.status = "两次新密码不同";
            return
        }

        UserService.ChangePassword(Input).then(function(res){
            if(res.result == "修改成功"){
                $scope.status = "修改成功";
                $timeout(function(){$state.go('main.data');} , 500);
            }
            else{
                $scope.status = "修改失败";
            }
        })


    }
}])


.controller('SettingsCtrl',['UserService','$scope','$state','Storage', '$timeout', function(UserService,$scope,$state,Storage,$timeout){



    $scope.onClickLogOut = function(){
        Storage.rm("UID");
        $state.go("login");
    }
}])

.controller('PersonalInfoCtrl',['UserService','$scope','$state','Storage', '$timeout', function(UserService,$scope,$state,Storage,$timeout){

    $scope.info = {};
    $scope.status = "正在载入个人信息";
    UserService.GetUserInfo(Storage.get("UID")).then(function(data){
        data = data.toJSON();
        var t = "";
        for(i in data){
            t = t + data[i];
        }
        data = t;
        console.log(data);
    })
}])

    .controller('analysisCtrl',['$scope','$sce', 'CONFIG', 'deckInfoDetail', 'Info', 'MstUser', 'TrnOrderingSurgery',
  function($scope,$sce,CONFIG,deckInfoDetail,Info,MstUser,TrnOrderingSurgery){

}])

