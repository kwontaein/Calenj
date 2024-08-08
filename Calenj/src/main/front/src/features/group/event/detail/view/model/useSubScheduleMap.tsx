import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {SubSchedule} from "../../../../../../entities/reactQuery";


export const useSubScheduleMap = (subScheduleEdit: SubSchedule[], clickState: number | null): React.MutableRefObject<HTMLDivElement | null> => {
    let initMap: naver.maps.Map | undefined = undefined;
    const {mapModal} = useSelector((state: RootState) => state.groupSchedule)
    const mapElement = useRef<HTMLDivElement | null>(null);


    //Map 세팅
    useEffect(() => {
        if (mapModal && subScheduleEdit.length > 0) {
            const subSchedule = subScheduleEdit[0]
            geoCode(subSchedule.location)
        }
        const handleResize = () => {
            if (!mapElement.current || !initMap) return;
            const {clientWidth} = mapElement.current;
            const size = new naver.maps.Size(clientWidth, 250);
            initMap.setSize(size);
        };

        if (mapModal && initMap) {
            window.addEventListener("resize", handleResize);
        }
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mapModal, mapElement.current?.clientWidth]);

    //내 위치 정보 받아오는 메소드
    const myLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                drawMap(position.coords.latitude.toString(), position.coords.longitude.toString());
            });
        } else {
            window.alert("현재위치를 알수 없습니다.");
        }
    };

    const drawMap = (x: string , y: string ) => {
        initMap = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(parseFloat(y), parseFloat(x)),
            zoom: 15,
            mapTypeControl: true,
        });
    }
    //마커 추가하는 메소드
    const addMaker = (x: string, y: string) => {
        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(parseFloat(y), parseFloat(x)),
            map: initMap
        });
        // er 클릭 시 지도 초기화Mark
        naver.maps.Event.addListener(marker, 'click', () => {
            markerClickHandler()
        });
    }

    //마커를 클릭했을 때 실행할 이벤트 핸들러
    const markerClickHandler = () => {
        /*initMap?.setCenter(new naver.maps.LatLng(parseFloat(y), parseFloat(x)));
        initMap?.setZoom(16);*/
    };

    //도로명주소 -> 위도경도 후 지도그리고 마커 찍기
    const geoCode = (roadLocation: string) => {
        naver.maps.Service.geocode({query: roadLocation}, (status, response) => {
            if (status === naver.maps.Service.Status.ERROR) {
                alert('Something wrong!');
                return;
            }
            const locateX = response.v2.addresses[0].x;
            const locateY = response.v2.addresses[0].y;

            if (clickState !== null) {
                subScheduleEdit[clickState].positionX = locateX;
                subScheduleEdit[clickState].positionY = locateY;
            }
            console.log(locateX, locateY)
            if(typeof locateY ==="string" && typeof locateX ==="string"){
                drawMap(locateX, locateY);
                addMaker(locateX, locateY);
            }
        });
    };

    useEffect(() => {
        if (clickState === null || !mapModal) return
        if (subScheduleEdit[clickState].location) {
            const subSchedule = subScheduleEdit[clickState]
            geoCode(subSchedule.location)
        }
    }, [clickState]);

    return mapElement
}