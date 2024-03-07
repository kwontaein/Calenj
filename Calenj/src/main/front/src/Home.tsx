import React from 'react'
import SignState from "./components/Auth/SignState"
import GroupList from './components/Group/GroupList';


const Home:React.FC=()=>{
    
    return(
        <div style={{display:"flex", flexDirection:"column"}}>
          
            <SignState/>
            <h1>여기는 초기 페이지임</h1>
            <GroupList/>
        </div>
    )
}
export default Home;