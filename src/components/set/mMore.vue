<template>
    <div id="mMore">
        <div class="dataForm">
            <div class="layui-tab" lay-filter="setting-devices"> 
                <ul class="layui-tab-title">
                    <li >{{$t('mMore.tabTitle[0]')}}</li>
                    <li class="layui-this">{{$t('mMore.tabTitle[1]')}}</li>
                    <li @click="renderBackstage">{{$t('mMore.tabTitle[2]')}}</li>
                    <li>{{$t('mMore.tabTitle[3]')}}</li>
                    <li @click="renderLeftMenu">{{$t('mMore.tabTitle[4]')}}</li>
                    <li>{{$t('mMore.tabTitle[5]')}}</li>
                    <li @click="renderTimedTask">{{$t('mMore.tabTitle[6]')}}</li>
                    <li>{{$t('mMore.tabTitle[7]')}}</li>
                    <li @click="renderForward">{{$t('mMore.tabTitle[8]')}}</li>
                    <li @click="renderLinkage">{{$t('mMore.tabTitle[9]')}}</li>
                    <li @click="renderSoftware" v-if="visible_software">{{$t('mMore.tabTitle[10]')}}</li>
                </ul>
                <div class="layui-tab-content" style="height: 750px">
                    <div class="layui-tab-item"></div>
                    <!-- 全局参数页面—— -->
                    <div class="layui-tab-item global layui-show" style="height: 100%; overflow-y: auto; overflow-x: hidden">
                        <div class="layui-form">
                            <table>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[0]')}}</td>
                                    <td><input type="checkbox" name="LogPassiveChecks" lay-skin="primary" lay-filter='checkbox' :checked="globalTable.LogPassiveChecks==1?'checked':false"></td>
                                    <td>{{$t('mMore.globalPara.text[0]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[1]')}}</td>
                                    <td><input type="checkbox" name="LogHostRetries" lay-skin="primary" lay-filter='checkbox' :checked="globalTable.LogHostRetries==1?'checked':false"></td>
                                    <td>{{$t('mMore.globalPara.text[1]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[2]')}}</td>
                                    <td><input type="checkbox" name="LogNotifications" lay-skin="primary" lay-filter='checkbox' :checked="globalTable.LogNotifications==1?'checked':false"></td>
                                    <td>{{$t('mMore.globalPara.text[2]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[3]')}}</td>
                                    <td><input type="checkbox" name="LogServiceRetries" lay-skin="primary" lay-filter='checkbox' :checked="globalTable.LogServiceRetries==1?'checked':false"></td>
                                    <td>{{$t('mMore.globalPara.text[3]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[4]')}}</td>
                                    <td><input type="checkbox" name="EnableNotifications" lay-skin="primary" lay-filter='checkbox' :checked="globalTable.EnableNotifications==1?'checked':false"></td>
                                    <td>{{$t('mMore.globalPara.text[4]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[5]')}}</td>
                                    <td><input type="checkbox" name="EnableFlapDetection" lay-skin="primary" lay-filter='checkbox' :checked="globalTable.EnableFlapDetection==1?'checked':false"></td>
                                    <td>{{$t('mMore.globalPara.text[5]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[6]')}}</td>
                                    <td><input type="number" name="LowHostFlapThreshold" autocomplete="off" class="layui-input" v-model="globalTable.LowHostFlapThreshold"></td>
                                    <td>{{$t('mMore.globalPara.text[6]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[7]')}}</td>
                                    <td><input type="number" name="LowServiceFlapThreshold" autocomplete="off" class="layui-input" v-model="globalTable.LowServiceFlapThreshold"></td>
                                    <td>{{$t('mMore.globalPara.text[7]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[8]')}}</td>
                                    <td><input type="number" name="HighHostFlapThreshold" autocomplete="off" class="layui-input" v-model="globalTable.HighHostFlapThreshold"></td>
                                    <td>{{$t('mMore.globalPara.text[8]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[9]')}}</td>
                                    <td><input type="number" name="HighServiceFlapThreshold" autocomplete="off" class="layui-input" v-model="globalTable.HighServiceFlapThreshold"></td>
                                    <td>{{$t('mMore.globalPara.text[9]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[10]')}}</td>
                                    <td><input type="number" name="IntervalLength" autocomplete="off" class="layui-input" v-model="globalTable.IntervalLength"></td>
                                    <td>{{$t('mMore.globalPara.text[10]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[11]')}}</td>
                                    <td><input type="number" name="NotificationTimeout" autocomplete="off" class="layui-input" v-model="globalTable.NotificationTimeout"></td>
                                    <td>{{$t('mMore.globalPara.text[11]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[12]')}}</td>
                                    <td><input type="number" name="HostCheckTimeout" autocomplete="off" class="layui-input" v-model="globalTable.HostCheckTimeout"></td>
                                    <td>{{$t('mMore.globalPara.text[12]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[13]')}}</td>
                                    <td><input type="number" name="ServiceCheckTimeout" autocomplete="off" class="layui-input" v-model="globalTable.ServiceCheckTimeout"></td>
                                    <td>{{$t('mMore.globalPara.text[13]')}}</td>
                                </tr>
                                <tr>
                                    <td>{{$t('mMore.globalPara.label[14]')}}</td>
                                    <td><input type="text" name="IllegalObjectNameChars" autocomplete="off" class="layui-input" v-model="globalTable.IllegalObjectNameChars"></td>
                                    <td>{{$t('mMore.globalPara.text[14]')}}</td>
                                </tr>
                            </table>
                            <p>{{$t('mMore.globalPara.text[15]')}}</p>
                            <button class="layui-btn" @click="globalSave">{{$t('mMore.globalPara.btn')}}</button>
                        </div>
                    </div>
                    <!-- 后台服务页面 -->
                    <div class="layui-tab-item backstage">
                        <div class="layui-form">
                            <div class="row">
                                <div class="h5">{{$t('mMore.Backstage.label[0]')}}</div>
                                <div class="operating">
                                    <div style="width: 70%;display: flex; justify-content: space-between">
                                        <input type="radio" name="Cobalt" lay-filter="cobalt" value="0" :title="$t('mMore.Backstage.option[0]')" checked>
                                        <input type="radio" name="Cobalt" lay-filter="cobalt" value="1" :title="$t('mMore.Backstage.option[1]')" >
                                        <input type="radio" name="Cobalt" lay-filter="cobalt" value="2" :title="$t('mMore.Backstage.option[2]')" >
                                    </div>
                                    <button class="layui-btn" @click="backstageUpdate('backService')">{{$t('mMore.Backstage.btn')}}</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="operating">
                                    <span class="h5">{{$t('mMore.Backstage.label[1]')}}</span>
                                    <input type="radio" name="Cobalt2" value="nv" :title="$t('mMore.Backstage.option[3]')" checked>
                                    <input type="radio" name="Cobalt2" value="nv" :title="$t('mMore.Backstage.option[4]')" >
                                    <button class="layui-btn" @click="backstageUpdate('backHost')">{{$t('mMore.Backstage.btn')}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 备份还原 -->
                    <div class="layui-tab-item backup">
                        <div class="title">{{$t('mMore.backup.label')}}</div>
                        <div   class="backup_file">
                            <!-- <input type="file" accept=".7z" @change="checkpack" ref='file'> -->
                            <p ref='fileName'>选择文件</p>
                            <input type="file" ref='file' @change="checkpack">
                        </div>
                        <div class="backupBtn" ref='backupBtn'>
                            <button class="layui-btn layui-btn-disabled" disabled="true" @click="reducingFun">{{$t('mMore.backup.btn[0]')}}</button>
                            <button class="layui-btn active" @click="backupFun">{{$t('mMore.backup.btn[1]')}}</button>
                            <button class="layui-btn layui-btn-disabled" disabled="true" @click="importDriveFun">{{$t('mMore.backup.btn[2]')}}</button>
                            <button class="layui-btn layui-btn-disabled" disabled="true" >{{$t('mMore.backup.btn[3]')}}</button>
                        </div>
                    </div>
                    <!-- 左边菜单栏 -->
                    <div class="layui-tab-item">
                        <vtable sort='leftMenu' ref="leftMenuTab"></vtable>
                    </div>
                    <!-- 网页报警 -->
                    <div class="layui-tab-item webAlarm">
                        <div class="layui-form" lay-filter='webAlarmContent' ref="webAlarm">
                            <div class="row">
                                <span class="title">{{$t('mMore.webAlarm.title[0]')}}</span>
                                <input type="radio" name="Popup" value="true" :title="$t('mMore.webAlarm.option[0]')">
                                <input type="radio" name="Popup" value="false" :title="$t('mMore.webAlarm.option[1]')">
                            </div>
                            <div class="row">
                                <span class="title">{{$t('mMore.webAlarm.title[1]')}}</span>
                                <input type="radio" name="Voice" value="true" :title="$t('mMore.webAlarm.option[0]')">
                                <input type="radio" name="Voice" value="false" :title="$t('mMore.webAlarm.option[1]')">
                            </div>
                            <button class="layui-btn layui-btn-normal" @click="updateWebAlarm">{{$t('mMore.webAlarm.btn')}}</button>
                        </div>
                    </div>
                    <!-- 定时任务 -->
                    <div class="layui-tab-item">
                        <vtable sort='timedTask' ref="timedTaskTab"></vtable>
                    </div>
                    <!-- 能源参数 -->
                    <div class="layui-tab-item energyTab" style="height: 100%">
                        <div class="table-control ">
                            <span>{{$t('mMore.energyTab.label[0]')}}</span>
                            <div class="layui-input-inline" style="width: 100px;">
                                <select v-model="index.group" @change="refreshHost" name="Host" lay-filter="Host">
                                    <option v-for="(h,index) in hostgroup" :key='h.Id' :value="index">{{h.Name}}</option>
                                </select>
                            </div>
                            
                            <span>{{$t('mMore.energyTab.label[1]')}}</span>
                            <div class="layui-input-inline" style="width: 100px;">
                                <select v-model="index.host" @change="refreshService" name="Service" lay-filter="Server">
                                    <option v-for="(h,index) in hostlist" :key='h.Id' :value="index">{{h.Name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="energy layui-form">
                            <div class="A" lay-filter="energy">
                                <p>{{$t('mMore.energyTab.label[2]')}}</p>
                                <div>
                                    <ul class="list-group">
                                        <li v-if="che(servicelist[index.host])" class="list-group-item"><label>{{$t('mMore.energyTab.tips[0]')}}</label></li>
                                        <li v-for="sl in servicelist[index.host]" :key="sl.Id" class="list-group-item">
                                            <input type="checkbox" lay-skin="primary" :serid="sl.Id" :title="sl.Description">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="B">
                                <button class="BA" @click="addpue">{{$t('mMore.energyTab.btn[0]')}}&gt;&gt;</button>
                                <button class="BB" @click="removepue">{{$t('mMore.energyTab.btn[1]')}}&lt;&lt;</button>
                            </div>
                            <div class="C">
                                <p>{{$t('mMore.energyTab.label[3]')}}</p>
                                <div>
                                    <table class="table-show table-panel text-center">
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" lay-filter="allSel" lay-skin="primary" style="color: #fff"></th>
                                                <th>{{$t('mMore.energyTab.son_table_th[1]')}}</th>
                                                <th>{{$t('mMore.energyTab.son_table_th[2]')}}</th>
                                                <th>{{$t('mMore.energyTab.son_table_th[3]')}}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="op in oldpue" :key="op.Id" class="old">
                                                <td><input type="checkbox" :oldid="op.Id" lay-skin="primary"></td>
                                                <td>{{op.serName}}</td>
                                                <td>{{op.hostName}}</td>
                                                <td>
                                                    <select class="form-control" :value="op.Type">
                                                        <option v-for="pty in pueTypeList" :key="pty.value" :value="pty.value">{{pty.text}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr v-for="np in newpue" :key="np.id" class="new">
                                                <td><input type="checkbox" lay-skin="primary"></td>
                                                <td :serId="np.serId">{{np.serName}}</td>
                                                <td :hostId="np.hostId">{{index.hostName}}</td>
                                                <td>
                                                    <select class="form-control">
                                                        <option v-for="pty in pueTypeList" :key="pty.value" :value="pty.value">{{pty.text}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="saveBtn text-center" @click="savepue"><button>{{$t('mMore.energyTab.btn[2]')}}</button></div>
                    </div>
                     <!-- 转发参数 -->
                    <div class="layui-tab-item forward">
                        <vtable sort='forward' ref="forwardTab"></vtable>
                    </div>
                    <!-- 联动参数 -->
                    <div class="layui-tab-item linkage">
                        <vtable sort='linkage' ref="linkage"></vtable>
                    </div>
                    <!-- 软件信息 -->
                    <div class="layui-tab-item software">
                        <div class="layui-form">
                            <div class="layui-input-inline">
                                <select name="edition" lay-filter="edition">
                                    <option v-for="it in edition_option" :key="it.value" :value="it.value">{{it.label}}</option>
                                </select>
                            </div>
                            <button class="layui-btn layui-btn-normal" @click="save_software_fun">{{$t('mMore.software_Btn[0]')}}</button>
                        </div>

                        <div class="custom" v-show="customVis">
                            <ul>
                                <li class="custom_item">
                                    <span class="layui-upload-doc" hidden>帮助文档</span>
                                    <p>{{$t("mMore.software_label[0]")}}</p>
                                    <div class="layui-upload">
                                        <button type="button" class="layui-btn layui-btn-normal" id="select_helpdoc">选择文件</button>
                                        <span id="helpDoc_temp_Name"></span>
                                        <button type="button" class="layui-btn" id="upload_helpdoc">{{$t("mMore.software_Btn[1]")}}</button>
                                    </div>
                                </li>
                                <li class="custom_item">
                                    <span class="layui-upload-img" id="login_temp_img">150x50</span>
                                    <p>{{$t("mMore.software_label[1]")}}</p>
                                    <div class="layui-upload">
                                        <button type="button" class="layui-btn layui-btn-normal" id="select_login">选择图片</button>
                                        <span id="login_temp_Name"></span>
                                        <button type="button" class="layui-btn" id="upload_login">{{$t("mMore.software_Btn[1]")}}</button>
                                    </div>
                                </li>
                                <li class="custom_item">
                                    <span class="layui-upload-img" id="main_temp_img">170x60</span>
                                    <p>{{$t("mMore.software_label[2]")}}</p>
                                    <div class="layui-upload">
                                        <button type="button" class="layui-btn layui-btn-normal" id="select_main">选择图片</button>
                                        <span id="main_temp_Name"></span>
                                        <button type="button" class="layui-btn" id="upload_main">{{$t("mMore.software_Btn[1]")}}</button>
                                    </div>
                                </li>
                                <li class="custom_item">
                                    <p>{{$t('mMore.software_label[3]')}}:</p>
                                    <div style="width: calc(100% - 64px)">
                                        <input type="text" class="editcompany_input" :placeholder="$t('mMore.software_label[4]')" style="margin-bottom: 10px; width: 100%">
                                    </div>
                                    <div>
                                        <button class="layui-btn layui-btn-normal" @click="editCompany('name')">{{$t('mMore.software_Btn[2]')}}</button>
                                        <button class="layui-btn layui-btn-normal" style="background-color: #fff; 
                                            color: #333;border:1px solid #ccc" @click="editCompany('')" >{{$t('mMore.software_Btn[3]')}}</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vtable from '../table/table.vue'
export default {
    components:{ vtable },
    data() {
        return {
            globalTable:{},
            backService: 0,
            backHost: 0,

            hostgroup: '',
            hostlist: "",
            servicelist: [],
            index: {
                group: 0,
                groupId: 0,
                host: 0,
                hostId: 0,
                hostName: ""
            },
            iii: 0,
            newpue: [],
            oldpue: [],
            delpue: [],
            pueTypeList: [{value: 0, text: this.$t('mMore.energyTab.type_option[0]')}, 
                {value: 1, text: this.$t('mMore.energyTab.type_option[1]')}, 
                {value: 2, text: this.$t('mMore.energyTab.type_option[2]')}, 
                {value: 3, text: this.$t('mMore.energyTab.type_option[3]')}],
            // visible_software: false,
            edition_option: [],
            customVis: false,
            currentEdition: 'bbn'
        }
    },
    computed: {
        visible_software () {
            return this.$store.state.softwareInfo
        }
    },
    mounted() {
        this.init();
        let vm = this;
        this.$http.get('/api/v1/setting/hostgroup')
        .then((res)=>{
            if(res.status){
                vm.hostgroup = res.body.data;
            }
        });
        this.renderEnergy();
        layui.element.on('tab(setting-devices)', function(data){
            $('.modifyFlag span').remove();
                ['leftMenuTab', 'timedTaskTab', 'forwardTab', 'linkage'].forEach(i=>vm.$refs[i].clear());
            if(data.index=='0'){
                vm.$router.push({path: '/setting'})
            }
        });
        vm.$nextTick(()=>{
            layui.element.render('tab')
        });
    },
    methods: {
        init() {
            let vm = this;
            this.$http.get('/com/setting/global')
            .then((res)=>{
                vm.globalTable = res.body.data;
                vm.$nextTick(()=>{
                    layui.use(['form'], function(){
                        layui.form.render();

                        layui.form.on('checkbox(checkbox)', function(data){
                            let checked = data.elem.checked
                            checked ? vm.globalTable[data.elem.name]='1':vm.globalTable[data.elem.name]='0'
                        });
                    })
                });
            });

            // 获取网页报警状态
            this.$http.get('/api/v1/setting/webalarm')
            .then((res)=>{
                if(res.body.status){
                    let popup, voice;
                    popup = res.body.data.Popup?'true':'false';
                    voice = res.body.data.Voice?'true':'false';
                    layui.form.val('webAlarmContent', {
                        'Popup': popup,
                        'Voice': voice
                    });
                }
            });

            this.$refs.timedTaskTab.renderTimedTask();
        },
        globalSave() {
            let vm = this;
            this.$http.post('/com/setting/global/update', vm.globalTable)
            .then((res)=>{
                vm.successMsg(res.body.msg)
            },(err)=>{
                vm.errorMsg(err.body.msg)
            })
        },
        successMsg(msg) {
            layui.layer.open({
                type: 0,
                offset: 'rt',
                title: '',
                // content: '<img src="/public/images/currency/shield_ok.ico"/>'+msg,
                content: msg,
                btn: '',
                skin: 'successMsg',
                shade: 0,
                time: 3000,
                success(layero, index){
                    let top, length = $(".successMsg").length;
                    $(".successMsg").each((i, e)=>{
                        top = parseInt($(e).css('top'), 10);
                        top = (top+100*i)+'px';
                    });
                    layui.layer.style(index,{
                        top: top,
                    })
                } 
            });
        },
        errorMsg(msg) {
            layui.layer.open({
                type: 0,
                offset: 'rt',
                title: '',
                // content: '<img src="/public/images/currency/shield_error.ico"/>'+msg,
                content: msg,
                btn: '',
                skin: 'errorMsg',
                shade: 0,
                time: 3000, 
                success(layero, index){
                    let top, length = $(".errorMsg").length;
                    $(".errorMsg").each((i, e)=>{
                        top = parseInt($(e).css('top'), 10);
                        top = (top+100*i)+'px';
                    });
                    layui.layer.style(index,{
                        top: top,
                    })
                }
            });
        },

        //后台服务部分
        renderBackstage() {
            let vm = this;
            this.$nextTick(()=>{
                layui.form.render();
                layui.form.on('radio(cobalt)', function(data){
                    vm.backService = data.value;
                });
                layui.form.on('radio(cobalt2)', function(data){
                    vm.backHost = data.value;
                });
            });
        },
        backstageUpdate(type) {
            let vm = this, prompt = '', tit='', url;
            if(type=='backService'){
                if(vm.backService==0){
                    url='/com/setting/cache/clean';
                    tit=vm.$t('mMore.Backstage.Prompt.content[0].title'); 
                    prompt = vm.$t('mMore.Backstage.Prompt.content[0].text');
                }else if(vm.backService==1){
                    url='/com/setting/bs/start';
                    tit=vm.$t('mMore.Backstage.Prompt.content[1].title');;
                    prompt =vm.$t('mMore.Backstage.Prompt.content[1].text');
                }else{
                    url='/com/setting/bs/stop';
                    tit=vm.$t('mMore.Backstage.Prompt.content[2].title');
                    prompt = vm.$t('mMore.Backstage.Prompt.content[2].text');
                }
                layer.open({
                    title: tit,
                    content: prompt,
                    shadeClose: true,
                    btn: [vm.$t('mMore.Backstage.Prompt.btn[0]'), vm.$t('mMore.Backstage.Prompt.btn[1]')],
                    skin: 'set-more',
                    yes: function(){
                        vm.$http.get(url)
                        .then((res)=>{
                            console.log(res.body);
                            vm.successMsg(res.body.msg);
                        }, (err)=>{
                            console.log(err.body);
                            vm.errorMsg(res.body.msg);
                        });
                    }
                });
            }else{
                if(vm.backHost==0){
                    url='/com/setting/server/poweroff';
                    tit= vm.$t('mMore.Backstage.Prompt.content[3].title');
                    prompt = vm.$t('mMore.Backstage.Prompt.content[3].text');
                }else{
                    url='/com/setting/server/reboot';
                    tit=vm.$t('mMore.Backstage.Prompt.content[4].title');
                    prompt = vm.$t('mMore.Backstage.Prompt.content[4].text');
                }
                layer.open({
                    title: tit,
                    content: prompt,
                    shadeClose: true,
                    btn: [vm.$t('mMore.Backstage.Prompt.btn[0]'), vm.$t('mMore.Backstage.Prompt.btn[1]')],
                    skin: 'set-more',
                    yes: function(){
                        vm.$http.get(url)
                        .then((res)=>{
                            console.log(res.body);
                            vm.successMsg(res.body.msg);
                        }, (err)=>{
                            console.log(err.body);
                            vm.errorMsg(res.body.msg);
                        });
                    }
                });
            }
        },

        // 备份还原部分
        checkpack: function () {
            let files = this.$refs.file.files.length;
            let filesName = this.$refs.file.files[0].name;
            let backupBtn = this.$refs.backupBtn;
            let Arr = Array.prototype.slice.call(backupBtn.getElementsByClassName('layui-btn'));
            console.log("获取对象", filesName);
            if(files > 0){
                for(let i=0; i<Arr.length; i++){
                    if(Arr[i].getAttribute('class').indexOf('layui-btn-disabled') > 0){
                        Arr[i].setAttribute('class', 'layui-btn active')
                        Arr[i].removeAttribute('disabled')
                    }
                }
                this.fileName_visible = true;
                this.$refs.fileName.innerHTML = filesName;
            }else{
                for(let i=0; i<Arr.length; i++){
                    if(i!=1){
                        Arr[i].setAttribute('class', 'layui-btn layui-btn-disabled');
                        Arr[i].setAttribute('disabled')
                    }
                }
            }
        },
        // 还原
        reducingFun() {
            let vm = this;
            // $(".Emerald3").addClass("zloading");   loading状态
            var data = new FormData(), picfiles = this.$refs.file.files, i = 0;   //设置状态，
            if (picfiles.length > 0) {
                for (; i < picfiles.length; i++) {
                    data.append("file", picfiles[i]);
                }
                $.ajax({
                    url: "/com/configdata/restore",
                    type: "post",
                    data: data,
                    cache: false,
                    contentType: false,    //不可缺
                    processData: false    //不可缺
                }).then(function (x) {
                    $(".zloading").removeClass("zloading");
                    if (x.status) {
                        //上传成功
                        vm.successMsg(x.msg);
                    } else if (x.code === 302) {
                        vm.errorMsg(vm.$t('mMore.Backstage.tips[0]'));
                    } else {
                        //其他
                        vm.errorMsg(vm.$t('mMore.Backstage.tips[1]') + x.msg);
                    }
                }, function (err) {
                    vm.errorMsg(vm.$t('mMore.Backstage.tips[1]') + err.msg);
                });
            }
        },
        // 备份资料
        backupFun() {
            window.open("/com/configdata/backup");
        },
        // 导入驱动
        importDriveFun() {
            let vm = this;
            let opts = {
                type: 0,
                title: vm.$t('mMore.Backstage.import_drive.title'),
                area: '500px',
                content: `<div class="layui-form">
                            <div class="layui-form-item" >
                                <div class="layui-input-block" style="margin:0; background-color: #fff">
                                    <input type="checkbox" name="" title=${vm.$t('mMore.Backstage.import_drive.option')} lay-skin="primary">
                                </div>
                            </div>
                        </div>`,
                btn: [vm.$t('Prompt_btn[0]'), vm.$t('Prompt_btn[1]')],
                shadeClose: true,
                skin: 'set-more',
                success: function(){
                    layui.form.render();
                },
                yes: function(index, layero) {
                    var data = new FormData(), picfiles = vm.$refs.file.files, i = 0,
                        url = "/com/configdata/import?replace="+layero.find('input[type=checkbox]')[0].checked;
                    if (picfiles.length > 0) {
                        for (; i < picfiles.length; i++) {
                            data.append("file", picfiles[i]);
                        }
                        $.ajax({
                            url: url,
                            type: "post",
                            data: data,
                            cache: false,
                            contentType: false,    //不可缺
                            processData: false    //不可缺
                        }).then(function (x) {
                            if (x.status) {
                                //上传成功
                                vm.successMsg(x.msg);
                            } else if (x.code === 302) {
                                //无权限
                                vm.errorMsg(vm.$t('mMore.Backstage.import_drive.tips[0]'))
                            } else {
                                //其他
                                vm.errorMsg(vm.$t('mMore.Backstage.import_drive.tips[1]') + x.msg);
                            }
                        }, function (err) {
                            vm.errorMsg(vm.$t('mMore.Backstage.import_drive.tips[1]') + err.msg);
                        });
                    }
                    layer.close(index);
                }
            }
            layui.layer.open(opts)
        },

        // 左边菜单
        renderLeftMenu() {
            this.$refs.leftMenuTab.getTableData();
        },
        // 保存网页报警
        updateWebAlarm() {
            let con = this.$refs.webAlarm, vm = this;
            let a = Array.prototype.slice.call(con.getElementsByTagName('input'));
            let postdata = {}
            for(let i=0; i<a.length; i++){
                if(a[i].checked){
                    postdata[a[i].name] = a[i].value;
                }
            };
            // console.log(postdata);
            this.$http.post('/api/v1/setting/webalarm/update', postdata)
            .then((res)=>{
                if(res.body.status){
                    vm.successMsg(res.body.msg);
                }else{
                    vm.errorMsg(res.body.msg);
                }
            },(err)=>{
                vm.errorMsg(res.body.msg);
            });
        },
        renderTimedTask(){
            this.$refs.timedTaskTab.getTableData();
        },
        //能源参数
        renderEnergy() {
            let vm = this;
            $.ajax({
                type: "get",
                url: "/com/setting/hostgroup",
                cache: false
            }).then(function (x) {
                if (x.status) {
                    vm.hostgroup = x.data;
                    vm.refreshHost();
                    
                }
            });
        },
        renderLinkage(){
            this.$refs.linkage.getTableData();
            this.$refs.linkage.getControlActions();
        },
        refreshHost() {
            let vm = this;
            //载入设备列表
            vm.hostlist = vm.hostgroup[vm.index.group].Hosts;
            vm.index.groupId = vm.hostgroup[vm.index.group].Id;
            vm.servicelist = [];
            vm.delpue = [];
            vm.$nextTick(()=>{
                vm.refreshOther();
                layui.form.render();
                layui.form.on('select(Host)', function(){
                    vm.refreshOther();
                    vm.hostlist = vm.hostgroup[vm.index.group].Hosts;
                })
            });
        },
        refreshService: function () {
            let vm = this;
            this.index.hostId = vm.hostgroup[this.index.group].Hosts[this.index.host].Id;
            this.index.hostName = vm.hostgroup[this.index.group].Hosts[this.index.host].Name;
            layui.form.render()
        },
        refreshOther: function () {
            var vm = this;
            if (vm.iii < vm.hostlist.length) {
                $.ajax({
                    type: "get",
                    url: "/api/v1/setting/service?hid=" + vm.hostlist[vm.iii].Id,
                    cache: false
                }).then(function (x) {
                    vm.iii++;
                    vm.servicelist.push(x.data.services);
                    if (vm.iii == vm.hostlist.length) {
                        vm.iii = 0;//修复切换机房时不显示监控项问题
                        vm.loadService();
                    } else {
                        vm.refreshOther();
                    }
                    
                });
            }
        },
        loadService: function () {
            var vm = this, i, j, k;
            $.ajax({
                type: "get",
                url: "/com/setting/pue/item?hgid=" + vm.index.groupId,
                cache: false
            }).then(function (x) {
                for (i = 0; i < x.data.items.length; i++) {
                    for (j = 0; j < vm.hostlist.length; j++) {
                        if (x.data.items[i].HostId == vm.hostlist[j].Id) {
                            x.data.items[i].hostName = vm.hostlist[j].Name;
                        }
                        for (k = 0; k < vm.servicelist[j].length; k++) {
                            if (x.data.items[i].ServiceId == vm.servicelist[j][k].Id) {
                                x.data.items[i].serName = vm.servicelist[j][k].Description;
                            }
                        }
                    }
                }
                vm.$nextTick(()=>{
                    vm.oldpue = x.data.items;
                    vm.refreshService();
                    layui.form.render();
                    layui.form.on('select', function(data){
                        $(data.elem).parents().parents('tr').addClass('xg')
                    });
                    layui.form.on('checkbox(allSel)', function(data){
                        let check_box_list = $(data.elem).parent().parent().parent().next().find("input[type='checkbox']");
                        for (let i=0; i < check_box_list.length; i++){
                            check_box_list[i].checked = data.elem.checked;
                        }
                        layui.form.render('checkbox')
                    });
                });
                vm.newpue = [];
            });
        },
        //添加功率项
        addpue: function () {
            var bkb = $(".energy .A input"), i, vm = this;
            for (i = 0; i < bkb.length; i++) {
                if (bkb[i].checked) {
                    vm.newpue.push({
                        serId: $(bkb[i]).attr("serid"),
                        hostId: vm.index.hostId,
                        serName: $(bkb[i]).parent().text(),
                        id: parseInt(Math.random()*1000, 10)
                    });
                    bkb[i].checked = false;
                    $(bkb[i]).attr("disabled","disabled").parents().attr("disabled");
                    
                }
                bkb[i].checked = false;
            }
            vm.$nextTick(()=>{
                layui.form.render()
            });
        },
        //删除功率项
        removepue: function () {
            var bkb = $(".energy .C tbody input"), i, newGroup = [], vm = this;
            //统计内容
            for (i = 0; i < bkb.length; i++) {
                if (bkb[i].checked) {
                    newGroup.push(i);
                    if ($(bkb[i]).parents("tr").hasClass("old")) {
                        vm.delpue.push($(bkb[i]).attr("oldid"));
                    }
                    bkb[i].checked = false;
                }
            }
            
            //执行html删除
            newGroup.reverse();
            for (i = 0; i < newGroup.length; i++) {
                $($(bkb[newGroup[i]]).parents("tr")).remove();
            }
            vm.refreshBuff();
        },
        //保存功率项
        savepue: function () {
            var bkb = $(".energy .C .new"), xkb = $(".energy .C .xg"),
                vm = this, i, j = 0, k = 0, l = 0, code;
            //删除
            for (i = 0; i < vm.delpue.length; i++) {
                $.ajax({
                    type: "get",
                    url: "/com/setting/pue/item/delete?id=" + vm.delpue[i],
                    cache: false
                }).then(function (x) {
                    if(!x.status){
                        vm.errorMsg(x.msg);
                    }
                    k++;
                    if (k == vm.delpue.length) {
                        vm.delpue = [];
                        if(xkb.length==0&&bkb.length==0){
                            vm.loadService();
                            vm.successMsg(vm.$t('Tips[0]'));
                        }
                    }
                });
            }
            //修改
            for (i = 0; i < xkb.length; i++) {
                if($(xkb[i]).hasClass('new')){ break; }
                code = {
                    Id: xkb[i].querySelector("input").getAttribute("oldid"),
                    Type: xkb[i].querySelector("select").value
                };
                $.ajax({
                    type: "post",
                    url: "/com/setting/pue/item/update",
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(code)
                }).then(function (x) {
                    if(!x.status){
                        vm.errorMsg(x.msg);
                    }
                    l++;
                    if (l == xkb.length) {
                        $(".xg").removeClass("xg");
                        if(bkb.length==0){
                            vm.loadService();
                            vm.successMsg(vm.$t('Tips[1]'));
                        }
                    }
                });
            }
            //新增
            for (i = 0; i < bkb.length; i++) {
                code = {
                    Type: Number(bkb[i].querySelector("select").value),
                    HostId: Number(bkb[i].childNodes[4].getAttribute("hostid")),
                    ServiceId: Number(bkb[i].childNodes[2].getAttribute("serid")),
                    HostgroupId: Number(vm.index.groupId)
                };
                $.ajax({
                    type: "post",
                    url: "/com/setting/pue/item/create",
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(code)
                }).then(function (x) {
                    if(!x.status){
                        vm.errorMsg(x.msg);
                    }
                    j++;
                    if (j == bkb.length) {
                        vm.loadService();
                        vm.successMsg(vm.$t('Tips[2]'));
                    }
                });
            }
        },
        che: function (x) {
            return !isNaN(Number(x));
        },
        refreshBuff:function () {
            var vm=this, one=$(".energyTab .energy .A li"), two=$(".energyTab .energy .C tbody tr"),i,j;
            for(i=0;i<one.length;i++){
                if(two.length!=0){
                    for(j=0;j<two.length;j++){
                        if(one[i].textContent==two[j].childNodes[2].textContent&&vm.index.hostName==two[j].childNodes[4].textContent){
                            $(one[i]).find("label").attr("disabled","disabled");
                            $(one[i]).find("input").attr("disabled","disabled");
                            break;
                        }else{
                            $(one[i]).find("label").removeAttr("disabled","disabled");
                            $(one[i]).find("input").removeAttr("disabled","disabled");
                        }
                    }
                }else{
                    $(one[i]).find("label").removeAttr("disabled","disabled");
                    $(one[i]).find("input").removeAttr("disabled","disabled");
                }
            }
            layui.form.render()
        },
        // 转发参数
        renderForward() {
            this.$refs.forwardTab.getTableData();
        },
        // 软件信息
        renderSoftware() {
            let vm = this;
            this.init_software();
            layui.form.on('select(edition)', function(data){
                vm.currentEdition = data.value;
                if(data.value=='custom'){
                    vm.customVis=true
                }else{
                    vm.customVis=false
                }
            });
        },
        // 预览图片
        loadImg(type) {
            // 获取文件
            var file = $("#"+type+"_img")[0].files[0];
            // console.log(file);
        
            //创建读取文件的对象
            var reader = new FileReader();
        
            //创建文件读取相关的变量
            var imgFile;
        
            //为文件读取成功设置事件
            reader.onload=function(e) {
                // alert('文件读取完成');
                imgFile = e.target.result;
                // console.log(imgFile);
                $("#"+type+"_temp_img").attr('src', imgFile);
            };
        
            //正式读取文件
            reader.readAsDataURL(file);
        },
        init_software() {
            let vm = this;
            let opt = [
                { value: 'bbn', label: this.$t('mMore.software_edition[0]') },
                { value: 'custom', label: this.$t('mMore.software_edition[1]') },
                { value: 'oem', label: this.$t('mMore.software_edition[2]') },
                { value: 'yuanyang', label: this.$t('mMore.software_edition[3]') },
                { value: 'skerd', label: this.$t('mMore.software_edition[4]') },
            ];
            this.edition_option = opt;
            this.$nextTick(()=>{
                layui.form.render();
            });
            let customBtnlist = [
                ["helpdoc", "select_helpdoc", "upload_helpdoc", "helpDoc_temp_Name", "helpDoc", null],
                ["login", "select_login", "upload_login", "login_temp_img", "loginLogo", "login_temp_Name"],
                ["main", "select_main", "upload_main", "main_temp_img", "homeLogo", "main_temp_Name"],
            ];
            customBtnlist.forEach(obj => {
                vm.customFactory(obj[0], obj[1], obj[2], obj[3], obj[4], obj[5])
            });
        },
        customFactory(type, mount, upload, temp, field, name) {
            let vm = this;
            let opt = {
                elem: "#"+mount,
                url: type!='helpdoc'? '/api/v1/edition/'+type+'/logo/upload':'/api/v1/edition/'+type+'/upload',
                accept: type!='helpdoc'?'images':'file',
                field: field,
                auto: false,
                bindAction: '#'+upload,
                choose: function(obj){
                    obj.preview(function(index, file, result){
                        $("#"+name).html(file.name)
                    })
                    if(type!="helpdoc"){
                        let Id = "#"+temp
                        obj.preview(function(index, file, result){
                            $("#"+temp).empty();
                            $("#"+temp).css('background', 'url("'+result+'") no-repeat top left / 100% 100%')
                        });
                    }else{
                        obj.preview(function(index, file, result){
                            console.log(file.name);
                            $("#"+temp).html(file.name)
                        })
                    }
                },
                done: (res)=>{
                    if(res.status){
                        vm.successMsg(res.msg)
                    }else{
                        vm.errorMsg(res.msg)
                    }
                },
                error: (err)=>{
                    vm.errorMsg(res.msg)
                }
            }
            layui.upload.render(opt);
        },
        save_software_fun() {
            let vm = this;
            let name = {
                "bbn": this.$t('mMore.software_edition[0]'),
                "custom":this.$t('mMore.software_edition[1]'),
                "oem": this.$t('mMore.software_edition[2]'),
                "yuanyang": this.$t('mMore.software_edition[3]'),
                "skerd": this.$t('mMore.software_edition[4]')
            }
            let opt={
                type: 1, 
                title: this.$t('mMore.software_prompt.title')+'>>',
                skin: 'set-Table layer-software',
                content: this.$t('mMore.software_prompt.content[0]')+name[this.currentEdition]+this.$t('mMore.software_prompt.content[1]'),
                btn: [this.$t('mMore.software_prompt.btn[0]'), this.$t('mMore.software_prompt.btn[1]')],
                area: ['545px', '200px'],
                yes(index, layero) {
                    vm.$http.post("/api/v1/setting/edition/select/update", {Edition: vm.currentEdition})
                    .then((res)=>{
                        if(res.status){
                            layer.close(index);
                            vm.$router.push('/');
                            sessionStorage.clear();
                            vm.$router.push({ path: "/" });
                            vm.$store.commit('path', '总览');
                            vm.$store.commit('visible_softwareInfo', false)
                        }
                    }, (err)=>{
                        vm.errorMsg(err.msg)
                    });
                },
                btn2(index, layero) {
                    layer.close(index);
                }
            }
            layer.open(opt);
        },
        editCompany(text) {
            let vm = this;
            if(text!=""){
                // 修改公司信息
                this.$http.post('/api/v1/edition/company/update', {company: text})
                .then((res)=>{
                    if(res.body.status){
                        vm.successMsg(res.body.msg)
                    }else{
                        vm.errorMsg(res.body.msg)
                    }
                },(err)=>{
                    vm.errorMsg(err.body.msg)
                });
            }else{
                // 还原公司信息
                this.$http.get('/api/v1/edition/recovery')
                .then((res)=>{
                    if(res.body.status){
                        vm.$router.push('/');
                        sessionStorage.clear();
                        vm.$router.push({ path: "/" });
                        vm.$store.commit('path', '总览');
                        vm.$store.commit('visible_softwareInfo', false)
                    }else{
                        vm.errorMsg(res.body.msg)
                    }
                },(err)=>{
                    vm.errorMsg(err.body.msg)
                });
            }
        },
        allSel(el) {
            console.log(el);
            
        }
    },
    updated:function () {
        this.refreshBuff();
    }
};

</script>
<style lang="stylus">
div[class$="-Type"]
    overflow: unset;
#mMore
    overflow-y auto
    padding 20px 40px 0 40px
    overflow-x hidden
    .dataForm
        .layui-tab
            margin: 0
            .layui-tab-content
                padding 0
                padding-top 20px
            .layui-tab-title li 
                background-color #f2f6f7
                border-top #d7dfd2 2px solid
                border-left #E6E6E4 1px solid
                border-bottom 1px solid #d7dfd2
                line-height 1.8em
                padding 6px 40px
                transition none
            .layui-tab-title li::after
                border none
            .layui-tab-title li:last-child
                border-right #E6E6E4 1px solid
            .layui-tab-title li.layui-this
                background-color #fff
                border-top #59c4f0 3px solid !important
                border-bottom none
            .laytable-cell-1-id
                display none
            .layui-table-page
                text-align center
        .layui-tab-content
            .global
                table
                    width 100%
                    border 1px solid #ccc
                    td
                        border 1px solid #ccc
                        padding: 8px 10px;
                        .layui-input
                            text-align center
                            border-radius 4px
                            border-color rgb(204, 204, 204)
                        .layui-input:focus
                            border 1px solid rgb(1,111,187) !important
                            box-shadow 0px 0px 5px #016fbb
                    td:nth-child(1)
                        width 22%
                    td:nth-child(2)
                        width 15%
                        text-align center
                    tr:nth-child(even)
                        background-color rgb(221, 221, 221);
                p
                    margin-top: 25px;
                button
                    display block
                    margin 20px auto 30px auto
                    width: 135px;
                    height: 40px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #fff;
                    background-color: #36a1f3;
                    border: none;
                    // margin-left: 5rem;
                    border-radius: 5px;
            .backstage
                .row
                    max-width 800px
                    margin-right 0
                    margin-left 0
                    .h5
                        border-left 3px solid #36a1f3
                        font-size 20px
                        text-indent 0.1rem
                        height 36px
                        line-height 36px
                    .operating
                        margin-bottom 50px
                        display flex
                        justify-content space-between
                        align-items center
                        input
                            font-size 18px
                        button
                            width 135px
                            height 40px
                            font-size 20px
                            font-weight bold
                            color #fff
                            background-color #36a1f3
                            border none
                            border-radius 5px
            .backup
                div
                    margin 20px 0
                .title
                    border-left 3px solid #36a1f3
                    font-size 20px
                    text-indent 0.1rem
                .backup_file
                    width 155px
                    height 40px
                    position relative
                    display inline-block
                    background #D0EEFF
                    border 1px solid #99D3F5
                    border-radius 4px
                    padding 4px 12px
                    overflow hidden
                    color #1E88C7
                    text-decoration none
                    text-indent 0
                    text-align center
                    line-height 30px
                    p
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                    input
                        position absolute
                        font-size 100px
                        right 0
                        top 0
                        left 0
                        bottom 0
                        opacity 0
                .backup_file:hover
                    background #AADFFD
                    border-color #78C3F3
                    color #004974
                    text-decoration none
                .backupBtn
                    width 800px
                    display flex
                    justify-content space-around
                    .layui-btn
                        width 155px
                        height 40px
                        font-size 20px
                        font-weight bold
                        border-radius 5px
                    .active
                        color #fff
                        border none
                        background-color #36a1f3
            .webAlarm
                .row
                    border-left 3px solid #36a1f3
                    width 800px
                    display flex
                    align-items center
                    justify-content flex-start
                    margin 20px 0 50px 0
                    .title
                        margin-right 20px
                        font-size 20px
                        text-indent 0.1rem
                button
                    width 135px
                    height 40px
                    font-size 20px
                    font-weight bold
                    color #fff
                    background-color #36a1f3
                    border none
                    border-radius 5px
            .energyTab
                .table-control
                    margin 10px 20px
                .energy
                    margin-top 30px
                    display flex
                    justify-content space-around
                    align-items flex-start
                    max-height 500px
                    .A
                        width 30%
                        max-height 500px
                        border none !important
                        overflow hidden
                        display flex
                        flex-direction column
                        .list-group-item
                            padding 10px
                            border-radius 0
                            label
                                height 100%
                                display flex
                                align-items center
                                padding 10px 15px
                                margin 0
                                font-weight normal
                            label[disabled="disabled"]
                                background #737373
                                cursor not-allowed
                            input[type=checkbox]
                                margin 0 5px 0 0
                    .A>div
                        overflow-y auto
                        .layui-disabled
                            // background #000
                    .B
                        display float left
                        flex-direction column
                        justify-content: center
                        align-self center
                        button 
                            width: 75px;
                            height: 30px;
                            color: #fff;
                            margin: 6px;
                            font-size: 16px;
                            display: block;
                            border-radius: 4px;
                        button:nth-child(1)
                            border 1px solid #0e6bb1
                            background #2c90dc
                        button:nth-child(2)
                            border 1px solid #f5b031
                            background #fb9d2c
                    .C
                        width 50%
                        max-height 500px
                        border none !important
                        
                        overflow hidden
                        display flex
                        flex-direction column
                        tr
                            width 100%
                        th
                            background #54b5ff
                            color #fff
                        th, td
                            min-width 100px
                            max-width 250px
                            height 40px
                            text-align center
                            border 1px solid #ccc
                        .layui-form-selected dl
                            position fixed
                            min-width 120px
                            left auto
                            top auto
                .C>div
                    overflow-y auto
                .saveBtn
                    button
                        width 135px
                        height 40px
                        font-size 20px
                        font-weight bold
                        color #fff
                        background-color: #36a1f3
                        border none
                        border-radius 5px
                        margin-top 20px
                
                .layui-input-inline
                    margin-right 20px
                    select
                        background #fff
                        padding 9px 10px
                        border-radius 6px
                        border 1px solid #e4e4e4
            .software
                // border 1px solid red
                height 500px
                .custom
                    margin-top 20px
                    ul
                        display flex
                        flex-wrap wrap
                        .custom_item
                            width 30%
                            margin-left 15px
                            margin-right 15px
                            margin-bottom 50px
                            display flex
                            flex-direction column
                            justify-content flex-end
                            align-items flex-start
                            p
                                margin 0
                                color #333
                            .layui-upload
                                width 100%
                                // border 1px solid #
                                border-top 1px dashed #ccc
                                border-bottom 1px dashed #ccc
                                display flex
                                justify-content space-between
                                align-items center
                            .layui-upload-doc{
                                width 155px
                                height 50px
                                line-height 50px
                                text-align center
                                background-color #dfdfdf
                                margin 15px 0 25px 0
                                font-size 18px
                                color #aaa
                                text-overflow ellipsis
                                white-space nowrap
                                overflow hidden
                            }
                            .layui-upload-choose{
                                width 100px
                                text-overflow ellipsis
                                white-space nowrap
                                overflow hidden
                            }
                            .editcompany_input{
                                height 40px
                                border 1px solid #ccc
                                border-radius 4px
                            }
                            .layui-upload-img
                                display flex !important
                                justify-content center
                                align-items center
                                background-color #eee
                                width 155px
                                height 50px
                                margin 15px 0 30px 0
                                color #aaaab0
                            #main_temp_img
                                width 177px
                                height 60px
                            button
                                height 28px
                                line-height 28px
                                background-color #4288c5
.layer-software
    .layui-layer-content
        display flex
        justify-content center
        align-items center                          
                            
.set-more
    background-color #e7f4fd
    .layui-layer-title
        color #fff
        background no-repeat 16px center, linear-gradient(to bottom, #329ce5, #2d8ad2)
        border-bottom 1px solid #0c578f
    .layui-layer-btn
        .layui-layer-btn0
            border none
            background-color #82d642 
        .layui-layer-btn1
            color #fff
            background-color #f86868 
.errorMsg
    box-shadow none
    border-radius 10px
    background-color #e74c3c
    .layui-layer-title
        background none
    .layui-layer-content
        background #e74c3c url("/public/images/currency/shield_error.ico") no-repeat 4% center / 10%;
        border none
        border-radius 10px
        color #fff
        width 300px
        height 90px
        display flex
        justify-content space-around
        align-items center
        font-size 16px
        padding 0 20px 0 50px
    .layui-layer-setwin
        // display none
        right: 20px;
        top: 20px;
.successMsg
    box-shadow none
    border-radius 10px
    background-color #27ae60
    img
        width 35px
        margin-right 20px;
    .layui-layer-title
        background none
    .layui-layer-content
        background #27ae60 url("/public/images/currency/shield_ok.ico") no-repeat 4% center / 10%
        border none
        border-radius 5px
        color #fff
        width 300px
        height 90px
        display flex
        justify-content space-around
        align-items center
        font-size 16px
    .layui-layer-setwin
        display none
</style>




