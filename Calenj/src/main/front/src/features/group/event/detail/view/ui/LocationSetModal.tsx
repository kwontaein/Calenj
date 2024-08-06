import {
    FullScreen_div,
    Modal_Background,
    Modal_Condition_Button,
    TextColor
} from "../../../../../../shared/ui/SharedStyled";
import {GroupSubScheduleAction} from "../../../../../../entities/group";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {
    LocateButton_Container, LocateResult_Title,
    LocationSearch_Input,
    LocationSet_Container,
    LocationSet_Title,
    MapIcon_Container, ReSearch_Button, SearchEmpty_Container,
    SearchKeyword_Container,
    SearchKeyword_Item,
    SearchResult_Category,
    SearchResult_Container,
    SearchResult_Title,
    SearchResultItem_Wrapper,
} from "./LocationSetModalStyled";
import AddressItemV2 = naver.maps.Service.AddressItemV2;
import {searchLocateApi} from "../api/serachLocateApi";
import {LocalItem, NaverSearchResponse} from "../model/types";
import {useConfirm} from "../../../../../../shared/model";

interface ScheduleDetailProps {
    dispatchSubSchedule: React.Dispatch<GroupSubScheduleAction>,
    subScheduleIndex: number,
    onClose: () => void,
}

interface LocatePosition {
    x: number,
    y: number
}


export const LocationSetModal: React.FC<ScheduleDetailProps> = ({dispatchSubSchedule, subScheduleIndex, onClose}) => {
    const modalBackground = useRef<HTMLDivElement>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [addressList, setAddressList] = useState<AddressItemV2[]>([])
    const [searchResult, setSearchResult] = useState<LocalItem[]>([])
    const [locatePosition, setLocatePosition] = useState<LocatePosition | null>(null)
    const [locateItem, setLocateItem] = useState<LocalItem | null>(null)

    useEffect(() => {
        if (searchKeyword === '') {
            setAddressList([])
            return
        }
        naver.maps.Service.geocode(
            {query: searchKeyword},
            function (status, res) {
                setAddressList(res.v2.addresses)
            }
        );
    }, [searchKeyword]);


    const findByKeyword = (e: FormEvent<unknown>) => {
        e.preventDefault()
        if (searchKeyword === '') return
        searchLocateApi(searchKeyword).then((res) => {
            setSearchResult(res)
        })
    }

    const locatehandler = (locate: LocalItem) => {
        setLocateItem(locate)
        naver.maps.Service.geocode(
            {query: locate.address},
            function (status, res) {
                if (status === naver.maps.Service.Status.ERROR) {
                    return alert('Something wrong!');
                    // 요청실패 (searchKeyword에 대한 응답이 없을 경우) 에러 핸들링
                } else {
                    const {x, y} = res.v2.addresses[0];
                    setLocatePosition({
                        x: parseFloat(x),
                        y: parseFloat(y)
                    })
                    console.log(parseFloat(x), parseFloat(y))
                }
            }
        );
    }


    useEffect(() => {
        if (!locatePosition) return
        const searchMap = new naver.maps.Map("searchMap", {
            center: new naver.maps.LatLng(locatePosition.y, locatePosition.x),
            zoom: 15,
            mapTypeControl: true,
        });

    }, [locatePosition]);


    const setSubScheduleLocation = () => {
        if (!locateItem) return
        const setLocation = () => {
            dispatchSubSchedule({
                type: 'SET_LOCATION',
                payload: {index: subScheduleIndex, location: locateItem.address}
            })
            window.alert('위치가 설정이 완료되었습니다.')
            onClose()
        }
        useConfirm('정말로 해당 위치로 지정하겠습니까?', setLocation, () => {
        })
    }

    return (
        <Modal_Background ref={modalBackground} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current && searchKeyword === '') {
                onClose();
            }
        }}>
            <LocationSet_Container onSubmit={findByKeyword} $isPick={locateItem !== null}>
                <LocationSet_Title>
                    위치 지정하기
                </LocationSet_Title>
                {locateItem === null ?
                    <LocationSearch_Input value={searchKeyword} placeholder={'장소, 버스, 지하철, 주소 검색'}
                                          onChange={(e) => setSearchKeyword(e.target.value)}/> :
                    <ReSearch_Button onClick={() => {
                        setLocatePosition(null)
                        setLocateItem(null)
                    }}>
                        다시 검색하기
                    </ReSearch_Button>
                }
                {addressList.length > 0 &&
                    <SearchKeyword_Container>
                        {addressList.map((address) => (
                            address.jibunAddress !== searchKeyword &&
                            <SearchKeyword_Item onClick={() => setSearchKeyword(address.jibunAddress)}
                                                key={address.distance}>
                                {address.jibunAddress}
                            </SearchKeyword_Item>
                        ))}
                    </SearchKeyword_Container>
                }
                <SearchResult_Container>
                    {locatePosition === null ?
                        searchResult.length > 0 ?
                            (searchResult.map((locate) => (
                                <SearchResultItem_Wrapper key={locate.mapx} onClick={() => locatehandler(locate)}>
                                    <SearchResult_Title>
                                        <MapIcon_Container>
                                            <i className="bi bi-geo-alt-fill"></i>
                                        </MapIcon_Container>
                                        <div style={{
                                            width: `calc(100% - 26px)`,
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap'
                                        }} dangerouslySetInnerHTML={{__html: locate.title}}/>
                                    </SearchResult_Title>
                                    <SearchResult_Category>
                                        {locate.category}
                                    </SearchResult_Category>
                                    <SearchResult_Category style={{userSelect: 'text', color: TextColor}}>
                                        {locate.address}
                                    </SearchResult_Category>

                                </SearchResultItem_Wrapper>)))
                            :
                            <SearchEmpty_Container>
                                검색을 통해 위치를 지정해보세요
                            </SearchEmpty_Container>
                        :
                        locateItem &&
                        <FullScreen_div>
                            <div id="searchMap" style={{width: '100%', height: '150px'}}/>

                            <LocateResult_Title dangerouslySetInnerHTML={{__html: locateItem?.title || ''}}/>
                            <SearchResult_Category style={{padding: 0}}>
                                {locateItem.category}
                            </SearchResult_Category>
                            <SearchResult_Category style={{padding: 0, userSelect: 'text', color: TextColor}}>
                                {locateItem.address}
                            </SearchResult_Category>

                        </FullScreen_div>


                    }
                </SearchResult_Container>
                {locateItem &&
                    <LocateButton_Container>
                        <Modal_Condition_Button style={{height: '40px', marginRight: '5px'}} onClick={onClose}>
                            취소하기
                        </Modal_Condition_Button>
                        <Modal_Condition_Button style={{height: '40px'}} $isAble={true}
                                                onClick={setSubScheduleLocation}>
                            지정하기
                        </Modal_Condition_Button>
                    </LocateButton_Container>
                }

            </LocationSet_Container>
        </Modal_Background>
    )
}