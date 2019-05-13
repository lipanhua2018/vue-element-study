<template>
    <!-- 课程展示 -->
    <div class="courseDisplay showAnimation">
        <el-row :gutter="20">
            <el-col class="card-bg" v-for="(item, index) in cardList" :key="index" :span="6">
                <div class="course-card" @click="goDetailsPage(item, index)">
                    <div class="course-logo">
                        {{item.courseLogo}}
                    </div>
                    <dl>
                        <dt class="course-title">
                            {{item.courseName}}
                        </dt>
                        <dd class="lecture-teacher">
                            {{item.courseTeacher}}
                        </dd>
                        <dd class="lecture-address">
                            {{item.courseAddress}}
                        </dd>
                        <div class="course-score">
                            <el-rate v-model="item.score" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                            </el-rate>
                        </div>
                    </dl>
                    <div class="card-footer" :class="{'blue-bg':index%2==1}"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'courseDisplay',
    data () {
        return {
            name: 'courseDisplay',
            pageName: '课程展示',
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12],
            score: 0,   // 评分
            bgColor:[['#ff6666', 'ff6699'], ['#66ccff', '#3399ff'], ['#ffcc66', '#ffcc33']], // 红黄蓝           
        }
    },
    created () {

    },
    mounted () {
        // this.$publicFn.setStorage('colorList', this.bgColor)
        // console.log(this.$publicFn.getStorage('color'))
        // if (this.$publicFn.getStorage('colorList')) {
        //     this.$publicFn.removeStorage('colorList')
        // } else {
        //     console.log('数据以删除')
        // }
        
    },
    components: {

    },
    computed: {
        cardList () {
            return this.$store.state.cardList;
        }
    },
    methods: {
        goDetailsPage (item, index) { // 去详情页面方法，该方法的主要功能有两点，跳转的时候需要向vuex的navList push当前路由，并存储传递到详情页的数据
            this.$common.menuPush(this, {pageName: '课程详情', path: 'detailsPage'}); // 给vuex的navList  push当前路由
            this.$store.commit('setdetailsData', item); // 存储传递到详情页的数据
            this.$router.push({name: 'detailsPage', params: {data: item}})
        }
    }
}
</script>

<style lang="scss" scoped>
.card-bg:nth-child(3n+0) .course-logo{
    background: -webkit-linear-gradient(left, #ff6666 , #ff6699);
    background: linear-gradient(to right, #ff6666 , #ff6699);
}
.card-bg:nth-child(3n+1) .course-logo{
    background: -webkit-linear-gradient(left, #66ccff, #3399ff);
    background: linear-gradient(to right, #66ccff, #3399ff);
}
.card-bg:nth-child(3n+2) .course-logo{
    background: -webkit-linear-gradient(left, #ffcc66, #ffcc33);
    background: linear-gradient(to right, #ffcc66, #ffcc33);
}
.course-card{
    position: relative;
    height: 320px;
    margin-bottom: 20px;
    box-shadow: 4px 4px 4px #eee;
    cursor: pointer;
    &:hover{
        -webkit-transform: scale(1.05, 1.05);
        transform: scale(1.05, 1.05); 
    }
    .course-logo{
        height: 140px;
        line-height: 140px;
        text-align: center;
        font-size: 36px;
        color: #fff;
        text-shadow: 2px 2px 3px #333;       
    }
    dl{
        padding: 0 6px;
        .course-title{
            height: 50px;
            line-height: 50px;
            font-size: 18px;
        }
        .lecture-teacher{
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            font-weight: bold;
        }
        .lecture-address{
            line-height: 25px;
            font-size: 14px;
            color: #999;
        }
        .course-score{
            height: 40px;
            display: flex;
            align-items: center;
        }
    }
    .card-footer{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 5px;   
        background: -webkit-linear-gradient(left, #ff6666, #ff6699);
        background: linear-gradient(to right, #ff6666, #ff6699);
    }
    .blue-bg{
        background: -webkit-linear-gradient(left, #66ccff, #3399ff);
        background: linear-gradient(to right, #66ccff, #3399ff);
    }
    .yellow-bg{
        background: -webkit-linear-gradient(left, #ffcc66, #ffcc33);
        background: linear-gradient(to right, #ffcc66, #ffcc33);
    }
}
</style>