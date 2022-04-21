import React from 'react';
import { Card } from 'antd';
import * as IconList from '@ant-design/icons';

import {FRAME_MESSAGE_TYPE} from '../../utils/constant';

export default function FunctionItem({item,sendMessageToParent}){
    const doOperation=()=>{
        const message={
            type:FRAME_MESSAGE_TYPE.DO_OPERATION,
            data:{
                operationItem:item.operation
            }
        };
        sendMessageToParent(message);
    }
    
    const IconItem=IconList[item.icon?item.icon:"PictureFilled"];

    const titleComponent=(
        <>
            <IconItem/>
            <span>{item.name}</span>
        </>
        );

    const extraComponent=(
        <a href="#" onClick={doOperation}>打开</a>
    )

    return (
        <Card size="small" title={titleComponent} extra={extraComponent} style={{minWidth:190}}>
            {item.description}
        </Card>
    );
}