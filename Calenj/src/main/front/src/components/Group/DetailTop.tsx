import React, {useEffect, useLayoutEffect, useState} from 'react';
import {stateFilter, createTimePassed} from '../../stateFunc/actionFun'
import {RowFlexBox, MiniText} from '../../style/FormStyle'
import '../../style/Detail.scss'


interface Details {
    Creater: string;
    Created: string;
    Watcher: string[]
}


const DetailTop: React.FC<Details> = ({Created, Creater, Watcher}) => {


    return (
        <div>
            <div id='ViewDetails_Text'>상세보기</div>
            <div>
                <RowFlexBox style={{marginLeft: '3vw'}}>
                    <div>😒</div>
                    {/*프로필 들어갈 예정*/}
                    <div style={{marginLeft: '10px'}}>
                        <div>
                            {Creater}
                        </div>
                        <MiniText>
                            {createTimePassed(Created)} · {Watcher.length}명 읽음
                        </MiniText>
                    </div>
                </RowFlexBox>
            </div>
        </div>
    )
}
export default DetailTop