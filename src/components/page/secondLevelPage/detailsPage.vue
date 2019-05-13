<template>
<!-- 详情页面 -->
    <div class="details-page showAnimation">
        <el-row class="details-up details-box">
            <el-row class="details-head">
                <el-col :span="24"><i class="fa fa-book"></i>课程详情</el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="details-left-info">
                    <el-row>
                        <el-col :span="12">
                            <el-col :span="6" class="details-label row-details">课程名称：</el-col><el-col :span="18" class="blue-info row-details">{{routeInfo.courseName}}</el-col>
                        </el-col>
                        <el-col :span="12">
                            <el-col :span="6" class="details-label row-details">课程编号：</el-col><el-col :span="18" class="blue-info row-details">IT201890017564</el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-col :span="6" class="details-label row-details">授课机构：</el-col><el-col :span="18" class="blue-info row-details">华图教育股份有限公司</el-col></el-col>
                        <el-col :span="12">
                            <el-col :span="6" class="details-label row-details">授课地址：</el-col><el-col :span="18" class="blue-info row-details">{{routeInfo.courseAddress}}</el-col></el-col>                        
                    </el-row>
                    <el-row>
                        <el-col :span="12"><el-col :span="6" class="details-label row-details">授课老师：</el-col><el-col class="blue-info row-details" :span="18">{{routeInfo.courseTeacher}}</el-col></el-col>
                        <el-col :span="12"><el-col :span="6" class="details-label row-details">教师等级：</el-col><el-col class="blue-info row-details" :span="18">一级IT教师</el-col></el-col>                        
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-col :span="6" class="details-label row-details">课程分类：</el-col><el-col class="blue-info row-details" :span="18">前端实战教学</el-col>                  
                        </el-col>
                        <el-col :span="12">
                            <el-col :span="6" class="details-label row-details">授课方式：</el-col><el-col class="blue-info row-details" :span="18">华图教育面授课</el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><el-col :span="6" class="details-label row-details">开课时间：</el-col><el-col class="blue-info row-details" :span="18">2018-01-15</el-col></el-col>
                        <el-col :span="12"><el-col :span="6" class="details-label row-details">联系电话：</el-col><el-col class="blue-info row-details" :span="18">020-27889555</el-col></el-col>                        
                    </el-row>
                    <el-row>
                            <el-col :span="3" class="details-label row-details">课程信息：</el-col>
                            <el-col class="blue-info row-details" :span="21">第一阶段： html结构+css样式布局，原生javaScript学习，jQuery学习；第二阶段：ajax封装与学习
                                get和post应用；第三阶段：学习vue.js，router路由搭建，prop父子组建传值，vuex；
                            </el-col>  
                    </el-row>
                </el-col>
                <el-col :span="12" class="details-right-info">
                    <el-row>
                        <el-col class="right-ceil" :span="8" v-for="(item, index) in detailsData" :key="index">
                            <div class="div-data">
                                <h5>{{item.quantity}}</h5>
                                <span>{{item.info}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>            
        </el-row>
        <el-row class="details-down details-box">
            <el-tabs type="border-card">
                <el-tab-pane label="授课信息">
                    <el-table
                        :data="tableData"
                        stripe
                        size="small"
                        style="width: 100%">

                        <el-table-column
                        prop="date"
                        label="开课日期"
                        width="180">
                        </el-table-column>

                        <el-table-column
                        prop="teacher"
                        label="授课老师"
                        width="180">
                        </el-table-column>
                        
                        <el-table-column
                        prop="class"
                        label="授课班级"
                        width="180">
                        </el-table-column>

                        <el-table-column
                        prop="course"
                        label="授课内容"
                        width="180">
                        </el-table-column>

                        <el-table-column
                        prop="address"
                        label="授课地址">
                        </el-table-column>
                    </el-table>
                    <div class="block-pagination">                     
                        <el-pagination
                        :small="true"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="20">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="课程目录">
                    课程目录-->暂无内容
                </el-tab-pane>
                <el-tab-pane label="学生管理">
                    学生管理-->暂无内容
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'detailsPage',
    data () {
        return {
            name: 'detailsPage',
            pageName: '详情页面',
            routeInfo: {},
            detailsData: [{
                quantity: 28,
                info: '开班期数'
            },
            {
                quantity: 3280,
                info: '毕业人数'
            },{
                quantity: 8990,
                info: '平均薪资'
            },{
                quantity: 380,
                info: '名企人数'
            },{
                quantity: 100,
                info: '满意度'
            }],
            currentPage: 1,
            tableData: [{
                date: '2018-09-01',
                teacher: '陈明老师',
                course: 'HTML+CSS页面布局',
                class: '101班',
                address: '广州市天河区中山大道108号尚德大厦701'
                }, {
                date: '2018-08-01',
                teacher: '王霞老师',
                course: '原生javaScript',
                class: '102班',
                address: '广州市天河区中山大道108号尚德大厦701'
                }, {
                date: '2018-07-01',
                teacher: '李璐老师',
                class: '103班',
                course: 'vue.js框架',
                address: '广州市天河区中山大道108号尚德大厦701'
                }, {
                date: '2018-06-01',
                teacher: '张小飞老师',
                class: '104班',
                course: 'angular.js框架',
                address: '广州市天河区中山大道108号尚德大厦701'
                },{
                date: '2018-05-01',
                teacher: '田赋雨老师',
                class: '105班',
                course: 'element-ui框架',
                address: '广州市天河区中山大道108号尚德大厦701'
                },{
                date: '2018-04-01',
                teacher: '刘真老师',
                class: '106班',
                course: 'es6',
                address: '广州市天河区中山大道108号尚德大厦701'
                }]
        }
    },
    created () {

    },
    mounted () {
        if (this.$route.params.data) {
            this.routeInfo = this.$route.params.data;
        } else {
            this.routeInfo = this.detailsInfo
        }  
        // console.log(this.$route.params.data)
    },
    computed: {
        detailsInfo () {
            return this.$store.state.detailsData;
        }
    },
    components: {

    },
    methods: {
        handleSizeChange () {

        },
        handleCurrentChange () {

        }
    }
}
</script>

