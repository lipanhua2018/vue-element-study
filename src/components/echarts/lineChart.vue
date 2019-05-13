<template>
<!-- 线性图 -->
    <div class="lineChart" ref="lineChart">

    </div>
</template>

<script>
export default {
    name: 'lineChart',
    data () {
        return {
            name: 'lineChart',
            pageName: '线性图',
            option: {
            title: {
                text: '薪资走向视图'
            },
            // legend: {
            //     orient: 'vertical',
            //     top: '30',
            //     x: 'left',
            //     data:['web前端','Java开发'],
            //     tooltip: {
            //         show: true
            //     }
            // },
            xAxis: {
                type: 'category',
                data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [8200, 9320, 9010, 9340, 11290, 11380, 11320],
                type: 'line',
                smooth: true
            },
            {
                data: [7600, 8800, 9200, 9500, 11200, 11300, 11550],
                type: 'line',
                smooth: true
            }]
        }
        }
    },
    props: [],
    created () {

    },
    mounted () {

    },
    methods: {
        setLineChart () {
            let dom = this.$refs.lineChart;
            let lineEcharts = this.$echarts.init(dom);
                lineEcharts.setOption(this.option);
        }
    }
}
</script>

<style scoped>
.lineChart{
    height: 100%;
}
</style>
