import React,{useEffect,useState} from 'react'

const App = () => {
  const [list,setList]=useState({data:null,cartAmount:null});

  const fetch_api=async()=>{
    try{
      const result=await fetch('http://localhost:8002/list',{method:'GET'});
      const res=await result.json();
      console.log(typeof(res.data))
      console.log(res.data);
      let total_cart_amount=0
      for(let i=0;i<res.data.length;i++)
      {
          total_cart_amount+=res.data[i].quantity*res.data[i].unitPrice;
      }
      setList((prevState)=>({...prevState, data:res.data,cartAmount:total_cart_amount}))
      console.log(res)
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    let isMount = true;
    if (isMount) {
       fetch_api();
    }
    return () => {
      isMount = false;
    };
  },[])

  return (
    <div>
        <div className="">List Of Item</div>
        {/* {JSON.stringify(list.data)} */}

    {
        list.data && list.data.map((item,index)=>{
            return(
             <Card item={item} key={index}/>
            )
        })
    }
    <Cart amount={list.cartAmount}/>
    </div>
  )
}
const Cart=(props)=>{
  return (
    <div className="" style={{color:"red"}}>
     {props.amount?props.amount:""}
    </div>
  )

}
const Card=(props)=>{
    return(
   <div className='none' style={{border:"1px black solid",marginBottom:"5px"}}>
    <div className="">Item:{props.item.item}</div>
    <div className="">Quantity:{props.item.quantity}</div>
    <div className=''>Unit Price:{props.item.unitPrice}</div>
    <div className=''>Total Price:{props.item.quantity * props.item.unitPrice}</div>
   </div>
    )

}
export default App