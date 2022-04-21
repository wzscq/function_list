import { Col, Collapse, Row,Divider } from 'antd';
import FunctionItem from './FunctionItem';

const { Panel } = Collapse;

export default function FunctionGroup({funcList,sendMessageToParent}){
    const groupItems=funcList.map(item=>{
        const funcItems=item.children.filter(
            item=>item._show!==false
        ).map(item=>(
            <Col span={{ xs: 12, sm: 8, md: 4, lg: 4 }}>
                {
                    <FunctionItem sendMessageToParent={sendMessageToParent} item={item} />
                }
            </Col>
        ));
        return funcItems.length>0?(
            <>
            <Panel header={item.name} key={item.id}>
                <Row gutter={24}>
                {funcItems}
                </Row>
            </Panel>
            <Divider key={"divider_"+item.id}/>
            </>
        ):null;
    });

    return (
        <Collapse ghost>
            {groupItems}
        </Collapse>
    );
}