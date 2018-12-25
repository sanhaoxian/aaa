<template>
    <div id="mTime">
        <div class="dataForm">
            <div class="layui-tab" lay-filter="setting-devices"> 
                <ul class="layui-tab-title">
                    <li>{{$t('mTime.tabTitle[0]')}}</li>
                    <li class="layui-this">{{$t('mTime.tabTitle[1]')}}</li>
                    <li @click="getPeriod">{{$t('mTime.tabTitle[2]')}}</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="layui-tab-item"></div>
                    <!-- 服务器时间tab内容 -->
                    <div class="layui-tab-item  layui-show  serverTime">
                        <div class="layui-form">
                            <div class="layui-form-item">
                                <label class="layui-form-label">{{$t('mTime.label[0]')}}:</label>
                                <div class="layui-input-block">
                                    <input type="text"  name="title" class="layui-input" :value="serverTime">
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">{{$t('mTime.label[1]')}}:</label>
                                <div class="layui-input-block">
                                    <input type="text" class="layui-input" id="dateTimeSet" @input="watchNum" autocomplete="off" >
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <button class="layui-btn layui-btn-normal saveBtn">{{$t('mTime.btn')}}</button>
                            </div>
                        </div>
                    </div>
                    <!-- 时间段tab内容 -->
                    <div class="layui-tab-item">
                        <vtable sort='period' ref="period"></vtable>
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
        return {
            serverTime: '',
            currentTime: '',
            setTime:'',
        }
    },
    mounted() {
        let vm = this;
        this.init();
        layui.element.on('tab(setting-devices)', function(data){
            $('.modifyFlag span').remove();
            ['period'].forEach(i=>vm.$refs[i].clear());
            if(data.index=='0'){
                vm.$router.push({path: '/setting'})
            }
        });
    },
    methods: {
        // 进入后门
        watchNum(e) {
            if(e.target.value==1985){
                $(".layui-laydate").remove();
                this.$router.push('/setting');
                this.$store.commit('visible_softwareInfo', true); 
            }
        },
        init() {
            let newTime = new Date();
            layui.use(['laydate', 'form'], function(){
                layui.laydate.render({
                    elem: '#dateTimeSet',
                    type: 'datetime',
                    value: new Date(),
                    isInitValue: true,
                    theme: '#1E9FFF'
                });
            });
            this.getServerTime();
            this.getPeriod();
        },
        getServerTime() {
            let vm = this;
            vm.setTime&&clearInterval(vm.setTime);
            vm.setTime = setInterval(()=>{
                vm.$http.get('/config/rest/Misc?to_do=sysTimeGet')
                .then((res)=>{
                    vm.serverTime = res.body.date;
                })
            }, 500)
        },
        getPeriod() {
            this.$refs.period.getTableData();
        }
    },
    beforeDestroy() {
        clearInterval(this.setTime);
    },
}
</script>
<style lang="stylus">
#mTime
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
            
            .serverTime
                .layui-form-item
                    display flex
                    justify-content center
                    .layui-form-label
                        width 150px
                    .layui-input-block
                        width 50%
                        margin-left 50px
                        input:focus
                            border 1px solid #1186e0 !important
                            box-shadow 0px 0px 15px #6fc0f7
                    .saveBtn
                        width 135px
                        height 40px
                        font-size 20px
                        font-weight bold
.layui-table-tips-main
    display none
.layui-layer-tips
    display:none
</style>
