<template>
    <div id="mDevice">
        <div class="dataForm">
            <div class="layui-tab" lay-filter="setting-devices"> 
                <ul class="layui-tab-title">
                    <li>{{$t('mDevice.tabTitle[0]')}}</li>
                    <li @click="gethost" class="layui-this">{{$t('mDevice.tabTitle[1]')}}</li>
                    <li @click="getDevices" >{{$t('mDevice.tabTitle[2]')}}</li>
                    <li v-if="moTab" lay-id="monitor">{{$t('mDevice.tabTitle[3]')}}</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="layui-tab-item"></div>

                    <div class="layui-tab-item  layui-show">
                        <vtable sort='hostGroup' ref="hostTab"></vtable>
                    </div>

                    <div class="layui-tab-item">
                        <vtable sort='devices' ref="devicesTab" v-on:Monitoring="addMonitoringTab"></vtable>
                    </div>
                    
                    <div class="layui-tab-item" v-show="moTab" >
                        <vtable sort='monitoring' ref="monitoringTab" ></vtable>
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
            moTab: false,
        };
    },
    mounted() {
        let vm = this;
        layui.element.on('tab(setting-devices)', function(data){
            $('.modifyFlag span').remove();
            ['hostTab', 'devicesTab'].forEach(i=>vm.$refs[i].clear());
            if(data.index=='0'){
                vm.$router.push({path: '/setting'})
            }
        });
        this.gethost();
        this.getDevices();
        this.$nextTick(()=>{
            layui.form.on('select(filter_hostGroup)', function(){
                let list = $('.device_filter form').serializeArray(), params={};
                params[list.find(e => e.name=='hgid').name] = list.find(e => e.name=='hgid').value;
                params[list.find(e => e.name=='class').value] = list.find(e => e.name=='key').value;
                vm.$refs['devicesTab'].getTableData('', params)
                vm.$refs['devicesTab'].curr = 1;
            });
            $('.clear_linkage').click((e)=>{
                $(e.target).parent().prevAll().find('select[name="hgid"]').val("");
                $(e.target).parent().prevAll().find('select[name="class"]').val("");
                $(e.target).parent().prevAll().find('input[name="key"]').val("");
                vm.getDevices();
                vm.$refs.devicesTab.curParams = []
            })
        });
        
    },
    methods: {
        addMonitoringTab(params) {
            this.moTab = true;
            this.$nextTick(()=>{
                layui.element.tabChange('setting-devices', 'monitor');
            });
            this.$refs.monitoringTab.renderMonitoring(params);
        },
        gethost() {
            this.$refs.hostTab.getTableData();
        },
        getDevices() {
            this.$refs.devicesTab.renderDevice();
        }
    }
};

</script>
<style lang="stylus">
#mDevice
    overflow auto
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
            .layui-tab-title .layui-this 
                background-color #fff
            .laytable-cell-1-id
                display none
            .layui-table-page
                text-align center
</style>




