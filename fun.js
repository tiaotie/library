// 一些看看但是没什么用的方法 

// 判断是什么类型的值（dong）
// type([1,2,3])
function type (target) {
    let ret = typeof(target);
    let template = {
        "[object Array]" : "array",
        "[object Object]" : "object",
        "[object Number]" : "number - Object",
        "[object Boolean]" : "boolean - object",
        "[object String]" : 'string - object'
    }
    if (target === null){
        return 'null';
    }else if(ret == 'object'){
        let str = Object.prototype.toString.call(target);
        return template[str];
    }else{
       return ret; 
    }
}

// 数组乱序（dong）
// let arr = [1,2,3,4,5,6,7];
// arr = outOfOrder(arr)
function outOfOrder(target) {
    target.sort((a,b) => {
        return Math.random() - 0.5;
    })
    return target;
}


// 数组去重(在原型链上修改)（dong）
// let arr = [1,2,3,1,1,1,2,3,1,2,3,54,1,1]
// arr = arr.unique()
Array.prototype.unique = function () {
    let temp = {},
        arr = [];
    this.forEach(item => {
        if(!temp[item]){
            temp[item] = "abc";
            arr.push(item)
        }
    })
    return arr;
}

//大写金额
export function digitUppercase(num) {
    var tmpNum = num;
    var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
    var BB = new Array("", "拾", "佰", "仟", "万", "亿", "元", "");
    var CC = new Array("角", "分", "厘");
    var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;

        if (a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }
    if (a.length > 1) {// 加上小数部分(如果有小数部分)
        if (a[0].length == 0) {
            re += "";
        } else {
            re += BB[6];
        }
        for (var i = 0; i < a[1].length; i++) {
            re += AA[a[1].charAt(i)] + CC[i];
            if (i == 2)
                break;
        }
    }
    if (tmpNum.toString().indexOf(".") == -1) {
        re += "元整";
    }
    // 处理输入字符0的情况
    if (a == '') {
        re = "零" + re;
    }
    return re;
}