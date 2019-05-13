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
                <div class="tab-title" :class="{curTab: cur == index}" @click="selectTab(index)">
                    <h6>{{item.name}}</h6>
                    <div>{{item.type}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="student-content" v-for="(item, index) in itObj.webArr" :key="index">
            <el-col :span="6" class="student-list">
                <el-checkbox class="largeClass" v-model="itObj.webArr[index].largeClass">{{itObj.webArr[index].course}}</el-checkbox>
            </el-col>
            <el-col :span="12" class="student-list">
                <el-col :span="8" class="studt-type">
                    <dl>
                        <dt>Array</dt>
                        <dd>push,unshift,join</dd>
                    </dl>
                    <dl>
                        <dt>String</dt>
                        <dd>
                            indexOf,splice
                        </dd>
                    </dl>
                </el-col>
                <el-col :span="8" class="studt-type">
                    <dl>
                        <dt>Math</dt>
                        <dd>round,ceil,floor</dd>
                    </dl>
                    <dl>
                        <dt>Date</dt>
                        <dd>
                            getDay,getMonth
                        </dd>
                    </dl>
                </el-col>
                <el-col :span="8" class="studt-type">
                    <dl>
                        <dt>RegExp</dt>
                        <dd>exec,test</dd>
                    </dl>
                    <dl>
                        <dt>Function</dt>
                        <dd>
                            eval,parseFloat
                        </dd>
                    </dl>
                </el-col>
            </el-col>
            <el-col :span="6" class="student-list last-term">
                <div>
                    <span class="lab-span">老师：</span>
                    <el-select size="mini" v-model="taecher" placeholder="请选择">
                        <el-option
                        v-for="item in selectType.taecher"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="lab-span">课时：</span>
                    <el-select size="mini" v-model="hour" placeholder="请选择">
                        <el-option
                        v-for="item in selectType.classHour"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="lab-span">类型：</span>
                    <el-select size="mini" v-model="course" placeholder="请选择">
                        <el-option
                        v-for="item in selectType.courseType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'upWorks',
    data () {
        return {
            name: 'upWorks',
            pageName: '上传课程',
            date: '',
            activeName: 'web',
            cur: 0,
            tabTile: [
                {
                    name: 'web前端',
                    type: 'js/vue/angular'
                },
                {
                    name: 'server后台',
                    type: 'c/java/python'
                },
                {
                    name: 'network网络',
                    type: 'http/WebServices'
                },
                {
                    name: 'Design设计',
                    type: 'ui/ue/ux'
                }
            ],
            taecher: '',
            hour: '',
            course: '',
            selectType: {
                taecher: [{label:'黄老师', value: 'yellow'}, {label:'红老师', value: 'red'}, {label:'蓝老师', value: 'blue'}],
                classHour: [{label:'一小时', value: 'one'}, {label:'二小时', value: 'two'}, {label:'三小时', value: 'three'}],
                courseType: [{label:'面授课', value: 'face'}, {label:'网授课', value: 'net'}, {label:'直播课', value: 'live'}]
            },
            itObj:{
                webArr: [
                    {course: 'javaScript', largeClass: true},
                    {course: 'ECMAScript6', largeClass: false},
                    {course: 'react', largeClass: false},
                    {course: 'vue', largeClass: false},
                    {course: 'angular6', largeClass: false}
                ]
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
    },
    components: {

    },
    computed: {

    },
    methods: {
        myalert() {
            this.$myAlert.info({
                content: '我是自定义的全局弹窗',
                duration: 3
            });
            this.$myAlert.info({
                content: '我是自定义的全局弹窗1',
                duration: 3
            });
            this.$myAlert.info({
                content: '我是自定义的全局弹窗2',
                duration: 3
            });
        },
        findMe () {
            console.log('找到了我')
        },
        handleClick (tab, event) {
            console.log(tab, event);
        },
        selectTab (index) {
            this.cur = index;
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
                console.log(res)
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
.student-content{
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    .student-list{
        height: 100px;
        margin: 20px 0;
        border-left: 1px solid #ddd;
        .largeClass{
            height: 100px;
            line-height: 100px;
            margin-left: 15px;
        }
        .studt-type{
            padding: 0 10px;
            dl{
                margin-bottom: 10px;
                dt{
                    color: #999;
                    font-size: 12px;
                    padding-bottom: 6px;
                }
                dd{
                    word-wrap:break-word;
                    font-size: 14px;
                    color: #333;
                }
            }           
        }
        .lab-span{
            display: inline-block;
            width: 40px;
            text-align: right;
            margin-left: 10px;
        }
    }
    .last-term{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // align-content:space-between;
    }
}
.student-list:nth-child(1){
    border-left: none;
}
</style>
