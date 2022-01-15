
import { useEffect,useRef} from "react";

/*
params：回调函数，间隔事件，和依赖  
return: cancel函数
*/
//很好记忆，de是防的意思，debounce就是防抖
const useDebounce = (fn:Function,ms:number=30,deps:any[])=>{
    //本质上，useRef 就像一个盒子
    //可以在其 .current 属性中保存一个可变值。
    let timeout = useRef<any>();

    useEffect(()=>{
        //节流(throttle)是班车，防抖(debounce)不是班车
        if(timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(()=>{
            fn();
        },ms);
    },deps)


    //返回一个cancel
    const cancel = ()=>{
        clearTimeout(timeout.current);
        timeout.current = null;
    }
    return [cancel]
}

export default useDebounce;




