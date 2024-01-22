import SignState from "./Auth/SignState"

export default function Home(){
    
    return(
        <div style={{disPlay:"flex", flexDirection:"row"}}>
            <h1>여기는 초기 페이지임</h1>
            <SignState/>
        </div>
    )
}