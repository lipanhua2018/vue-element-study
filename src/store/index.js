import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dataInfo: {},   // 公告信息数据
        showAnimation: true,   // 是否执行动画
        peopleData: {},
        peopleInfo: [], // 学员列表数据
        cardList: [],    // 课程列表数据
        topMenu: {
            navList: [{pageName: '欢迎页', path: 'welcome'}],
            pageName: '欢迎页'
        },
        detailsData: {},
        animals: [{num: 1, animal: '老虎'}, {num: 2, animal: '狮子'}, {num: 3, animal: '大象'}],
        bool: true
        
    },
    getters: {
        filterAnimal: state => {
            return state.animals.filter(item => {
                return item.num > 1
            })
        }
    },
    mutations: {
        addAnimals (state, params) {
            state.animals.push(params)
        },
        routerAnimation (context, payload) {    //  路由动画，失败第一次
            context.showAnimation = !context.showAnimation;
        },
        addStudent (context, payload) { // 增加学员
            context.peopleInfo.push(payload);
        },
        editStudent (context, payload) { // 编辑学员信息       
            context.peopleInfo.forEach((item, index) => {
                if (item.id == payload.id) {
                    item = payload;
                }
            })
        },
        deleteStudent (context, payload) { // 删除学员
            const peopleInfo = JSON.parse(JSON.stringify(context.peopleInfo));
            var result = [];   
            for (var i = 0; i < peopleInfo.length; i++) {
                var item = peopleInfo[i],
                    isDelete = false;
                for (var j = 0; j < payload.length; j++) {
                    var cur = payload[j];
                    if (item.id == cur.id && item.name == cur.name) {
                        isDelete = true;
                        break;
                    }
                }
                if (!isDelete) {
                    result.push(item);
                }
            }
            context.peopleInfo = result;
        },
        deleteCurMenu (context, payload) {   // 顶部导航删除       
            let idx = context.topMenu.navList.findIndex((item, index) => {
                if (item.path === payload.path) {
                    return index
                }
            })
            if (context.topMenu.navList.length > 1) {
                context.topMenu.navList.splice(idx, 1)  //删除当前项
            }           
            // console.log(payload, idx)
        },
        pushNavList (context, payload) { // 顶部导航路由增加新的页面
            context.topMenu.pageName = payload.pageName;
            context.topMenu.navList.push(payload);
        },
        curHighlight (context, payload) {   // goPage的时候 修改当前高亮
            context.topMenu.pageName = payload.pageName;
        },
        initData (context, payload) {   // 接收来自actions里getDataInfo里的数据
            context.dataInfo = payload.data;
        },
        setStatePeopleInfo (context, payload) { // 存储peopleInfo数据信息
            context.peopleInfo = payload;
        },
        setStateCardList (context, payload) {   // 存储CardList数据信息
            context.cardList = payload;
        },
        setdetailsData (context, payload) { // 存储详情数据
            context.detailsData = payload;
        }
    },
    actions: {  // actions 行动 异步执行
        getDataInfo (context) {
            return new Promise((resolve, reject) => {
                let url = 'http://www.phonegap100.com/appapi.php'
                axios.get(url, {
                    params: {
                        a: 'getPortalList',
                        catid: '20',
                        page: '1'
                    }
                }).then((response) => {
                    if (response.statusText === 'OK') {
                        context.commit('initData', response);   // 这里是把数据commit到vuex-mutations,通过mutations把数据存储到state里
                        resolve(response);  // 把数据保存在promise的resolve中
                    }                    
                })
            })
        },
        getCardList (context) {
            return new Promise ((resolve, reject) => {
                let url = '../../static/data/cardList.json'
                axios.get(url).then((res) => {
                    if ( res.statusText === 'OK' ) {
                        context.commit('setStateCardList', res.data)
                        resolve(res.data)
                    }                   
                })
            })
        },
        getPeopleInfo (context) {   // 请求本地表格数据
            return new Promise((resolve, reject) => {
                let url = '../../static/data/peopleInfo.json'
                axios.get(url).then((res) => {
                    if ( res.statusText === 'OK' ) {
                        context.commit('setStatePeopleInfo', res.data)
                        resolve(res.data)
                    }                   
                })
            })
        },
        setDataStorage (context, key, data) {
            return new Promise((resolve, reject) => {
                if (this.$publicFn.getStorage(key)) {
                    let val = this.$publicFn.getStorage(key);
                    context.commit('setStatePeopleInfo', val);
                    resolve(val);
                } else {
                    if (data) {
                        this.$publicFn.setStorage(key, data);
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '未检测到需要存储到storage的数据'
                        });
                    }                   
                }
            })
        }
    }
})