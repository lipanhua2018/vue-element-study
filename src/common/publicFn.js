export default {
    dataType: function (type){  // 检测数据类型
        var dataType = Object.prototype.toString;
            return dataType.call(type)
    },
    setCookie: function (name, value, day) {
        if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
	        var expires = day * 24 * 60 * 60 * 1000;
	        var date = new Date(+new Date()+expires);
	        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
        } else {
         	document.cookie = name + "=" + escape(value);
        }
    },
    getCookie: function (name) {
        var arr;
         var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
         if (arr = document.cookie.match(reg)){
             return unescape(arr[2]);
        } else {
            return null;
        }       
    },
    /**
     * 删除cookie
     * @param name cookie的名称
     */
    delCookie: function (name) {
        customObj.setCookie(name, ' ', -1);
    },
    setStorage: function (key, value) {
        if (this.dataType(value) != '[object String]') {
            // console.log('存储对象是个引用数据类型')
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            // console.log('存储对象是个字符串')
            localStorage.setItem(key, value)
        }        
    },
    getStorage: function (key) {       
        return localStorage.getItem(key);  
    },
    removeStorage: function (key) {
        if (this.getStorage(key)) {
            localStorage.removeItem(key)
        } else {
            console.log('storage中并没有存储' + key)
        }
    },
    initTime (num) { // 初始化开始时间，参数num是初始化几天时间
        const date = new Date();
        let time = date.setTime(date.getTime() - 3600 * 1000 * 24 * num);
        let dates = new Date(time);
        let dateValue = dates.getFullYear() + '-' + this.numAddZero(dates.getMonth() + 1) + '-' + this.numAddZero(dates.getDate());
        return dateValue;
    },
    numAddZero (num) {
        if (num < 10) {
            return '0' + num
        } else {
            return num
        }
    },
    getDateFn (symbol, self) {
        if (this.dataType(symbol) != '[object String]') {
            self.$message({
                type: 'warning',
                message: '请传递一个字符串类型的符号'
            }); 
            return
        }
        let dateObj = new Date();
            let objDate = {};
            let n = dateObj.getFullYear(); // 年
            let y = dateObj.getMonth() + 1; // 月
            let r = dateObj.getDate();  // 日
            let z = dateObj.getUTCDay();  // 周
            let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            objDate.date = n + symbol + y + symbol + r;
            objDate.week = week[z];
            return objDate;
        }
}