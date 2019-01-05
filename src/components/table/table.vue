<template>
    <div id="table">
        <div class="layui-tab-item layui-show layui-form">
            <!-- 表格按钮 -->
            <div class="operateBtnList">
                <button class="layui-btn layui-btn-normal" v-if="operate.add" @click="add()" layui-filter>
                    <i class="glyphicon glyphicon-plus"></i>
                    {{$t('Table.Operate_Btn_list[0]')}}
                </button>
                <button class="layui-btn layui-btn-warm delete" v-if="operate.delete" @click="delet()">
                    <i class="glyphicon glyphicon-minus "></i>
                    {{$t('Table.Operate_Btn_list[1]')}}
                </button>
                <button class="layui-btn layui-btn-normal modifyFlag" v-if="operate.save" @click="updated()">
                    <i class="glyphicon glyphicon-floppy-disk"></i>
                    {{$t('Table.Operate_Btn_list[2]')}}
                </button>
                <button class="layui-btn layui-btn-normal batch" v-if="operate.management" @click="batch()">
                    <i class="glyphicon glyphicon-adjust"></i>
                    {{$t('Table.Operate_Btn_list[3]')}}
                </button>
                <button class="layui-btn layui-btn modify" v-if="operate.modify" @click="modity()">
                    <i class="glyphicon glyphicon-edit"></i>
                    {{$t('Table.Operate_Btn_list[4]')}}
                </button>
                <button class="layui-btn layui-btn email" v-if="operate.emailSet" @click="addBox">
                    <i class="glyphicon glyphicon-envelope"></i>
                    {{$t('Table.Operate_Btn_list[5]')}}
                </button>
                <button class="layui-btn layui-btn test" v-if="operate.test" @click="test">
                    <i class="glyphicon glyphicon-briefcase"></i>
                    {{$t('Table.Operate_Btn_list[6]')}}
                </button>
                <button class="layui-btn layui-btn compared" v-if="operate.compared" @click="compared">
                    <i class="glyphicon glyphicon-adjust"></i>
                    {{$t('Table.Operate_Btn_list[7]')}}
                </button>
                <button class="layui-btn layui-btn log" v-if="operate.log" @click="timedTaskLogBox">
                    <i class="glyphicon glyphicon-list-alt"></i>
                    {{$t('Table.Operate_Btn_list[8]')}}
                </button>
                <button class="layui-btn layui-btn application" v-if="operate.application" @click="updated()">
                    <i class="glyphicon glyphicon-floppy-disk"></i>
                    {{$t('Table.Operate_Btn_list[9]')}}
                </button>
                <button class="layui-btn layui-btn batchEdit" v-if="operate.batchEdit" @click="batch()">
                    <i class="glyphicon glyphicon-adjust"></i>
                    {{$t('Table.Operate_Btn_list[10]')}}
                </button>
                <div class="device_filter" v-if='sort=="devices"&&operate.filter'>
                    <form >
                        <div class="layui-form-item" >
                            <label class="layui-form-label">{{$t('Table.devices.filter_label[0]')}}</label>
                            <div class="layui-input-inline">
                            <select name="hgid">
                                <option value=""></option>
                                <option v-for="item in hostgroup" :key="item.Id" :value="item.Id">{{item.Name}}</option>
                            </select>
                            </div>
                        </div>
                        <div class="layui-form-item" >
                            <label class="layui-form-label">{{$t('Table.devices.filter_label[1]')}}</label>
                            <div class="layui-input-inline">
                                <select name="class">
                                    <option value=""></option>
                                    <option value="name">{{$t('Table.devices.filter_label[2]')}}</option>
                                    <option value="driver">{{$t('Table.devices.filter_label[3]')}}</option>
                                    <option value="ip">{{$t('Table.devices.filter_label[4]')}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <input type="text" name="key" autocomplete="off" class=" layui-input-inline layui-input text-input">
                        </div>
                        <div class="layui-form-item">
                            <a class="layui-btn layui-btn-normal" @click="filter_device()">{{$t('Table.devices.filter_btn[0]')}}</a>
                        </div>
                    </form>
                </div>
                <div class="linkage_filter" v-if='sort=="linkage"&&operate.filter'>
                    <form >
                        <div class="layui-form-item" >
                            <div class="layui-input-inline">
                                <select name="key">
                                    <option value=""></option>
                                    <option value="filterByName">名称</option>
                                    <option value="filterByRemark">备注</option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <input type="text" name="keyValue" autocomplete="off" class="layui-input-inline layui-input text-input" placeholder="请输入搜索内容">
                        </div>
                        <div class="layui-form-item">
                            <a class="layui-btn layui-btn-normal" @click="filter_linkage()">{{$t('Table.devices.filter_btn[0]')}} <i class="layui-icon layui-icon-search"></i></a>
                        </div>
                        <div class="layui-form-item clear_linkage">
                            <a class="layui-btn" @click="clear_linkage_filter($event)">清除<i class="layui-icon layui-icon-refresh"></i></a>
                        </div>
                    </form>
                </div>
            </div>
            <!-- 展示数据表格 -->
            <table class="layui-hide setTable" :id="sort" :lay-filter="sort" lay-data="{id: 'dataTable'}"></table>
        </div>
        <div :id="laypageId" class="layui_page"></div>
        <!-- 设备组 新增 穿梭框 -->
        <div v-parent="'body'" v-if="sort=='devices'" class="addDeviceBox layui-form " lay-filter="addDeviceBox" hidden>
            <div class="A">
                <ul>
                    <li v-for='sorts01 in sorts' :key="sorts01.Name">
                        <div v-on:click="spread($event)"> <span > </span> {{sorts01.Name}}</div>
                        <ul>
                            <li v-for='sorts02 in sorts01.sorts' :key="sorts02.Name">
                                <div v-on:click="spread($event)"><span></span> {{sorts02.Name}}</div>
                                <ul>
                                    <li v-for='sorts03 in sorts02.sorts' :key="sorts03.Name">
                                        <div @click="spread($event)"> <span></span>{{sorts03.Name}}</div>
                                        <ul>
                                            <li v-for='sorts04 in sorts03.sorts' :key="sorts04.Name">
                                                <input type="checkbox" lay-skin="primary" class="tit" :sortId="sorts04[0]" :title="sorts04[1]">
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="B">
                <button class="BA" @click="aDevice">{{$t('Table.Box.Add.device.btn[0]')}}>></button>
                <button class="BB" @click="rDevice">&lt;&lt;{{$t('Table.Box.Add.device.btn[1]')}}</button>
            </div>
            <div class="C">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" lay-skin="primary" lay-filter="selectAll"></th>
                            <th>{{$t('Table.Box.Add.device.table_th[0]')}}</th>
                            <th>{{$t('Table.Box.Add.device.table_th[1]')}}</th>
                            <th>{{$t('Table.Box.Add.device.table_th[2]')}}</th>
                            <th style="width:100px;">{{$t('Table.Box.Add.device.table_th[3]')}}</th>
                            <th>{{$t('Table.Box.Add.device.table_th[4]')}}</th>
                        </tr>
                    </thead>
                    <tbody ></tbody>
                </table>
            </div>
        </div>
        <div v-parent="'body'" v-if="sort==='devices'" id="batchBox" hidden>
            <div class="layui-form">
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.device.label[0]')}}</label>
                    <div class="layui-input-block">
                        <input v-for="it in batchTemp.nec" :key="it.key" type="checkbox" :name="it.key" :value="it.value" lay-skin="primary" :title="it.value" >
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.device.label[1]')}}</label>
                    <div class="layui-input-block">
                        <button class="layui-btn layui-btn-disabled btn-warning" disabled>{{batchTemp.temp[0]}}</button>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.device.label[2]')}}</label>
                    <div class="layui-input-block">
                        <button class="layui-btn" v-for="(it, index) in batchTemp.temp" :key="it" v-show="(index==0)?false:true" @click="changeBtnClick(index)">{{it}}</button>
                    </div>
                </div>
                <button hidden lay-submit lay-filter="batchBox">提交</button> 
            </div>
        </div>
        <div v-parent="'body'" v-else-if="sort==='monitoring'" id="batchBox2" hidden>
            <div class="layui-form">
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.monitoring.label[0]')}}</label>
                    <div class="layui-input-block">
                        <input v-for="it in batchTemp.nec2" :key="it.key" type="checkbox" :name="it.key" :value="it.value" lay-skin="primary" :title="it.value" >
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.monitoring.label[1]')}}</label>
                    <div class="layui-input-block">
                        <button class="layui-btn layui-btn-disabled" disabled style="backgroundColor: #273fa5; color: #ccc">{{batchTemp.temp[0]}}</button>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.monitoring.label[2]')}}</label>
                    <div class="layui-input-block">
                        <button class="layui-btn" v-for="(it, index) in batchTemp.temp" :key="it" v-show="(index==0)?false:true" @click="changeBtnClick(index)">{{it}}</button>
                    </div>
                </div>
                <button hidden lay-submit lay-filter="batchBox2">提交</button> 
            </div>
        </div>
        <div v-parent="'body'" v-if="sort=='user'" hidden id="userEditBox">
            <div class="layui-form" lay-filter="modityUserForm" id="modityUserForm">
                <form>
                    <div class="layui-form-item" style="width: 90%">
                        <label class="layui-form-label">{{$t('Table.Box.Add.user.label[0]')}}</label>
                        <div class="layui-input-block">
                            <input type="text" name="userName" lay-verify="title" autocomplete="off" :placeholder="$t('Table.Box.Add.user.placeholder[0]')" :value="userEditBox.userName" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item" style="width: 90%">
                        <label class="layui-form-label">{{$t('Table.Box.Add.user.label[1]')}}</label>
                        <div class="layui-input-block">
                            <select name="Type" lay-filter="selectUserRole" id="selectUserRole"> 
                                <option value="0">{{$t('Table.Box.Add.user.option[2]')}}</option>
                                <option value="1">{{$t('Table.Box.Add.user.option[3]')}}</option>
                                <option value="2">{{$t('Table.Box.Add.user.option[4]')}}</option>
                            </select>     
                        </div>
                    </div>
                    <div class="userRole">
                        <div class="layui-form-item hostAll" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[2]')}}</label>
                            <div class="layui-input-block">
                                <input type="checkbox" value="0" :title="$t('Table.Box.Add.user.option[0]')" lay-skin="primary" lay-filter="selectAll">
                                <ul>
                                    <li v-for="it in hostgroup" :key="it.Id">
                                        <input type="checkbox" :value="it.Id" :title="it.Name" :name="'host'+it.Id" lay-skin="primary">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="layui-form-item contactAll" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[3]')}}</label>
                            <div class="layui-input-block" >
                                <input type="checkbox" value="0" :title="$t('Table.Box.Add.user.option[1]')" lay-skin="primary" lay-filter="selectAll">
                                <ul>
                                    <li v-for="it in contactsList" :key="it.Id">
                                        <input type="checkbox" :value="it.Id" :title="it.Name" :name="'contact'+it.Id" lay-skin="primary">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="setPwd">
                        <div class="layui-form-item" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[4]')}}</label>
                            <div class="layui-input-block">
                                <input type="password" name="pwd" lay-verify="title" autocomplete="off" :placeholder="$t('Table.Box.Add.user.placeholder[1]')" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[5]')}}</label>
                            <div class="layui-input-block">
                                <input type="password" name="repwd" lay-verify="title" autocomplete="off" :placeholder="$t('Table.Box.Add.user.placeholder[2]')" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div v-if="changePwd">
                        <div class="layui-form-item" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[6]')}}</label>
                            <div class="layui-input-block">
                                <input type="checkbox" name="modityPwd1" lay-skin="primary" lay-filter="modityPwd">
                            </div>
                        </div>
                    </div>
                    <div v-if="reSetPwd">
                        <div class="layui-form-item" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[7]')}}</label>
                            <div class="layui-input-block">
                                <input type="password" name="oldpwd" lay-verify="title" autocomplete="off" :placeholder="$t('Table.Box.Add.user.placeholder[1]')" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[8]')}}</label>
                            <div class="layui-input-block">
                                <input type="password" name="newpwd" lay-verify="title" autocomplete="off" :placeholder="$t('Table.Box.Add.user.placeholder[1]')" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item" style="width: 90%">
                            <label class="layui-form-label">{{$t('Table.Box.Add.user.label[9]')}}</label>
                            <div class="layui-input-block">
                                <input type="password" name="renewpwd" lay-verify="title" autocomplete="off" :placeholder="$t('Table.Box.Add.user.placeholder[2]')" class="layui-input">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- 人员管理更多 -->
        <div v-parent="'body'" v-if="sort=='contacts'" hidden id="contactsMore">
            <div class="layui-form">
                <form>
                    <div class="layui-tab">
                        <ul class="layui-tab-title">
                            <li class="layui-this">{{$t('Table.Box.Cell.contacts.more.tab[0]')}}</li>
                            <li>{{$t('Table.Box.Cell.contacts.more.tab[1]')}}</li>
                        </ul>
                        <div class="layui-tab-content">
                            <div class="layui-tab-item layui-show">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">{{$t('Table.Box.Cell.contacts.more.label[0]')}}</label>
                                    <div class="layui-input-block">
                                        <input type="checkbox" name="HostNotificationsEnabled" value="true" lay-skin="primary" :checked="currentContactMore.HostNotificationsEnabled">
                                    </div>
                                </div>

                                <div class="layui-form-item">
                                    <label class="layui-form-label">{{$t('Table.Box.Cell.contacts.more.label[1]')}}</label>
                                    <div class="layui-input-block">
                                        <select name="HostNotificationPeriod" lay-verify="">
                                            <option :value="it.Id" v-for="it in timeSlot" :key="it.Id" :selected='currentContactMore.HostNotificationPeriod==it.Id?true:false'>{{it.Name}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="layui-form-item">
                                    <div class="layui-input-block">
                                        <div style="border:1px solid #ccc; border-radius: 5px; display: flex">

                                            <div>
                                                <input type="checkbox" :title="$t('Table.Box.Cell.contacts.more.label[2]')" lay-skin="primary" lay-filter="selectAll">
                                                <ul style="margin-left: 20px;">
                                                    <li>
                                                        <input type="checkbox" name="HostNotificationOnDown" :title="$t('Table.Box.Cell.contacts.more.option[0]')" value="true" lay-skin="primary" :checked="currentContactMore.HostNotificationOnDown"> 
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" name="HostNotificationOnUnreachable" :title="$t('Table.Box.Cell.contacts.more.option[1]')" value="true" lay-skin="primary" :checked="currentContactMore.HostNotificationOnUnreachable"> 
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" name="HostNotificationOnRecovery" :title="$t('Table.Box.Cell.contacts.more.option[2]')" value="true" lay-skin="primary" :checked="currentContactMore.HostNotificationOnRecovery"> 
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" name="HostNotificationOnFlapping" :title="$t('Table.Box.Cell.contacts.more.option[3]')" value="true" lay-skin="primary" :checked="currentContactMore.HostNotificationOnFlapping"> 
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" name="HostNotificationOnScheduledDowntime" :title="$t('Table.Box.Cell.contacts.more.option[4]')" value="true" lay-skin="primary" :checked="currentContactMore.HostNotificationOnScheduledDowntime"> 
                                                    </li>
                                                </ul>
                                            </div>

                                            <div style="width: 60%">
                                                <input type="checkbox" :title="$t('Table.Box.Cell.contacts.more.label[3]')" lay-skin="primary" lay-filter="selectAll">
                                                <ul style="margin-left: 20px;" v-html="code0">
                                                    {{code0}}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            
                            </div>

                            <div class="layui-tab-item">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">{{$t('Table.Box.Cell.contacts.more.label[0]')}}</label>
                                    <div class="layui-input-block">
                                        <input type="checkbox" name="ServiceNotificationsEnabled" value="true" lay-skin="primary" :checked="currentContactMore.ServiceNotificationsEnabled">
                                    </div>
                                </div>

                                <div class="layui-form-item">
                                    <label class="layui-form-label">{{$t('Table.Box.Cell.contacts.more.label[1]')}}</label>
                                    <div class="layui-input-block">
                                        <select name="ServiceNotificationPeriod">
                                            <option :value="it.Id" v-for="it in timeSlot" :key="it.Id" :selected='currentContactMore.HostNotificationPeriod==it.Id?true:false'>{{it.Name}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="layui-form-item">
                                    <div class="layui-input-block">
                                        <div style="border:1px solid #ccc; border-radius: 5px; display: flex">

                                            <div>
                                                <input type="checkbox"  :title="$t('Table.Box.Cell.contacts.more.label[2]')" lay-skin="primary" lay-filter="selectAll">
                                                <ul style="margin-left: 20px;">
                                                    <li>
                                                    <input type="checkbox" name="ServiceNotificationOnWarning" :title="$t('Table.Box.Cell.contacts.more.option[5]')" value="true" lay-skin="primary" :checked="currentContactMore.ServiceNotificationOnWarning"> 
                                                    </li>
                                                    <li>
                                                    <input type="checkbox" name="ServiceNotificationOnCritical" :title="$t('Table.Box.Cell.contacts.more.option[6]')" value="true" lay-skin="primary" :checked="currentContactMore.ServiceNotificationOnCritical"> 
                                                    </li>
                                                    <li>
                                                    <input type="checkbox" name="ServiceNotificationOnUnknown" :title="$t('Table.Box.Cell.contacts.more.option[7]')" value="true" lay-skin="primary" :checked="currentContactMore.ServiceNotificationOnUnknown"> 
                                                    </li>
                                                    <li>
                                                    <input type="checkbox" name="ServiceNotificationOnRecovery" :title="$t('Table.Box.Cell.contacts.more.option[8]')" value="true"  lay-skin="primary" :checked="currentContactMore.ServiceNotificationOnRecovery"> 
                                                    </li>
                                                    <li>
                                                    <input type="checkbox" name="ServiceNotificationOnFlapping" :title="$t('Table.Box.Cell.contacts.more.option[9]')" value="true" lay-skin="primary" :checked="currentContactMore.ServiceNotificationOnFlapping"> 
                                                    </li>
                                                </ul>
                                            </div>

                                            <div >
                                                <input type="checkbox" :title="$t('Table.Box.Cell.contacts.more.label[3]')" lay-skin="primary" lay-filter="selectAll">
                                                <ul style="margin-left: 20px;" v-html="code1">
                                                    {{code1}}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button hidden lay-submit lay-filter="contactsMore_submit">提交</button>
                </form>
            </div>
        </div>
        <div v-parent="'body'" v-if="sort=='contacts'"  hidden id="setEmail">
            <form class="layui-form" lay-filter="contactEmailForm">
                <div class="layui-form-item" style="width: 95%">
                    <label class="layui-form-label">{{$t('Table.Box.Email.contacts.label[0]')}}:</label>
                    <div class="layui-input-block" >
                        <input type="text" name="User2" required  lay-verify="email" :placeholder="$t('Table.Box.Email.contacts.tips[0]')" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item" style="width: 95%">
                    <label class="layui-form-label">{{$t('Table.Box.Email.contacts.label[1]')}}:</label>
                    <div class="layui-input-block">
                        <input type="password" name="User3" required  lay-verify="required" :placeholder="$t('Table.Box.Email.contacts.tips[1]')" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item" style="width: 95%">
                    <label class="layui-form-label">{{$t('Table.Box.Email.contacts.label[2]')}}:</label>
                    <div class="layui-input-block">
                        <input type="text" name="User4" required  lay-verify="required" :placeholder="$t('Table.Box.Email.contacts.tips[2]')" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <P style="margin-left: 20px; color: red">{{$t('Table.Box.Email.contacts.tips[3]')}}</P>
            </form>
        </div>
        <div v-parent="'body'" v-if="sort=='period'" hidden id="setPeriod">
            <div class="layui-form">
                <form>
                    <div class="setPeriod_content">
                    </div>
                </form>
            </div>
        </div>
        <div v-parent="'body'" v-if="sort=='leftMenu'" hidden id="leftMenuBox">
            <div class="layui-form" lay-filter='leftMenuBox'>
                <form>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('mMore.leftMenu.Prompt.label[0]')}}</label>
                        <div class="layui-input-block">
                            <input type="text" name="Name" :placeholder="$t('mMore.leftMenu.Prompt.placeholder[0]')" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('mMore.leftMenu.Prompt.label[1]')}}</label>
                        <div class="layui-input-block">
                            <input type="text" name="Link" :placeholder="$t('mMore.leftMenu.Prompt.placeholder[1]')" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('mMore.leftMenu.Prompt.label[2]')}}</label>
                        <div class="layui-input-block">
                            <select name="Target">
                                <option value="main">{{$t('mMore.leftMenu.Prompt.select_opt[0]')}}</option>
                                <option value="_blank">{{$t('mMore.leftMenu.Prompt.select_opt[1]')}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('mMore.leftMenu.Prompt.label[3]')}}</label>
                        <div class="layui-input-block">
                            <input type="text" name="Subgroup" :placeholder="$t('mMore.leftMenu.Prompt.placeholder[2]')" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('mMore.leftMenu.Prompt.label[4]')}}</label>
                        <div class="layui-input-block">
                            <select name="Hostgroup">
                                <option v-for="item in hostgroup" :key='item.Id' :value="item.Id" v-html="item.Name" ></option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- 定时任务 执行周期弹窗 -->
        <div v-parent="'body'" v-if="sort=='timedTask'" hidden id="timedTaskIds">
            <div class="layui-form" lay-filter="timedTaskIds">
                <div class="week">
                    <form>
                        <div class="layui-form-item" style="margin: 0">
                            <div class="layui-input-block" style="display: flex; justify-content: space-between">
                                <input type="radio" name="Repeat" value="true" :title="$t('Table.Box.Cell.timedTask.cycle.select[0]')" lay-filter="timedTask-Ids">
                                <input type="radio" name="Repeat" value="false" :title="$t('Table.Box.Cell.timedTask.cycle.select[1]')" lay-filter="timedTask-Ids">
                            </div>
                        </div>
                    
                        <div style="display: flex; width: 100%; justify-content: space-between">
                            <div class="layui-form-item timedTask-week" style="margin: 0">
                                <div class="layui-input-block" style="width:100px;display: flex; flex-direction: column; justify-content: flex-start">
                                    <input type="checkbox" name="Monday" :title="$t('Table.Box.Cell.timedTask.cycle.option[0]')" lay-skin="primary" value="true">
                                    <input type="checkbox" name="Tuesday" :title="$t('Table.Box.Cell.timedTask.cycle.option[1]')" lay-skin="primary" value="true"> 
                                    <input type="checkbox" name="Wednesday" :title="$t('Table.Box.Cell.timedTask.cycle.option[2]')" lay-skin="primary" value="true"> 
                                    <input type="checkbox" name="Thursday" :title="$t('Table.Box.Cell.timedTask.cycle.option[3]')" lay-skin="primary" value="true"> 
                                    <input type="checkbox" name="Friday" :title="$t('Table.Box.Cell.timedTask.cycle.option[4]')" lay-skin="primary" value="true"> 
                                    <input type="checkbox" name="Saturday" :title="$t('Table.Box.Cell.timedTask.cycle.option[5]')" lay-skin="primary" value="true"> 
                                    <input type="checkbox" name="Sunday" :title="$t('Table.Box.Cell.timedTask.cycle.option[6]')" lay-skin="primary" value="true"> 
                                </div>
                            </div>
                            <div class="layui-form-item timedTask-once">
                                <div class="layui-input-block">
                                    <input type="text" name="ExecuteDate" class="layui-input" id="timedTaskLaydata">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-parent="'body'" v-if="sort=='timedTask'" hidden id="timedTaskLogBox">
            <table id="timedTaskLog" lay-filter="timeTaskLog"></table>
        </div>
        <div v-parent="'body'" v-if="sort=='linkage'" hidden id="linkageBox">
            <form class="layui-form" lay-filter='linkageBox'>
                <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="Name" placeholder="请输入联动名称" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">机房组</label>
                    <div class="layui-input-block">
                        <select name="hostgroup" lay-filter="linkageAdd">
                            <option value="">请选择机房组</option>
                            <option v-for="item in hostgroup" :key="item.Id" :value="item.Id">{{item.Name}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">设备</label>
                    <div class="layui-input-block">
                        <select name="HostId" lay-filter="linkageAdd">
                            <option value="">请选择</option>
                            <option v-for="it in timedTaskAddHost" :key="it.Id" :value="it.Id">{{it.Name}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">监控项</label>
                    <div class="layui-input-block">
                        <select name="ServiceId" lay-filter="linkageAdd">
                            <option value=""></option>
                            <option v-for="it in timedTaskAddServices" :key='it.Id' :value="it.Id">{{it.Description}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">工作值</label>
                    <div class="layui-input-block">
                        <input type="text" name="WorkValue" lay-verify="number" placeholder="请输入工作值，格式为数字整数" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">阈值</label>
                    <div class="layui-input-block">
                        <input type="text" name="LimitValue" lay-verify="number" placeholder="请输入阈值，格式为数字整数" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">越限命令</label>
                    <div class="layui-input-block">
                        <i class="glyphicon glyphicon-edit" aria-hidden="true" style='cursor:pointer' @click="selectOrder(1)"></i>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">恢复命令</label>
                    <div class="layui-input-block">
                        <i class="glyphicon glyphicon-edit" aria-hidden="true" style='cursor:pointer' @click="selectOrder(2)"></i>
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">备注</label>
                    <div class="layui-input-block">
                        <textarea name="Remark" placeholder="请输入内容" class="layui-textarea"></textarea>
                    </div>
                </div>
                <button hidden lay-submit lay-filter="linkageBoxBtn">提交</button> 
            </form>
        </div>
        <div v-parent="'body'" v-if="sort==='linkage'" id="batchBox3" hidden>
            <div class="layui-form" lay-filter="batchBox3">
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.device.label[0]')}}</label>
                    <div class="wordValueBox">
                        <div class="layui-inline">
                            <label class="layui-form-label">工作值：</label>
                            <div class="layui-input-inline">
                                <input type="text" name="WorkValue" lay-verify="number" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">阈值：</label>
                            <div class="layui-input-inline">
                                <input type="text" name="LimitValue" lay-verify="number" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.device.label[1]')}}</label>
                    <div class="layui-input-block">
                        <button class="layui-btn layui-btn-disabled btn-warning" disabled>{{batchTemp.temp[0]}}</button>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">{{$t('Table.Box.Batch.device.label[2]')}}</label>
                    <div class="layui-input-block">
                        <button class="layui-btn layui-btn-disabled " v-for="(it) in batchTemp.temp" :key="it" disabled>{{it}}</button>
                    </div>
                </div>
                <button hidden lay-submit lay-filter="batchBox33">提交</button> 
            </div>
        </div>
    </div>
</template>
<script>
import Common from './common.js'
let {form}=layui
export default {
    props:['sort', 'contactEmail'],
    data(){
        return {
            config: '',
            operate:{
                add: false,
                delete: false,
                save: false,
                management: false,
                modify: false,
                emailSet: false,
                test: false,
                compared: false,
                log: false,
                application: false,
                batchEdit: false
            },
            Tdata: null,  // 当前渲染的表格数据
            currentObj: [],   // 当前选中对象 
            currentRow: '',
            // 一下保存变更的数据，更新、添加、修改、删除的数组
            updateGroup: [],

            /** */
            hostgroup: '',
            sorts: [],
            cell: [],
            
            storageDevice: [],
            contactsList:[],
            batchTemp: {
                nec: [{ key: "Hostgroups", value: this.$t('Table.Box.Batch.device.batchTemp[0]') },
                    { key: "Contactgroups", value: this.$t('Table.Box.Batch.device.batchTemp[1]') },
                    { key: "_SUB_GROUP", value: this.$t('Table.Box.Batch.device.batchTemp[2]') },
                    { key: "Address", value: this.$t('Table.Box.Batch.device.batchTemp[3]') },
                    { key: "_PORT", value: this.$t('Table.Box.Batch.device.batchTemp[4]') },
                    { key: "_RS485_ADDR", value:this.$t('Table.Box.Batch.device.batchTemp[5]') }],
                temp: [],
                nec2: [
                    {key: "Contactgroups", value: this.$t('Table.Box.Batch.monitoring.batchTemp[0]')},
                    {key: "timeBase", value: this.$t('Table.Box.Batch.monitoring.batchTemp[1]')},
                    {key: "MaxCheckAttempts", value: this.$t('Table.Box.Batch.monitoring.batchTemp[2]')},
                    {key: "NotificationInterval", value: this.$t('Table.Box.Batch.monitoring.batchTemp[3]')},
                    {key: "NotificationsEnabled", value: this.$t('Table.Box.Batch.monitoring.batchTemp[4]')}]
            },

            timeSlot: [],
            timeBase: 0,
            // 分页部分
            laypageId: "tp_",
            curr: 1,
            curParams: '',
            // 人员管理部分
            // userRole: false,
            changePwd: false,
            setPwd: true,
            reSetPwd: false,
            userEditBox:{
                userName: ''
            },
            // 人员管理——联系人
            currentContactMore:'',
            hostBlist: '',
            ServiceBlist: '',
            code0: '',
            code1: '',
            
            // 定时任务
            timedTaskOrder: '',
            timedTaskAddHost:'',
            timedTaskAddServices: '',

            // 联动参数 {Type: 1, ActionId: 2}, {Type: 2, ActionId: "3"}
            linkageAdd: {
                Actions: [],
                Enabled: true,
                HostId: null,
                LimitValue: null,
                Name: null,
                Remark: "",
                ServiceId: null,
                Type: 0,
                Id: null,
                WorkValue: null,
            },
            linkageAddStatus: 0,
            compareVisible: false,
            device_filter: false,
            oldTab: 0
        }
    },
    mounted() {
        // let vm = this;
        window.vm = this;
        layui.use(["element", "layer", "table", "laypage", "form", "laydate"], () => {
            
        });
        this.init();
        if(this.sort=='devices'){ 
            window.app=this; 
        }
    },
    methods:{
        init() {
            let vm = this;
            /*****用户类型测试*********************************************/
            // 预设当前用户 先获取是否由localstorage
            let gd3nUserType;
            window.localStorage.gd3nUserType ? gd3nUserType=window.localStorage.gd3nUserType : gd3nUserType=0
            
            /**************************************************/
            vm.config = require('./tableConfig.js').default;
            vm.operate.add = vm.config[vm.sort].operating.add;
            vm.operate.delete = vm.config[vm.sort].operating.delete;
            vm.operate.save = vm.config[vm.sort].operating.save;
            vm.operate.management = vm.config[vm.sort].operating.management
            vm.operate.modify = vm.config[vm.sort].operating.modify;
            vm.operate.emailSet = vm.config[vm.sort].operating.emailSet;

            vm.operate.test = vm.config[vm.sort].operating.test
            vm.operate.compared = vm.config[vm.sort].operating.compared;
            vm.operate.log = vm.config[vm.sort].operating.log;
            vm.operate.application = vm.config[vm.sort].operating.application;
            vm.operate.batchEdit = vm.config[vm.sort].operating.batchEdit;
            vm.operate.filter = vm.config[vm.sort].operating.filter;

            /**********************************/
            if(gd3nUserType=='2'){
                vm.$nextTick(()=>{
                    $(".operateBtnList").children("button").attr("disabled", true);
                    let list = $(".operateBtnList").children("button");
                    for(let i=0;i<list.length; i++){
                        $(list[i]).attr("disabled")
                        $(list[i]).addClass('layui-btn-disabled');
                        $(list[i]).removeClass('delete batch modify log test compared')
                    }
                });
            }
            /*********************************/
            this.laypageId += Math.floor(Math.random()*100);
            this.getHosts();
        },
        clear() {
            this.updateGroup = []
        },
        filter_device() {
            let vm = this;
            let list = $('.device_filter form').serializeArray(), params={};
            params[list.find(e => e.name=='hgid').name] = list.find(e => e.name=='hgid').value;
            params[list.find(e => e.name=='class').value] = list.find(e => e.name=='key').value;
            vm.curParams = params;
            vm.getTableData('', params)
            vm.curr = 1
            vm.curParams = [];
            return false
        },
        filter_linkage() {
            let vm = this;
            let list = $('.linkage_filter form').serializeArray(), params={};
            params[list.find(e => e.name=='key').value] = list.find(e => e.name=='keyValue').value;
            vm.curParams = params;
            // console.log(params);
            vm.getTableData('', params)
            vm.curr = 1;
            vm.curParams = []
            return false
        },
        clear_linkage_filter(e) {
            $(e.target).parent().prevAll().find('select[name="key"]').val("");
            $(e.target).parent().prevAll().find('input[name="keyValue"]').val("");
            vm.getTableData();
            vm.getControlActions();
        },
        /* 所有表格中通用方法 */
        // 通用——获取联系人组
        getContactgroup: function () {
            var vm = this;
            this.$http.get('/api/v1/setting/contactgroup')
            .then((res)=>{
                if(res.body.status){
                    vm.contactsList = res.body.data;
                }
            });
        },
        // 通用——获取机房组
        getHosts() {
            let vm = this;
            this.$http.get('/api/v1/setting/hostgroup')
            .then((res)=>{
                if(res.status){
                    vm.hostgroup = res.body.data;
                }
            });
            this.getContactgroup();
        },
        // 获取数据
        getTableData(selectPage, params) {
            let vm = this;
            let url = vm.config[vm.sort].api;
            if(vm.config[vm.sort].select){
                url += "?page="+(selectPage?Number(selectPage-1):0)+"&row=10"; 
            }else{
                url += "?"
            }
            // if(params!=undefined){
            //     // this.curParams = params;
            //     // let data = '';
            //     // for(let key in params){
            //     //     data += '&'+(key+'='+params[key]);
            //     // }
            //     // url += data
            // };
            
            this.$http.get(url, params!=undefined&&{params: params})
            .then((res)=>{
                if(vm.sort=='timedTask'){
                    vm.Tdata = res.body;
                    vm.renderTable(vm.Tdata);
                }else{
                    if(res.body.status){
                        let data = res.body.data;
                        vm.Tdata = vm.config[vm.sort].format(data, vm.hostgroup, vm.contactsList);
                        vm.config[vm.sort].select && vm.tablepage(res.body.data.total);
                        vm.renderTable(vm.Tdata);
                    }else{
                        if(vm.sort=='period' || vm.sort=='ports'){
                            vm.Tdata = res.body;
                            vm.renderTable(res.body);
                            if(vm.sort=='period'){
                                this.$nextTick(()=>{
                                    $('td').bind('mouseover', (e)=>{
                                        return false;
                                    })
                                    $('.periodTips').bind('mouseover', (e)=>{return false});
                                    $('td div.layui-table-cell').bind('mouseover', (e)=>{
                                        let value = $(e.target)[0].innerText
                                        if(value==""||$(e.target).parent().data('field')=='Name'||$(e.target).parent().data('field')=='Alias'){return false}
                                        
                                        $(e.target).parent().css('position', 'relative')
                                   
                                        let top = $(e.target).offset().top;
                                        let left = $(e.target).offset().left;
                                        let offsetLeft = $(e.target).width()/2;
                                        let tips = `<div style="z-index: 1000000000; 
                                            background: #ccd0d4;
                                            color: #000;
                                            border: 1px solid #fff;
                                            border-radius: 3px;
                                            padding: 5px;
                                            box-shadow:  1px 1px 3px #ccd0d4, 0 0 0 rgba(0, 0, 0, 0.8), 1px 1px 4px #fff;
                                            position: absolute; 
                                            top: ${ top-40 }px; 
                                            left:${ left+offsetLeft }px;" 
                                            class="periodTips">${value}</div>`
                                        $('body').css('position', 'relative');
                                        $('body').append(tips);
                                    });
                                    $('td div.layui-table-cell').bind('mouseout', (e)=>{
                                        $('.periodTips').remove()
                                    })
                                });
                            }
                        }else{
                            vm.errorMsg(res.body.msg)
                        }
                    }
                }
            }, (res)=>{
                console.log(res.body)
            })
        },
        // 渲染，重载数据表格
        renderTable(tdata) {
            let vm = this;
            let limit = 10, height = "";
            if(vm.sort=='hostGroup'||vm.sort=='user'||vm.sort=='contactGroup'||vm.sort=='contacts'||
                vm.sort=='period'||vm.sort=='timedTask'||vm.sort=='leftMenu'){
                limit = 100;
                height = "full-300";
            }
            let opts = {
                elem: '#'+vm.sort, 
                cols: [vm.config[vm.sort].cols],
                data: tdata,
                even: true,
                page: false,
                limit:  limit,
                height: height,
                size: "lg",
                skin: "set-table",
                done(res) {
                    for(let i=0; i<res.data.length; i++){
                        if(res.data[i].hasOwnProperty('edit')){
                            $('.layui-table').find('tr[data-index='+i+']').css('color', 'green')
                        }
                    }
                }
            }
            layui.table.render(opts);
            vm.$nextTick(()=>{
                layui.form.render();
            });
            vm.monitor();
        },
        // 新增按钮
        add() {
            let vm = this;
            if(this.config[this.sort].editType=='null'){
                let editOpts = this.config[this.sort].editOpts(vm.Tdata.length)
                this.Tdata.push(editOpts);
                layui.table.reload(this.sort, {
                    data: this.Tdata
                });
                editOpts.edit = 'add';
                vm.updateGroup.push(editOpts);
                if($('.modifyFlag').find('span').length==0){
                    $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                }
            }else{
                this.sort=='devices'&&this.addItem();
                this.sort=='user'&&this.addBox();
                this.sort=='leftMenu'&&this.addBox();
                this.sort=='forward'&&this.addBox();
                this.sort=='linkage'&&this.addBox();
            }
        },
        // 新增弹框配置设置， 实现
        addBox() {
            let vm = this, dom, tit, con, btn, area = ['545px', '370px'];
            if(vm.sort=='user'){
                vm.userEditBox.userName = '';
                this.setPwd = true;
                this.changePwd = false;

                tit = vm.$t('Table.Box.Add.user.title');
                con = $('#userEditBox')
                btn = [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")];
            }else if(vm.sort == 'contacts'){
                tit = vm.$t('Table.Box.Email.contacts.title');
                con = $('#setEmail');
                btn = [vm.$t('Table.Box.Email.contacts.btn[0]'), vm.$t('Table.Box.Email.contacts.btn[1]')]
            }else if(vm.sort == 'leftMenu'){
                tit= vm.$t('mMore.leftMenu.Prompt.title[0]');
                btn = [vm.$t('mMore.leftMenu.Prompt.btn[0]'), vm.$t('mMore.leftMenu.Prompt.btn[1]')];
                con = $('#leftMenuBox')
            }else if(vm.sort == 'forward'){
                tit = vm.$t('Table.Box.Add.forward.title');
                btn = [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")];
                con = vm.config[vm.sort].editAdd();
            }else if(vm.sort == 'linkage'){
                vm.linkageAddStatus = 0
                tit = '新增联动>>';
                btn =['确定', '取消'];
                con = $('#linkageBox');
            }
            layer.open({
                type: 1,
                title: tit,
                area: area,
                shadeClose: true,
                content: con,
                skin: 'set-Table',
                btn: btn,
                shade:[0.5, '#000'],
                success: function(layero, index){
                    layui.form.render();
                    if(vm.sort=="user"){
                        $("#modityUserForm").find('input[name="userName"]').attr("readonly", false)
                        $('.userRole').eq(0).attr('hidden', 'hidden');
                        layui.form.val("modityUserForm", {
                            "userName": "",
                            "Type": "0",
                            "pwd": "",
                            "repwd": ""
                        })
                        $('.userRole').find('input[type=checkbox]').removeAttr('checked')
                        // 人员管理员的角色分配，附加机房和联系人组的条件
                        layui.form.on('select(selectUserRole)', function(data){
                            data.value!=0?$('.userRole').eq(0).removeAttr('hidden'):$('.userRole').eq(0).attr('hidden', 'hidden');
                            layui.form.render();
                            vm.$nextTick(()=>{
                                $("#modityUserForm").find('input[name="userName"]').attr("readonly", false);
                                layui.form.render();
                                layui.form.on('checkbox(selectAll)', function(data){
                                    if(data.elem.checked){
                                        let sonList = $(data.elem).nextAll().find('input:checkbox');
                                        $.each(sonList, (i,e)=>{
                                            $(e)[0].checked=true;
                                        })
                                    }else{
                                        let sonList = $(data.elem).nextAll().find('input:checkbox');
                                        $.each(sonList, (i,e)=>{
                                            $(e)[0].checked=false;
                                        })
                                    }
                                    layui.form.render();
                                })
                            });
                        });
                    }else if(vm.sort=="linkage"){
                        layui.form.val('linkageBox', {
                            "Name": "",
                            "hostgroup": "",
                            "HostId": "",
                            "ServiceId": "",
                            "WorkValue": "",
                            "LimitValue": "",
                            "Remark": ""
                        })
                        vm.linkageAdd.Actions = []
                        layui.form.on('select(linkageAdd)', function(data){
                            if(data.elem.name=='hostgroup'){
                                vm.timedTaskAddHost = vm.hostgroup.find((item)=>{if(item.Id==Number(data.value)){return item}}).Hosts;
                                vm.$nextTick(()=>{
                                    layui.form.render('select');
                                });
                            }else if(data.elem.name=='HostId'){
                                vm.$http.get('/api/v1/setting/service?hid='+data.value)
                                .then((res)=>{
                                    vm.timedTaskAddServices = res.body.data.services;
                                    vm.$nextTick(()=>{
                                        layui.form.render('select');
                                    });
                                });
                            }
                        });
                    }else if(vm.sort=="contacts"){
                        layui.form.val("contactEmailForm", {
                            User2: vm.contactEmail.User2,
                            User3: vm.contactEmail.User3,
                            User4: vm.contactEmail.User4,
                        })
                    };
                },
                yes: function(index, layero){
                    let res;
                    // 获取弹框的数据
                    let postData = layero.find('form').serializeArray();
                    //整理弹框中数据的结构格式，方便向后台传送。
                    // 检查反馈，输入数据是否合理
                    if(vm.sort == 'linkage'){
                        vm.linkageAdd.Name = postData[0].value;
                        vm.linkageAdd.HostId = postData[2].value;
                        vm.linkageAdd.ServiceId = postData[3].value;
                        vm.linkageAdd.WorkValue = postData[4].value;
                        vm.linkageAdd.LimitValue = postData[5].value;
                        vm.linkageAdd.Remark = postData[6].value;

                        if(vm.linkageAdd.Name==""){
                            vm.errorMsg("联动参数名称不能为空");
                            return false
                        }
                        if(vm.linkageAdd.WorkValue==""||vm.linkageAdd.LimitValue==""){
                            vm.errorMsg("阈值和工作值不能为空");
                            return false
                        }else if(vm.linkageAdd.WorkValue==vm.linkageAdd.LimitValue){
                            vm.errorMsg("阈值和工作值不能相等");
                            return false
                        }
                        if(vm.linkageAdd.Actions.length<=0){
                            vm.errorMsg('联动命令不能为空');
                            return false
                        }
                        res = {data: vm.linkageAdd}
                    }else if(vm.sort== 'contacts'){
                        res = {
                            Id: vm.contactEmail.Id,
                            User2: postData.find((item)=>item.name=='User2').value,
                            User3: postData.find((item)=>item.name=='User3').value,
                            User4: postData.find((item)=>item.name=='User4').value,
                        };
                        // 验证邮箱格式
                        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式;
                        if(!reg.test(res.User2)){return vm.errorMsg(vm.$t('Tips[9]')); return false}
                    }else{
                        res = vm.config[vm.sort].submitFile('add', postData);
                        if(vm.sort== 'forward'){
                            res.data.edit = 'add';
                            vm.updateGroup.push(res.data);
                            vm.Tdata.push(res.data)
                            vm.renderTable(vm.Tdata);
                            layer.close(index);
                            if($('.modifyFlag').find('span').length==0){
                                $('.modifyFlag').append('<span class="layui-badge-dot"></span>');
                            }
                            return 
                        }
                        if(!res.feedback.status){ vm.errorMsg(res.feedback.msg); return false; }
                    }
                    // 统一向后台发送数据，并且重新刷新表格数据。
                    if(vm.sort== 'contacts'){
                        vm.$http.post('/config/rest/Resources/'+res.Id+"?to_do=smtpTest", res)
                        .then((res)=>{
                            if(res.body.status){
                                vm.successMsg(res.body.msg)
                                layer.close(index);
                            }else{
                                vm.errorMsg(res.body.msg)
                                layer.close(index);
                            }
                        },(err)=>{
                            vm.errorMsg(err.body.error)
                        });
                    }else{
                        if(vm.sort=='user'){
                            let reg = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;
                            let result = reg.test(res.data.pwd);
                            if(!result){
                                vm.errorMsg(vm.$t('Tips[8]'))
                                return false
                            }
                        }
                        vm.$http.post(vm.config[vm.sort].onSubmit('create'), res.data)
                        .then((res)=>{
                            if(res.body.status){
                                vm.getTableData();
                                vm.successMsg(res.body.msg)
                                layer.close(index);
                            }else{
                                vm.errorMsg(res.body.msg)
                                // layer.close(index);
                            }
                        },(err)=>{
                            console.log(err.body);
                        });
                    }
                    
                },
                btn2: function(index, layero) {
                    let res;
                    if(vm.sort== 'contacts'){
                        let postData = layero.find('form').serializeArray();
                        res = {
                            Id: vm.contactEmail.Id,
                            User2: postData.find((item)=>item.name=='User2').value,
                            User3: postData.find((item)=>item.name=='User3').value,
                            User4: postData.find((item)=>item.name=='User4').value,
                        };
                        // 验证邮箱格式
                        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式;
                        if(!reg.test(res.User2)){return vm.errorMsg(vm.$t('Tips[9]')); return false};
                        vm.$http.post('/config/rest/Resources/'+res.Id, res)
                        .then((res)=>{
                            if(!res.status){
                                vm.errorMsg(res.body)
                            }
                            layer.close(index);
                        },(err)=>{
                            vm.errorMsg(err.body)
                        });
                    }else{
                        layer.close(index);
                    }
                }
            });
        },
        // 删除功能
        delet() {
            let vm = this;
            if(vm.currentObj.length==0){return vm.errorMsg(vm.$t('Table.Box.Delete.tips[0]'))}
            
            layer.confirm(vm.$t('Table.Box.Delete.content'), { 
                    title:vm.$t('Table.Box.Delete.title'),
                    skin: 'set-Table',
                    btn: [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")],
                }, function(index){
                    $.each(vm.currentObj,(i,e)=>{
                        e.edit='delete';
                        
                        if(e.hasOwnProperty('id')){
                            let index;
                            vm.updateGroup.forEach((k,j)=>{
                                if(k.id==e.id){index=j}
                            });
                            vm.updateGroup.splice(index, 1);
                        }else{
                            if(vm.sort!='linkage'){
                                vm.updateGroup.push(e);
                            }
                        }
                    })
                    
                    if(vm.sort!=='user'){
                        //这里是界面上删除表格中的一行 
                        for(let i=0; i<vm.currentObj.length; i++){
                            for(let j=0; j<vm.Tdata.length; j++){
                                if(vm.sort=='monitoring'){
                                    if(vm.currentObj[i].Description==vm.Tdata[j].Description){
                                        vm.Tdata.splice(j, 1);
                                        j--;
                                    }
                                }else{
                                    // if(vm.currentObj[i].Name==vm.Tdata[j].Name){
                                    //     vm.Tdata.splice(j, 1);
                                    //     j--;
                                    // }
                                    if(vm.currentObj[i].hasOwnProperty('Id')){
                                        if(vm.currentObj[i].Id==vm.Tdata[j].Id){
                                            vm.Tdata.splice(j, 1);
                                            j--;
                                        }
                                    }else{
                                        if(vm.currentObj[i].id==vm.Tdata[j].id){
                                            vm.Tdata.splice(j, 1);
                                            j--;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(vm.sort=='user'){
                        $.each(vm.currentObj, (i, e)=>{
                            vm.$http.get(vm.config[vm.sort].onSubmit('delete')+'?uid='+e.Id)
                            .then((res)=>{
                                if(res.body.status){
                                    vm.successMsg(res.body.msg);
                                    for(let j=0; j<vm.Tdata.length; j++){
                                        if(e.Id==vm.Tdata[j].Id){
                                            vm.Tdata.splice(j, 1);
                                            j--;
                                        }
                                    }
                                    layui.table.reload(vm.sort, {
                                        data: vm.Tdata
                                    })
                                }else{
                                    vm.errorMsg(res.body.msg);
                                }
                            }, (err)=>{
                                console.log(err.body);
                            });
                        })
                    }else if(vm.sort=='leftMenu'){
                        $.each(vm.currentObj, (i, e)=>{
                            vm.$http.get(vm.config[vm.sort].onSubmit('delete')+'?id='+e.Id)
                            .then((res)=>{
                                if(res.body.status){
                                    vm.successMsg(res.body.msg);
                                }else{
                                    vm.errorMsg(res.body.msg);
                                }
                            }, (err)=>{
                                console.log(err.body);
                            });
                        })
                    }else if(vm.sort=='linkage'){
                        $.each(vm.currentObj, (i, e)=>{
                            vm.$http.get(vm.config[vm.sort].onSubmit('delete')+'?id='+e.Id)
                            .then((res)=>{
                                if(res.body.status){
                                    vm.successMsg(res.body.msg);
                                }else{
                                    vm.errorMsg(res.body.msg);
                                }
                            }, (err)=>{
                                console.log(err.body);
                            });
                        })
                    }

                    layui.table.reload(vm.sort, {
                        data: vm.Tdata
                    })
                    vm.currentObj = [];

                    layer.close(index);
                    if($('.modifyFlag').find('span').length==0){
                        $('.modifyFlag').append('<span class="layui-badge-dot"></span>');
                    }
                });
        },
        // 更新机房，保存机房数据
        updated() {
            let vm = this;
            
            if(vm.updateGroup.length!=0){
                let err = false;
                $.each(vm.updateGroup, (i, e)=>{
                    if(e.edit=='add'){
                        let data;
                        if(vm.sort!="forward"){
                            data = vm.config[vm.sort].submitFile('create', e);
                            if(data.error){
                                vm.errorMsg(data.errMsg)
                                err = true;
                                return false;
                            }
                        }else{
                            data = e
                        }
                        vm.$http.post(vm.config[vm.sort].onSubmit('create'), data)
                        .then((res)=>{
                            if(res.body.status!=undefined){
                                if(res.body.status){
                                    vm.successMsg(vm.$t('Tips[4]'));
                                }else{
                                    vm.errorMsg(res.body.msg);
                                }
                            }else if(res.status=='200'){
                                vm.successMsg(vm.$t('Tips[4]'));
                            }else{
                                vm.errorMsg(res);
                            }
                            $('.modifyFlag span').remove();
                            vm.curr = 1;
                            vm.getTableData();
                        },(err)=>{
                            vm.errorMsg(err.body.error);
                        });
                    }else if(e.edit=='delete'){
                        if(e.id != ''){
                            if(vm.sort=='period'||vm.sort=='timedTask'){
                                vm.$http.delete(vm.config[vm.sort].onSubmit('delete', e.Id))
                                .then((res)=>{
                                    vm.successMsg(vm.$t('Tips[5]'))
                                    $('.modifyFlag span').remove();
                                },(err)=>{ 
                                    // 错误反馈
                                    vm.errorMsg(err.body.error);
                                });
                                // vm.curr = 1;
                                // vm.getTableData();
                            }else{
                                let data = vm.config[vm.sort].submitFile('delete', e);
                                vm.$http.get(vm.config[vm.sort].onSubmit('delete'), {params: data})
                                .then((res)=>{
                                    if(res.body.status){
                                        vm.successMsg(vm.$t('Tips[5]'))
                                        $('.modifyFlag span').remove()
                                        if(vm.sort!='monitoring'){
                                            vm.getTableData();
                                        }
                                    }else{
                                        vm.errorMsg(res.body.msg)
                                    }
                                },(err)=>{ 
                                    // 错误反馈
                                    vm.errorMsg(err.body.msg);
                                });
                                if(vm.sort!='monitoring'){
                                    vm.curr = 1;
                                    vm.getTableData();
                                }
                            }
                        }
                    }else if(e.edit=='update'){
                        let data = vm.config[vm.sort].submitFile('update', e );
                        vm.$http.post(vm.config[vm.sort].onSubmit('update', e.Id), data)
                        .then((res)=>{
                            if(vm.sort=='period'||vm.sort=='timedTask'){
                                if(res.ok){
                                    vm.successMsg(vm.$t('Tips[6]'));
                                    $('.modifyFlag span').remove();
                                    vm.getTableData();
                                    return;
                                }
                            }
                            if(res.body.status){
                                vm.successMsg(vm.$t('Tips[6]'))
                                $('.modifyFlag span').remove();
                                $('.application span').remove();
                                if(vm.sort=='monitoring'){
                                    vm.Tdata.filter((e)=>{
                                        if(e.hasOwnProperty('edit')){
                                            delete e.edit;
                                        }
                                    });
                                    vm.renderTable(vm.Tdata);
                                    return;
                                }
                                vm.curr = 1;
                                vm.getTableData();
                            }else{
                                vm.errorMsg(res.body.msg);
                                if($('.modifyFlag').find('span').length==0){
                                    $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                                }
                            }
                        },(err)=>{
                            vm.errorMsg(err.body.error);
                        });
                    }
                    // else if(e.edit=='create'){
                    //     let data = vm.config[vm.sort].submitFile('create', e );
                    //     vm.$http.post(vm.config[vm.sort].onSubmit('create'), data)
                    //     .then((res)=>{
                    //         vm.successMsg('创建成功')
                    //         $('.modifyFlag span').remove()
                    //         console.log(res.body);
                    //     },(err)=>{
                    //         vm.errorMsg(err.body.msg);
                    //     });
                    // }
                });
                if(!err){vm.updateGroup = [];}
            }else{
                $('.modifyFlag span').remove();
            }
        },
        // 定时任务的 测试
        test() {
            let data = this.currentObj;
            if(data.length<=0){
                this.errorMsg(vm.$t('mMore.TimingTask.tips[0]'), 3000)
            }
            for(let i=0; i<data.length; i++){
                this.$http.post('/config/rest/ControlTasks/'+data[i].Id+'?to_do=execute')
                .then((res)=>{
                    this.successMsg(res.body.msg)
                },(err)=>{
                    this.errorMsg(err.body.error)
                });
            }
            // this.$http.post('/config/rest/ControlTasks/'+)
        },
        compared(){
            let vm = this;
            if(this.currentObj.length<2){
                this.errorMsg(vm.$t('Table.Box.comcontrast.timedTask.tips[0]'));
                return false;
            }
            // 这里需要判断一下是否有新增的数据在这里。如果有的话不进入对比状态，并提示
            // 判断的依据是 e.edit,是否含有edit编辑字段
            let go = true
            this.currentObj.forEach((e,i)=>{
                if(e.hasOwnProperty('edit')){
                    go = false;
                    return false;
                }
            });
            if(!go){vm.errorMsg(vm.$t('mMore.TimingTask.tips[1]'));return false}
            /************************************************* */
            this.compareVisible = !this.compareVisible;
            if(this.compareVisible){
                let compareList = this.currentObj, newCols = [[ {field: 'itemName', title: '', align: 'center'} ]]
                let newCompareList = [
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[0]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[1]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[2]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[3]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[4]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[5]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[6]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[7]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[8]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[9]')},
                    {itemName: vm.$t('Table.Box.comcontrast.timedTask.label[10]')}
                ];
                
                $.each(compareList, (i,e)=>{
                    let cycle = ''
                    if(e.Repeat){
                        cycle += e.Monday?vm.$t('Table.Box.Cell.timedTask.cycle.option[0]'):'';
                        cycle += e.Tuesday?vm.$t('Table.Box.Cell.timedTask.cycle.option[1]'):'';
                        cycle += e.Wednesday?vm.$t('Table.Box.Cell.timedTask.cycle.option[2]'):'';
                        cycle += e.Thursday?vm.$t('Table.Box.Cell.timedTask.cycle.option[3]'):'';
                        cycle += e.Friday?vm.$t('Table.Box.Cell.timedTask.cycle.option[4]'):'';
                        cycle += e.Saturday?vm.$t('Table.Box.Cell.timedTask.cycle.option[5]'):'';
                        cycle += e.Sunday?vm.$t('Table.Box.Cell.timedTask.cycle.option[6]'):'';
                    }else{
                        cycle += e.ExecuteDate
                    }
                    newCompareList[0]['c'+(i+1)] = e.CreatedTime;
                    newCompareList[1]['c'+(i+1)] = e.CreatedBy;
                    newCompareList[2]['c'+(i+1)] = e.LastExecutedBy;
                    newCompareList[3]['c'+(i+1)] = e.LastExecutedTime;
                    newCompareList[4]['c'+(i+1)] = e.LastFinishedTime;
                    newCompareList[5]['c'+(i+1)] = e.LastFinishedStatus;
                    newCompareList[6]['c'+(i+1)] = e.ExecuteTime;
                    newCompareList[7]['c'+(i+1)] = e.ExecuteDate;
                    newCompareList[8]['c'+(i+1)] = e.Enabled;
                    newCompareList[9]['c'+(i+1)] = cycle;
                    newCompareList[10]['c'+(i+1)] = e.Status;
                })
                
                for(let i=0; i<compareList.length; i++){
                    newCols[0].push(
                        {field: 'c'+(i+1), title: compareList[i].Name, align: 'center'},
                    )
                }
                let opts = {
                    elem: '#'+vm.sort,
                    cols: newCols,
                    data: newCompareList,
                    even: true,
                    page: false,
                    size: "lg",
                    limit: 11
                }
                layui.table.render(opts);
            }else{
                this.renderTable(this.Tdata);
            }
        },
        // 人员管理——登录用户修改函数， 使用在：登录用户表格
        modity() {
            let vm = this, id, con, tit;
            var renewPwd=false;
            if( this.currentObj.length<= 0 ){
                vm.sort=='linkage'&& vm.errorMsg(vm.$t('Table.Box.modify.tips[0]'));
                vm.sort=='user'&& vm.errorMsg(vm.$t('Table.Box.modify.tips[1]'));
                vm.sort=='leftMenu'&& vm.errorMsg(vm.$t('Table.Box.modify.tips[2]'));
                return false;
            }
            if(vm.sort=='user'){
                vm.userEditBox.userName = vm.currentObj[0].Name;
                id = vm.currentObj[0].Id;
                this.setPwd = false;
                this.changePwd = true;

                tit = vm.$t('Table.Box.modify.title')
                con = $('#userEditBox');
            }else if(vm.sort=='leftMenu'){
                tit = vm.$t("mMore.leftMenu.Prompt.title[1]")
                con = $('#leftMenuBox')

                layui.form.val('leftMenuBox', {
                    'Name': vm.currentObj[vm.currentObj.length-1].Name,
                    'Link': vm.currentObj[vm.currentObj.length-1].Link,
                    'Subgroup': vm.currentObj[vm.currentObj.length-1].Subgroup,
                    'Target': vm.currentObj[vm.currentObj.length-1].Target,
                    'Hostgroup': vm.currentObj[vm.currentObj.length-1].Hostgroup
                })
            }else if(vm.sort=='linkage'){
                vm.linkageAddStatus = 1
                tit = '修改联动>>';
                con = $('#linkageBox');
                /***
                 * 现在的问题是解决机房里面没有找到适配的设备，即timedTaskAddHost
                 */
                let currentHostGroup;
                vm.hostgroup.filter((e)=>{  
                    if(e.hasOwnProperty('Hosts')){
                        e.Hosts.filter((k)=>{
                            if(k.Id==vm.currentObj[0].HostId){
                                currentHostGroup = e.Id
                                vm.timedTaskAddHost = e.Hosts
                            }
                        });
                    }
                });
                let item = vm.hostgroup.find((item)=>{if(item.Id==Number(vm.currentObj[vm.currentObj.length-1].HostId)){return item}});
                vm.$http.get('/api/v1/setting/service?hid='+vm.currentObj[vm.currentObj.length-1].HostId)
                .then((res)=>{
                    vm.timedTaskAddServices = res.body.data.services;
                    vm.$nextTick(()=>{
                        layui.form.val('linkageBox', {
                            'Name': vm.currentObj[vm.currentObj.length-1].Name,
                            'hostgroup': currentHostGroup,
                            'HostId': vm.currentObj[vm.currentObj.length-1].HostId,
                            'ServiceId': vm.currentObj[vm.currentObj.length-1].ServiceId,
                            'WorkValue': vm.currentObj[vm.currentObj.length-1].WorkValue,
                            'LimitValue': vm.currentObj[vm.currentObj.length-1].LimitValue,
                            'Remark': vm.currentObj[vm.currentObj.length-1].Remark
                        })
                        layer.open({
                            type: 1,
                            title: tit,
                            area: ['545px', '370px'],
                            shadeClose: true,
                            content: con,
                            skin: 'set-Table',
                            shade:[0.5, '#000'],
                            btn: [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")],
                            success: function(layero, index){
                                vm.$nextTick(()=>{
                                    layui.form.render();
                                });
                                layui.form.on('submit(linkageBoxBtn)', function(data){
                                    let {field}=data
                                    let currentObj = vm.currentObj[0];
                                    for(let key in currentObj){
                                        if(field.hasOwnProperty(key)){
                                            if(currentObj[key]!=field[key]){
                                                currentObj[key] = field[key];
                                            } 
                                        }
                                    }
                                    currentObj.edit = 'update';
                                    vm.updateGroup.push(currentObj);
                                    if($('.application').find('span').length==0){
                                        $('<span class="layui-badge-dot" style="background-color: #1E9FFF"></span>').appendTo('.application')
                                    }
                                    let local;
                                    vm.Tdata.filter((e, i)=>{
                                        if(currentObj.hasOwnProperty('Id')){
                                            if(currentObj.Id==e.Id){
                                                local = i;
                                            }
                                        }else{
                                            if(currentObj.id = e.id){
                                                local = i
                                            }
                                        }
                                    });
                                    if(local>=0){
                                        vm.Tdata.splice(local, 1, currentObj)
                                    }
                                    vm.renderTable(vm.Tdata)
                                    layer.close(index);
                                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                });
                            },
                            yes: function(index, layero) {
                                $('[lay-filter="linkageBoxBtn"').click()
                                vm.linkageAddStatus = 0
                            },
                            end() { }
                        });
                    });
                });
            }
            
            if(vm.sort!='linkage'){
                layer.open({
                    type: 1,
                    title: tit,
                    area: ['545px', '370px'],
                    shadeClose: true,
                    content: con,
                    btn: [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")],
                    skin: 'set-Table',
                    shade:[0.5, '#000'],
                    success: function(){
                        if(vm.sort=='user'){
                            vm.$nextTick(function(){
                                vm.currentObj[0].Type!=0 ? $('.userRole').eq(0).removeAttr('hidden') : $('.userRole').eq(0).attr('hidden', 'hidden');
                                let initValue = {}
                                for(let it of vm.currentObj[0].HostGroups){
                                    initValue['host'+it.Id] = true
                                }
                                for(let it of vm.currentObj[0].ContactGroups){
                                    initValue['contact'+it.Id] = true
                                }
                                layui.form.val("modityUserForm", initValue)

                                // 这里是监听是否为某个角色
                                layui.form.on('select(selectUserRole)', function(data){
                                    data.value!=0 ? $('.userRole').eq(0).removeAttr('hidden') : $('.userRole').eq(0).attr('hidden', 'hidden');
                                    vm.$nextTick(()=>{
                                        layui.form.on('checkbox(selectAll)', function(data){
                                            if(data.elem.checked){
                                                let sonList = $(data.elem).nextAll().find('input:checkbox');
                                                $.each(sonList, (i,e)=>{
                                                    $(e)[0].checked=true;
                                                })
                                            }else{
                                                let sonList = $(data.elem).nextAll().find('input:checkbox');
                                                $.each(sonList, (i,e)=>{
                                                    $(e)[0].checked=false;
                                                })
                                            }
                                            layui.form.render();
                                        });
                                        layui.form.render();
                                    });
                                });
                                
                                // 这里是监听是否勾选修改密码！
                                layui.form.on('checkbox(modityPwd)', function(data){
                                    if(data.elem.checked){
                                        vm.reSetPwd = true;
                                        renewPwd = true;
                                    }else{
                                        vm.reSetPwd = false;
                                        renewPwd = false;
                                    }
                                })
                                $("#selectUserRole").val(vm.currentObj[0].Type);
                                layui.form.render();
                                $('#modityUserForm').find('input[name="userName"]').eq(0).attr("readonly", true)
                            });
                            
                        }else{
                            vm.$nextTick(()=>{
                                layui.form.render();
                                layui.form.render('select');
                            });
                        }
                    },
                    yes: function(index, layero) {
                        // 获取弹框的数据
                        let postData = layero.find('form').serializeArray();
                        // 调整数据结构 设置用户权限什么的，不涉及修改密码；
                        if(vm.sort=='user'){
                            let data = {
                                contactgroups: [],
                                hostgroups: [],
                                id: id,
                                type: ''
                            };
                            let changePwd = {
                                newpwd: "",
                                oldpwd: "",
                                renewpwd: "",
                                user: ""
                            }
                            $.each(postData, (i, e)=>{
                                if(e.name=="Type"){data.type=e.value};
                                if(e.name.indexOf('host')>=0){data.hostgroups.push({id: e.value})};
                                if(e.name.indexOf('contact')>=0){data.contactgroups.push({id: e.value})};
                            })
                            
                            vm.$http.post(vm.config[vm.sort].onSubmit('update'), data)
                            .then((res)=>{
                                if(res.body.status){
                                    if(!renewPwd) {
                                        vm.successMsg(res.body.msg)
                                        vm.getTableData();
                                        vm.currentObj = []
                                        layer.close(index);
                                    }
                                }else{
                                    vm.errorMsg(res.body.msg);
                                    vm.currentObj = []
                                }
                                if(renewPwd){
                                    $.each(postData, (i, e)=>{
                                        if(e.name=="userName"){changePwd.user=e.value}
                                        if(e.name=="newpwd"){changePwd.newpwd=e.value};
                                        if(e.name=="oldpwd"){changePwd.oldpwd=e.value};
                                        if(e.name=='renewpwd'){changePwd.renewpwd=e.value};
                                    })
                                    if(changePwd.newpwd!=changePwd.renewpwd){
                                        vm.errorMsg(vm.$t('Table.Box.Add.user.tips[0]')+"!")
                                        
                                        return false
                                    }
                                    let reg = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;
                                    let result = reg.test(changePwd.newpwd);
                                    if(!result){
                                        vm.errorMsg(vm.$t('Tips[8]'));
                                        return false
                                    }
                                    
                                    vm.$http.post(vm.config[vm.sort].onSubmit('changepwd'), changePwd)
                                    .then((res)=>{
                                        if(res.body.status){
                                            vm.successMsg(res.body.msg);
                                            vm.getTableData();
                                            vm.currentObj = []
                                        }else{
                                            vm.errorMsg(res.body.msg);
                                            vm.currentObj = []
                                        }
                                        layer.close(index);
                                        vm.reSetPwd = false;
                                        $('#userEditBox').find('form')[0].reset();
                                    },(err)=>{
                                        vm.errorMsg(err.body.msg);
                                        vm.currentObj = []
                                        $('#userEditBox').find('form')[0].reset();
                                        layer.close(index);
                                    });
                                    
                                }
                            },(err)=>{
                                vm.errorMsg(err.body.msg);
                                $('#userEditBox').find('form')[0].reset();
                            });
                        }else{
                            let data = vm.config[vm.sort].submitFile('update', postData);
                            data.data.Id = vm.currentObj[vm.currentObj.length-1].Id;
                            vm.$http.post(vm.config[vm.sort].onSubmit('update'), data.data)
                            .then((res)=>{
                                if(res.body.status){
                                    vm.successMsg(res.body.msg)
                                    vm.getTableData();
                                    vm.currentObj = []
                                }else{
                                    vm.currentObj = []
                                    vm.errorMsg(res.body.msg);
                                }
                                layer.close(index);
                            },(err)=>{
                                vm.errorMsg(err.body.msg)
                                vm.currentObj = [];
                                layer.close(index);
                            });
                        }
                        $('#modityUserForm').find('input[name="userName"]').eq(0).attr("readonly", false)
                    },
                    end() {
                        if(vm.sort=='leftMenu'){
                            let box = $('#leftMenuBox');
                            box.find('input[name="Name"]').val('');
                            box.find('input[name="Link"]').val('');
                            box.find('input[name="Subgroup"]').val('')
                            box.find('select[name="Target"]').val('');
                            box.find('select[name="Hostgroup"]').val('')
                        }
                        if(vm.sort=='user'){
                            $('.userRole').find('input[type=checkbox]').removeAttr('checked')
                        }
                    }
                });
            }
            
        },
        /****************表格监听功能***************************************************************************************************/
        monitor() {
            let vm = this;
            //监听单元格 编辑事件
            layui.table.on('edit('+vm.sort+')', function(obj){
                if(obj.field=='name' || obj.field=='Name'){
                    if(obj.value==""){
                        vm.errorMsg(vm.$t('Tips[11]'));
                        return false
                    }
                }
                // 对于联系人的相关邮箱、号码尽享验证
                if(vm.sort=='contacts'){
                    if(obj.field=='Email'){
                        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式;
                        if(!reg.test(obj.value)){return vm.errorMsg(vm.$t('Tips[9]'))}
                    }
                    if(obj.field=='Address1'||obj.field=='Address2'){
                        let reg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
                        if(!reg.test(obj.value)){return vm.errorMsg(vm.$t('Tips[10]'))}
                    }
                }
                if(obj.data.edit=='add'){
                    var data = obj.data;
                }else{
                    var data = obj.data; //得到所在行所有键值,那条数据
                    data.edit = 'update';
                }
                let index, index2;
                $.each(vm.updateGroup, (i, e)=>{
                    if(obj.data.hasOwnProperty("Id")){
                        if(obj.data.Id===e.Id){
                            index = i;
                        }else{
                            return
                        }
                    }else{
                        if(obj.data.id===e.id){
                            index = i;
                        }else{
                            return
                        }
                    }
                })
                if(index>=0){
                    console.log(index);
                    vm.updateGroup.splice(index, 1)
                }
                vm.updateGroup.push(data);
                // 对于一些直接添加在表格中的增加一行的表格，则需要重新绘制一下表格
                if(vm.sort=='hostGroup' ||vm.sort=='devices' ||vm.sort=='contactGroup'|| vm.sort=='contacts'|| vm.sort=='period'||vm.sort=='timedTask') {
                    $.each(vm.Tdata, (j, k)=>{
                        if(obj.data.hasOwnProperty('Id')){
                            if(obj.data.Id==k.Id){
                                index2 = j;
                            }
                        }else{
                            if(obj.data.id==k.id){
                                index2 = j;
                            }
                        }
                        
                    });
                    if(index2>=0){
                        vm.Tdata.splice(index2, 1);
                    }
                    vm.Tdata.push(data);
                    // layui.table.reload(vm.sort, {
                    //     data: vm.Tdata
                    // });
                }
                
                if($('.modifyFlag').find('span').length==0){
                    $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                }

                /********************************** */
                // console.log(this,obj);
                $(this).parent().addClass('change');
                /********************************** */
            });

            /* 监听设备组表格点击事件 并弹出表单框的类型 eg:设置——联系人组 */
            layui.table.on('tool('+vm.sort+')', function(obj){
                // let status = false
                function openLayer(res, obj, shin){
                    let IDDDDDDDDDDDD=new Date().valueOf()
                    let btn = [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")];
                    if(obj.event=="checkOrder"){
                        btn = [vm.$t("Prompt_btn[0]"),vm.$t("Prompt_btn[2]"), vm.$t("Prompt_btn[1]")]
                    }else if(obj.event=="overrunOrder"||obj.event=="recoveryOrder"){
                        btn = []
                    }
                    layui.layer.open({
                        type: 1,
                        title: res[0],
                        area: '550px',
                        shade: [0.5, '#000'],
                        shadeClose: false,
                        content: `
                            <div class="layui-form"><form>${res[1]}<button hidden lay-submit lay-filter="${IDDDDDDDDDDDD}">提交</button> </form></div>
                        `,
                        skin: 'set-Table'+ ' '+shin,
                        success: function(layero,index){
                            layui.form.render();
                            if(vm.sort=="contacts"){
                                layui.laydate.render({
                                    elem: '#sel1',
                                    type: 'time',
                                    format: 'HH:mm'
                                });
                            }
                            layui.form.on('checkbox(allChoose)', function(data){
                                var child = $(data.elem).nextAll('input[type="checkbox"]');
                                child.each(function(index, item){
                                    item.checked = data.elem.checked;
                                });
                                layui.form.render('checkbox');
                            });
                            if(obj.event=="checkOrder"){
                                layero.find('.layui-layer-btn1').addClass('layer_checkOrder_addBtn');
                                layero.find('.layui-layer-btn1').css('background-color', '#007bbb');
                            }
                            form.on('submit('+IDDDDDDDDDDDD+')', function(data){
                                let {field}=data
                                let mapBooleab=[];
                                if(obj.event=="checkOrder"){
                                    for(let i in field){
                                        let input  = /^[\s]*$/;
                                        if(input.test(field[i])){
                                            vm.errorMsg(vm.$t('Tips[11]'));
                                            return false;
                                            break;
                                        }
                                    }
                                }
                                layero.find('input[value="true"]').each((i,el)=> $(el).attr('value') === 'true' && mapBooleab.push($(el).attr('name')))
                                mapBooleab.forEach(key=>!field.hasOwnProperty(key)&&(field[key]=false))
                                // 通过区分函数，实现不同的弹框功能
                                vm.distinguish(obj, field);
                                layui.table.reload(vm.sort, {
                                    data: vm.Tdata
                                });
                                layer.close(index);
                                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                            });
                            
                        },
                        btn: btn,
                        yes: function(index, layero){
                            $('[lay-filter="'+IDDDDDDDDDDDD+'"').click()
                            if($('.modifyFlag').find('span').length==0){
                                $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                            };
                        },
                        btn2: function(){
                            if(obj.event=='checkOrder'){
                                return false;
                            }
                        }
                    });
                }

                // Pretreatment预处理
                if(obj.event == 'setContactgroups'){
                    let res = vm.config[vm.sort].editContactGroups(obj.data, vm.contactsList);
                    openLayer(res, obj, 'setContactgroups');
                }else if(obj.event == 'deviceMore'){
                    let res = vm.config[vm.sort].editMore(obj.data, vm.timeSlot, vm.timeBase);
                    openLayer(res, obj);
                    // 禁止手动输入
                    $('input[type=number]').keypress(function(e) {
                    　　if (!String.fromCharCode(e.keyCode).match(/[0-9]/)) {
                    　　　　return false;
                    　　}
                    });
                }else if(obj.event == 'monitoring'){
                    if(obj.data.hasOwnProperty("Id")){
                        vm.$emit('Monitoring', {hid:obj.data.Id});
                    }
                }else if(obj.event == 'checkOrder'){
                    let res = vm.config[vm.sort].editCheckOrder(obj.data);
                    openLayer(res, obj);
                    checkOrder_add();
                    if($(".layer_checkOrder_block").length==0){
                        $(".layer_checkOrder_deleteBtn").addClass("layui-btn-disabled");
                    }
                    // 对新增按钮的监听
                    function checkOrder_add(){
                        $(".layer_checkOrder_addBtn").unbind();
                        if($(".layer_checkOrder_block").length>=2){
                            $(".layer_checkOrder_addBtn").addClass("layui-btn-disabled");
                            $(".layer_checkOrder_addBtn").unbind();
                            return ;
                        }
                        $(".layer_checkOrder_addBtn").bind('click', ()=>{
                            
                            $(".layer_checkOrder_deleteBtn").removeClass("layui-btn-disabled");

                            let index = $(".layer_checkOrder_block").length;
                            let template = '';
                           
                            template = `
                                <div class="layer_checkOrder_block" style="display: flex; flex-direction: column; justify-content: space-around;">
                                    <p>${index+1}${vm.$t('Table.monitoring.checkOrder_label[0]')}</p>
                                    <div style="display: flex">
                                        <div style="margin: 5px">
                                            <input autocomplete="off"  style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='CheckCommandParameters${index+1}' lay-skin='primary' value='' title='' />
                                        </div>
                                        <i class="layer_checkOrder_deleteBtn layui-icon layui-icon-close-fill" style="cursor: pointer; color: #cc3341; font-size: 34px;"></i>
                                    </div>
                                </div>
                            `
                            
                            $(".layer_checkOrder_content").append(template);
                            if($(".layer_checkOrder_block").length>=2){
                                $(".layer_checkOrder_addBtn").addClass("layui-btn-disabled");
                                $(".layer_checkOrder_addBtn").unbind();
                            }

                            $(".layer_checkOrder_deleteBtn").bind('click', ($event)=>{
                                $($event.target).parent().parent().remove();
                                if($(".layer_checkOrder_block").length<=2 && $(".layer_checkOrder_block").length>=0){
                                    $(".layer_checkOrder_addBtn").removeClass("layui-btn-disabled");
                                    checkOrder_add();
                                }
                            });
                        });
                    }

                    // 对删除按钮的监听
                    $(".layer_checkOrder_deleteBtn").bind('click', ($event)=>{
                        $($event.target).parent().parent().remove();
                        if($(".layer_checkOrder_block").length<=2 && $(".layer_checkOrder_block").length>=0){
                            $(".layer_checkOrder_addBtn").removeClass("layui-btn-disabled");
                            checkOrder_add();
                        }
                    });
                }else if(obj.event == 'serverMore'){
                    let res = vm.config[vm.sort].editMore(obj.data, vm.timeSlot, vm.timeBase);
                    openLayer(res, obj);
                    $('input[type=number]').keypress(function(e) {
                    　　if (!String.fromCharCode(e.keyCode).match(/[0-9]/)) {
                    　　　　return false;
                    　　}
                    });
                }else if(obj.event == 'passive_enabled'){
                    obj.data._PASSIVE_ENABLED=="1"? obj.data._PASSIVE_ENABLED=0 : obj.data._PASSIVE_ENABLED=1
                    obj.data.edit=='add'?"":obj.data.edit = 'update';
                    if(vm.updateGroup.length>0){
                        let index2=null;
                        $.each(vm.updateGroup, (i,e)=>{
                            if(e.Id===obj.data.Id){
                                index2=i
                            }
                        })
                        if(index2!=null){vm.updateGroup.splice(index2, 1)};
                        vm.updateGroup.push(obj.data);
                    }else{
                        vm.updateGroup.push(obj.data);
                    }
                    let index2;
                    $.each(vm.Tdata, (i,e)=>{
                        if(e.Id==obj.data.Id){
                            return index2 = i
                        }
                    })
                    if($('.modifyFlag').find('span').length==0){
                        $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                    }
                    vm.Tdata.splice(index2, 1, obj.data)
                    vm.renderTable(vm.Tdata);
                }else if(obj.event == 'chanewpwdostgroups'){
                    layui.form.on('select(oldpwd)', function(data){
                        obj.data.Hostgroups = [{renewpwd: data.value}];
                        obj.data.edit = 'update';
                        vm.updateGroup.push(obj.data);
                    });
                }else if(obj.event == 'timedNoti'){
                    let res = vm.config[vm.sort].editTimedNoti(obj.data);
                    openLayer(res, obj);
                }else if(obj.event == 'contactsMore'){
                    vm.contactsMore(obj.data, obj.tr);
                }else if(obj.event.indexOf('setPeriod')>=0){
                    vm.setPeriod(obj);
                }else if(obj.event == 'selectChange'){
                    // 监听下拉选择框的事件
                    layui.form.on('select', function(data){
                        if(obj.data[data.elem.name]==data.value){
                            return;
                        }else{
                            // 筛选一下是否有重复
                            let index, index2;
                            if(vm.updateGroup.length>0){
                                $.each(vm.updateGroup, (i, e)=>{
                                    if(e.hasOwnProperty('Id')){
                                        if(e.Id==obj.data.Id){
                                            index = i;
                                        }
                                    }else{
                                        if(e.id==obj.data.id){
                                            index = i;
                                        }
                                    }
                                })
                            }
                            if(Number(index)>=0){
                                // obj.data = '';
                                // obj.data = vm.updateGroup[index];
                                vm.updateGroup.splice(index, 1);
                            }
                           
                            //修改
                            if(vm.sort=='devices'){
                                let key = data.elem.name;
                                // obj.update({
                                //     key: [{Id: data.value}]
                                // });
                             
                                obj.data.hostgroups = [];
                                obj.data.hostgroups.push(data.value);
                            }else{
                                obj.data[data.elem.name] = data.value;
                            }

                            $.each(vm.Tdata, (i,e)=>{
                                if(e.Id==obj.data.Id){
                                    return index2 = i
                                }
                            })
                            obj.data.edit=='add'?"":obj.data.edit = 'update'
                            vm.Tdata.splice(index2, 1, obj.data)
                            $(obj.tr).addClass('change')
                            if(vm.sort!='devices'){
                                layui.table.reload(vm.sort,{
                                    data: vm.Tdata
                                })
                            }
                            // 加入到更新数组
                            console.log(obj.data.Hostgroups);
                            vm.updateGroup.push(obj.data);
                            if($('.modifyFlag').find('span').length==0){
                                $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                            }
                            obj = '';
                        }
                    });
                }else if(obj.event == 'cycle'){
                    let opts = {
                        type: 1,
                        title: vm.$t('Table.Box.Cell.timedTask.cycle.title'),
                        area: ['700px', '350px'],
                        shadeClose: true,
                        btn: [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")],
                        content: $('#timedTaskIds'),
                        skin: 'set-Table',
                        shade:[0.5, '#000'],
                        success: function (layero, index){
                            // 初始化选项
                            let initOpts={
                                'Repeat': obj.data.Repeat?'true':'false',
                                'Monday': obj.data.Repeat?obj.data.Monday:false,
                                'Tuesday': obj.data.Repeat?obj.data.Tuesday:false,
                                'Wednesday': obj.data.Repeat?obj.data.Wednesday:false,
                                'Thursday': obj.data.Repeat?obj.data.Thursday:false,
                                'Friday': obj.data.Repeat?obj.data.Friday:false,
                                'Saturday': obj.data.Repeat?obj.data.Saturday:false,
                                'Sunday': obj.data.Repeat?obj.data.Sunday:false,
                                'ExecuteDate': obj.data.Repeat?'':obj.data.ExecuteDate
                            }
                            layui.form.val('timedTaskIds', initOpts);
                            if(!obj.data.Repeat){
                                $('#timedTaskIds .timedTask-week input').attr('disabled', 'true');
                                $('#timedTaskIds .timedTask-week .layui-unselect').addClass('layui-checkbox-disbaled');
                                $('#timedTaskIds .timedTask-week .layui-unselect').addClass('layui-disabled');
                            }else{
                                $('#timedTaskIds .timedTask-once input').attr('disabled', 'true');
                                $('#timedTaskIds .timedTask-once .layui-unselect').addClass('layui-checkbox-disbaled');
                                $('#timedTaskIds .timedTask-once .layui-unselect').addClass('layui-disabled');
                            }

                            // 为了渲染 单选框 和 日期选择器
                            layui.form.render();
                            layui.laydate.render({
                                elem: '#timedTaskLaydata'
                            });
                            
                            // 监听 执行周期的选择
                            vm.$nextTick(()=>{
                                layui.form.on('radio(timedTask-Ids)', function(data){
                                    if(data.value=='false'){
                                        $('#timedTaskIds .timedTask-week input').attr('disabled', 'true');
                                        $('#timedTaskIds .timedTask-week .layui-unselect').addClass('layui-checkbox-disbaled');
                                        $('#timedTaskIds .timedTask-week .layui-unselect').addClass('layui-disabled');
                                        
                                        $('#timedTaskIds .timedTask-once input').removeAttr('disabled');
                                        $('#timedTaskIds .timedTask-once .layui-unselect').removeClass('layui-checkbox-disbaled');
                                        $('#timedTaskIds .timedTask-once .layui-unselect').removeClass('layui-disabled');
                                    }else{
                                        $('#timedTaskIds .timedTask-once input').attr('disabled', 'true');
                                        $('#timedTaskIds .timedTask-once .layui-unselect').addClass('layui-checkbox-disbaled');
                                        $('#timedTaskIds .timedTask-once .layui-unselect').addClass('layui-disabled');

                                        $('#timedTaskIds .timedTask-week input').removeAttr('disabled');
                                        $('#timedTaskIds .timedTask-week .layui-unselect').removeClass('layui-checkbox-disbaled');
                                        $('#timedTaskIds .timedTask-week .layui-unselect').removeClass('layui-disabled');
                                    }
                                })
                            });
                        },
                        yes: function(index, layero){
                            let list = layero.find('form').serializeArray();
                            let repeat = layero.find('input:radio[name="Repeat"]:checked').val();
                            obj.data.Repeat = JSON.parse(repeat);
                            if(repeat=='true'){
                                //更新表格数据
                                obj.update({
                                    Repeat: JSON.parse(repeat),
                                    Monday:layero.find('input:checkbox[name="Monday"]:checked').val()?true:false,
                                    Tuesday: layero.find('input:checkbox[name="Tuesday"]:checked').val()?true:false,
                                    Wednesday: layero.find('input:checkbox[name="Wednesday"]:checked').val()?true:false,
                                    Thursday: layero.find('input:checkbox[name="Thursday"]:checked').val()?true:false,
                                    Friday: layero.find('input:checkbox[name="Friday"]:checked').val()?true:false,
                                    Saturday : layero.find('input:checkbox[name="Saturday"]:checked').val()?true:false,
                                    Sunday:layero.find('input:checkbox[name="Sunday"]:checked').val()?true:false
                                });
                                //更新数据，以便提交
                                obj.data.Monday = layero.find('input:checkbox[name="Monday"]:checked').val()?true:false;
                                obj.data.Tuesday = layero.find('input:checkbox[name="Tuesday"]:checked').val()?true:false;
                                obj.data.Wednesday = layero.find('input:checkbox[name="Wednesday"]:checked').val()?true:false;
                                obj.data.Thursday = layero.find('input:checkbox[name="Thursday"]:checked').val()?true:false;
                                obj.data.Friday = layero.find('input:checkbox[name="Friday"]:checked').val()?true:false;
                                obj.data.Saturday = layero.find('input:checkbox[name="Saturday"]:checked').val()?true:false;
                                obj.data.Sunday = layero.find('input:checkbox[name="Sunday"]:checked').val()?true:false
                            }else{
                                obj.update({
                                    Repeat: JSON.parse(repeat),
                                    ExecuteDate : layero.find('input:text[name="ExecuteDate"]').val()?layero.find('input:text[name="ExecuteDate"]').val():'2017-11-11',
                                });
                                obj.data.ExecuteDate = layero.find('input:text[name="ExecuteDate"]').val()?layero.find('input:text[name="ExecuteDate"]').val():'2017-11-11';
                            }
                            obj.data.edit=='add'?'':obj.data.edit = 'update';
                            
                            if(vm.updateGroup.length>0){
                                let index2=null;
                                $.each(vm.updateGroup, (i,e)=>{
                                    if(e.Id===obj.data.Id){
                                        index2=i
                                    }
                                })
                                if(index2!=null){vm.updateGroup.splice(index2, 1)};
                            }
                            vm.updateGroup.push(obj.data);
                            if($('.modifyFlag').find('span').length==0){
                                $('.modifyFlag').append('<span class="layui-badge-dot"></span>');
                            }
                            vm.Tdata.forEach((el)=>{
                                if(obj.data.hasOwnProperty('Id')){
                                    if(el.Id == obj.data.Id){
                                        for(let key in obj.data){
                                            el[key] = obj.data[key];
                                        }
                                    }
                                }else{
                                    if(el.id == obj.data.id){
                                        for(let key in obj.data){
                                            el[key] = obj.data[key];
                                        }
                                    }
                                }
                            })
                            layui.table.reload(vm.sort,{
                                data: vm.Tdata
                            })
                            $(obj.tr).addClass('change')
                            layer.close(index);
                        },
                        end() {
                            $('#timedTaskIds form')[0].reset();
                        }
                    }
                    layer.open(opts);
                }else if(obj.event == 'timedTaskOrder'){
                    let cell = obj.tr;
                    if(obj.data.hasOwnProperty("actions")){
                        $.each(obj.data.actions, (i, e)=>{
                            vm.timedTaskOrder.filter(item=>{
                                if(item.hasOwnProperty("Id")){
                                    if(item.Id===e.Id){
                                        item.LAY_CHECKED = true
                                    }
                                }
                            });
                        })
                    }

                    let opts = {
                        type: 0,
                        title: vm.$t('Table.Box.Cell.timedTask.order.title'),
                        area: '700px',
                        shadeClose: true,
                        btn: [vm.$t("Prompt_btn[0]"), vm.$t("Prompt_btn[1]")],
                        skin: 'set-Table',
                        shade:[0.5, '#000'],
                        content: `<table id="timedTaskOrderBox"></table>`,
                        success: function(){
                            layui.table.render({
                                elem: '#timedTaskOrderBox',
                                data: vm.timedTaskOrder,
                                cols: [[ 
                                    {type:'checkbox'},
                                    {field: 'Name', title: vm.$t('Table.Box.Cell.timedTask.order.table_th[0]'), width: '20%'},
                                    {field: 'host', title: vm.$t('Table.Box.Cell.timedTask.order.table_th[1]'), width: '20%'},
                                    {field: 'RawCommand', title: vm.$t('Table.Box.Cell.timedTask.order.table_th[2]')}
                                ]]
                            });
                        },
                        yes: function(index, layero){
                            let orderChecked = layui.table.checkStatus('timedTaskOrderBox'), index2;
                            obj.data.actions = orderChecked.data;
                            obj.update({
                                actions: orderChecked.data
                            });
                            
                            $.each(vm.Tdata, (j, k)=>{
                                if(obj.data.hasOwnProperty('Id')){
                                    if(obj.data.Id==k.Id){
                                        index2 = j;
                                    }
                                }else{
                                    if(obj.data.id==k.id){
                                        index2 = j;
                                    }
                                }
                                
                            });
                            if(index2>=0){
                                vm.Tdata.splice(index2, 1, obj.data);
                            }

                            obj.data.edit=='add'?'':obj.data.edit = 'update';

                            if(vm.updateGroup.length>0){
                                let index2=null;
                                $.each(vm.updateGroup, (i,e)=>{
                                    if(e.Id===obj.data.Id){
                                        index2=i
                                    }
                                })
                                if(index2!=null){vm.updateGroup.splice(index2, 1)};
                                
                            }
                            $(cell).addClass('change')
                            vm.updateGroup.push(obj.data);
                            if($('.modifyFlag').find('span').length==0){
                                $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                            }
                            layer.close(index);
                        },
                        end(){
                            // 将执行命令的表格复原
                            $.each(vm.timedTaskOrder, (i, e)=>{
                                e.LAY_CHECKED = false;
                            })
                        }
                    }
                    layui.layer.open(opts);
                }else if(obj.event == 'timedTaskEnabled'){
                    obj.data.Enabled==true? obj.data.Enabled=false : obj.data.Enabled=true
                    obj.data.edit=='add'?'':obj.data.edit = 'update';
                    
                    if(vm.updateGroup.length>0){
                        let index2=null;
                        $.each(vm.updateGroup, (i,e)=>{
                            if(e.Id===obj.data.Id){
                                index2=i
                            }
                        })
                        if(index2!=null){vm.updateGroup.splice(index2, 1)};
                        
                    }
                    vm.updateGroup.push(obj.data);
                    if($('.modifyFlag').find('span').length==0){
                        $('.modifyFlag').append('<span class="layui-badge-dot"></span>');
                    }
                    let index2;
                    $.each(vm.Tdata, (i,e)=>{
                        if(e.Id==obj.data.Id){
                            return index2 = i
                        }
                    })
                    vm.Tdata.splice(index2, 1, obj.data)
                    vm.renderTable(vm.Tdata);
                }else if(obj.event == 'overrunOrder'){
                    vm.$http.get(encodeURI('/api/v1/linkage/command?lid='+obj.data.Id+'&type='+1))
                    .then((res)=>{
                        let temp = vm.config[vm.sort].editOverrun(res.body.data.actions)
                        openLayer(temp, obj);
                    })
                }else if(obj.event == 'recoveryOrder'){
                    vm.$http.get('/api/v1/linkage/command?lid='+obj.data.Id+'&type='+2)
                    .then((res)=>{
                        let temp = vm.config[vm.sort].editOverrun(res.body.data.actions)
                        openLayer(temp, obj);
                    })
                }else if(obj.event == 'extendHosts'){
                    // vm.$emit('extendHosts', 'hello,world!', this)
                    let res = vm.config[vm.sort].extend(obj.data);
                    openLayer(res, obj);
                }else if(obj.event == 'bgEdit'){
                    if(obj.data.hasOwnProperty("Id")){
                        let url = window.location.protocol + "//" + window.location.host + "/public/ui/ve/index.html?EDIT_MODE=true&hostgroup="+obj.data.Name;
                        window.open(encodeURI(url), '_blank');
                    }
                }
            })
            // 监听表格复选
            layui.table.on('checkbox('+vm.sort+')', function(obj){
                var data = layui.table.checkStatus(vm.sort);
                vm.currentObj=data.data;
            });
        },
        /*****************************************************************************************************************************/
        // 区分弹框
        distinguish(obj, data) {
            function isEmptyObject(obj) {   
            　　for (var key in obj){
            　　　　return false;//返回false，不为空对象
            　　}　　
            　　return true;//返回true，为空对象
            }
            let vm = this;
            if( obj.event == 'setContactgroups' ){
                if(isEmptyObject(data)){
                    vm.errorMsg(vm.$t('Tips[12]'))
                    return false;
                }else{
                    let contact = [];
                    for(let key in data){
                        if(key!="allCheckBox"){
                            contact.push({Name: key, Id: data[key]});
                        }
                    };
                    if(vm.sort=='contacts'){
                        $.each(vm.Tdata, (i,e)=>{
                           if(obj.data.hasOwnProperty('Id')){
                                if(e.Id==obj.data.Id){
                                    obj.data.edit=='add'?"":e.edit = 'update';
                                    let index;
                                    $.each(vm.updateGroup, (i, e)=>{
                                        if(obj.data.hasOwnProperty('Id')){
                                            if(e.id==obj.data.Id){
                                                index = i;
                                            }
                                        }else{
                                            if(e.id==obj.data.id){
                                                index = i;
                                            }
                                        }
                                    })
                                    if(index>=0){
                                        vm.updateGroup.splice(index, 1)
                                    }
                                    for(let key in data){
                                        e.ContactGroups.push({Id: data[key]});
                                    };
                                    e.ContactGroups = contact;
                                    vm.updateGroup.push(e);
                                }
                             }else{
                                if(e.id==obj.data.id){
                                    obj.data.edit=='add'?"":e.edit = 'update';
                                    let index;
                                    $.each(vm.updateGroup, (i, e)=>{
                                        if(e.id==obj.data.id){
                                            index = i;
                                        }
                                    })
                                    if(index>=0){
                                        vm.updateGroup.splice(index, 1)
                                    }
                                    for(let key in data){
                                        e.ContactGroups.push({Id: data[key]});
                                    };
                                    e.ContactGroups = contact;
                                    vm.updateGroup.push(e);
                                }
                            }
                        })
                    }else{
                        $.each(vm.Tdata, (i,e)=>{
                            if(e.Id==obj.data.Id){
                                obj.data.edit=='add'?"":e.edit = 'update';
                                let index;
                                $.each(vm.updateGroup, (i, e)=>{
                                    if(obj.data.hasOwnProperty('Id')){
                                        if(e.id==obj.data.Id){
                                            index = i;
                                        }
                                    }else{
                                        if(e.id==obj.data.id){
                                            index = i;
                                        }
                                    }
                                })
                                if(index>=0){
                                    vm.updateGroup.splice(index, 1)
                                }
                                e.Contactgroups = contact;
                                vm.updateGroup.push(e);
                            }
                        })
                    }
                }
            }else if(obj.event == 'deviceMore'){
                for(let key in data){
                    if("CheckInterval"==key || key=="NotificationInterval"){
                        obj.data[key] = data[key]/vm.timeBase;
                    }else{
                        obj.data[key] = data[key];
                    }
                }
                let index2;
                $.each(vm.Tdata, (i,e)=>{
                    if(e.Id==obj.data.Id){
                        return index2 = i
                    }
                })
                vm.Tdata.splice(index2, 1, obj.data)
                vm.renderTable(vm.Tdata);
                obj.data.edit = 'update';
                if(vm.updateGroup.length>0){
                    let index2=null;
                    $.each(vm.updateGroup, (i,e)=>{
                        if(e.Id===obj.data.Id){
                            index2=i
                        }
                    })
                    if(index2!=null){vm.updateGroup.splice(index2, 1)};
                    vm.updateGroup.push(obj.data);
                }else{
                    vm.updateGroup.push(obj.data);
                }
            }else if(obj.event == 'checkOrder'){
                let order = [];
                /******** */
                if(data.hasOwnProperty('min')){
                    order.push(data['min']+','+data['max'])
                }
                if(data.hasOwnProperty('CheckCommandParameters')){
                    let value = data['CheckCommandParameters']
                    if(value.indexOf('，')>=0 || value.indexOf(',') >= 0){
                        order.push(value.replace(/，/, ','))
                    }else{
                        order.push(value);
                    }
                }
                if(data.hasOwnProperty('CheckCommandParameters1')){
                    let value = data['CheckCommandParameters1']
                    if(value.indexOf('，')>=0 || value.indexOf(',') >= 0){
                        order.push(value.replace(/，/, ','))
                    }else{
                        order.push(value);
                    }
                    
                }
                if(data.hasOwnProperty('CheckCommandParameters2')){
                    let value = data['CheckCommandParameters2']
                    if(value.indexOf('，')>=0 || value.indexOf(',') >= 0){
                        order.push(value.replace(/，/, ','))
                    }else{
                        order.push(value);
                    }
                }
                $.each(vm.Tdata, (i,e)=>{
                    if(e.Id==obj.data.Id){
                        e.edit = 'update';
                        e.CheckCommandParameters = [];
                        e.CheckCommandParameters = order;

                        if(vm.updateGroup.length>0){
                            let index2=null;
                            $.each(vm.updateGroup, (i,e)=>{
                                if(e.Id===obj.data.Id){
                                    index2=i
                                }
                            })
                            if(index2!=null){vm.updateGroup.splice(index2, 1)};
                        }
                        vm.updateGroup.push(e);
                    }
                })
                /********** */

            }else if(obj.event == 'serverMore'){
                for(let key in data){
                    if("NormalCheckInterval"==key || key=="NotificationInterval"){
                        obj.data[key] = data[key]/vm.timeBase;
                    }else{
                        obj.data[key] = data[key];
                    }
                }
                obj.data.edit = 'update';
                let index1, index2;
                $.each(vm.Tdata, (i,e)=>{
                    if(e.Id==obj.data.Id){
                        return index1 = i
                    }
                })
                vm.Tdata.splice(index1, 1, obj.data)
                vm.renderTable(vm.Tdata);
                
                if(vm.updateGroup.length>0){
                    index2=null;
                    $.each(vm.updateGroup, (i,e)=>{
                        if(e.Id===obj.data.Id){
                            index2=i
                        }
                    })
                }
                if(index2!=null){
                    vm.updateGroup.splice(index2, 1)
                }
                vm.updateGroup.push(obj.data);
            }else if(obj.event == 'timedNoti'){
                for(let key in data){
                    if(key=='_SMS_NOTIFY_ENABLE'){
                        if(data[key]=='true'){
                            obj.data[key] = 'on'
                        }else{
                            obj.data[key] = 'off'
                        }
                    }else{
                        obj.data[key] = data[key];
                    }
                }
                obj.data.edit=='add'?'':obj.data.edit = 'update';
                if(vm.updateGroup.length>0){
                    let index2=null;
                    $.each(vm.updateGroup, (i,e)=>{
                        if(obj.data.hasOwnProperty('Id')){
                            if(e.Id===obj.data.Id){
                                index2=i
                            }
                        }else{
                            if(e.id===obj.data.id){
                                index2=i
                            }
                        }
                    })
                    if(index2>=0){vm.updateGroup.splice(index2, 1)};
                };
                vm.updateGroup.push(obj.data);
                vm.Tdata.forEach((el)=>{
                    if(obj.data.hasOwnProperty('Id')){
                        if(el.Id==obj.data.Id){
                            for(let key in obj.data){
                                el[key] = obj.data[key];
                            }
                        }
                    }else if(el.id==obj.data.id){
                        for(let key in obj.data){
                            el[key] = obj.data[key];
                        }
                    }
                })
            }
        },
        // 加载时间间隔等参数
        loadTime() {
            var another = this;
            this.$http.get('/config/rest/Timeperiods')
            .then((res)=>{
                this.timeSlot = res.body;
            });
            this.$http.get('/com/setting/global')
            .then((res)=>{
                this.timeBase = res.body.data.IntervalLength
            })
        },
        // 分页函数
        tablepage(count){
            let vm = this;
            let opts = {
                elem: this.laypageId,
                limit: 10,
                theme: "#36a1f2",
                first: vm.$t('laypage[0]'),
                layout: ['prev', 'page', 'next', 'skip', 'count'],
                last: vm.$t('laypage[1]'),
                prev: "<em>"+vm.$t('laypage[2]')+"</em>",
                next: "<em>"+vm.$t('laypage[3]')+"</em>",
                count: count,
                curr: vm.curr,
                jump: function(obj, first){
                    if(!first){
                        vm.curr = obj.curr;
                        (vm.sort=='devices'||vm.sort=='monitoring')?vm.getTableData(obj.curr, vm.curParams):vm.getTableData(obj.curr);
                    }
                }
            }
            vm.$nextTick(function(){
                layui.laypage.render(opts);
            });
        },
        // 错误提示
        errorMsg(msg, second) {
            layui.layer.open({
                type: 1,
                offset: 'rt',
                title: '',
                // content: '<img src="/public/images/currency/shield_error.ico"/>'+msg,
                content: msg,
                btn: '',
                skin: 'errorMsg',
                shade: 0,
                time: second?second:3000,
                closeBtn:0,
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
        // 成功提示
        successMsg(msg) {
            layui.layer.open({
                type: 1,
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
        /******************************************************************************************* */
        /* 监控项tab调用总函数 */
        renderMonitoring(params){
            this.curr = 1; // 将分页调回 第一页
            this.getContactgroup();
            this.getTableData('', params);
            this.loadTime();
        },
        /* 设备tab调用总函数 */
        renderDevice() {
            this.curr = 1; // 将分页调回 第一页
            this.getHosts()
            this.getTableData();
            
            this.getDevices();
            this.loadTime();
        },
        /*****************设备设置************************************************************************ */
        /* 设备设置中 设备组设置新增弹出框... */
        // 获取设备列表
        getDevices() {
             // 获取设备列表数据
            let vm = this;
            var i = 0, j, k, l, sorts = [], flag;
            this.$http.get('/api/v1/setting/host/template')
            .then((res)=>{
                let x = res.body;
                if(x.status){
                    vm.cell = x.data;
                    for (i = 0; i < x.data.length; i++) {
                        flag = true;
                        for (j = 0; j < sorts.length; j++) {
                            if (sorts[j].Name == x.data[i].Subjects[0]) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            sorts.push({
                                Name: x.data[i].Subjects[0],
                                sorts: [{
                                    Name: x.data[i].Subjects[1],
                                    sorts: [{
                                        Name: x.data[i].Subjects[2],
                                        sorts: [[i, x.data[i].Subjects[3]]]
                                    }]
                                }]
                            });
                        } else {
                            flag = true;
                            for (k = 0; k < sorts[j].sorts.length; k++) {
                                if (sorts[j].sorts[k].Name == x.data[i].Subjects[1]) {
                                    flag = false;
                                    break;
                                }
                            }
                            if (flag) {
                                sorts[j].sorts.push({
                                    Name: x.data[i].Subjects[1],
                                    sorts: [{
                                        Name: x.data[i].Subjects[2],
                                        sorts: [[i, x.data[i].Subjects[3]]]
                                    }]
                                });
                            } else {
                                flag = true;
                                for (l = 0; l < sorts[j].sorts[k].sorts.length; l++) {
                                    if (sorts[j].sorts[k].sorts[l].Name == x.data[i].Subjects[2]) {
                                        flag = false;
                                        break;
                                    }
                                }
                                if (flag) {
                                    sorts[j].sorts[k].sorts.push({
                                        Name: x.data[i].Subjects[2],
                                        sorts: [[i, x.data[i].Subjects[3]]]
                                    });
                                } else {
                                    sorts[j].sorts[k].sorts[l].sorts.push([i, x.data[i].Subjects[3]]);
                                }
                            }
                        }
                    }
                    vm.sorts = sorts;
                }
            });
        },
        // 设备管理——新增弹出框、 点击确认 执行添加设备指令
        addItem() {
            let vm = this;
            layer.open({
                type: 1,
                // skin: 'addDevices',
                skin: 'set-Table',
                title: vm.$t('Table.Box.Add.device.title'),
                area:   ['1024px', '450px'],
                btn:[vm.$t('Prompt_btn[0]'), vm.$t('Prompt_btn[1]')],
                shadeClose: true, 
                content: $('.addDeviceBox'),
                shade:[0.5, '#000'],
                success: function(){
                    vm.$nextTick(()=>{
                        layui.form.on('checkbox(selectAll)', function(data){
                            var child = $(data.elem).parent().parent().parent().nextAll().find('input[type="checkbox"]');
                            child.each(function(index, item){
                                item.checked = data.elem.checked;
                            });
                            layui.form.render('checkbox');
                        });
                        layui.form.render('checkbox');
                    });
                },
                yes: function(index, layero) {
                    var bkb = $(".layui-layer-content .C tbody tr"), i, j, k, l, code, A, B, C, flag = true;
                    if(bkb.length<=0){
                        layer.msg(vm.$t('Tips[13]'),{time:2000}); 
                        return false;
                    }
                    for (i = 0; i < bkb.length; i++) {
                        A = bkb[i].childNodes[3].getAttribute("code") ? bkb[i].childNodes[3].getAttribute("code").split(",") : [];
                        B = bkb[i].childNodes[5].getAttribute("code") ? bkb[i].childNodes[5].getAttribute("code").split(",") : [];
                        C = parseInt(bkb[i].childNodes[0].getAttribute("hostid"));
                        code = {
                            Id: C,
                            Number: parseInt(bkb[i].querySelector("input[type='number']").value),
                            Contactgroups: [],
                            Hostgroups: [parseInt(bkb[i].querySelector("select").value)],
                            HostnameRelatedCommands: []
                        };
                        for (j = 0; j < A.length; j++) {
                            for (k = 0; k < app.cell.length; k++) {
                                if (app.cell[k].Id == C) {
                                    break;
                                }
                            }
                            for (l = 0; l < app.cell[k].HostnameRelatedCommands.length; l++) {
                                if (app.cell[k].HostnameRelatedCommands[l].Id == parseInt(A[j])) {
                                    code.HostnameRelatedCommands.push(app.cell[k].HostnameRelatedCommands[l]);
                                }
                            }
                        }
                        
                        if (B.length > 0) {
                            for (j = 0; j < B.length; j++) {
                                code.Contactgroups.push(parseInt(B[j]));
                            }
                            vm.$http.post('/api/v1/setting/host/template/copy', {newHosts: [code]})
                            .then((y)=>{
                                if (y.body.status) {
                                    let tempData;
                                    tempData = vm.config[vm.sort].format(y.body.data, vm.hostgroup, vm.contactsList);
                                    $.each(tempData, (i,e)=>{
                                        e.edit = 'add';
                                        e.id = Math.random()*10000;
                                        vm.updateGroup.push(e);
                                    })
                                    vm.Tdata = tempData.concat(vm.Tdata);
                                    layui.table.reload(vm.sort, {
                                        data: vm.Tdata
                                    });
                                    if($('.modifyFlag').find('span').length==0){
                                        $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                                    }
                                    layui.layer.close(index);
                                    return;
                                } else {
                                    alert(y.body.msg);
                                    return;
                                }
                            });
                        } else {
                            flag = false;
                        }
                    }
                    if (flag) {
                        layui.layer.close(index);
                    } else {
                        vm.errorMsg(vm.$t('Table.Box.Add.device.tips[0]'));
                    }
                }
            });
        },
        
        // 设备管理——设备列表展开 
        spread(x) {
            if(x.target.nodeName != "SPAN"){
                $(x.target).siblings().slideToggle("slow").parent().toggleClass("active")
                .siblings().removeClass("active").find("ul").slideUp("slow");
            }else{
                $(x.target).parent().siblings().slideToggle("slow").parent().toggleClass("active")
                .siblings().removeClass("active").find("ul").slideUp("slow");
            }
            
        },
        // 设备管理——穿梭框向右添加设备
        aDevice() {
            let vm = this;
            var bkb = $(".A input[type='checkbox']"), i = 0, Ediost = [], one, two, code = '', code2 = '';
            
            for (; i < bkb.length; i++) {
                if (bkb[i].checked) {
                    one = parseInt($(bkb[i]).attr("sortid"));
                    two = $(bkb[i]).parent()[0].textContent;
                    Ediost.push([one, two]);
                    bkb[i].checked=false;
                    $(bkb[i]).attr("disabled","disabled").parents("label").attr("disabled","disabled");
                }
            }
            //右边表格中机房组下拉选框，
                for (i = 0; i < vm.hostgroup.length; i++) {
                    code2 += '<option value=' + vm.hostgroup[i].Id + '>' + vm.hostgroup[i].Name + '</option>';
                }
                for (i = 0; i < Ediost.length; i++) {
                    code += '<tr><td hostId=' + vm.cell[Ediost[i][0]].Id + ' mark='+Ediost[i][0]+'><input type="checkbox" lay-skin="primary"></td><td>'
                        + Ediost[i][1] + '</td><td><input type="number" class="inputNumber" value="1" min="1"></td>';
                    if (vm.cell[Ediost[i][0]].HostnameRelatedCommands.length > 0) {
                        code += `<td><span class="glyphicon glyphicon-edit" onclick="app.selNotification(this,'${Ediost[i][0]}')"></span></td>`;
                    } else {
                        code += '<td></td>';
                    }
                    code += '<td><select class="form-control">' + code2 + '</select></td>' +
                        '<td><span class="glyphicon glyphicon-edit" onclick="app.selContactgroup(event)"></span></td></tr>';
                }
            $(".C tbody").append(code);
            layui.form.render()
        },
        // 设备管理——穿梭框向左移除设备
        rDevice() {
            var bkb = $(".C tbody input[type='checkbox']"), i = 0,j,mkb=$(".A .tit"),b=[];
            for (; i < bkb.length; i++) {
                if (bkb[i].checked){
                    b.push($(bkb[i]).parent().attr("mark"));
                    $(bkb[i]).parents("tr").remove();
                }
            }
            for(j=0;j<b.length;j++){
                for(i=0;i<mkb.length;i++){
                    if($(mkb[i]).attr("sortid")==b[j]){
                        $(mkb[i]).removeAttr("disabled").parents("label").removeAttr("disabled");
                    }
                }
            }
            layui.form.render();
        },
        // 设备管理——选取联系人组
        selContactgroup(mc) {
            var vm = this, i = 0, j, txt = Common.zGetNode(mc, "TD").textContent.split("，") || "", inHTML = "<ul class='Z1 layui-form'>";
            inHTML += `<li><input type="checkbox" lay-skin="primary" name="allCheckBox" lay-filter="allChoose" title="全选"></li> <hr>`
            inHTML += `<div style="display: flex; flex-wrap:wrap" class="ContactGroups-box">`
            for (; i < vm.contactsList.length; i++) {
                inHTML += `<li><input type="checkbox" name="${vm.contactsList[i].Id}" lay-skin="primary" title="${vm.contactsList[i].Name}" ctsid="${vm.contactsList[i].Id}" `;
                for (j = 0; j < txt.length; j++) {
                    inHTML += txt[j] == vm.contactsList[i].Name ? 'checked' : "";
                }
                inHTML += '></li>';
            }
            inHTML += `</div>`
            inHTML += '</ul>';
            layui.layer.open({
                type: 1,
                title: vm.$t('Table.Box.Add.contactGroup.title'),
                area: ['545px', '250px'],
                shadeClose: true, 
                content: inHTML,
                btn:[vm.$t('Prompt_btn[0]'), vm.$t('Prompt_btn[1]')],
                skin: 'set-Table',
                shade:[0.5, '#000'],
                success() {
                    vm.$nextTick(()=>{
                        layui.form.on('checkbox(allChoose)', function(data){
                            var child = $(data.elem).parent().nextAll().find('input[type="checkbox"]');
                            child.each(function(index, item){
                                item.checked = data.elem.checked;
                            });
                            layui.form.render('checkbox');
                        });
                        layui.form.render();
                    });
                },
                yes: function(index, layer) {
                    var bkb = $(".Z1 input[type='checkbox']"), i = 0, code2 = [], code3 = '', code = [];
                    for (; i < bkb.length; i++) {
                        if(bkb[i].name!="allCheckBox"){
                            if (bkb[i].checked) {
                                code.push($(bkb[i]).attr("ctsid"));
                                code2.push($(bkb[i]).parent().text());
                            }
                        }
                    }
                    if (code2.length > 0) {
                        for (i = 0; i < code2.length; i++) {
                            code3 += '<span>' + code2[i] + '</span>';
                            code3 += i != code2.length - 1 ? "，" : "";
                        }
                        code3 += '<span class="glyphicon glyphicon-edit" style="margin-left: 5px;"  onclick="app.selContactgroup(event)"></span>';
                        $(Common.zGetNode(mc, "TD")).addClass("xg").attr("code", code);
                        $(Common.zGetNode(mc, "TD")).html(code3);
                        layui.layer.close(index);
                    } else {
                        alert(vm.$t('Table.Box.Add.contactGroup.tips[0]')+"!");
                    }
                    layui.layer.close(index);
                }
            });
        },
        // 设备管理——关联命令
        selNotification(dom, num) {
            let vm = this, data = []; 
            for (let i=0; i < vm.cell[num].HostnameRelatedCommands.length; i++) {
                data.push(vm.cell[num].HostnameRelatedCommands[i]);
            }
            let opt = {
                type: 1,
                title: vm.$t('Table.Box.Add.device.selNotification.title'),
                content: `<div id="selNotification" style="overflow: hidden"></div>`,
                area: ['546px', '319px'],
                btn: [vm.$t('Prompt_btn[0]'), vm.$t('Prompt_btn[1]')],
                skin: 'set-Table',
                shade:[0.5, '#000'],
                success() {
                    layui.table.render({
                        elem: '#selNotification',
                        data: data,
                        cols: [[ 
                            {type: "checkbox",align: "center"},
                            {field: 'Name', title: vm.$t('Table.Box.Add.device.selNotification.table_td[0]'), align: "center"},
                        ]]
                    });
                },
                yes(index, layero) {
                    let check = layui.table.checkStatus('selNotification')
                    let code = []
                    check.data.forEach((e, i)=>{
                        code.push(e.Id);
                    });
                    $(dom).parent().attr('code', code)
                    layui.layer.close(index);
                }
            }
            layer.open(opt);
        },
        // 设备管理——批量管理 应用对象和参考对象点击执行函数
        changeBtnClick(index) {
            let tem = this.batchTemp.temp.splice(index, 1);
            this.batchTemp.temp.unshift(tem[0]);
        },
        // 
        batch(){
            let vm = this, content, submitBtn;
            let data = this.currentObj;
            if(data.length<2){
                this.errorMsg(vm.$t('Tips[7]'));
                return;
            }
            if(this.sort=="monitoring"){
                this.batchTemp.nec = this.batchTemp.nec2;
                content = $('#batchBox2')
                submitBtn = 'batchBox2'
            }else if(this.sort == "linkage"){
                content = $('#batchBox3');
                submitBtn = 'batchBox33'
            }else{
                content = $('#batchBox');
                submitBtn = 'batchBox'
            }
            layui.layer.open({
                type: 1,
                title: vm.$t('Table.Box.Batch.title'),
                content: content,
                area: ['546px', '319px'],
                btn: [vm.$t('Prompt_btn[0]'), vm.$t('Prompt_btn[1]')],
                skin: 'set-Table',
                shade:[0.5, '#000'],
                success: function(layero, index) {
                    layui.form.val("batchBox3", {
                        "WorkValue": vm.currentObj[0].WorkValue,
                        "LimitValue": vm.currentObj[0].LimitValue,
                    }),
                    layui.form.on('submit('+submitBtn+')', function(data){
                        let {field} = data;
                        let refer = null
                        // 找到参考对象
                        $.each(vm.currentObj, (i, e)=>{
                            if((e.Name || e.Description) == vm.batchTemp.temp[0]){
                                refer = e;
                            }
                        });
                        if(vm.sort!="linkage"){
                            $.each(vm.Tdata, (i, e)=>{
                                if((e.Name || e.Description) == vm.batchTemp.temp[0]){
                                    return true;
                                }else{
                                    $.each(vm.currentObj, (k, g)=>{
                                        if((e.Name || e.Description)==(g.Name || g.Description)){
                                            if(field!='undefined'){   // 查找需要设置的值
                                                for(let k in field){
                                                    e[k] = refer[k]
                                                }
                                                e.edit = 'update'
                                                vm.updateGroup.push(e);
                                            }
                                        }
                                    })
                                }
                            });
                        }else{
                            for(let k in field){
                                vm.currentObj.filter((e)=>{
                                    e[k] = field[k]
                                });
                            }
                            vm.currentObj.forEach((e)=>{
                                e.edit = 'update'
                                vm.updateGroup.push(e);
                            })
                        }
                        
                        layui.table.reload(vm.sort,{
                            data: vm.Tdata
                        });
                        if($('.modifyFlag').find('span').length==0){
                            $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                        };
                        vm.batchTemp.temp = [];
                        layer.close(index);
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    });
                },
                yes: function(index, layero) {
                    $('[lay-filter="'+submitBtn+'"').click()
                },
                btn2: function(index, layero){
                    vm.batchTemp.temp = [];
                    layer.close(index)
                },
                cancel: function(index, layero){
                    vm.batchTemp.temp = [];
                    layer.close(index)
                    return false; 
                },
            });
            $.each(this.currentObj, (i, e)=>{
                if(vm.sort=="monitoring"){
                    vm.batchTemp.temp.push(e.Description);
                }else{
                    vm.batchTemp.temp.push(e.Name)
                }
            })
        },
        // 人员管理——联系人 更多参数设置
        contactsMore(d, cell){
            let vm = this, dom, code0='', code1='', i,j, k,l;
            this.currentContactMore = d;
            for (i = 0; i < vm.hostBlist.length; i++) {
                code0 += '<li><input lay-skin="primary" type="checkbox" value="true" class="hostid" data-hostid="' + vm.hostBlist[i].Id + '" ';
                    for (j = 0; j < d.HostNotificationCommands.length; j++) {
                        if (d.HostNotificationCommands[j].Id == vm.hostBlist[i].Id)
                            code0 += 'checked';
                    }
                // code0 += ' name="'+vm.hostBlist[i].Id+'" title='+vm.hostBlist[i].Name+'></li>';
                code0 += ' name="HostNotificationCommands" title='+vm.hostBlist[i].Name+'></li>';
            }
            //监控项
            for (k = 0; k < vm.ServiceBlist.length; k++) {
                code1 += '<li><input lay-skin="primary" type="checkbox" value="true" class="serviceid" data-serviceid="' + vm.ServiceBlist[k].Id + '" ';
                    for (l = 0; l < d.ServiceNotificationCommands.length; l++) {
                        if (d.ServiceNotificationCommands[l].Id == vm.ServiceBlist[k].Id)
                            code1 += 'checked';
                    }
                // code1 += ' name="'+vm.ServiceBlist[k].Id+'" title='+ vm.ServiceBlist[k].Name +'></li>';
                code1 += ' name="ServiceNotificationCommands" title='+ vm.ServiceBlist[k].Name +'></li>';
            }
            this.code0 = code0;
            this.code1 = code1;
            layer.open({
                type: 1,
                title: vm.$t('Table.Box.Cell.contacts.more.title'),
                area: ['550px'],
                shadeClose: true,
                content: $('#contactsMore'),
                btn: [vm.$t('Prompt_btn[0]'), vm.$t('Prompt_btn[1]')],
                skin: 'set-Table',
                shade:[0.5, '#000'],
                success: function(layero, index){
                    layui.form.render();
                    vm.$nextTick(()=>{
                        layui.form.render();
                        layui.form.on('checkbox(selectAll)', function(data){
                            if(data.elem.checked){
                                let sonList = $(data.elem).nextAll().find('input:checkbox');
                                $.each(sonList, (i,e)=>{
                                    $(e)[0].checked=true;
                                })
                            }else{
                                let sonList = $(data.elem).nextAll().find('input:checkbox');
                                $.each(sonList, (i,e)=>{
                                    $(e)[0].checked=false;
                                })
                            }
                            layui.form.render();
                        })
                        layui.form.on('submit(contactsMore_submit)', function(data){
                            let {field} = data;
                            let mapBooleab=[];
                            layero.find('input[value="true"]').each((i,el)=> $(el).attr('value') === 'true' && mapBooleab.push($(el).attr('name')))
                            mapBooleab.forEach(key=>!field.hasOwnProperty(key)&&(field[key]=false))
                            
                            for(let key in field){
                               if(key=="ServiceNotificationCommands"){
                                    d[key] = [];
                                    layero.find('.serviceid').each((i, el)=>{
                                        if($(el)[0].checked){
                                            let id = $(el).data('serviceid');
                                            d.ServiceNotificationCommands.push({Id: id})
                                        }
                                    });
                               }else if(key=='HostNotificationCommands'){
                                    d[key] = [];
                                    layero.find('.hostid').each((i, el)=>{
                                        if($(el)[0].checked){
                                            let id = $(el).data('hostid');
                                            d.HostNotificationCommands.push({Id: id})
                                        }
                                    });
                               }else{
                                   d[key] = field[key];
                               }
                            };
                            if(d.HostNotificationCommands.length<=0 || d.ServiceNotificationCommands.length<=0){
                                //请保证每个参数都至少选择一项
                                vm.errorMsg(vm.$t('Tips[14]'));
                                return false;
                            }
                            d.edit=='add'?'':d.edit='update';
                            // console.log(vm.updateGroup);
                            if(vm.updateGroup.length>0){
                                let index2=null;
                                $.each(vm.updateGroup, (i,e)=>{
                                    if(e.hasOwnProperty("Id")){
                                        if(e.Id==d.Id){
                                            index2=i
                                        }
                                    }else if(e.hasOwnProperty('id')){
                                        if(e.id==d.id){
                                            index2=i
                                        }
                                    }
                                })
                                if(index2!=null){vm.updateGroup.splice(index2, 1)};
                            }
                            vm.updateGroup.push(d);
                            vm.Tdata.forEach((e, i)=>{
                                if(d.hasOwnProperty("Id")){
                                    if(e.Id==d.Id){
                                        vm.Tdata.splice(i, 1, d)
                                    }
                                }else if(d.hasOwnProperty('id')){
                                    if(e.id==d.id){
                                        vm.Tdata.splice(i, 1, d)
                                    }
                                }
                                
                            });
                            layui.table.reload(vm.sort, {
                                data: vm.Tdata
                            });
                            layer.close(index);
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        });
                    });
                },
                yes: function(index, layero){
                  
                    $('[lay-filter="contactsMore_submit"]').click();
                    if($('.modifyFlag').find('span').length==0){
                        $('<span class="layui-badge-dot"></span>').appendTo('.modifyFlag')
                    };
                    $(cell).addClass('change')
                },
                btn2: function(index, layero) {
                    layer.close(index);
                }
            });  
        },
        // 获取命令
        getCommand(){
            let vm = this;
            this.$http.get('/api/v1/command/host/notification')
            .then((res)=>{
                vm.hostBlist = res.body.data;
            });
            this.$http.get('/api/v1/command/service/notification')
            .then((res)=>{
                vm.ServiceBlist = res.body.data;
            });
        },
        // 时间段设置弹框
        setPeriod(obj) {
            let vm = this;
            let cell = obj.event.split('-')[1];
            let initList=null;
            if(obj.data[cell]!=''&&obj.data[cell]!=undefined){
                initList = obj.data[cell].split(',');
                let t1, t2, t3, t4, htm;
                $.each(initList, (i, e)=>{
                    if(e){
                        t1 = e.split('-')[0].split(':')[0];
                        t2 = e.split('-')[0].split(':')[1];
                        t3 = e.split('-')[1].split(':')[0];
                        t4 = e.split('-')[1].split(':')[1];
                        htm = `
                        <div class="layui-form-item">
                            <div class="layui-inline" style="display: flex; justify-content: space-around; align-items: center;">
                                <input type="number" min="0" max="24" value="${t1}">：
                                <input type="number" min="0" max="60" value="${t2}">
                                ${vm.$t('Table.Box.Cell.Period.other')}
                                <input type="number" min="0" max="24" value="${t3}">：
                                <input type="number" min="0" max="60" value="${t4}">
                                <span class="deletePeriodRange"> <i class="layui-icon layui-icon-close-fill" style="cursor: pointer; color: #cc3341; font-size: 34px;" ></i> </span>
                            </div>
                        </div>
                        `
                        $('.setPeriod_content').eq(0).append(htm)
                    }
                });
            }
            function addTemp(){
                let temp = `
                <div class="layui-form-item">
                    <div class="layui-inline" style="display: flex; justify-content: space-around; align-items: center">
                        <input type="number" min="0" max="24" value="00">：
                        <input type="number" min="0" max="60" value="00">
                        ${vm.$t('Table.Box.Cell.Period.other')}
                        <input type="number" min="0" max="24" value="24">：
                        <input type="number" min="0" max="60" value="00">
                        <span class="deletePeriodRange"><i class="layui-icon layui-icon-close-fill" style="cursor: pointer; color: #cc3341; font-size: 34px;" ></i> </span>
                    </div>
                </div>
                `
                $('.setPeriod_content').eq(0).append(temp)
            }
            layer.open({
                type: 1,
                title: vm.$t('Table.Box.Cell.Period.title'),
                area: ['550px', '260px'],
                shadeClose: true,
                content: $('#setPeriod'),
                skin: 'setPeriod set-Table',
                shade:[0.5, '#000'],
                btn:[vm.$t('Table.Box.Cell.Period.btn[0]'), vm.$t('Table.Box.Cell.Period.btn[1]'), vm.$t('Table.Box.Cell.Period.btn[2]')],
                success: function(layero, index){
                    $('.deletePeriodRange').click(function(){
                        $(this).parent().remove()
                    });
                    // 禁止手动输入
                    $('input[type=number]').keypress(function(e) {
                    　　if (!String.fromCharCode(e.keyCode).match(/[0-9]/)) {
                    　　　　return false;
                    　　}
                    });
                },
                btn1: function(index, layero){
                    let list = $(layero).find('.layui-inline');
                    if(list.length>0){
                        let h1,m1,h2,m2,timeperiod='';
                        $.each($(list), (i, e)=>{
                            h1 = $(e).find('input').eq(0).val();
                            m1 = $(e).find('input').eq(1).val();
                            h2 = $(e).find('input').eq(2).val();
                            m2 = $(e).find('input').eq(3).val();
                            if(timeperiod==''){
                                timeperiod += h1+':'+m1+'-'+h2+':'+m2
                            }else{
                                timeperiod += ','+h1+':'+m1+'-'+h2+':'+m2;
                            }
                        });
                        obj.data[cell] = timeperiod;
                    }else{
                        obj.data[cell] = "";
                    }
                    let index1, index2;
                    if(obj.data.Id){
                        vm.updateGroup.forEach((e, i)=>{
                            if(obj.data.Id==e.Id){
                                index1 = i
                            }
                        });
                        if(index1>=0){vm.updateGroup.splice(index1, 1 )};
                        obj.data.edit = 'update';
                        vm.updateGroup.push(obj.data);
                    }else{
                        vm.updateGroup.forEach((e, i)=>{
                            if(obj.data.id==e.id){
                                index1 = i
                            }
                        });
                        if(index1>=0){vm.updateGroup.splice(index1, 1 )};
                        vm.updateGroup.push(obj.data);
                    };
                    // 更新一下表格
                    $.each(vm.Tdata, (j, k)=>{
                        if(obj.data.hasOwnProperty('Id')){
                            if(obj.data.Id==k.Id){
                                index2 = j;
                            }
                        }else{
                            if(obj.data.id==k.id){
                                index2 = j;
                            }
                        }
                    });
                    if(index2>=0){
                        vm.Tdata.splice(index2, 1);
                    }
                    vm.Tdata.push(obj.data);
                    layui.table.reload(vm.sort, {
                        data: vm.Tdata
                    });

                    layer.closeAll();
                },
                btn2: function(index, layero) {
                    addTemp();
                    $('.deletePeriodRange').click(function(){
                        $(this).parent().remove()
                    });
                    return false;
                },
                btn3: function(index, layero) {
                    layer.close(index);
                },
                end: function(){
                    $('.setPeriod_content').eq(0).empty()
                }
            });
        },
        // 定时任务
        renderTimedTask(){
            let vm = this;
            this.getTableData();
            this.getControlActions();
        },
        getControlActions() {
            let vm = this;
            this.$http.get('/config/rest/ControlActions')
            .then((res)=>{
                vm.timedTaskOrder = res.body
            });
        },
        timedTaskLogBox(){
            if(this.currentObj.length<=0){
                this.errorMsg(vm.$t('Table.Box.log.timedTask.tips[0]'))
                return false
            }
            let opts = {
                elem: '#timedTaskLog',
                page: {
                    layout: ['first', 'prev', 'page', 'next', 'last'],
                    first: vm.$t('laypage[0]'),
                    last: vm.$t('laypage[1]'),
                    prev: vm.$t('laypage[2]'),
                    next: vm.$t('laypage[3]'),
                    theme: '#36a1f2',
                },
                cols: [[ //表头
                    {field: 'Time', title: vm.$t('Table.Box.log.timedTask.table_th[0]'), width: '30%', align: 'center'},
                    {field: 'readable_type', title: vm.$t('Table.Box.log.timedTask.table_th[1]'), width: '20%', align: 'center'},
                    {field: 'Text', title: vm.$t('Table.Box.log.timedTask.table_th[2]'), align: 'center'}
                ]],
            }
            this.$http.get('/config/rest/ControlTaskLogEntries?controlTaskId='+this.currentObj[0].Id)
            .then((res)=>{
                opts.data = res.body;
                layui.layer.open({
                    type: 1,
                    title: vm.$t('Table.Box.log.timedTask.title'),
                    area: ['800px', '620px'],
                    shadeClose: true,
                    content: $('#timedTaskLogBox'),
                    btn: [vm.$t('Table.Box.log.timedTask.btn[0]')],
                    skin: 'set-Table',
                    success: function(){
                        layui.table.render(opts);
                    },
                    yes: function(index, layero){
                        layui.layer.close(index)
                    }
                });
            })
        },
        // 联动参数
        selectOrder(type) {
            let vm = this;
            let opts = {
                type: 1,
                title: '命令>>',
                area: '550px',
                shadeClose: true,
                btn: ['确定', '取消'],
                skin: 'set-Table',
                shade:[0.5, '#000'],
                content: `
                    <table class="layui-hide" id="selectOrderTable" lay-data="{id: 'selectOrderTable'}"></table>
                `,
                success: function(){
                    // 首先要查看当前新增窗口有没有预设的命令值,还要判断命令类型
                    // if(vm.linkageAdd.Actions.length>0){
                    //     let cla = vm.linkageAdd.Actions.filter(item=>{return item.Type==type});
                    //     for(let i=0; i<vm.timedTaskOrder.length; i++){
                    //         let index = cla.findIndex(item=>{ 
                    //             return (item.ActionId==vm.timedTaskOrder[i].Id)
                    //         })
                    //         if(index>=0){vm.timedTaskOrder[i].LAY_CHECKED = true}
                    //     }
                    // }
                    /**预显示被选中的命令 */
                    if(vm.linkageAddStatus!= 0){
                        let list = vm.currentObj[0].Actions;
                        list.filter((e)=>{
                            for(let key in e){
                                if(type==e.Type){
                                    vm.timedTaskOrder.filter((j)=>{
                                        if(j.Id==e.ActionId){
                                            j.LAY_CHECKED = true
                                        }
                                    });
                                }
                            }
                        });
                    }else{
                        let list = vm.linkageAdd.Actions;
                        list.filter((e)=>{
                            for(let key in e){
                                if(type==e.Type){
                                    vm.timedTaskOrder.filter((j)=>{
                                        if(j.Id==e.ActionId){
                                            j.LAY_CHECKED = true
                                        }
                                    });
                                }
                            }
                        });
                    }

                    layui.table.render({
                        elem: '#selectOrderTable',
                        data: vm.timedTaskOrder,
                        cols: [[
                            {type:'checkbox'},
                            {field:'Name', title: '名称', sort: true},
                            {field:'host', title: '设备', sort: true},
                            {field:'RawCommand', title: '命令', sort: true,
                                templet: function(d){
                                    let list = d.RawCommand.split(" ");
                                    return list[list.length-2]+" "+list[list.length-1];
                                }
                            }
                        ]]
                    });
                    
                },
                yes: function(index, layero){
                    let checkStatus = layui.table.checkStatus('selectOrderTable');
                    let temp = [],temp2 = [];
                    /**这里获取勾选了哪一个选项 **/
                    if(checkStatus.data.length>0){
                        $.each(checkStatus.data, (i, e)=>{
                            temp.push({Type: type, ActionId: e.Id});
                        })
                    }
                    /* 这里是当修改的时候，获取参数本来就有命令 */
                    if(vm.linkageAddStatus!=0){
                        vm.currentObj[0].Actions.filter((elem)=>{
                            if(elem.Type!=type){
                                temp2.push(elem);
                            }
                        });
                        temp.filter((ele)=>{
                            temp2.push(ele)
                        })
                        vm.currentObj[0].Actions = temp2;
                    }else{
                        temp.filter((ele)=>{
                            vm.linkageAdd.Actions.push(ele)
                        })
                    }
                    layui.layer.close(index);
                },
                end() {
                    $.each(vm.timedTaskOrder, (j, f)=>{
                        f.LAY_CHECKED = false
                    })
                }
            }
            layui.layer.open(opts);
        }
        /*************************************************************************/
    },
}

</script>
<style lang="stylus">
body
    .periodTips::after
        position absolute
        bottom -10px
        left 0
        content ''
        width 0
        height 0
        border 20px solid transparent
        border-top 10px solid #ccc
        border-bottom 0
    .ContactGroups-box
        div
            width 50%
        .layui-unselect
            width 100%
        li
            width 50%
    table .glyphicon-edit
        color #007bbb
        cursor pointer
        font-size 18px
        margin-left 5px
        
    .errorMsg 
        box-shadow none
        border-radius 10px
        background-color #e74c3c
        img
            width 35px
            margin-right 20px
        .layui-layer-title
            background #e74c3c
        .layui-layer-content
            // background-image url("/public/images/currency/shield_error.ico") no-repeat;
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
            // box-shadow inset 5px 5px 5px #999
    .successMsg
        box-shadow none
        border-radius 10px
        background-color #27ae60
        img
            width 35px
            margin-right 20px
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

        .setTable
            .layui-table-body 
                overflow-y auto
                overflow-x hidden
                .layui-table-cell
                    .layui-input-block
                        margin-left 0
                .layui-form-select dl
                    position fixed
                    min-width 120px
                    left auto
                    top auto
    ::-webkit-scrollbar
        width 6px
        background #383842
    ::-webkit-scrollbar-thumb
        background #2d8ad2
    ::-webkit-scrollbar-button
        display none
        background-color #383842
// div[class$="-Hostgroups"]
//     overflow: unset;
.addDeviceBox
    display flex !important
    overflow hidden
    height auto
.addDeviceBox .A, .addDeviceBox .C
    flex-shrink 0
    border 1px solid #c8c8ca
    border-radius 4px
    padding 14px
    height 300px
    overflow hidden 
.addDeviceBox .A
    width 250px
    overflow-y auto 
    label
        font-weight normal
        margin 0
        width 100%
    label input
        margin-right 4px 
    ul ul
        margin-left 30px
        display none
    li div
        display flex
        align-items center
        cursor pointer
        color #425d70
        font-size 14px
        span
            display inline-block
            width 20px
            height 20px
            border 1px solid #c1c1bf
            border-radius 2px
            margin 0 10px 0 0
            background #fff url(/public/images/setup/icon_host_add.png) no-repeat center
            
    li
        .tit + div>span
            display inline-block
            width 200px
            height auto
            border none
            border-radius 2px
            margin auto
            background none
    ul>.active>div>span
        background-image url(/public/images/setup/icon_host_remove.png)
.addDeviceBox .B
    display flex
    flex-direction column
    justify-content center
    button 
        width 75px
        height 30px
        color #fff
        margin 6px
        font-size 16px
        display block
        border-radius 4px
    button:nth-child(1)
        border 1px solid #0e6bb1
        background #2c90dc
    button:nth-child(2)
        border 1px solid #f5b031
        background #fb9d2c
.addDeviceBox .C
    width 680px
    overflow-y auto
    th
        background #54b5ff
        color #fff
    th, td
        min-width 100px
        max-width 120px
        height 40px
        text-align center
        border 1px solid #ccc
    td input
        width 100%
    .inputNumber
        border 1px solid #ccc
        border-radius 4px
    .layui-icon
            cursor pointer


.set-Table
    box-shadow 5px 5px 10px #888, -5px -5px 10px #888
    hr
        margin 5px 0 10px 0 
        height 1px
        border none
        border-top 1px dashed #aaa !important
    .layui-layer-content, .layui-layer-btn 
        background-color #e7f4fd
    .layui-layer-content
        padding 15px
        span
            font-size 16px
            overflow hidden
            text-overflow ellipsis
            white-space normal

    .layui-layer-title 
        background no-repeat 16px center, linear-gradient(to bottom, #329ce5, #2e8bd3)
        border 1px solid #bababa 
        color #fff
    .layui-btn+.layui-btn
        margin-left 0
        margin-right 10px
        
    .layui-layer-btn .layui-layer-btn0
        color #fff
        background-color #f86868
    .layui-layer-btn
        display flex
        justify-content space-around
        a
            display inline-block
            color #fff
            background-color #82d642
            border #f86868
            padding 0 26px
            font-size 16px

    .layui-form-label
        width 100px
        color #425d70
    .layui-form-item
        width 90%
        margin-bottom 5px
    .layui-form-select dl
        position fixed
        left auto
        top auto
        min-width 120px
    ul
        margin 0
    #batchBox, #batchBox2, #batchBox3
        overflow hidden
        .layui-form-item
            margin 13px auto 0 0
        .layui-btn
            width 100px
            margin 5px
            text-align center
            padding-left 5px
            padding-right 5px
            overflow hidden
            text-overflow ellipsis 
            background-color #1E9FFF
            border-color transparent
            border-bottom-color #0960ab!important
            background-color #4288c5
            background-image linear-gradient(180deg,#488fcd,#3a7db8)
            background-repeat repeat-x
            :hover
                border #0960ab!important
        .layui-layer-btn
            padding-top 8px
        .btn-warning
            border-color transparent
            border-bottom-color #cf370c!important
            background-color #ff4e00
            background-repeat repeat-x
            background-image linear-gradient(180deg,#f50,#f40)
    #batchBox3
        .wordValueBox
            display flex
        .layui-form-item
            margin 0
        .layui-inline
            display flex
            flex-direction column
            align-items flex-start
            label
                padding-left 0
                text-align left
    .setPeriod_content
        input[type=number]
            border 1px solid #ccc
            border-radius 4px
    #selNotification + .layui-form th
        background #54b5ff
        color #fff
    #selNotification + .layui-form .layui-table-body
        overflow hidden
    #contactsMore .layui-form .layui-tab
        .layui-tab-title
            border-bottom 1px solid #c8c8c8
            li
                background #f5f5f5
                color #425d70
                border 1px solid #c8c8c8
            li:nth-child(1)
                border-right none
            .layui-this
                background #e7f4fd
                // border
        .layui-tab-content
            .layui-tab-item
                .layui-form-item
                    // margin 0
                    width 100%
                .layui-form-item:nth-child(3)
                    .layui-input-block
                        margin 0
    .orderTable
        margin-top 0
.setContactgroups
    .layui-layer-content
        form
            display flex
            flex-direction column
            .layui-form-checkbox
                margin 5px 0
#table
    .operateBtnList
        display flex
        position relative
        button
            box-shadow 3px 3px 15px rgba(0, 0, 0, 0.2) inset, -3px -3px 15px rgba(0, 0, 0, 0.2) inset;
            border-radius 6px;
        .device_filter
            position absolute
            right 0
            form
                display flex
                justify-content flex-end
                .layui-form-item
                    width auto
                    .layui-input-inline
                        max-width 180px
        .linkage_filter
            position absolute
            right 0
            form
                display flex
                justify-content space-between
                .layui-form-item
                    width auto
                    margin 0 5px
                .layui-btn:hover
                    text-decoration none
                .clear_linkage
                    .layui-btn
                        background #8d8d91
                i.layui-icon
                    font-size 14px
        .layui-form-item
            display flex
            .layui-form-label
                min-width 100px
                text-align center
            .layui-input-inline
                width auto
    .layui-table-body 
        overflow-y auto
        overflow-x hidden
    .layui-table-cell
    .layui-input-block
        margin-left 0
    .layui-form-select dl
        position fixed
        min-width 120px
        left auto
        top auto
    .layui-form-label
        width 100px
    .layui-form-item
        width 90%
        margin-bottom 5px
    .layui-table-view
        margin 20px 0
    .layui_page
        text-align center
    .layui-table-view
        th
            background #54b5ff
            color #fff
            padding: 0;
            height: 43px;
    .change
        color green
.layui-form-checked[lay-skin=primary] i
    border-color #54b5ff
    background-color #54b5ff
.layui-form-radioed>i
    color: #54b5ff;
.layui-form-select dl dd.layui-this 
    background-color #1E9FFF
    color #fff

.batch
    background-color #83c831
.delete
    background-color #fb9d2c
.email, .modify
    background-color #7dc02f
.test
    background-color #f26547
.compared
    background-color #f99c34
.log
    background-color #83c831
.application
    background-color: #f26547
.batchEdit
    background-color: #83c831
.userRole
    .layui-input-block
        ul
            padding-left: 20px;
.setPeriod
    background-color #e7f4fd
    input
        width 20%
        height 40px;
        text-align center
    .layui-form-item
        width 100% !important
        margin-top 15px
        margin-bottom 0
    .layui-layer-btn0
        background-color #82d642 !important
    .layui-layer-btn1
        background-color #007bbb !important
    .layui-layer-btn2
        background-color #f86868 !important
    .layui-layer-btn
        display flex
        justify-content space-around
.layui-layer-tips
    display none
.layui-table-grid-down
    display none
#timedTaskIds
    .week
        .layui-form-item
            width 100%
            .layui-input-block
                margin 0 110px
#timedTaskLogBox
    padding 15px
    .layui-table-page
        text-align center
    table
        thead th
            background-color #54b5ff
            color #fff
// .timedTaskLog
//     .layui-layer-btn
//         text-align center !important
//         a
//             display: block-inline
//             height 30px
//             line-height 30px
//             padding 0 26px
//             border-radius 4px
//             font-weight 400
//             font-size 16px
.comparedTable
    border 1px solid red
    display flex
    thead
        float left
        tr
            display flex
            flex-direction column
            th
                height 50px
                line-height 50px
                border 1px dashed #000
                width 100px
                padding 0 10px
    tbody
        tr
            td
                display inline-block
                width 100px
                height 50px
                padding 0 10px
                line-height 50px
                border 1px solid green
.orderTable
    width 90%
    margin 20px auto 0 auto
    thead
        th
            background-color #54b5ff
            color #fff
            text-align center
    tbody
        td
            text-align center
#linkageBox
    .layui-input-block
        display flex
        flex-direction column
        justify-content center
</style>


