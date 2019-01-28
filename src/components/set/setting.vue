<template>
    <div id="setting">
        <ul>
            <div class="settingDiv">
                <li v-for="it in setItem" :key="it.name" ref="li"
                    :style="{background:'rgb(237, 246, 250) url('+ it.bg +') no-repeat center 30px'}"
                    @click="toSetItem(it.href)"
                    >
                    <h3>{{it.name}}</h3>
                    <p>{{it.describe1}}</p>
                    <p>{{it.describe2}}</p>
                </li>
            </div>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            setItem:[
                {
                    id: 1,
                    name: this.$t('set.name1'),
                    href: 'mDevice',
                    describe1: this.$t('set.set1.describe1'),
                    describe2: this.$t('set.set1.describe2'),
                    bg: '/public/images/setup/icon_0006_1.png'
                },
                {
                    id: 2,
                    name: this.$t('set.name2'),
                    href: 'mPersonnel',
                    describe1: this.$t('set.set2.describe1'),
                    describe2: this.$t('set.set2.describe2'),
                    bg: '/public/images/setup/icon_0000_2.png'
                },
                {
                    id: 3,
                    name: this.$t('set.name3'),
                    href: 'mTime',
                    describe1: this.$t('set.set3.describe1'),
                    describe2: this.$t('set.set3.describe2'),
                    bg: '/public/images/setup/icon_0001_3.png'
                },
                {
                    id: 4,
                    name: this.$t('set.name4'),
                    href: 'mPorts',
                    describe1: this.$t('set.set4.describe1'),
                    describe2: this.$t('set.set4.describe2'),
                    bg: '/public/images/setup/icon_0002_4.png'
                },
                {
                    id: 5,
                    name: this.$t('set.name5'),
                    href: 'mApplication',
                    describe1: this.$t('set.set5.describe1'),
                    describe2: this.$t('set.set5.describe2'),
                    bg: '/public/images/setup/icon_0003_5.png'
                },
                {
                    id: 6,
                    name: this.$t('set.name6'),
                    href: 'mMore',
                    describe1: this.$t('set.set6.describe1'),
                    bg: '/public/images/setup/icon_0004_6.png'
                }
            ],
        }
    },
    mounted() {
        let vm = this;
        setTimeout(()=>{
            if (this.getCookie("ItmngwebPlatformChanged") == "1") {
                $(this.$refs.li[4]).addClass('notchange');
            }
        }, 2*1000);
        this.$http.get('/api/v1/setting/hostgroup')
        .then((res)=>{
            if(res.body.status){
                vm.hostgroup = res.body.data;
            }else{
                if(res.body.code==302){
                    window.location.href = res.body.redirect
                }
            }
        });
    },

    methods:{
        toSetItem(url) {
            this.$router.push({path: url});
        },
        getCookie(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++)
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        }
    }
}
</script>
<style>
#setting{
    height: 100%;
    /* border: 1px dashed #659; */
    overflow-y: auto;
}
#setting ul{
    /* height: 100%; */
    /* border: 1px dashed red; */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
#setting ul .settingDiv{
    /* border: 1px solid greenyellow; */
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 30px
}
#setting ul .settingDiv li{
    /* border: 1px dashed #000; */
    margin: 30px 40px;
    width: 380px;
    height: 240px;
    list-style: none;
    border: 2px solid rgb(238, 238, 238);
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;
    padding-bottom: 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    transition: all 0.6s ease;
    position: relative;
}
#setting ul .settingDiv .notchange::before{
    content: "有参数修改未应用";
    background: red;
    color: #fff;
    font-size: 14px !important;
    padding: 10px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: absolute;
    left: 345px;
    top: -35px;
    line-height: 1.4;
}
#setting ul .settingDiv li h3{
    font-size: 22px;
    color: #776c72;
    margin-bottom: 5px;
}
#setting ul .settingDiv li p{
    font-size: 16px;
    color: #b4b3b5;
    margin: 0;
    text-align: center;
}
#setting ul .settingDiv li:after {
    content: "";
    position: absolute;
    width: 380px;
    height: 27px;
    z-index: -5;
    left: 0;
    bottom: -25px;
    transition: all 0.6s;
    background: url(/public/images/setup/icon_0005_7.png) no-repeat center center;
    background-size: 100% 100%;
}
#setting ul .settingDiv li:hover{
    transform: translateY(-15px);
}
#setting ul .settingDiv li:hover:after{
    background-size: 95% 95%;
    transform: translateY(15px);
}
@media screen and (max-width: 1444px){
    #setting ul li{
        margin: 0.4rem 0.4rem;
    }
}
@media screen and (max-width: 1200px){
    
}
</style>
