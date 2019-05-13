<template>
    <div>
        <h3>这个是测试的</h3>
         <div class="img-test">
             <img :src="require('../../assets/img/timg0.png')">
        </div>
        <div class="content-civ">        
            <ul class="img-list-box box">
                <li v-for="(item, index) in imgList" :key="index">
                    <img :src="item.src">
                    <h2>{{item.name}}</h2>
                    <div><label>售价：</label><span>{{item.price | toThousands1}}</span></div>
                    <div><label>大写：</label><span>{{item.price | convertCurrency}}</span></div>
                    <div>{{item.describe}}</div>
                </li>
            </ul>

            <ol class="box">
                <li v-for="(item,index) in animalList" :key="index">
                    <span>{{item.num}}</span>
                    <span>{{item.animal}}</span>
                </li>
            </ol>

            <div class="box">
                <button @click="addAnimal()">增加动物</button>
                <button @click="nextTickTest">nextTick-test</button>
                <p v-if="show" ref="p">测试neet-tick</p>
                <ul v-if="bool">
                    <li v-for="(item,index) in animalListTwo" :key="index">
                        <span>{{item.num}}</span>
                        <span>{{item.animal}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import findBrothersComponents from '../../common/findComponentDownward.js';

export default {
    name: 'imgList',
    data () {
        return {
            name: 'imgList',
            pageName: '图片列表页',
            imgList: [
                {
                    name: '功夫熊猫one',
                    describe: '这是功夫熊猫系列1的剧照',
                    price: 12580,
                    src: require('../../assets/img/timg0.png')
                },
                {
                    name: '功夫熊猫two',
                    describe: '这是功夫熊猫系列2的剧照',
                    price: 17790,
                    src: require('../../assets/img/timg1.jpg')
                },
                {
                    name: '功夫熊猫three',
                    describe: '这是功夫熊猫系列3的剧照',
                    price: 13890,
                    src: require('../../assets/img/timg3.jpg')
                }
            ],
            show: false
        }
    },
    created () {

    },
    mounted () {
        // const upWorks = findBrothersComponents(this, 'upWorks');
        // if (upWorks) {
        //     console.log(upWorks)
        // }
    },
    computed: {
        // animalList () {
        //     return this.$store.state.animals;
        // },
        ...mapState({
            // animals:state => {return state.animals},
            animalList:state => state.animals,
            bool: state => state.bool
        }),
        animalListTwo () {
            return this.$store.getters.filterAnimal;
        }
    },
    methods: {
        addAnimal () {
            let obj = {num: 4, animal: '熊猫'}
            this.$store.commit('addAnimals', obj)
        },
        nextTickTest () {
            this.show = !this.show;
            console.log(this.$refs.p);
            this.$nextTick(() => {
                console.log(this.$refs.p);
            })
        }       
    }
}
</script>
<style lang='scss'>
.img-test{
    img{
        width: 200px;
        height: 120px;
    }
}
.content-civ{
display: flex;
justify-content: space-between;

.box {
    width: 33%;
}
.img-list-box{
    li{
        padding: 10px 0;
        img{
            width: 200px;
            height: 120px;
        }
    }
}
}

</style>
