import Login from '@/components/login/v_login'
import setting from '@/components/set/setting'

//设置内页
import mDevice from '@/components/set/mDevice'
import mPersonnel from '@/components/set/mPersonnel'
import mTime from '@/components/set/mTime';
import mPorts from '@/components/set/mPorts'
import mApplication from '@/components/set/mApplication'
import mMore from '@/components/set/mMore'

const routes = [
    {
        path:'/',
        name:'login',
        component: Login,
    },
    {
        path: '/',
        name: 'set',
        component: setting,
    },
    {
        path: '/setting',
        name: 'set',
        component: setting,
    },
    /** 设置内页 **/
    {
        path: '/mDevice',
        name: 'mDevice',
        component: mDevice
    },
    {
        path: '/mPersonnel',
        name: 'personnelManagement',
        component: mPersonnel
    },
    {
        path: '/mTime',
        name: 'timeManagement',
        component: mTime
    },
    {
        path: '/mPorts',
        name: 'portsManagement',
        component: mPorts
    },
    {
        path: '/mApplication',
        name: 'ApplicationManagement',
        component: mApplication
    },
    {
        path: '/mMore',
        name: 'moreManagement',
        component: mMore
    }
]

export default routes;