 /**
 * @description 
 * @param {*} value - 输入值
 * @param {String} [type] - 需要核对的数据类型，不填的时候则返回数据类型
 * @return {Boolean|String} - 返回首字母大写的数据类型（ex：Number）或者布尔值
 */
const typeOf = function(value,type){
    let r = typeof value
    if (r !== 'object') {
        if(type){
            return r.charAt(0).toUpperCase() + r.slice(1,r.length) == type
        }else{
            return r.charAt(0).toUpperCase() + r.slice(1,r.length)
        }
    }else{
        if(type){
            return Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, '$1') == type
        }else{
            return Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, '$1')
        }
    }
}
module.exports = {
    typeOf,
}