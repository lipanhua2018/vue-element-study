<template>
    <div class="test-load">
        <div id="testLoad">
            测试加载vue组件
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import Vue from 'vue';
import loadComponent from '../../common/loadComponent.js';
export default {
    name: 'testLoad',
    data () {        
        return {
            name: 'testLoad',
            pageName: '测试加载组件',
            uls: ['http://mui.midea.com/dist/MideaSelector/MideaSelector.min.js']
        }
    },
    created () {
        console.log(Vue)
    },
    mounted () {
        // loadComponent.loadVueComponents(this.uls, () => {
        //         new Vue({
        //         el: '#testLoad',
        //         data: {
        //             message: 'Hello Vue!',
        //         },
        //         template:"<vue-midea-selector dataType='2' lang='ja-JP'></vue-midea-selector>"
        //     })
        // })
    },
    methods: {
     
    }
}
</script>

<style lang='scss'>


</style>
