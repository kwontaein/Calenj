import {SearchIcon_Container, SearchInput_Container, SearchInput_Wrapper} from "./SearchInputStyled";
import {ChangeEvent} from "react";

interface ParentProps{
    placeholder :string,
    searchText:string,
    setSearchText : React.Dispatch<React.SetStateAction<string>>,
}

export const SearchInput:React.FC<ParentProps> = ({placeholder, searchText, setSearchText})=>{

    return(
        <SearchInput_Container>
            <SearchInput_Wrapper placeholder={placeholder} value={searchText} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchText(e.target.value)}/>
            <SearchIcon_Container onClick={()=> searchText!=='' && setSearchText('')}>
                {searchText === "" ?
                    <i className="bi bi-search"></i> :
                    <i className="bi bi-x-lg"></i>
                }
            </SearchIcon_Container>
        </SearchInput_Container>
    )
}