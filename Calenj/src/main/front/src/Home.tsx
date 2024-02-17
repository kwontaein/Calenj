import React from 'react'
import SignState from "./components/Auth/SignState"


const Home:React.FC=()=>{
    
    return(
        <div style={{display:"flex", flexDirection:"row"}}>
            <h1>여기는 초기 페이지임</h1>
            <SignState/>

        </div>
    )
}
export default Home;