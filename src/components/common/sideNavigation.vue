<template>
    <!-- 侧边导航 -->
    <div class="sideNavigation">
        <el-col class="navigation">
            <div class="logo-area">
                <div class="logo-box text-align-center">
                    <img class="img-logo" src="../../assets/img/logo.png" />
                </div>
                <div class="portrait-box text-align-center">
                    <img class="portrait-logo" src="../../assets/img/jiaoyu.png" />
                </div>
                <div class="edit-user-name text-align-center">
                    <input type="text" v-model="userInfo" ref="user" @blur="preservationUser()" disabled>
                    <i class="fa fa-pencil-square-o edit-user" @click="editUser()"></i>
                </div>
            </div>
            <el-menu
            default-active="1"
            class="navigation-bg"            
            @select="currentMenu"         
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1" :class="{isActive: index == '1'}">
                <i class="fa fa-signing icon-size"></i>
                <router-link to="/welcome"><span>欢迎页</span></router-link>               
            </el-menu-item>
            <el-menu-item index="2" :class="{isActive: index == '2'}">
                <i class="el-icon-upload"></i>
                <router-link to="/upWorks"><span>上传课程</span></router-link>               
            </el-menu-item>
            <el-menu-item index="3" :class="{isActive: index == '3'}">
                <i class="fa fa-pie-chart icon-size2"></i>              
                <router-link to="/dataStatistics"><span>数据统计</span></router-link>
            </el-menu-item>
            <el-menu-item index="4" :class="{isActive: index == '4'}">
                <i class="fa fa-columns icon-student"></i>
                <router-link to="/courseDisplay"><span>课程展示</span></router-link>               
            </el-menu-item>
             <el-menu-item index="5" :class="{isActive: index == '5'}">
                <i class="el-icon-star-on"></i>
                <router-link to="/member"><span>学员管理</span></router-link>               
            </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
export default {
    name: 'sideNavigation',
    data () {
        return {
            name: 'sideNavigation',
            pageName: '侧边导航',
            userInfo: 'super-admin',
            index: ''
        }
    },
    props: [],
    created () {

    },
    mounted () {
        
    },
    components: {

    },
    computed: {

    },
    methods: {
        editUser () {
            this.$refs.user.removeAttribute('disabled');
            this.$refs.user.classList.add('edit-input');
        },
        preservationUser () {
            let self = this;
            self.$refs.user.classList.remove('edit-input');
            self.$refs.user.setAttribute('disabled','disabled');
            self.$emit('userInfoFn', this.userInfo)
        },
        returnUser () {
            return this.userInfo
        },
        currentMenu (index, indexPath) {
            this.index = index;
            switch (index) {
                case '1':
                this.$emit('navPush', {pageName: '欢迎页', path: 'welcome'});
                this.$router.push({path: 'welcome'});                
                break;
                case '2':
                this.$emit('navPush', {pageName: '上传课程', path: 'upWorks'});
                this.$router.push({path: 'upWorks'});
                break;
                case '3':
                this.$emit('navPush', {pageName: '数据统计', path: 'dataStatistics'});
                this.$router.push({path: 'dataStatistics'});
                break;
                case '4':
                this.$emit('navPush', {pageName: '课程展示', path: 'courseDisplay'});
                this.$router.push({path: 'courseDisplay'});
                break;
                case '5':
                this.$emit('navPush', {pageName: '学员管理', path: 'member'});
                this.$router.push({path: 'member'});
                break;
            }           
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="scss" scoped>
.sideNavigation,.navigation{
    height: 100%;
}
.logo-area{
    .logo-box{
        padding: 20px 0;
        .img-logo{
            width: 90%;
            margin: auto;
        }
    }
    .portrait-box{
        .portrait-logo{
            width: 50%;
            border-radius: 60px; 
        }
    }
    .edit-user-name{
        .edit-input{
            border: 1px solid #46495d;
            box-shadow: 1px 1px 1px #3f4151;
        }        
        input{
            width: 45%;
            background-color: rgba(255, 255, 255, 0);
            color: #f5f5f5;
            border: none;
        }
        .edit-user{
            cursor: pointer;
            &:hover{
                color: #dbeef1;
            }
        }
        color: #f5f5f5;
        font-size: 14px;
        padding: 20px 0;
    }  
}
.navigation{
    background-color: #262835;
    .navigation-bg{
        background-color: #262835;    
        border-right: 1px solid;
        .isActive{
            background-color: #20242f;
        }
        .icon-size{
            font-size: 19px !important;
            padding-left: 2px;
            padding-right: 10px;
        }
        .icon-size2{
            font-size: 18px !important;
            padding-left: 2px;
            padding-right: 10px;
        }
        .icon-student{
            font-size: 17px !important;
            padding-left: 2px;
            padding-right: 10px;
        }
        li {
            span {
                color: #f5f5f5;
            }
            &:hover{
                background-color: #20242f;
            }
        }
        .nav-one{
            ul{
                background-color: #303340;
            }                       
            li {
                color: #bcc5dd;
                background-color: #303340;
                div{
                    color: #f5f5f5;
                    background-color: #494e5e;
                }
                &:hover{
                    color: #20242f;
                    background-color: #fff;
                }
            }
        }
    }
}

</style>
