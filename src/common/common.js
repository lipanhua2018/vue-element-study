// import fs from 'fs';

export default {
    menuPush (self, data) { // 顶部导航路由的一个公共方法，主要对vuex里面的数据进行处理，接收两个参数，当前使用页面this,data需要处理的数据
        self.$store.commit('curHighlight', data)
        let navList = self.$store.state.topMenu.navList;
        let idx = navList.map(item => {
            return item.pageName;
        })
            // console.log(idx)
        if (idx.indexOf(data.pageName) !== -1) {
            return;
        } else  {
            self.$store.commit('pushNavList', data)
        }
    }
}