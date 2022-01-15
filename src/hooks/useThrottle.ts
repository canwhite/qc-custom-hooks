import { useEffect,useRef,useState } from "react";

const useThrottle = (fn:Function,ms:number = 30,deps?:any[])=>{
    //初始时间
    let previous = useRef(0);
    //时间段
    let [time,setTime] = useState(ms);

    useEffect(()=>{
        //当前时间
        let now = Date.now();
        //过了一个时间段执行一次
        if(now - previous.current > time){
            //执行
            fn();
            //更新时间
            previous.current = now;
        }
    },deps);

    const cancel = ()=>{
        //通过控制时间间隔来取消节流效果
        setTime(0);
    }
    return [cancel];
}

export default useThrottle;