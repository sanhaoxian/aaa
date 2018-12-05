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
                        <vtable sort='hostGroup' ref="hostTab" v-on:extendHosts="showContent"></vtable>
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
            curr_tab: 1
        };
    },
    mounted() {
        let vm = this;
        this.gethost();
        this.getDevices();
        layui.element.on('tab(setting-devices)', (data)=>{
            if(data.index==1){
                vm.curr_tab = data.index;
            }
            if(data.index=='0'){
                vm.$router.push({path: '/setting'})
            }
        })
    },
    methods: {
        addMonitoringTab(params) {
            this.moTab = true;
            layui.element.tabChange('setting-devices', 'monitor');
            this.$refs.monitoringTab.renderMonitoring(params);
        },
        gethost() {
            this.$refs.hostTab.getTableData();
        },
        getDevices() {
            this.$refs.devicesTab.renderDevice();
        },
        showContent(data, that) {
            console.log("传过来的对象", $(that).width());
            if(this.curr_tab==1){
                $('.layui-layer-tips').fadeIn(0.3*1000);
                $('.layui-table-tips').css('width', $(that).width());
                $('.layui-table-tips-c').css('padding', '0px')
                // console.log("弹出框", $('.layui-table-tips-main'));
                let content = $('.layui-table-tips-main');
                // console.log("输出内容:", content.text().split(','));
                let hostsList = content.text().split(',');
                let template = '';
                for(let i=0;i<hostsList.length; i++){
                    template += `<li style="width: 20%; text-align: center;margin: 5px">${hostsList[i]}</li>`
                }
                
                template = `<ul style="width: 100%; display:flex; flex-wrap: wrap;cursor:pointer">${template}</ul>`;
                // console.log(template);
                this.$nextTick(()=>{
                    content.empty();
                    $('.layui-table-tips-main').html(template);
                })
            }
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




