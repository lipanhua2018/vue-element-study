<template>
<!-- 饼图列表 -->
    <div ref="pieChartList" class="pieChartList">

    </div>
</template>

 <script>
 export default {
    name: 'pieChartList',
    data () {
        return {
            name: 'pieChartList',
            pageName: '饼图列表',
            option: {
            title : {
                text: '',
                subtext: '纯属虚构',
                x:'center',
                top: '10',
                textStyle: {
                    fontSize: '14'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name: '学生数量',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        }
    },
    props: [ 'pieData' ],
    created () {
        this.option.title.text = this.pieData.title;
        this.option.series[0].data = this.pieData.data;
    },
    mounted () {

    },
    methods: {
        setpieChartList () {
            let dom = this.$refs.pieChartList;
            let pieChartList = this.$echarts.init(dom);
                pieChartList.setOption(this.option);
        }
    }
 }
 </script>
 
<style scoped>
.pieChartList{
    height: 100%;
}
</style>

