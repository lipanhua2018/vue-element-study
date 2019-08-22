<template>
    <div>
        <h3>这个是测试的</h3>
        <div class="img-test">
            <img :src="require('../../assets/img/timg0.png')">
            <div>
                <span>slot实战</span>
                <testSlot><span slot="tip">这是个文字提示</span></testSlot>
                <testSlot @click.native="handleClick"><button slot="btn">按钮slot</button></testSlot>
                <slotScope :bookList="bookList">
                    <template slot-scope="slotProps">
                        <span>{{slotProps.name}}</span>
                    </template>
                </slotScope>
            </div>
            <div class="upload-img">
                <el-upload
                class="upload-demo"
                action="http://172.18.111.92:8089/userRight/uploadThetPicture"
                :on-preview="handlePreview"
                multiple
                :limit="3"
                :accept="'form-data'"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
        </div>
        <div class="div-tab">
         <el-table :data="tableData" style="width: 100%" border>
             <el-table-column label="转让人" width="200" >
                 <el-table-column prop="namez" label="姓名">
                 </el-table-column>
                 <el-table-column prop="telz" label="电话">
                 </el-table-column>
             </el-table-column>

             <el-table-column label="受让人" width="200">
                 <el-table-column prop="names" label="姓名">
                 </el-table-column>
                 <el-table-column prop="tels" label="电话">
                 </el-table-column>
             </el-table-column>

                 <el-table-column prop="business" label="业务">
                 </el-table-column>

                 <el-table-column prop="member" label="会员归属">
                 </el-table-column>

                 <el-table-column prop="time" label="申请时间">
                 </el-table-column>
                   <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleExamine(scope.$index, scope.row)">审核</el-button>
                    </template>
                    </el-table-column>
         </el-table>
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
import testSlot from '../common/testSlot/testSlot';
import slotScope from '../common/testSlot/slotScope';

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
            bookList: [{name: '《狼图腾》', price: '$15'},{name: '《三体》', price: '$28'},{name: '《白夜行》', price: '$18'}],
            show: false,
            tableData: [{
                namez: '姜戎',
                telz: '18876543890',
                names: '路遥',
                tels: '13790908766',
                business: '会员转让',
                member: '姜戎原会员',
                time: '2019/06/05 14:21'
            },
            {
                namez: '诸葛',
                telz: '13689907650',
                names: '周瑜',
                tels: '15542009817',
                business: '会员转让',
                member: '诸葛原会员',
                time: '2019/06/04 10:15'
            }],
            fileList: []
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
    components: {
        testSlot, slotScope
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
        handleExamine (index, row) {
            console.log(index, row)
        },
        handleClick () {
            console.log('如果是自定义@click，是监听不到的，必须加上事件修饰符native，改为原生事件')
        },
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
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
.upload-img{
    position: absolute;
    right: 50px;
    top: 70px;
}
.div-tab{
    padding: 20px 0;
}
</style>
