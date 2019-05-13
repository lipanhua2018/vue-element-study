import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Welcome from '@/components/page/welcome'  // 欢迎页
import UpWorks from '@/components/page/upWorks'  // 上传课程
import courseDisplay from '@/components/page/courseDisplay'  // 课程展示
import Member from '@/components/page/member'    // 会员展示
import DataStatistics from '@/components/page/dataStatistics'    // 数据统计
import detailsPage from '@/components/page/secondLevelPage/detailsPage' // 详情页面
import imgList from '@/components/page/imgList'   // 图片列表页
import testLoad from '@/components/page/testLoad'   // 测试加载页

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/home',
        component: Home
    },
    {
        path: '/home',
        component: Home,
        children: [
        {
            path: '/',
            redirect: '/welcome',
            component: Welcome
        },
         {
            path: '/welcome',
            name: 'welcome',
            pageName: '欢迎页',
            component: Welcome
        },
        {
            path: '/upWorks',
            name: 'upWorks',
            pageName: '上传课程',
            component: UpWorks
        },
        {
            path: '/courseDisplay',
            name: 'courseDisplay',
            pageName: '课程展示',
            component: courseDisplay
        },
        {
            path: '/member',
            name: 'member',
            pageName: '学员管理',
            component: Member
        },
        {
            path: '/dataStatistics',
            name: 'dataStatistics',
            pageName: '数据统计',
            component: DataStatistics
        },
        {
            path: '/detailsPage',
            name: 'detailsPage',
            pageName: '课程详情',
            component: detailsPage
        },
        {
            path: '/imgList',
            name: 'imgList',
            pageName: '图片列表',
            component: imgList
        },
        {
            path: '/testLoad',
            name: 'testLoad',
            pageName: '测试加载页',
            component: testLoad
        }
      ]
    }  
  ]
})
