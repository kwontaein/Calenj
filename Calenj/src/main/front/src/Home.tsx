import React from 'react'
import SignState from "./components/Auth/SignState"
import Group from './components/Group'


const Home:React.FC=()=>{
    
    return(
        <div style={{display:"flex", flexDirection:"row"}}>
            <h1>여기는 초기 페이지임</h1>
            <SignState/>
            <Group/>
        </div>
    )
}
export default Home;