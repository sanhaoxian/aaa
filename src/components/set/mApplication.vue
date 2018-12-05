<template>
    <div id="mApplication">
        <div class="dataForm">
            <div class="layui-tab" lay-filter="setting-devices"> 
                <ul class="layui-tab-title">
                    <li>{{$t('mApplication.tabTitle[0]')}}</li>
                    <li class="layui-this">{{$t('mApplication.tabTitle[1]')}}</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="layui-tab-item"></div>

                    <div class="layui-tab-item  layui-show">
                        <div class="contentBox">
                            <div class="progressBox">
                                <div class="layui-progress layui-progress-big" lay-filter="demo" lay-showPercent="yes">
                                    <div class="layui-progress-bar" lay-percent="0%"></div>
                                </div>
                            </div>
                            <button class="layui-btn run" @click="execute">{{$t('mApplication.btn')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data() {
        return {
            markId: '',
            percentage: 0
        }
    },
    mounted() {
        layui.use('element', function(){
            layui.element.render('demo')
        })
    },
    methods: {
        execute() {
            let vm = this;
            let opts = {
                type: 0,
                title: vm.$t('mApplication.Box.title'),
                content: vm.$t('mApplication.Box.content'),
                btn: [vm.$t('Prompt_btn[0]'), vm.$t('Prompt_btn[1]')],
                area: ['543px', '196px'],
                skin: 'set-inquiry set-Table',
                yes(index, layero) {
                    vm.$http.post('/config/rest/ExportJobs', {"Name":"Export by Job.js"})
                    .then((res)=>{
                        vm.markId = res.body.Id;
                        $('.layui-progress-bar').addClass('progressBar');
                        vm.play();
                    });
                    vm.percentage = vm.percentage + parseInt(Math.random()*20, 10);
                    layui.element.progress('demo', vm.percentage+'%');
                    layui.layer.close(index);
                },
                btn2(index, layero) {
                    layui.layer.close(index)
                }
            }
            layui.layer.open(opts);
            
        },
        play() {
            let vm = this;
            this.$http.get('/config/rest/ExportJobs/'+this.markId)
            .then((res)=>{
                if(res.body.StatusCode==3){
                    vm.percentage = vm.percentage + parseInt(Math.random()*20, 10);
                    vm.percentage = vm.percentage > 90 ? "90" : vm.percentage;
                    setTimeout(function(){
                        vm.play();//再次读取应用设置的状态
                    }, 3000);
                    layui.element.progress('demo', vm.percentage+'%');
                }else{
                    // 执行1000%
                    layui.element.progress('demo', 100+'%');
                    if(res.body.StatusCode!=4){
                        // '应用设置失败';
                        $('.layui-progress-bar').css('background-color', '#d9534f');
                        // 改变进度条的颜色
                    }else{
                        // '应用执行完成';
                        $('.layui-progress-bar').css('background-color', '#5cb85c');
                        // 改变进度条的颜色
                    }
                }
            });
        },
    }
}
</script>
<style lang="stylus">
#mApplication
    padding 20px 40px 0 40px
    .dataForm 
        .layui-tab
            margin 0
            .layui-tab-content
                padding 0
                padding-top 20px
            .layui-tab-title li 
                background-color #f2f6f7
                border-top #d7dfd2 2px solid
                border-left #E6E6E4 1px 
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
            .contentBox
                display flex
                justify-content flex-start
                align-items center
                padding-left 20px
                .progressBox
                    width 700px
                    margin-right 60px
                    .layui-progress
                        border-radius 3px
                        background-color #f5f5f5
                        box-shadow -1px 1px 1px rgba(0,0,0,0.1) inset
                        height 20px
                    .layui-progress-bar
                        border-radius 3px
                        height 20px
                        line-height 20px
                        background-color #428bca
                .run
                    width 135px
                    height 40px
                    font-size 20px
                    font-weight bold
                    color #fff
                    background-color #36a1f3
                    border none
                    border-radius 5px
    .progressBar
        position relative
        background-size 3em 3em
        background-image linear-gradient(45deg, transparent 0em, transparent 0.8em, rgba(255,255,255,0.2) 0.9em, rgba(255,255,255,0.2) 2.1em, transparent 2.1em, transparent 2.9em, rgba(255,255,255,0.2) 3.1em)
        -webkit-animation warning-animation 750ms infinite linear
        -moz-animation warning-animation 750ms infinite linear
        animation warning-animation 750ms infinite linear
    .progressBar:before{
        content ''
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        height 100%
        border-radius 10px
        // background-image: linear-gradient(to bottom, #6DA807, rgba(165,249,158,1) 15%, transparent 60%, rgba(165,249,158,1));
    }
@keyframes warning-animation{
    0% {
        background-position 3em 0
    }
    100% {
        background-position 0 0
    }
}

.set-inquiry 
    box-shadow 5px 5px 10px #bbb, -5px -5px 10px #bbb
    background-color #e7f4fd
    .layui-layer-title 
        background no-repeat 16px center, linear-gradient(to bottom, #329ce5, #2d8ad2)
        // border 1px solid #0c578f 
        color #fff
    .layui-layer-content
        border-radius 4px
        overflow hidden
        padding 15px
        color #425d70
        background #e7f4fd
        min-height 50px
        font-size 16px
    .layui-layer-btn
        .layui-layer-btn0
            background-color #82d642
            border none
        .layui-layer-btn1
            background-color #f86868
            color #fff

</style>
