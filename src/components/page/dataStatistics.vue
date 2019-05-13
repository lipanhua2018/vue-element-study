<template>
    <!-- 数据统计 -->
    <div class="dataStatistics showAnimation">
            <el-row>
                <span class="line-title">历史数据统计</span><span>({{historyData}})</span>
            </el-row>
            <el-row class="switch-condition">
                <el-button size="mini" :autofocus="true" type="danger" round plain @click="testLoad">今日</el-button>
                <el-button size="mini" type="primary" round plain>昨日</el-button>
                <el-button size="mini" type="warning" round plain>最近七日</el-button>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    size="mini"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <label class="look-label">查看</label>
                    <el-select size="mini" v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
            </el-row>
            <el-row class="line-row">
                <span class="line-title">数据概要</span>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="8">
                    <div class="data-echart">
                        <div class="line-echart">
                            <broken-line v-if="isShow" ref="broken" :trend="dataArr"></broken-line>
                        </div>
                        <div class="switch-line">
                            <el-button type="text" @click="dataPush('js')" :autofocus="true" size="mini">js走势图</el-button>
                            <el-button type="text" @click="dataPush('java')" size="mini">Java走势图</el-button>
                            <el-button type="text" @click="dataPush('python')" size="mini">Python走势图</el-button>
                        </div>
                        <input type="text" v-model="val" class="changeInput" ref="changeInput" @change="initEchart()" >
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="data-echart pies-chart">
                        <div class="pie-echart">
                            <pie-chart-list :pieData="pieOne" ref="pieOne"></pie-chart-list>
                        </div>
                        <div class="pie-echart">
                            <pie-chart-list :pieData="pieTwo" ref="pieTwo"></pie-chart-list>
                        </div>
                        <div class="pie-echart">
                            <pie-chart-list :pieData="pieThree" ref="pieThree"></pie-chart-list>
                        </div>
                        <div class="pie-echart">
                            <pie-chart-list :pieData="pieFour" ref="pieFour"></pie-chart-list>
                        </div>                        
                    </div>
                </el-col>
            </el-row>
            <el-row class="line-row">
                <span class="line-title">数据明细</span><span>({{dataDetailed}})</span>
            </el-row>
            <el-row class="tab-box">
                <el-table
                    size="mini"
                    :highlight-current-row="true"
                    :data="tabData"                       
                    :border="false"
                    :stripe="true"                 
                    style="width: 100%">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="id"
                    width="100"
                    label="ID">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    width="120"
                    label="姓名">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    width="100"
                    label="性别">
                    </el-table-column>
                    <el-table-column
                    prop="age"
                    width="100"
                    label="年龄">
                    </el-table-column>
                    <el-table-column
                    prop="occupation"
                    label="职业">
                    </el-table-column>
                    <el-table-column
                    prop="hobby"
                    label="爱好">
                    </el-table-column>
                    <el-table-column
                    prop="income"
                    label="收入">
                    </el-table-column>
                    <el-table-column
                    prop="tel"
                    label="电话">
                    </el-table-column>
                </el-table>
        </el-row>
        <div class="block-pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import brokenLine from '../echarts/brokenLine';
import pieChartList from '../echarts/pieChartList';

