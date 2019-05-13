<template>
    <!-- 欢迎页 -->
    <div class="welcome-page showAnimation">
        <el-row class="welcome-content" :gutter="20">
            <el-col :span="12" class="left-content">
                <div class="pie-echarts wel-echarts">
                    <pie-chart ref="pie"></pie-chart>
                </div>
                <div class="line-echarts wel-echarts">
                    <line-chart ref="line"></line-chart>
                </div>
            </el-col>

            <el-col :span="12" class="right-content">
                <div class="tab-student tab-model">
                    <h3 class="tab-title">学员列表预览表</h3>
                    <div class="tab-box">                   
                    <el-table
                        :data="tableData"                       
                        :border="false"                  
                        style="width: 100%">
                        <el-table-column
                        prop="id"
                        height="40"
                        width="40"
                        label="ID">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        height="40"
                        width="80"
                        label="姓名">
                        </el-table-column>
                        <el-table-column
                        prop="sex"
                        height="40"
                        width="40"
                        label="性别">
                        </el-table-column>
                        <el-table-column
                        prop="age"
                        height="40"
                        width="40"
                        label="年龄">
                        </el-table-column>
                        <el-table-column
                        prop="occupation"
                        height="40"
                        width="150"
                        label="职业">
                        </el-table-column>
                        <el-table-column
                        prop="hobby"
                        height="40"
                        width="70"
                        label="爱好">
                        </el-table-column>
                        <el-table-column
                        prop="income"
                        height="40"
                        width="70"
                        label="收入">
                        </el-table-column>
                        <el-table-column
                        prop="tel"
                        height="40"
                        label="电话">
                        </el-table-column>
                    </el-table>
                    </div>
                </div>
                <div class="tab-notice tab-model">
                    <h3 class="tab-title">通知公告</h3>
                    <div class="tab-box">
                        <el-table
                            :data="initNotice.result"                     
                            style="width: 100%"
                            :show-header="false"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            >
                            <el-table-column
                            prop="title"
                            label="公告信息"
                            sortable>
                            </el-table-column>
                            <el-table-column
                            prop="aid"
                            label="日期"
                            width="100"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="username"
                            label="日期"
                            width="100"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>          
        </el-row>
    </div>
</template>

<script>
import pieChart from '../echarts/pieChart';
import lineChart from '../echarts/lineChart';
import {findComponentDownward, findBrothersComponents} from '../../common/findComponentDownward.js';

export default {
    name: 'welcome',
    data () {
        return {
            name: 'welcome',
            pageName: '欢迎页'
        }
    },
    created () {
        let self = this;
    },
    mounted () {
        let self = this;
        self.$refs.pie.setPieChart();
        self.$refs.line.setLineChart();  
        const pie = findComponentDownward(this, 'pieChart');
        const upWorks = findBrothersComponents(this, 'upWorks')
        if (pie) {
            // console.log(pie)
        }
        if (upWorks.length) {
            // console.log(upWorks)
        }
    },
    components: {
        pieChart, lineChart
    },
    computed: {
        tableData () {
            return this.$store.state.peopleInfo;
        },
        noticeData () {
            return this.$store.state.notice
        },
        initNotice () {
            return this.$store.state.dataInfo;
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.welcome-page{
    height: 100% !important;
    .welcome-content{
        height: 100% !important;
        display: block;
        .left-content{
            height: 100% !important;
            .wel-echarts{
                height: 328px;
                //height: 50%;
                border: 1px solid #ddd;
                box-sizing: border-box;
            }
            .line-echarts{
                margin-top: 20px;
            }
        }
        .right-content{
            .tab-model{
                border: 1px solid #ddd;
                box-sizing: border-box;
                .tab-title{
                    height: 44px;
                    padding: 0 10px;
                    line-height: 44px;
                    font-size: 16px;
                    color: #333;                   
                }
            }
            .tab-student{
                height: 400px;
                overflow: auto;
                .tab-box{
                    height: 352px;
                    overflow: auto;
                    border-top: 1px solid #eee;
                    .el-table td{
                        padding: 0;
                        font-size: 14px;
                    }
                }                
            }
            .tab-notice{
                margin-top: 20px;
                height: 238px;
                .tab-box{
                    border-top: 1px solid #eee;
                    height: 193px;
                    overflow: auto;
                }
            }
        }
    }
}
.tab-box::-webkit-scrollbar {/*滚动条整体样式*/
	width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.tab-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: #888;
}
.tab-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 10px;
	background: #EDEDED;
}
</style>