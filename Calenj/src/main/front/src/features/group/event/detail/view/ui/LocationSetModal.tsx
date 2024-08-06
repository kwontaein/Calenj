import {Modal_Background} from "../../../../../../shared/ui/SharedStyled";
import {GroupSubScheduleAction} from "../../../../../../entities/group";
import React, {useEffect, useRef, useState} from "react";
import {
    LocationSearch_Input,
    LocationSet_Container, LocationSet_Title,
    SearchResult_Container,
    SearchResult_Item
} from "./LocationSetModalStyled";
import AddressItemV2 = naver.maps.Service.AddressItemV2;

interface ScheduleDetailProps{
    dispatchSubSchedule : React.Dispatch<GroupSubScheduleAction>,
    subScheduleIndex : number,
    onClose:()=>void,
}


export const LocationSetModal :React.FC<ScheduleDetailProps> =({dispatchSubSchedule,subScheduleIndex, onClose})=>{
    const modalBackground = useRef<HTMLDivElement>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>();
    const [AddressX, setAddressX] = useState<number>(0);
    const [AddressY, setAddressY] = useState<number>(0);
    const [addressList,setAddressList] = useState<AddressItemV2[]>([])

    useEffect(() => {
        if (!searchKeyword) return
        naver.maps.Service.geocode(
            { query: searchKeyword },
            function (status, res) {
                setAddressList(res.v2.addresses)
                if (res.v2.addresses.length === 0) {
                    // 요청실패 (searchKeyword에 대한 응답이 없을 경우) 에러 핸들링
                } else {
                    console.log(res.v2.addresses)
                    // 요청 성공에 대한 핸들링
                    // 검색된 주소에 해당하는 위도, 경도를 숫자로 변환후 상태 저장
                    const resAddress = res.v2.addresses[0];
                    const x = parseFloat(resAddress.x);
                    const y = parseFloat(resAddress.y);

                    setAddressX(x);
                    setAddressY(y);
                }
            }
        );
    }, [searchKeyword]);


    const handleMapPosition = (searchKey:string)=>{
        if(!searchKey)return
        setSearchKeyword(searchKey)
        naver.maps.Service.geocode(
            { query: searchKey },
            function (status, res) {
                setAddressList(res.v2.addresses)
                if (res.v2.addresses.length === 0) {
                    // 요청실패 (searchKeyword에 대한 응답이 없을 경우) 에러 핸들링
                } else {
                    console.log(res.v2.addresses)
                    // 요청 성공에 대한 핸들링
                    // 검색된 주소에 해당하는 위도, 경도를 숫자로 변환후 상태 저장
                    const resAddress = res.v2.addresses[0];
                    const searchMap = new naver.maps.Map("searchMap", {
                        center: new naver.maps.LatLng(parseFloat(resAddress.x), parseFloat(resAddress.y)),
                        zoom: 15,
                        mapTypeControl: true,
                    });
                }
            }
        );
    }


    return(
        <Modal_Background ref ={modalBackground} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current) {
                onClose();
            }
        }}>
            <LocationSet_Container>
                <LocationSet_Title>
                    위치 지정하기
                </LocationSet_Title>
                <LocationSearch_Input value={searchKeyword} placeholder={'장소, 버스, 지하철, 주소 검색'} onChange={(e)=>setSearchKeyword(e.target.value)}/>
                {addressList.length>0 &&
                    <SearchResult_Container>
                        {addressList.map((address)=>(
                            <SearchResult_Item onClick={()=>setSearchKeyword(address.jibunAddress)}>
                                {address.jibunAddress}
                            </SearchResult_Item>
                        ))}
                    </SearchResult_Container>
                }
            </LocationSet_Container>
        </Modal_Background>
    )
}