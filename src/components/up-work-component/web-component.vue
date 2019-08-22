<template>
    <div class="web-component">
        <el-row class="student-content" v-for="(item, index) in itObj.webArr" :key="index">
            <el-col :span="6" class="student-list">
                <el-checkbox class="largeClass" v-model="itObj.webArr[index].largeClass">{{itObj.webArr[index].course}}</el-checkbox>
            </el-col>
            <el-col :span="12" class="student-list">
                <el-col :span="8" class="studt-type">
                    <dl>
                        <dt>Array</dt>
                        <dd>push,unshift,join</dd>
                    </dl>
                    <dl>
                        <dt>String</dt>
                        <dd>
                            indexOf,splice
                        </dd>
                    </dl>
                </el-col>
                <el-col :span="8" class="studt-type">
                    <dl>
                        <dt>Math</dt>
                        <dd>round,ceil,floor</dd>
                    </dl>
                    <dl>
                        <dt>Date</dt>
                        <dd>
                            getDay,getMonth
                        </dd>
                    </dl>
                </el-col>
                <el-col :span="8" class="studt-type">
                    <dl>
                        <dt>RegExp</dt>
                        <dd>exec,test</dd>
                    </dl>
                    <dl>
                        <dt>Function</dt>
                        <dd>
                            eval,parseFloat
                        </dd>
                    </dl>
                </el-col>
            </el-col>
            <el-col :span="6" class="student-list last-term">
                <div>
                    <span class="lab-span">老师：</span>
                    <el-select size="mini" v-model="taecher" placeholder="请选择">
                        <el-option
                        v-for="item in selectType.taecher"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="lab-span">课时：</span>
                    <el-select size="mini" v-model="hour" placeholder="请选择">
                        <el-option
                        v-for="item in selectType.classHour"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="lab-span">类型：</span>
                    <el-select size="mini" v-model="course" placeholder="请选择">
                        <el-option
                        v-for="item in selectType.courseType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: {
        itObj: {
            type: Object,
            default: function () {
                return {
                    webArr: []
                }
            }
        },
        selectType: {
            type: Object,
            default: function () {
                return {
                    taecher: [],
                    classHour: [],
                    courseType: []
                }
            }
        }
    },
    created () {},
    mounted () {},
    methods: {},
    watch: {
        itObj: {
            handler: function (val, oldVal) {
                console.log("oldVal:", oldVal)
             },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.web-component{
    .student-content{
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    .student-list{
        height: 100px;
        margin: 20px 0;
        border-left: 1px solid #ddd;
        .largeClass{
            height: 100px;
            line-height: 100px;
            margin-left: 15px;
        }
        .studt-type{
            padding: 0 10px;
            dl{
                margin-bottom: 10px;
                dt{
                    color: #999;
                    font-size: 12px;
                    padding-bottom: 6px;
                }
                dd{
                    word-wrap:break-word;
                    font-size: 14px;
                    color: #333;
                }
            }           
        }
        .lab-span{
            display: inline-block;
            width: 40px;
            text-align: right;
            margin-left: 10px;
        }
    }
    .last-term{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // align-content:space-between;
    }
}
.student-list:nth-child(1){
    border-left: none;
}
}
</style>
