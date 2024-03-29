
var customObj = {
    convertCurrency: function (money) { // 数字转大写
      // 汉字的数字
      var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      // 基本单位
      var cnIntRadice = ['', '拾', '佰', '仟']
      // 对应整数部分扩展单位
      var cnIntUnits = ['', '万', '亿', '兆']
      // 对应小数部分单位
      var cnDecUnits = ['角', '分', '毫', '厘']
      // 整数金额时后面跟的字符
      var cnInteger = '整'
      // 整型完以后的单位
      var cnIntLast = '元'
      // 最大处理的数字
      var maxNum = 999999999999999.9999
      // 金额整数部分
      var integerNum
      // 金额小数部分
      var decimalNum
      // 输出的中文金额字符串
      var chineseStr = ''
      // 分离金额后用的数组，预定义
      var parts
      if (money === '') { return '' }
      money = parseFloat(money)
      if (money >= maxNum) {
      // 超出最大处理数字
        return ''
      }
      if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger
        return chineseStr
      }
      // 转换为字符串
      money = money.toString()
      if (money.indexOf('.') === -1) {
        integerNum = money
        decimalNum = ''
      } else {
        parts = money.split('.')
        integerNum = parts[0]
        decimalNum = parts[1].substr(0, 4)
      }
      // 获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        let zeroCount = 0
        let IntLen = integerNum.length
        for (let i = 0; i < IntLen; i++) {
          let n = integerNum.substr(i, 1)
          let p = IntLen - i - 1
          let q = p / 4
          let m = p % 4
          if (n === '0') {
            zeroCount++
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0]
            }
            // 归零
            zeroCount = 0
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
          }
          if (m === 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q]
          }
        }
        chineseStr += cnIntLast
      }
      // 小数部分
      if (decimalNum !== '') {
        let decLen = decimalNum.length
        for (let i = 0; i < decLen; i++) {
          let n = decimalNum.substr(i, 1)
          if (n !== '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i]
          }
        }
      }
      if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger
      } else if (decimalNum === '') {
        chineseStr += cnInteger
      }
      return chineseStr
    },
    toThousands1: function (num) {	//转千位符 方法1
      var num = Number(num).toFixed(2);
      var n = num.indexOf('.');
      var str1 = num.slice(0, n), 
          str2 = num.slice(n, num.length), 
          result = '';
    //    var num = (num || 0).toString(), result = '';
        while (str1.length > 3) {
            result = ',' + str1.slice(-3) + result;
            str1 = str1.slice(0, str1.length - 3);
        }
        if (str1) { result = str1 + result; }
        return result+str2;
    },
    toThousands2: function (num) {	// 转千位符 方法2
      var num = Number(num).toFixed(2);
      var n =	num.indexOf('.');
      var str1 = num.slice(0, n), str2 = num.slice(n, num.length);
        var result = '', counter = 0;
    //    num = (num || 0).toString();
        for (var i = str1.length - 1; i >= 0; i--) {
            counter++;
            result = str1.charAt(i) + result;
            if (!(counter % 3) && i != 0) { result = ',' + result; }
        }
        return result+str2;
    },
  }
  export default customObj
  