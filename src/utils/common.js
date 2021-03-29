/**
 * 数字精度处理
 */
export function numberUtil(value, decimal) {
    let i = value.length;
    if (i <= decimal){
        A:while (true) {
            if(i< decimal){
                value = "0"+value
                i++
            }else{
                break A
            }
        }
        return "0."+value
    }else{
        const value1 = value.substr(0, value.length - decimal);
        const value2 = value.substr(value.length - decimal, value.length);
        return value1+"."+value2
    }
}