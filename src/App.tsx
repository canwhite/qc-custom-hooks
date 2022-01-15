import React,{FC,useCallback,useMemo,useState} from 'react';
import './App.css';
import {useDebounce ,useThrottle} from "./hooks"

/*------------------------
一、useMemo和useCallback的使用
------------------------*/
const Index:FC = ()=>{

  const [count,setCount] = useState(0); 


  //首先是useMemo
  const isEvenNumber = useMemo(()=>{
    return count % 2 === 0;//是否偶数
  },[count])

  //然后useCallBack
  const onClick = useCallback(()=>{
    setCount(count+1);
  },[count]) //这个count在这里相当于参数


  return (
    <div> 
      <div> ==== useCallback and useMemo ==== </div>
      <div>{count} is {isEvenNumber ? 'even':'odd'} number</div>
      <button onClick={onClick}> +1 click</button>
    </div>
  )
}


/* ------------------
二、useDebouce
--------------------*/
const Debounce:FC = ()=>{
  const [a, setA] = useState<any>(0)
  const [b, setB] = useState<any>(0)


  /* const [cancel] = useDebounce(() => {
    setB(a)
  }, 2000, [a])*/
  useDebounce(() => {
    setB(a)
  }, 2000, [a])

  //给a设置完值之后，过两秒钟之后就会触发上边更改
  const changeIpt = (e:any) => {
    setA(e.target.value)
  }

  return (
    <div>
      <p><div> ==== useDebounce ==== </div></p>
      <p>
        <input type="text" onChange={changeIpt} />
      </p>
      <p>
        <p>b:{ b }</p>
        <p>a:{ a }</p>
      </p>
    </div>
  )
} 


/*-------------------
三、useThrottle,这只是调用了一下，其实它不应该用到这个地方，
因为中间停顿的时候会漏掉中间更改，而防抖是点击了，从新开始计时，最终还是会执行
一般用在按钮的多次点击，这里记录一下：

节流函数的一个最经典的使用场景
以判断页面是否滚动到底部为例，
普通的做法就是监听 window 对象的 scroll 事件，然后再函数体中写入判断是否滚动到底部的逻辑：

-------------------------------------------------------------------------------------
这样做的一个缺点就是比较消耗性能，因为当在滚动的时候，浏览器会无时不刻地在计算判断是否滚动
到底部的逻辑，
在实际场景中可能是这样的：在滚动过程中，每隔一段时间在去计算这个判断逻辑。
而函数节流所做的工作就是每隔一段时间去执行一次原本需要无时不刻地在执行的函数，
所以在滚动事件中引入函数的节流是一个非常好的实践：

// 添加节流函数
function throttle(fn, interval = 300) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}
$(window).on(
  'scroll',
  throttle(function() {
    // 判断是否滚动到底部的逻辑
    let pageHeight = $('body').height(),
      scrollTop = $(window).scrollTop(),
      winHeight = $(window).height(),
      thresold = pageHeight - scrollTop - winHeight;
    if (thresold > -100 && thresold <= 20) {
      console.log('end');
    }
  })
);
--------------------*/
const Throttle:FC = ()=>{

  const [a, setA] = useState<number>(0)
  const [b, setB] = useState<number>(0)


  /* const [cancel] = useThrottle(() => {
    setB(a)
  }, 2000, [a]) */
  useThrottle(() => {
    setB(a)
  }, 2000, [a]) 


  //给a设置完值之后，过两秒钟之后就会触发上边更改
  const changeIpt = (e:any) => {
    setA(e.target.value)
  }

  return (
    <div>
      <p><div> ==== useThrottle ==== </div></p>
      <p>
        <input type="text" onChange={changeIpt} />
      </p>
      <p>
        <p>b:{ b }</p>
        <p>a:{ a }</p>
      </p>
    </div>
  )
}


const App:FC = ()=> {
  return (
    <div className="App">

     <p> <Index /> </p>
     <p> <Debounce /></p>
     <p> <Throttle /> </p>


    </div>
  );
}

export default App;
