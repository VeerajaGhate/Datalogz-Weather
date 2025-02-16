import React, { useEffect, useState } from 'react'

function Weather() {

    const [data,setData]=useState()
    const [search,setSearch]=useState("Pune")
    const [city,setCity]=useState()

    useEffect(()=>{
        const fetchApi=async ()=>{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=39e6c5c1de59ad645db3e661147127e8`
            const response=await fetch(url)
            const result=await response.json()
            setData(result)
        }
        fetchApi()
    },[search])
  return ( data &&
    (<div>
      <input type='text'  onChange={(event)=>setCity(event.target.value)}/>
      <button onClick={()=>setSearch(city)}>Search</button>
      {data && <h3>temp:{data.main.temp}</h3>}

    </div>)
  )
}

export default Weather
