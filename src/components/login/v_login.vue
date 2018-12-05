<template>
    <div id="whole_page">
      <!-- 登录框 -->
        <div class="login_box">
            <div class="layui-form">
              <!-- 登录框头部 -->
                <div class="login_header">
                    <img src="/public/images/login/icon_logo.png" alt="未正常加载">
                    <span>{{ $t('login_cpms.watch') }}</span>
                </div>
                <!-- 登录框输入的内容 -->
                <div class="login_main">
                    <div class="layui-form-item">
                        <input type="text" class="layui-input username" :placeholder="$t('login_cpms.useName_placeholder')" autocomplete="off" autofocus v-model="loginForm.userName" @keyup.enter="loginOperate">
                    </div>
                    <div class="layui-form-item">
                        <input type="text" class="layui-input passwd" onfocus="this.type='password'" :placeholder="$t('login_cpms.password_placeholder')" autocomplete="off" v-model="loginForm.passwd" @keyup.enter="loginOperate">
                    </div>
                    <div class="layui-form-item keep_login">
                        <input type="checkbox" :title="$t('login_cpms.keeplogin_value')" lay-skin="primary" v-model="loginForm.keeplogin" lay-filter="test">
                    </div>
                    <div class="layui-form-item captcha">
                        <input type="text" class="layui-input" :placeholder="$t('login_cpms.Vcode')"  autocomplete="off"  v-model="loginForm.captcha" @keyup.enter="loginOperate">
                        <img :src="veriSrc" alt="验证码" @click="reflesh">
                        <button size="large" type="primary" @click="reflesh"></button>
                    </div>

                    <button class="layui-btn btn-login" lay-submit type="primary" @click="loginOperate">{{$t('login_cpms.login_button_value')}}</button>
                    <!-- 登录框脚部 -->
                    <div class="about">
                        <div @click="getsupporAjax()" class="skill">{{$t('login_cpms.tech_support_value')}}</div>
                        <div @click="getInfoAjax()" class="product">{{ $t('login_cpms.prod_info_value') }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 技术支持弹出框 -->
        <div id="skill_dialogForm" style="display: none">
          <div class="message_skill">
                <div class="head">
                    <span>{{$t("login_cpms.tech_support")}}</span>
                    <div class="msg_close" @click="closeMsg"></div>
                </div>
                <div class="article">
                    <div class="skill_QR"></div>
                    <h3>{{supporData.name}}</h3>
                    <ul>
                        <li>
                            <div class="tel_ico"></div>
                            <span>{{$t("login_cpms.tech.tS_tel")}}</span>
                            <span>{{supporData.tel}}</span>
                        </li>
                        <li>
                            <div class="QQ_ico"></div>
                            <span>{{$t("login_cpms.tech.tS_qq")}}</span>
                             <span>{{supporData.qq}}</span>
                        </li>
                        <li>
                            <div class="mail_ico"></div>
                            <span>{{$t("login_cpms.tech.tS_email")}}</span>
                            <span>{{supporData.email}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 产品信息弹出框 -->
        <div id="product_dialogForm" style="display: none">
            <div class="message_product">
                <div class="head">
                    <span>{{$t("login_cpms.prod_info")}}</span>
                    <div class="msg_close" @click="closeMsg"></div>
                </div>
                <div class="article">
                    <div class="product_QR"></div>
                    <ul>
                        <li>
                            <span>{{$t("login_cpms.prod.pr_starData")}}</span>
                            <p>{{infoData.date_of_production}}</p>
                        </li>
                        <li>
                            <span>{{$t("login_cpms.prod.pr_numDevices")}}</span>
                            <p>{{infoData.hosts_total}}</p>
                        </li>
                        <li>
                            <span>{{$t("login_cpms.prod.pr_activeStatus")}}</span>
                            <p>{{infoData.status}}</p>
                        </li>
                        <li>
                            <span>{{$t("login_cpms.prod.pr_Serial")}}</span>
                            <p>{{infoData.serial_number}}</p>
                        </li>
                        <li>
                            <span>{{$t("login_cpms.prod.pr_activeCode")}}</span>
                            <textarea class="layui-textarea" v-model="infoData.activate_code"></textarea>
                        </li>
                    </ul>
                    <button class="active" @click="activeSystem">{{active}}</button>
                </div>
            </div>
        </div>

        <footer>{{footerEdition}}</footer>
    </div>
</template>

<script>
export default {
  data() {
    return {
      veriSrc: "/com/captcha",
      footerEdition: "",
      supporData: [],
      infoData: [],
      loginForm: {
        userName: "",
        passwd: "",
        keeplogin: false,
        captcha: ""
      },
      active: "激活"
    };
  },
  mounted() {
    this.footerShow(); //页脚显示
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      layui.form.on("checkbox(test)", data => {
        vm.loginForm.keeplogin = !vm.loginForm.keeplogin;
      });
      layui.form.render();
      document.getElementsByTagName("title")[0].innerText = this.$t("title");
      // 中英文切换接口
      // layui.form.on("select(lang)", function(data) {
      //   i18n.locale = data.value;
      // });
    },
    /*****************************登录操作*************************/
    loginOperate() {
      const vm = this;
      let postData = {
        user: vm.loginForm.userName,
        password: vm.loginForm.passwd,
        captcha: vm.loginForm.captcha,
        keeplogin: vm.loginForm.keeplogin
      };
      vm.$http.post("/com/login", postData).then(response => {
        if (response.body.status) {
          window.sessionStorage.setItem("user", response.body.data.UserName);
          vm.$router.push({ path: "setting" });
          // $("#whole_page .passwd:eq(0)").val();
          $("#whole_page .passwd:eq(0)").attr("type","text")
        } else {
          layui.layer.msg(response.body.msg, {
            icon: 2,
            anim: 6,
            time: 2000
          });
          vm.loginForm.captcha = "";
          vm.reflesh();
        }
        err => {
          layui.layer.msg("操作失败，请检查网络", {
            icon: 2,
            time: 2500
          });
        };
      });
      return false;
    },
    /******************************弹出框******************************/
    /*****************************技术支持******************************/
    getsupporAjax() {
      this.$http.get("/com/support").then(
        response => {
          this.supporData = response.body;
          layer.open({
            anim: 0,
            area: ["6.30rem"],
            type: 1,
            closeBtn: false,
            resize: false,
            title: false,
            shadeClose: true,
            content: $("#skill_dialogForm"),
            end: () => {
              $("#skill_dialogForm").css("display", "none");
            }
          });
        },
        error => {
          console.log(error.body);
        }
      );
    },
    /********************产品信息***************************/
    //"产品信息" 通知栏 的构建  以及 数据的获取
    getInfoAjax: function() {
      this.$http.get("/com/info").then(response => {
        this.infoData = response.body;
        layer.open({
          anim: 0,
          area: ["6.4rem"],
          type: 1,
          closeBtn: false,
          resize: false,
          title: false,
          shadeClose: true,
          content: $("#product_dialogForm"),
          end: () => {
            $("#product_dialogForm").css("display", "none");
          }
        });
        if (response.body.activate_status) {
          $("#product_dialogForm .message_product li:eq(2) p").attr(
            "style",
            "color:#2baf4a"
          );
        } else {
          $("#product_dialogForm .message_product li:eq(2) p").attr(
            "style",
            "color:#FF5722"
          );
        }
      });
    },
    //激活操作
    activeSystem() {
      const vm = this;
      vm.active = "执行中";
      if (vm.infoData.activate_code == "") {
        layui.layer.msg("激活码不能为空", {
          icon: 2,
          time: 2000
        });
        let closeTime = 2000;
        vm.actText(closeTime);
      } else {
        let activationCode = {
          ac: vm.infoData.activate_code
        };
        vm.$http.post("/com/activate", activationCode).then(
          //post表示从服务器中加载数据
          response => {
            if (response.body.status) {
              layui.layer.msg(response.body.msg, {
                icon: 1,
                time: 2000
              });
              let closeTime = 2000;
              vm.actText(closeTime);
            } else {
              layui.layer.msg(
                response.body.msg + "请确认后重新输入或联系供应商。",
                {
                  icon: 2,
                  time: 4000
                }
              );
              let closeTime = 4000;
              vm.actText(closeTime);
            }
          },
          error => {
            layui.layer.msg("操作失败，请检查网络", {
              icon: 2,
              anim: 6,
              time: 2500
            });
          }
        );
      }
    },
    //弹出框关闭
    closeMsg: function() {
      layer.closeAll("page");
    },
    //修改激活按钮文本
    actText: function(closeTime) {
      setTimeout(() => {
        this.active = "激活";
      }, closeTime);
    },
    //页脚显示
    footerShow: function() {
      this.$http.get("/com/edition").then(response => {
        this.footerEdition =
          "© " +
          "2003-" +
          new Date().getFullYear() +
          " " +
          response.body.Company;
      });
    },
    //验证码的刷新
    reflesh: function() {
      this.veriSrc = "/com/captcha?" + Math.random().toFixed(4);
    }
  }
};
</script>
<style>
#whole_page {
  height: 100%;
  background: url(/public/images/login/icon_bac.png) no-repeat 1.61rem center,
    linear-gradient(to bottom, #33a1f5, #1077c4);
  background-size: 44% auto, cover;
  background-position: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/********************************************登录框*************************************************/
#whole_page .login_box {
  width: 5.37rem;
  height: 5.94rem;
  background-color: #3f9fec;
  float: right;
  align-self: center;
  margin-left: 10rem;
  border: 1px solid #9bccf3;
  border-radius: 0.08rem;
  display: flex;
}
#whole_page .login_box .layui-form {
  width: 5.17rem;
  height: 5.68rem;
  background-color: #def0ff;
  margin: 0 auto;
  align-self: center;
  border-radius: 0.08rem;
}
#whole_page .login_box .login_header {
  height: 1.2rem;
}
.login_box .login_header img {
  width: 1.55rem;
  height: 0.52rem;
  margin: 0.56rem 0 0 0.9rem;
}
#whole_page .login_box .login_header span {
  color: #888;
  font-size: 0.2rem;
  font-weight: bold;
  position: relative;
  left: 0.72rem;
  top: 0.45rem;
}
#whole_page .login_box .login_main .layui-form-item {
  font-size: 0.16rem;
}
#whole_page .login_box .login_main .layui-form-item input.username,
#whole_page .login_box .login_main .layui-form-item input.passwd {
  text-indent: 0.35rem;
  height: 0.5rem;
  width: 4rem;
  margin: 0 auto;
  border-radius: 0.05rem;
}
#whole_page .login_box .login_main .layui-form-item input.username {
  background: #fff url("/public/images/login/icon_user_false.png") no-repeat
    0.13rem center;
  margin-top: 0.2rem;
}
#whole_page .login_box .login_main .layui-form-item input.passwd {
  background: #fff url("/public/images/login/icon_pswd_false.png") no-repeat
    0.13rem center;
  margin-top: 0.35rem;
}
#whole_page .login_box .login_main .layui-form-item.keep_login {
  margin-left: 0.6rem;
  margin-top: -0.05rem;
  color: #929294;
}
#whole_page .login_box .login_main .layui-form-item.keep_login span,
#whole_page .login_box .login_main .layui-form-item.keep_login i {
  font-size: 0.14rem;
}
#whole_page .login_box .login_main .captcha {
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
}
#whole_page .login_box .login_main .captcha input {
  height: 0.5rem;
  width: 1.8rem;
  margin-left: 0.6rem;
  display: inline-block;
}
#whole_page .login_box .login_main .captcha img {
  height: 0.48rem;
  width: 1.5rem;
  margin-left: 0.1rem;
  cursor: pointer;
}
#whole_page .login_box .login_main .captcha button {
  border: none;
  background: url(/public/images/login/icon_refresh.png) no-repeat;
  width: 0.3rem;
  height: 0.3rem;
  background-size: contain;
  margin-left: 0.15rem;
  cursor: pointer;
}
#whole_page .login_box .login_main .btn-login {
  width: 4rem;
  height: 0.5rem;
  font-size: 0.22rem;
  margin: 0 auto;
  display: block;
  margin-top: 0.3rem;
  border-radius: 0.05rem;
  background-color: #0183e0;
  line-height: 0.5rem;
}
#whole_page .login_box .login_main .about {
  border-top: 1px solid #b6b9be;
  width: 4rem;
  height: 0.45rem;
  margin: 0 auto;
  padding-top: 0.25rem;
  margin-top: 0.3rem;
  font-size: 0.16rem;
  color: #007fdd;
}
#whole_page .login_box .login_main .about .skill {
  float: left;
  cursor: pointer;
}
#whole_page .login_box .login_main .about .product {
  float: right;
  cursor: pointer;
}
/****************************弹窗message-box里面内容 layui样式的更改**********************************/
#whole_page #skill_dialogForm,
#whole_page #product_dialogForm {
  width: 100%;
  height: 100%;
}
#whole_page .layui-layer {
  border: 1px solid #bababa;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.05rem;
}
#whole_page .layui-layer .layui-layer-content {
  overflow: hidden;
}
/*******************************技术支持里的样式*****************************************************/
#whole_page #skill_dialogForm .message_skill {
  font-size: 0.16rem;
  height: 3rem;
  /* display: inline-block; */
  width: 6.1rem;
  border-radius: 0.02rem;
  margin: 0.15rem 0.1rem 0.15rem 0.1rem;
  position: relative;
  background: #def0ff;
  color: #282e34;
}
#whole_page #skill_dialogForm .message_skill .head span {
  color: #282e34;
  font-size: 0.22rem;
  margin: 0.3rem 0 0rem 0.3rem;
  padding-bottom: 0.12rem;
  width: 90%;
  border-bottom: 2px solid #515151;
  display: inline-block;
}
#whole_page #skill_dialogForm .message_skill .msg_close {
  background-image: url("/public/images/login/close.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 0.15rem;
  height: 0.15rem;
  position: relative;
  left: 5.75rem;
  bottom: 0.5rem;
  cursor: pointer;
}
#whole_page #skill_dialogForm .message_skill .article h3 {
  font-size: 0.2rem;
  color: #282e34;
  margin-left: 0.4rem;
}
#whole_page #skill_dialogForm .message_skill .article .skill_QR {
  background-image: url("/public/images/login/2rech.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  width: 1.22rem;
  height: 1.22rem;
  position: absolute;
  top: 1.1rem;
  right: 1.05rem;
}
#whole_page #skill_dialogForm .message_skill ul {
  margin-left: 0.4rem;
  margin-top: 0.1rem;
}
#whole_page #skill_dialogForm .message_skill li {
  line-height: 0.4rem;
  font-size: 0.16rem;
}
#whole_page #skill_dialogForm .message_skill ul .tel_ico,
#whole_page #skill_dialogForm .message_skill ul .QQ_ico,
#whole_page #skill_dialogForm .message_skill ul .mail_ico {
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.1rem;
}
#whole_page #skill_dialogForm .message_skill ul .tel_ico {
  background-image: url("/public/images/login/tel.png");
  width: 0.17rem;
  height: 0.24rem;
  margin-right: 0.15rem;
}
#whole_page #skill_dialogForm .message_skill ul .QQ_ico {
  background-image: url("/public/images/login/qq.png");
  width: 0.22rem;
  height: 0.26rem;
}
#whole_page #skill_dialogForm .message_skill ul .mail_ico {
  background-image: url("/public/images/login/email.png");
  width: 0.22rem;
  height: 0.18rem;
}
/*****************************************产品信息里的样式********************************************/
#whole_page #product_dialogForm .message_product {
  width: 6.2rem;
  height: 4.65rem;
  margin: 0.15rem 0.1rem 0.15rem 0.1rem;
  background-color: #def0ff;
  border-radius: 0.03rem;
  overflow: hidden;
  position: relative;
  color: #282e34;
}
#whole_page #product_dialogForm .message_product .head span {
  color: #282e34;
  font-size: 0.22rem;
  margin: 0.33rem 0 0rem 0.3rem;
  padding-bottom: 0.12rem;
  width: 90%;
  border-bottom: 2px solid #515151;
  display: inline-block;
}
#whole_page #product_dialogForm .message_product .head .msg_close,
#whole_page #product_dialogForm .message_product .article .product_QR {
  background-repeat: no-repeat;
  background-size: contain;
}
#whole_page #product_dialogForm .message_product .head .msg_close {
  background-image: url("/public/images/login/close.png");
  width: 0.15rem;
  height: 0.15rem;
  position: relative;
  left: 5.85rem;
  bottom: 0.55rem;
  cursor: pointer;
}
#whole_page #product_dialogForm .message_product .article .product_QR {
  background-image: url("/com/qrsn");
  position: absolute;
  left: 4.68rem;
  width: 0.66rem;
  height: 0.66rem;
}
#whole_page #product_dialogForm .message_product .article ul {
  margin-left: 0.3rem;
  font-size: 0.16rem;
}
#whole_page #product_dialogForm .message_product .article ul li {
  margin-bottom: 0.18rem;
  color: #333;
}
#whole_page #product_dialogForm .message_product .article ul li p {
  display: inline-block;
  border: 1px solid #a4aeb7;
  border-radius: 5px;
  text-indent: 0.14rem;
  line-height: 0.22rem;
  height: 0.22rem;
  color: #51565b;
}
#whole_page #product_dialogForm .message_product .article ul li:nth-child(1) p,
#whole_page #product_dialogForm .message_product .article ul li:nth-child(2) p {
  width: 1.7rem;
  margin-left: 0.4rem;
}
#whole_page #product_dialogForm .message_product .article ul li:nth-child(3) p {
  width: 3.9rem;
  margin-left: 0.4rem;
}
#whole_page #product_dialogForm .message_product .article ul li:nth-child(4) p {
  width: 3.9rem;
  margin-left: 0.55rem;
}
#whole_page #product_dialogForm .message_product .article textarea {
  margin-top: -0.2rem;
  margin-left: 1.12rem;
  width: 3.92rem;
  height: 1rem;
  min-height: 1rem;
  max-height: 1rem;
  line-height: 0.24rem;
  border: 1px solid #a4aeb7;
  border-radius: 0.07rem;
  background: #def0ff;
  color: #51565b;
}
#whole_page #product_dialogForm .message_product .article .active {
  color: #fff;
  display: block;
  height: 0.3rem;
  line-height: 0.3rem;
  width: 0.85rem;
  border-radius: 0.04rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #389efe;
  margin: 0 auto;
  font-size: 0.16rem;
}
/********************************页脚******************************/
#whole_page footer {
  position: fixed;
  text-align: center;
  width: 100%;
  bottom: 0rem;
  font-size: 0.2rem;
  color: #fff;
}
/*****************************************响应式媒体查询*************************************/
@media screen and (min-width: 1441px) and (max-width: 1680px) {
  .login_box {
    margin-left: 8.5rem;
  }
}
@media screen and (min-width: 1367px) and (max-width: 1440px) {
  html {
    font-size: 90px !important;
  }
  .login_box {
    margin-left: 7.5rem;
  }
}
@media screen and (min-width: 1281px) and (max-width: 1366px) {
  html {
    font-size: 85px !important;
  }
  .login_box {
    margin-left: 8rem;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1280px) {
  html {
    font-size: 77px !important;
  }
  .login_box {
    margin-left: 8rem;
  }
  .login_box .login_main .about {
    padding-top: 0.2rem;
    margin-top: 0.25rem;
  }
}
@media screen and (min-width: 801px) and (max-width: 1024px) {
  html {
    font-size: 65px !important;
  }
  .login_box {
    margin-left: 7.5rem;
  }
  .login_box .login_main .about {
    padding-top: 0.13rem;
    margin-top: 0.25rem;
  }
  .login_box .login_main .layui-form-item input.username {
    background-size: 0.27rem;
  }
  .login_box .login_main .layui-form-item input.passwd {
    background-size: 0.23rem;
  }
  #whole_page
    #product_dialogForm
    .message_product
    .article
    ul
    li:nth-child(5)
    textarea {
    margin-left: 1.22rem;
  }
}
@media screen and (min-width: 751px) and (max-width: 800px) {
  html {
    font-size: 62px !important;
  }
  .login_box {
    margin-left: 6.5rem;
  }
  .login_box .login_header {
    margin-top: -0.2rem;
  }
  .login_box .login_main .about {
    padding-top: 0.13rem;
    margin-top: 0.25rem;
  }
  .login_box .login_main .layui-form-item input.username {
    background-size: 0.27rem;
  }
  .login_box .login_main .layui-form-item input.passwd {
    background-size: 0.23rem;
  }
  #whole_page
    #product_dialogForm
    .message_product
    .article
    ul
    li:nth-child(5)
    textarea {
    margin-left: 1.29rem;
  }
}
@media screen and (max-width: 750px) {
  html {
    font-size: 65px !important;
  }
  .login_box {
    margin: 0 auto 0 auto;
  }
  .login_box .login_main .about {
    padding-top: 0.13rem;
    margin-top: 0.25rem;
  }
  .login_box .login_main .layui-form-item input.username {
    background-size: 0.27rem;
  }
  .login_box .login_main .layui-form-item input.passwd {
    background-size: 0.23rem;
  }
}
</style>