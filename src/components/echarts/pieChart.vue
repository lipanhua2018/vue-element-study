<template>
<!-- 饼图 -->
    <div class="pieChart" ref="pieChart">

    </div>
</template>

<script>
import {findComponentDownward, findBrothersComponents} from '../../common/findComponentDownward.js';
export default {
    name: 'pieChart',
    data () {
        return {
            name: 'pieChart',
            pageName: '饼图',
            option: {
            title: {
                text: '学员学习占比'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: '30',
                x: 'left',
                data:['web前端','ui设计','Java开发','python开发','测试工程师']
            },
            series: [
                {
                    name:'学习比例',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:1035, name:'web前端'},
                        {value:510, name:'ui设计'},
                        {value:834, name:'Java开发'},
                        {value:535, name:'python开发'},
                        {value:348, name:'测试工程师'}
                    ]
                }
            ]
        }
        }
    },
    props: [],
    created () {
    
    },
    mounted () {
        const brother = findBrothersComponents(this, 'lineChart')   // 找到兄弟组件
        if (brother.length) {
            console.log(brother)
        }
    },
    methods: {
        setPieChart () {
            let dom = this.$refs.pieChart;
            let pieEcharts = this.$echarts.init(dom);
                pieEcharts.setOption(this.option);
        }
    }
}
</script>

<style scoped>
.pieChart{
    height: 100%;
}
</style>
