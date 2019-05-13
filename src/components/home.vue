<template>
    <!-- 主页 -->
    <div class="home">
        <el-container class="main-content">
        <el-aside class="side-nav">
            <side-navigation @userInfoFn="userInfoFn" @navPush="navPush" ref="sideNav"></side-navigation>
        </el-aside>
        <el-container class="content-box">
            <el-header class="header-area">
                <nav class="nav left">
                    <ul>
                        <li :class="{'curPage': item.pageName === pageName}" v-for="(item, index) in navList" :key="index" @click="goPage(item)">
                             {{item.pageName}} 
                             <span @click.stop="closeCurPage(item)" v-if="index">x</span>
                        </li>
                    </ul>
                </nav>
                <ul class="top-info right">
                    <li>{{date}}</li>
                    <li>{{week}}</li>
                    <li>
                        <span>欢迎你：</span>
                        <span>{{userInfo}}</span>
                    </li>
                    <li class="out-btn">
                        <i class="fa fa-sign-in"></i>
                    </li>
                </ul>
            </el-header>
            <el-main class="page-content">
                <!-- transition增加路由动画 -->
                <transition name="routerAnimation">
                    <router-view v-show="showAnimation" class="child-view"></router-view>
                </transition>              
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import sideNavigation from '../components/common/sideNavigation';
import { findComponentDownward, findBrothersComponents } from '../common/findComponentDownward.js';
export default {
    name: 'home',
    data () {
        return {
            name: 'home',
            userInfo: '',
            date: '',
            week: ''
        }
    },
    created () {
        this.getDateFn();
    },
    mounted () {
        let self = this;
        setTimeout(function(){
            self.userInfo = self.$refs.sideNav.userInfo;
        },250);
        this.$store.dispatch('getDataInfo');
        this.$store.dispatch('getPeopleInfo');
        this.$store.dispatch('getCardList');
        // console.log(this.$children)

        const imgList = findBrothersComponents(this, 'imgList');      
        if (imgList) {
            console.log(imgList)
        }
        // console.log(JSON.stringify(this.$store.state.cardList));
    },
    components: {
      sideNavigation
    },
    computed: {
        dataInfo () {
            return this.$store.state.dataInfo;
        },
        navList () {
            return this.$store.state.topMenu.navList;
        },
        pageName () {
            return this.$store.state.topMenu.pageName;
        },
        showAnimation () {
            return this.$store.state.showAnimation;
        }
    },
    methods: {
        closeCurPage (curPage) { // 关闭顶部一个导航            
            var navList = this.$store.state.topMenu.navList;
            if (curPage.pageName === this.pageName) {     // 只有点自己当前项的时候才需要goPage
                    this.$store.commit('deleteCurMenu', curPage);         
                    this.goPage(navList[navList.length - 1])
                } else{ // 点其他不是当前项的时候删除就可以了
                    this.$store.commit('deleteCurMenu', curPage); 
                }             
        },
        userInfoFn (info) {
            this.userInfo = info;                         
        },
        goPage (item) {
            this.$store.commit('curHighlight', item);
            this.$router.push({path: item.path});
        },
        navPush (data) {
            this.$common.menuPush(this, data);
        },
        getUserInfo () {
            this.userInfo = this.$refs.sideNav.returnUser();  
        },
        getDateFn () {
            let dateObj = this.$publicFn.getDateFn('-', this);
            this.date = dateObj.date;
            this.week = dateObj.week;
        }
    }
}
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
    .main-content{
        height: 100%;
        .side-nav{
            width: 15% !important;
            min-width: 225px;
        }
        .content-box{
            width: 85% !important;
            .header-area{
                border-bottom: 1px solid #eee;
                box-shadow: 2px 2px 2px #eee;
                box-sizing: border-box;
                .nav{
                    width: 55%;
                    ul{
                        li{
                            float: left;
                            margin-right: 10px;
                            padding: 0 10px;
                            line-height: 59px;
                            box-sizing: border-box;                            
                            cursor: pointer;
                            &:hover{
                                font-weight: bold;
                                background-color: #f5f5f5;
                                border-bottom: 2px solid #7dbeff;
                            }
                        }
                        .curPage{
                            color: #3399ff;
                            border-bottom: 2px solid #3399ff;
                        }
                    }                   
                }
                .top-info{
                    display: flex;
                    height: 100%;
                    li{
                        line-height: 59px;
                        padding-left: 15px;
                        cursor: pointer;
                        &:hover{
                            color: #3399ff;
                        }
                        .out-btn{
                            font-size: 16px;
                        }
                    }
                }
            }
            .page-content{
                padding: 15px;
                .routerAnimation-enter-active, .routerAnimation-leave-active{   //  进来和离开执行的动画类型和时间
                    transition: 1s all ease;
                }
                .routerAnimation-enter-active{  // 当元素进来后变成啥样
                    opacity:1;
                }
                
                .routerAnimation-leave-active{  //当元素离开变成啥样
                    opacity: 0;                  
                }
                .routerAnimation-enter,.routerAnimation-leave{  // 初始状态
                    opacity: 0;
                }
            }
            .page-content::-webkit-scrollbar {/*滚动条整体样式*/
                width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 1px;
            }
            .page-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #888;
            }
            .page-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 10px;
                background: #EDEDED;
            }

        }
  }
}
</style>

