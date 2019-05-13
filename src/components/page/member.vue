<template>
    <!-- 会员管理 -->
    <div class="member showAnimation">
        <el-row class="member-btn">
            <el-button v-tip="deleteTip" @click="deleteStudent()" class="right" size="mini" type="danger" round plain>删除会员</el-button>
            <el-button @click="studentInfo(form, 'add')" class="right" size="mini" type="primary" round plain>新增会员</el-button>          
        </el-row>
       <el-row class="tab-box">
                <el-table
                    size="mini"
                    :highlight-current-row="true"
                    :data="tabData"                       
                    :border="true"
                    :stripe="true"
                    ref = "tableDataRef"                    
                    @selection-change="selectFn"
                    @select="isDelete"
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
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="studentInfo(scope.row, 'look')" type="text" size="small">查看</el-button>
                        <el-button @click="studentInfo(scope.row, 'edit')" type="text" size="small">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
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
        </el-row>
        <add-dialog ref="addDialog" :info="lookData" :popupInfo="popupInfo" :isEdit="isEdit" @confirmAdd="confirmAddFn" @confirmEdit="confirmEdit"></add-dialog>

    </div>
</template>

<script>
import publicFn from '../../common/publicFn.js';
import addDialog from '../../components/common/addDialog';

export default {
    name: 'member',
    inject: ['app'],    // 执行注入
    data () {
        return {
            name: '会员管理',
            deleteTip: '删除会员',
            title: '',
            popupInfo: {},
            listNum: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
            currentPage: 1,
            lookData: {},
            selection: [],
            form: {
                id: '',
                name: '',
                sex: '',
                age: '',
                occupation: '',
                hobby: '',
                income: '',
                tel: ''
            },
            isEdit: {},
            pageInfo: {
                total: 0,
                pageIndex: 0,
                pageSize: 10
            },
            tabData: []
        }
    },
    created () {

    },
    mounted () {
        this.totalFn();
        console.log(this.app)
        this.app.getUser(); // 执行注入的方法
        this.tabData = this.tableData.slice(0, 10);
    },
    components: {
        addDialog
    },
    computed: {
        tableData () { // 计算属性接收自vuex state里的数据
            return this.$store.state.peopleInfo;
        },
    },
    methods: {
        totalFn () {
            this.pageInfo.total = this.tableData.length;
        },
        studentInfo (info, type) {   // 新增，查看， 编辑公共方法
        // 方法逻辑：新增，新增的弹出自动生成id序列号，初始化传递给子组件的数据lookData
            let self = this;
            let isEdit = {id: true, name: false, sex: false, age: false, occupation: false, hobby: false, income: false, tel: false};
            this.lookData = info;
            this.isEdit = isEdit;
            // console.log(this.lookData)
            switch (type) {
                case 'add':
                    let obj = {id: '', name: '', sex: '', age: '', occupation: '', hobby: '', income: '', tel: ''};                   
                    this.lookData = obj;
                    this.lookData.id = this.tableData.length + 1;
                    this.popupInfo = {title: '新增学员信息', type: 'add'};
                break;
                case 'edit':
                    this.popupInfo = {title: '编辑学员信息', type: 'edit'};
                break;
                case 'look':
                    let isEdit = {id: true, name: true, sex: true, age: true, occupation: true, hobby: true, income: true, tel: true};
                    this.isEdit = isEdit;
                    this.popupInfo = {title: '查看学员信息', type: 'look'};
                break;
            }
            setTimeout(function() {
                self.$refs.addDialog.formInfo();
            },150)            
        },
        confirmAddFn (student) { // 确认添加学员方法，接收addDialog子组件的数据，触发vuex里addStudent方法       
            this.$store.commit('addStudent', student);
            this.totalFn();
            this.paginationFn();
        },
        confirmEdit (student) { // 确认编辑
            this.$store.commit('editStudent', student);
        },
        handleSizeChange(val) {            
            this.pageInfo.pageSize = val;
            let start = 0;
            let end = val;          
            this.tabData = this.tableData.slice(start, end);
            // console.log(`每页 ${val} 条`, start, end, this.tabData);
        },
        handleCurrentChange(val) {  // 翻页， 上页下页方法
            this.pageInfo.pageIndex = val;
            this.paginationFn();
            // console.log(`当前页: ${val}`);
        },
        selectFn (selection) {  // 复选框方法
            if (selection.length) {
                this.selection = selection;
                // console.log(this.selection, selection)
            }
        },
        isDelete (selection, row) {
            console.log(selection, row, 198)
        },
        deleteStudent () {
            if (this.selection.length) {            
                this.$confirm('此操作将永久删除该信息, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(this.selection)
                    this.$store.commit('deleteStudent', this.selection)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.paginationFn();
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            } else {
                this.$message({
                    type: 'warning',
                    message: '请先选择需要删除的数据'
                });
            }
        },
        paginationFn () {   // 当前页显示多少数据
            let start = 0;
            let end = 10;
            if (this.pageInfo.pageIndex) {
                start = this.pageInfo.pageSize * (this.pageInfo.pageIndex - 1);
                end = this.pageInfo.pageSize * this.pageInfo.pageIndex;
            }                     
            this.tabData = this.tableData.slice(start, end);
            this.totalFn();
        }
    }
}
</script>

<style lang='scss' scoped>
.member-btn{
    padding-bottom: 10px;
    .el-button{
        margin-left: 10px;
    }
}
.tab-box{
    .block-pagination{
        margin-top: 15px;
        display: flex;
        justify-content: center;
    }
}
</style>