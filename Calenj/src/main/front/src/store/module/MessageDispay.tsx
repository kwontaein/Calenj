import React from 'react';
import {connect} from 'react-redux';
import {StompData} from './StompReducer';
import {RootState} from '../../store/store';

interface Message {
    message: string;
}

interface MessageDisplayProps extends StompData {
    receivedStompMsg: (payload: { message: Message }) => void;
    groupId: number;
}

class MessageDisplay extends React.Component<MessageDisplayProps> {
    render() {
        const {message, params} = this.props.stomp; // Redux store로부터 받은 메시지
        const {groupId} = this.props;
        if (params === groupId) {
            return (
                <div>
                    <p>{message}</p>
                </div>
            );
        } else {
            return null; // 만약 params와 groupId가 다른 경우 아무것도 출력하지 않음
        }
    }
}

const mapStateToProps = (state: RootState) => ({
    stomp: state.stomp // Redux store의 stomp 상태를 컴포넌트의 props로 매핑
});

export default connect(mapStateToProps)(MessageDisplay);
  