<style lang="scss" scoped>
.details-page{
    .details-box{
        box-shadow: 3px 3px 4px #eee;
        border: 1px solid #eee;
    }
    .details-up{
        height: 250px;
        margin-bottom: 15px;
        .details-head{
            height: 35px;
            line-height: 35px;
            padding: 0 10px;
            font-weight: bold;
            i{
                padding-right: 5px;
                color: #409EFF;
            }
        }     
        .details-left-info{
            .row-details{
                line-height: 20px;
                padding-bottom: 7px;
            }
            .details-label{
                text-align: right;
            }
            .blue-info{
                color: #409EFF;
            }
        }            
        .details-right-info{          
            .right-ceil{
                .div-data{
                width: 80px;
                height: 80px;
                margin: auto;
                border-top-right-radius: 25px;
                border-bottom-left-radius: 25px;
                background-color: #409EFF;
                color: #fff;
                text-align: center;
                h5{
                    padding-top: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 30px;
                }
                
            }
            }
             .right-ceil:nth-child(1) .div-data{
                    background-color: #f9747d;
                    margin-bottom: 20px;
                }
                .right-ceil:nth-child(2) .div-data{
                    background-color: #55a1ff;
                    margin-bottom: 20px;
                }
                .right-ceil:nth-child(3) .div-data{
                    background-color: #f6b952;
                    margin-bottom: 20px;
                }
                .right-ceil:nth-child(4) .div-data{
                    background-color: #71a0fe;
                }
                .right-ceil:nth-child(5) .div-data{
                    background-color: #4ddac7;
                }          
        }   
    }
    .details-down{
        height: 380px;
        .el-tabs--border-card{
            border: 0;
            -webkit-box-shadow: 0 0 0 0 #fff;
            box-shadow: 0 0 0 0 #fff;
        }
        .block-pagination{
                margin-top: 10px;
                display: flex;
                justify-content: center;
            }
    }
}              
</style>
