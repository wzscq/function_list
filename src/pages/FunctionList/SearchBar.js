import { Input,Space,Button,Tooltip } from 'antd';
import {ReloadOutlined} from "@ant-design/icons";

import {searchFunction} from '../../redux/functionSlice';
import { useDispatch } from 'react-redux';

const { Search } = Input;

export default function SearchBar({updateFunctionList}){
    const dispatch=useDispatch();

    const onSearch=(value)=>{
        //alert(value);
        dispatch(searchFunction(value));
    }

    const reloadFuncList=()=>{
        updateFunctionList();
    }

    return (
        <Space className='search-bar'>
            <Search className='search-input'  placeholder="请输入要查询的功能关键字" onSearch={onSearch} enterButton />
            <Tooltip title="刷新功能列表">
                <Button type='primary' icon={<ReloadOutlined />} onClick={reloadFuncList} />
            </Tooltip>
        </Space>
    )
}