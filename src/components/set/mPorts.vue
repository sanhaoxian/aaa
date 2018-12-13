<template>
    <div id="mPorts">
        <div class="dataForm">
            <div class="layui-tab" lay-filter="setting-devices"> 
                <ul class="layui-tab-title">
                    <li>{{$t('mPorts.tabTitle[0]')}}</li>
                    <li class="layui-this">{{$t('mPorts.tabTitle[1]')}}</li>
                    <li @click="getHardware">{{$t('mPorts.tabTitle[2]')}}</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="layui-tab-item"></div>
                    
                    <div class="layui-tab-item layui-show network layui-form">
                        <section>
                            <div class="layui-form-item">
                                <label class="layui-form-label" style="width: 205px">{{$t('mPorts.label[0]')}}</label>
                                <div class="layui-input-block">
                                    <input type="radio" lay-filter="selectInterface" v-for="(it, index) in dataList" :key='it.Id' name="eth" :value="it.Id" :title="it.Name" :checked="(index==0)?true:''">
                                </div>
                            </div>
                        </section>
                        <div>
                            <section>
                                <div class="div_title">
                                    <h5>{{$t('mPorts.title[0]')}}</h5>
                                    <div>
                                        <button class="layui-btn routineSave" @click="DevSaveFun"><i class="glyphicon glyphicon-floppy-disk "></i>{{$t('mPorts.Btn_list[0]')}}</button>
                                    </div>
                                </div>
                                <div class="setBox">
                                    <h6>{{$t('mPorts.label[1]')}}:</h6>
                                    <label class="layui-form-label">{{$t('mPorts.label[2]')}}:</label>
                                    <div class="layui-input-block">
                                        <input type="text" name="inter" autocomplete="off" class="layui-input" v-model="DisplayName">
                                    </div>
                                    <h6>{{$t('mPorts.label[3]')}}:</h6>
                                    <ul>
                                        <li>
                                            <span>{{$t('mPorts.label[7]')}}-----</span>
                                            <i class="pcbg"> </i>
                                            <span>-----{{$t('mPorts.label[8]')}}</span>
                                        </li>
                                        <li>
                                            <span>{{$t('mPorts.label[4]')}}</span>
                                            <span class="borderRight">{{currentSet.SentBytes}}</span>
                                            <span>{{currentSet.ReceivedBytes}}</span>
                                        </li>
                                        <li>
                                            <span>{{$t('mPorts.label[5]')}}</span>
                                            <span class="borderRight">{{currentSet.SentPackets}}</span>
                                            <span>{{currentSet.ReceivedPackets}}</span>
                                        </li>
                                        <li>
                                            <span>{{$t('mPorts.label[6]')}}</span>
                                            <span class="borderRight">{{currentSet.SentErrors}}</span>
                                            <span>{{currentSet.ReceivedErrors}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <div class="div_title">
                                    <h5>{{$t('mPorts.title[1]')}}</h5>
                                    <div>
                                        <button class="layui-btn IPVAdd" @click="IPVAddFun"><i class="glyphicon glyphicon-plus"></i>{{$t('mPorts.Btn_list[1]')}}</button>
                                        <button class="layui-btn IPVDel" @click="IPVDelFun"><i class="glyphicon glyphicon-minus "></i>{{$t('mPorts.Btn_list[2]')}}</button>
                                        <button class="layui-btn IPVSave" @click="IPVSaveFun"><i class="glyphicon glyphicon-floppy-disk "></i>{{$t('mPorts.Btn_list[0]')}}</button>
                                    </div>
                                </div>
                                <div class="setBox IPV4">
                                    <div class="tableRow">
                                        <div class="table">
                                            <table id="IPv4Table" lay-filter="IPv4Table"></table>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="layui-form-item">
                                            <label class="layui-form-label">DNS1:</label>
                                            <div class="layui-input-block">
                                                <input type="text" name="DNS1" autocomplete="off" class="layui-input" v-model="DNS1">
                                            </div>
                                        </div>
                                        
                                        <div class="layui-form-item">
                                            <label class="layui-form-label">DNS2:</label>
                                            <div class="layui-input-block">
                                                <input type="text" name="DNS1"  autocomplete="off" class="layui-input" v-model="DNS2">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <!-- <button class="layui-btn">保存</button> -->
                    </div>

                    <div class="layui-tab-item">
                        <vtable sort='ports' ref="ports"></vtable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vtable from '../table/table.vue'
export default{
    components:{ vtable },
    data() {
        return{
            currentSet: '',
            dataList: '',
            update_IPV4: [],
            DNS1: '',
            DNS2: '',
            DisplayName: '',
            NetDevs: false
        }
    },
    watch:{
        DNS1(newV, oldV) {
            this.NetDevs = true;
        },
        DNS2(newV, oldV) {
            this.NetDevs = true;
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let vm = this;
            layui.use(['table','form'], function(){})
            this.getSetData();
        },
        getSetData() {
            let vm = this;
            this.$http.get('/config/rest/NetDevs')
            .then((res)=>{
                vm.dataList = res.body;
                vm.currentSet = res.body[0];
                vm.DNS1 = vm.currentSet.Dns1;
                vm.DNS2 = vm.currentSet.Dns2;
                vm.DisplayName = vm.currentSet.DisplayName
                let option = {
                    elem: '#IPv4Table',
                    cols: [[
                        {type:'checkbox'},
                        {field: 'Address', title: vm.$t('mPorts.son_table_th[0]'), edit: 'text', align: 'center', event: 'change'},
                        {field: 'Netmask', title: vm.$t('mPorts.son_table_th[1]'), edit: 'text', align: 'center', event: 'change'},
                        {field: 'Gateway', title: vm.$t('mPorts.son_table_th[2]'), edit: 'text', align: 'center', event: 'change'}
                    ]],
                    height: 275,
                    data: vm.currentSet.addresses,
                    done: function(res){
                        // console.log(res);
                        for(let i=0;i<res.data.length;i++){
                            if(res.data[i].hasOwnProperty('edit')){
                                $('#IPv4Table').next().find('tr[data-index='+i+']').css('color', 'green')
                            }
                        }
                    }
                }
                vm.$nextTick(()=>{
                    layui.table.render(option);
                    layui.form.render('radio');
                    layui.form.on('radio(selectInterface)', function(data){
                        vm.currentSet = vm.dataList.find((ele)=>{ return ele.Id==data.value });
                        option.data = vm.currentSet.addresses
                        layui.table.render(option);
                    });
                    // // 表格的监听事件
                    layui.table.on('edit(IPv4Table)',(obj)=>{
                        if(vm.update_IPV4.length != 0){
                            let index = vm.update_IPV4.findIndex((d)=>d.LAY_TABLE_INDEX==obj.data.LAY_TABLE_INDEX);
                            if(index>=0){
                                vm.update_IPV4.splice(index, 1);
                            }
                        }
                        obj.data.edit = 'update'
                        // vm.$nextTick(()=>{
                        if(obj.data.hasOwnProperty('layui_index')){
                            let temp = vm.currentSet.addresses.find(item=>item.layui_index);
                            temp[obj.field] = obj.value;
                        }
                        layui.table.render(option);
                            
                        // })
                        vm.update_IPV4.push(obj.data);
                        
                    })
                });
            });
        },
        getHardware() {
            this.$refs.ports.getTableData();
        },
        IPVAddFun(){
            let vm = this;
            this.currentSet.addresses.push({
                Address: "",
                Gateway: "",
                NetDevId: 1,
                Netmask: "",
                layui_index:Math.floor(Math.random()*100),
                edit: 'add'
            })
            layui.table.reload('IPv4Table',{
                data: vm.currentSet.addresses
            });
        },
        IPVDelFun() {
            let vm = this;
            let list = layui.table.checkStatus('IPv4Table').data;
            list.filter((item)=>{
                if(!item.hasOwnProperty('Id')){
                    console.log(item);
                    let index =  vm.currentSet.addresses.findIndex((e)=>e.layui_index==item.layui_index)
                    console.log("位置", index);
                    index>=0&&vm.currentSet.addresses.splice(index, 1);
                    layui.table.reload("IPv4Table", {
                        data: vm.currentSet.addresses
                    });
                    return;
                }
                this.$http.delete("/config/rest/NetDevAddresses/"+item.Id)
                .then((res)=>{
                    layui.table.reload("IPv4Table");
                    vm.getSetData();
                }, (err)=>{
                    console.log(err.body.error)
                });
            });
        },
        IPVSaveFun() {
            let vm = this;
            if(vm.update_IPV4.length>0){
                for(let i=vm.update_IPV4.length-1; i>=0; i--){
                    let item = vm.update_IPV4.pop();
                    if(item.hasOwnProperty('Id')){
                        vm.$http.post('/config/rest/NetDevAddresses/'+item.Id, item)
                        .then((res)=>{
                            vm.getSetData();
                        }, (error)=>{
                            vm.errorMsg(error.body.error)
                        });
                    }else{
                        vm.$http.post('/config/rest/NetDevAddresses', item)
                        .then((res)=>{
                            vm.getSetData();
                        }, (error)=>{
                            vm.errorMsg(error.body.error)
                        });
                    }
                }
            }
            this.NetDevs&&vm.DevSaveFun();
        },
        DevSaveFun() {
            let vm = this;
            let d = {
                DisplayName: vm.DisplayName,
                Dns1: vm.DNS1,
                Dns2: vm.DNS2,
                Id: vm.currentSet.Id
            }
            this.$http.post("/config/rest/NetDevs/"+d.Id, d)
            .then((res)=>{
                console.log(res.body);
            }, (err)=>{console.log(err.body)});
        },
        errorMsg(msg) {
            layui.layer.open({
                type: 1,
                offset: 'rt',
                title: '',
                // content: '<img src="/public/images/currency/shield_error.ico"/>'+msg,
                content: msg,
                btn: '',
                skin: 'errorMsg',
                shade: 0,
                time: 3000,
                closeBtn: 0,
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
    }
}
</script>
<style lang="stylus">
#mPorts
    padding 20px 40px 0 40px
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
                .network>div
                    display flex
                    justify-content space-around
                    section
                        width 6.4rem
                        height 540px 
                        border 2px solid #ccc
                        border-radius 5px
                        padding 18px
                        overflow-y auto
                        .div_title
                            display flex
                            justify-content space-between
                            .layui-btn
                                border-radius 5px
                            .IPVAdd, .IPVSave, .routineSave
                                background-color #36a1f3
                            .IPVDel
                                background-color #f99d36
                            h5
                                font-size 18px
                        .setBox
                            border-top 1px solid #ccc
                            .layui-form-label
                                font-size 18px
                                width 100px
                            .layui-input-block
                                margin-left 100px
                            h6
                                font-size 18px
                            ul 
                                width 100%
                                li
                                    width 100%
                                    display flex
                                    justify-content flex-end
                                    margin-top 8px
                                    span
                                        width 33%
                                        font-size 18px
                                        text-align center
                                li:nth-child(1)
                                    height 1.15rem
                                    line-height 2rem
                                    span
                                        width 25%
                                    i.pcbg
                                        display block
                                        width 100px
                                        background url('/public/images/setup/icon_TV.png') no-repeat 0 bottom
                                .borderRight
                                    border-right 2px solid #ccc
                .network>button
                    display block
                    margin 30px auto
                    width: 135px;
                    height: 40px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #fff;
                    background-color: #36a1f3;
                    border-radius: 5px;
                .IPV4
                    .layui-table-header
                        table
                            th
                                background-color #36a1f2
                                color #fff
                    .tableRow
                        display flex
                        justify-content space-between
                    .table
                        width 100%
                    min-height 90%
                    display flex
                    flex-direction column
                    justify-content space-between

</style>
