<template>
    <div id="mPersonnel">
        <div class="dataForm">
            <div class="layui-tab" lay-filter="setting-devices"> 
                <ul class="layui-tab-title">
                    <li>{{$t('mPersonnel.tabTitle[0]')}}</li>
                    <li @click="getUser" class="layui-this">{{$t('mPersonnel.tabTitle[1]')}}</li>
                    <li @click="getContactGroup">{{$t('mPersonnel.tabTitle[2]')}}</li>
                    <li @click="getContacts">{{$t('mPersonnel.tabTitle[3]')}}</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="layui-tab-item"></div>
                    <div class="layui-tab-item  layui-show">
                        <vtable sort='user' ref="user"></vtable>
                    </div>
                    <div class="layui-tab-item">
                        <vtable sort='contactGroup' ref="contactGroup"></vtable>
                    </div>
                    <div class="layui-tab-item">
                        <vtable sort='contacts' ref="contacts" :contactEmail='email'></vtable>
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
            email: '',
        }
    },
    mounted() {
        this.getUser();
        this.$http.get('/config/rest/Resources')
        .then((res)=>{
            res.body[0].User2 = res.body[0].User2 == null || res.body[0].User2 == undefined ? "" : res.body[0].User2;
            res.body[0].User3 = res.body[0].User3 == null || res.body[0].User2 == undefined ? "" : res.body[0].User3;
            res.body[0].User4 = res.body[0].User4 == null || res.body[0].User2 == undefined ? "" : res.body[0].User4;
            this.email = res.body[0];
        });
    },
    methods: {
        getUser() {
            this.$refs.user.getHosts()
            this.$refs.user.getTableData();
        },
        getContactGroup() {
            this.$refs.contactGroup.getTableData();
        },
        getContacts() {
            this.$refs.contacts.getTableData();
            this.$refs.contacts.getContactgroup();
            this.$refs.contacts.loadTime();
            this.$refs.contacts.getCommand();
        }
    }
}
</script>
<style lang="stylus">
#mPersonnel
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
</style>
