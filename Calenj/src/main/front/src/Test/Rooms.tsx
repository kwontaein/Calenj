import React, {useState, useEffect} from 'react';

function RoomListComponent() {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        // 초기 방 목록을 불러오는 API 호출 등을 수행할 수 있음
        // 여기서는 빈 배열로 초기화
        setRooms([]);
    }, []);

    const handleCreateRoom = () => {
        /* e.preventDefault();
         const name = e.target.elements.name.value;

         if (!name) {
             alert("Please write the name.");
             return;
         }
 */
        // 방 생성 API 호출 등의 작업 수행
        alert(`방이 개설되었습니다.`);
        setRoomName("roomname");
    };

    return (
        <div className="container">
            <div>
                <ul>
                    {rooms.map((room, index) => (
                        <li key={index}>
                            <a href={`/chat/room?roomId=${room}`}>{room}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleCreateRoom}>
                <input type="text" name="name" className="form-control"/>
                <button type="submit" className="btn btn-secondary">개설하기</button>
            </form>
        </div>
    );
}

export default RoomListComponent;
