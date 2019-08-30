<template>
    <!-- 上传课程 -->
    <div class="upWorks showAnimation">
        <el-row class="up-area">
            <el-button type="success" plain size="mini" @click="myalert">日期</el-button>
            <div class="date-box">
                <input type="text" ref="pinkDate" class="pink-date" v-model="date">
                <i class="el-icon-date pos-icon"></i>
            </div>
            <el-button @click="goImglistPage()" class="upload-btn" type="primary" size="mini">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            
        </el-row>
        <el-row :gutter="10" class="tab-type">
            <el-col :span="6" v-for="(item,index) in tabTile" :key="index">
                <div class="tab-title" :class="{curTab: cur == index}" @click="selectTab(item)">
                    <h6>{{item.name}}</h6>
                    <div>{{item.type}}</div>
                </div>
            </el-col>
        </el-row>
        <!-- <web-component :itObj="itObj" :selectType="selectType"></web-component> -->
        <!-- 动态组件实战应用,使用vue内置组件component 使用is属性接收一个组件名字 -->
        <component v-bind:is="currentComponent" :itObj="itObj" :selectType="selectType"></component>
    </div>
</template>

<script>
import webComponent from '../up-work-component/web-component';
import designComponent from '../up-work-component/design-component';
import networkComponent from '../up-work-component/network-component';
import serverComponent from '../up-work-component/sever-component';
import {findComponentDownward} from '../../common/findComponentDownward.js';
export default {
    name: 'upWorks',
    data () {
        return {
            name: 'upWorks',
            pageName: '上传课程',
            date: '',
            activeName: 'web',
            cur: 0,
            currentComponent: 'webComponent',
            tabTile: [
                {
                    name: 'web前端',
                    type: 'js/vue/angular',
                    index: 0,
                    componnetName: 'webComponent'
                },
                {
                    name: 'server后台',
                    type: 'c/java/python',
                    index: 1,
                    componnetName: 'serverComponent'
                },
                {
                    name: 'network网络',
                    type: 'http/WebServices',
                    index: 2,
                    componnetName: 'networkComponent'
                },
                {
                    name: 'Design设计',
                    type: 'ui/ue/ux',
                    index: 3,
                    componnetName: 'designComponent'
                }
            ],
            selectType: {
                taecher: [{label:'黄老师', value: 'yellow'}, {label:'红老师', value: 'red'}, {label:'蓝老师', value: 'blue'}],
                classHour: [{label:'一小时', value: 'one'}, {label:'二小时', value: 'two'}, {label:'三小时', value: 'three'}],
                courseType: [{label:'面授课', value: 'face'}, {label:'网授课', value: 'net'}, {label:'直播课', value: 'live'}]
            },
            itObj:{
                webArr: [
                    {course: 'javaScript', largeClass: true, taecher: '', hour: '', type: '',},
                    {course: 'ECMAScript6', largeClass: false, taecher: '', hour: '', type: '',},
                    {course: 'react', largeClass: false, taecher: '', hour: '', type: '',},
                    {course: 'vue', largeClass: false, taecher: '', hour: '', type: '',},
                    {course: 'angular6', largeClass: false, taecher: '', hour: '', type: '',}
                ],
                personRole: {
                    taecher: '',
                    hour: '',
                    course: '',
                }
            }
        }
    },
    created () {
        this.date = this.$publicFn.initTime(0);       
    },
    mounted () {
        let self = this;
        setTimeout(function(){
            self.pinkDate();
        },50)
        self.getDataInfo()

        let child = findComponentDownward(this, 'sever-component')
        // console.log(self, 98, child)
    },
    components: {
        webComponent,
        designComponent,
        networkComponent,
        serverComponent
    },
    computed: {

    },
    methods: {
        myalert() {
            this.$myAlert.info({
                content: '我是自定义的全局弹窗',
                duration: 3
            });
        },
        selectTab (item) {
            this.cur = item.index;
            this.currentComponent = item.componnetName; // 动态组件切换
        },
        pinkDate () {
            let dom = this.$refs.pinkDate;
            this.$laydate.render({
                elem: dom,
                theme: '#67c23a'
            })
        },
        getDataInfo () {
            this.$store.dispatch('getDataInfo').then(res => {
                // console.log(res)
            })
        },
        goImglistPage () {           
            this.$common.menuPush(this, {pageName: '图片列表', path: 'imgList'}); // 给vuex的navList  push当前路由
            this.$router.push({name: 'imgList', params: {data: '图片列表页'}});
            setTimeout(() => {
                console.log(this.$refs.imgList);
            }, 50)
        }
    }
}
</script>

<style scoped lang="scss">
.up-area{
    position: relative;
    .date-box{
        display: inline-block;
        position: relative;
        margin-left: 10px;
        .pink-date{
            width: 160px;
            padding: 7px 15px;
            padding-left: 7px;
            border: 1px solid #c2e7b0;
            background-color: #f0f9eb;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .pos-icon{
            position: absolute;
            right: 0;
            top: 0;
            padding: 7px;
            color: #67c23a;
            font-size: 14px;
        }
    }
    .upload-img{
        position: absolute;
        right: 100px;
        top: 0;
    }
    .upload-btn{
        float: right;
    }  
}
.tab-type{
    margin-top: 20px;
    .tab-title{
        padding: 10px;
        background-color: #edeff2;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: 2px solid #ccd2dc;
        box-sizing: border-box;
        cursor: pointer;
        h6{
            height: 20px;
            line-height: 20px;
        }        
    }
    .curTab{
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #f0f9eb;
        border-bottom: 2px solid #c2e7b0;
        div{
            color: #67c23a;
        }
    }
}

</style>
