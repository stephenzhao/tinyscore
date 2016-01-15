(function(){
    // 这里的self就是浏览器环境下的window，root就是宿主环境
    var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this;

    var previousUnderscore = root._;

    // 这里是出于安全保护，这个例子代码少，模拟实现，暂时还没用到wrapped，有兴趣的盆友可以看源码
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    // 注册全局变量
    root._ = _;

    /**
     * 检测是否数组
     * 返回：true表示数组，false表示非数组
     */
    _.isArray = function(obj){
        return toString.call(obj) === '[object Array]';
    };

    /**
     * 这个没什么好说的吧，继承，直接copy的系列04的代码，不清楚的盆友可以看看系列04，继承源码分析
     * sub:子类
     * sup:父类
     */
    _.extend = function(sub, sup) {
        var F = function(){};
        F.prototype = sup.prototype;
        sub.prototype = new F();
        sub.prototype.constructor = sub;
        sub._super = sup.prototype;
        if(sup.prototype.constructor == Object.prototype.constructor){
            sup.prototype.constructor = sup;
        }
    };
    /**
     * 遍历多维数组
     * 参数1:要遍历的数组
     * 参数2:回调函数
     */
    _.arrEach = function(arr,fn){
        // 判断传入的arr是否是数组，判断fn是否为function类型
        if(_.isArray(arr) && typeof fn==='function'){
            // i作为计数器
            var i=0,len=arr.length;
            // while遍历
            while(i<len){
                // 这里是判断下一层级是否为数组，如果是则递归
                if(_.isArray(arr[i])){
                    _.arrEach(arr[i],fn);
                // 否则就直接执行回调函数，使用call则是把作用于指向数组本身
                }else{
                    fn.call(arr,arr[i]);
                }
                i++;
            }
            // 这里是垃圾回收，
            i=null;
        }else{
            // 这段英文是我自己写的，英文不好请见谅!^_^
            throw new Error('the first arguments must be Array and callback must be function');
        }
    };

    // 防止与其他库冲突
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };

    // 版本
    _.VERSION = '1.0';

    // 判断CMD模块化
    if (typeof define == 'function' && define.amd) {
        define('tinyscore', [], function() {
          return _;
        });
    }
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
          exports = module.exports = _;
        }
        exports._ = _;
      } else {
        root._ = _;
      }
}());