export default {
    name: 'dataStatistics',
    data () {
        return {
            name: 'dataStatistics',
            pageName: '数据统计',
            historyData: '2018-01-01至2018-06-30',
            dataDetailed: '2018-06-01至2018-06-30',
            currentPage: 1,
            time: '',
            val: '',
            isShow: true,
            options: [{
                value: 'js',
                label: 'javaScript'
                }, {
                value: 'java',
                label: 'java'
                }, {
                value: 'py',
                label: 'python'
                }, {
                value: 'php',
                label: 'php'
                }, {
                value: 'node',
                label: 'node.js'
                }],
                value: '',
                dataArr: [],
                pageInfo: {
                total: 0,
                pageIndex: 0,
                pageSize: 10
                },
                tabData: [],
                jsArr: [2880, 3590, 4990, 6200, 7580, 8370, 9550],
                javaArr: [3579, 4300, 5200, 6150, 7790, 8580, 9200],
                pythonArr: [1480, 2100, 2900, 3800, 4500, 5800, 6660],
                pieOne: {data: [{value:3000, name:'7k'}, {value:5000, name:'9k'}, {value:1200, name:'12k'}], title: 'web前端薪资比重'},
                pieTwo: {data: [{value:4000, name:'7k'}, {value:4500, name:'9k'}, {value:1300, name:'12k'}], title: 'java薪资比重'},
                pieThree: {data: [{value:3500, name:'7k'}, {value:4500, name:'9k'}, {value:1000, name:'12k'}], title: 'python薪资比重'},
                pieFour: {data: [{value:2000, name:'7k'}, {value:5000, name:'9k'}, {value:900, name:'12k'}], title: 'php薪资比重'},
        }
    },
    created () {
        this.dataArr = this.jsArr;
    },
    mounted () {
        this.initEchart(); // 初始化图表
        this.totalFn();
        this.tabData = this.tableData.slice(0, 10);
    },
    components: {
        brokenLine, pieChartList
    },
    computed: {
        tableData () {
            return this.$store.state.peopleInfo;
        },
    },
    methods: {
        testLoad () {
            this.$common.menuPush(this, {pageName: '测试加载', path: 'testLoad'})
            this.$router.push({name: 'testLoad'})
        },
        totalFn () {
            this.pageInfo.total = this.tableData.length;
        },
        initEchart () {
            this.$refs.broken.setbrokenLine();
            this.$refs.pieOne.setpieChartList();
            this.$refs.pieTwo.setpieChartList();
            this.$refs.pieThree.setpieChartList();
            this.$refs.pieFour.setpieChartList();
        },
        dataPush (type) {
            let self = this;
            switch (type) {
                case 'js':
                self.dataArr = self.jsArr;
                break;
                case 'java':
                self.dataArr = self.javaArr;
                break;
                case 'python':
                self.dataArr = self.pythonArr;
                break;
            }
            setTimeout(function () {
                self.$refs.broken.setbrokenLine();
            },250)           
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageInfo.pageSize = val;
            let start = 0;
            let end = val;          
            this.tabData = this.tableData.slice(start, end);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let start = this.pageInfo.pageSize * (val - 1);
            let end = this.pageInfo.pageSize * val;
            this.tabData = this.tableData.slice(start, end);
        },
    }
}
</script>

<style lang="scss" scoped>
.line-title{
    font-weight: bold;
    padding-right: 4px;
}
.line-row{
    height: 30px;
    line-height: 30px; 
}
.switch-condition{
    margin: 10px 0;
    .el-date-editor--daterange.el-input__inner{
        width: 260px;
        margin-left: 10px;
    }
    .el-input__inner{
        border-radius: 14px;
    }
    .look-label{
        margin-left: 10px;
    }
    .el-select{
        width: 160px;
        border: none;
        border-radius: 14px !important;
        .el-input{
            border: none;
            border-radius: 14px !important;
            .el-input__inner{
                border: none;
                border-radius: 14px !important;
            }
        }
    }
}
.data-echart{
    height: 240px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    margin-bottom: 10px;
    position: relative;
    .line-echart{
        height: 100%;
    }
    .switch-line{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 16%;
        text-align: center;
        padding-top: 5px;
        box-sizing: border-box;             
    }
    .changeInput{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 10;
        opacity: 0;
        display: none;
    }
}
.pies-chart{
    display: flex;
    .pie-echart{
        width: 25%;
        height: 100%;
    }
}
.tab-box{
    border: 1px solid #eee;
}

.block-pagination{
    margin-top: 15px;
    display: flex;
    justify-content: center;
}

</style>