<template>
    <div>
        <el-dialog :title="popupInfo.title" :visible.sync="dialogFormVisible">
        <el-form :model="form" size="mini">
            <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="form.id" :disabled='isEdit.id'></el-input>
            </el-form-item>

            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" :disabled='isEdit.name'></el-input>
            </el-form-item>

            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="form.sex" :disabled='isEdit.sex'></el-input>
            </el-form-item>

            <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="form.age" :disabled='isEdit.age'></el-input>
            </el-form-item>

            <el-form-item label="职业" :label-width="formLabelWidth">
            <el-select v-model="form.occupation" placeholder="请选择职业" class="select-occupation" :disabled='isEdit.occupation'>
                <el-option v-for="(item, index) in occupation" :label="item.value" :value="item.key" :key="index"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="爱好" :label-width="formLabelWidth">
                <el-input v-model="form.hobby" :disabled='isEdit.hobby'></el-input>
            </el-form-item>

            <el-form-item label="月薪" :label-width="formLabelWidth">
                <el-input v-model="form.income" :disabled='isEdit.income'></el-input>
            </el-form-item>

            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.tel" :disabled='isEdit.tel'></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd()" size="mini">取 消</el-button>
            <el-button type="primary" @click="confirmAdd()" size="mini">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>
 <script>
 export default {
    name: 'addDialog',
    data () {
        return {
            name: 'addDialog',
            dialogFormVisible: false,
            form: {},
            occupation: [{key: 'javaScript', value: '前端开发工程师'},
                    {key: 'java', value: 'java开发工程师'},
                    {key: 'python', value: 'python开发工程师'},
                    {key: 'ui', value: 'ui设计师'},
                    {key: 'ue', value: '用户体验工程师'}
                ],
            formLabelWidth: '60px'
        }
    },
    props: ['info', 'popupInfo', 'isEdit'],
    created () {

    },
    mounted () {

    },
    methods: {
        confirmAdd () { // 确认新增，编辑            
            switch (this.popupInfo.type) {
                case 'add':
                    for (let key in this.form) {
                        if (!this.form[key]) {
                            this.$message({
                            type: 'warning',
                            message: '请把信息录入完整'
                        });
                        return;
                        }
                    }
                    this.$emit('confirmAdd', this.form);
                break;
                case 'edit':
                    this.$emit('confirmEdit', this.form);
                break;
            }
            this.dialogFormVisible = false;            
        },
        cancelAdd () {  // 取消新增
            this.dialogFormVisible = false;           
        },
        formInfo () {
            this.form = this.info;
            this.dialogFormVisible = true;
        }
    }

 }
 </script>
 
 <style lang="scss" scoped>
.select-occupation{
    width: 100%; 
}
 </style>
 