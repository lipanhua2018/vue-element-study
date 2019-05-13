<template>
<!-- 折线图 -->
    <div ref="brokenLine" class="brokenLine">

    </div>
</template>

<script>
export default {
    name: 'brokenLine',
    data () {
        return {
            name: 'brokenLine',
            pageName: '折线图',
            option: {
                title: {
                text: '职位发布增长视图',
                top: '10',
                textStyle: {
                    fontSize: '14',
                }
                },
                xAxis: {
                    type: 'category',
                    data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line'
                }]
            }
        }
    },
    props: [ 'trend' ],
    created () {
        let self = this;
        self.option.series[0].data = self.trend;     
    },
    mounted () {

    },
    methods: {
        setbrokenLine () {
            let self = this;
            self.option.series[0].data = self.trend;
            let dom = this.$refs.brokenLine;           
            let brokenLine = this.$echarts.init(dom);
                brokenLine.setOption(this.option);
        },
        lookData () {

        }

    }
}
</script>

<style scoped>
.brokenLine{
    height: 100%;
}
</style>

