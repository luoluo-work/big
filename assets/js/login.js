$(function(){
    //注册账号
    $('#goregi').click(function(){
        //显示注册
        $('.register').show();
        //隐藏登陆
        $('.login').hide();
    })
     //登陆账号
     $('#gologin').click(function(){
        $('.register').hide();
        //隐藏登陆
        $('.login').show();
    })
    let form = layui.form;
    let layer = layui.layer;
    // 表单校验
    form.verify({
        
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        repass:function(value,item){
           // console.log(value);
           // console.log($(".passInt").val());
if(value !== $(".passInt").val()){
    return '两次密码不一致'
}
        }
      });  
      //实现注册功能
      //1.当form表单提交的时候触发表单的submit提交功能 == > 注册form的submit 事件
      //2.阻止form表单的默认行为
      //3.收集表单中的数据
      //4.发送ajax ==> 看接口文档
      $('#register').on('submit',function(e){
          e.preventDefault();
          let data = $(this).serialize();
          //console.log(date);
          $.ajax({
            type:'POST',
            url:"/api/reguser",
            data,
            success:function(res){
            console.log(res);
            if(res.status !== 0){
            return   layer.msg(res.message);
              }
              layer.msg(res.message);
              $("#register")[0].reset()
              $("#gologin").click()
            }
          })
      })   
      //登录
      $("#login").on('submit',function(e){
        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);
        $.ajax({
          type:"POST",
          url:"/api/login",
          data,
          success:function(res){
            console.log(res);
            if(res.status !== 0){
              return  layer.msg(res.message)
            }
            localStorage.setItem("token",res.token);
            layer.msg("登录成功，即将跳转到首页",{time: 2000},function(){
              location.href = "/home/index.html"
            });
            
          }
        })
      })
})
