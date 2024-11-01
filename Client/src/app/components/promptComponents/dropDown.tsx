import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BsThreeDots, BsTrash } from 'react-icons/bs';

const items: MenuProps['items'] = [
  {
    label: <div className="flex items-center gap-2">Delete<BsTrash className="text-red-500"/></div>,
    key: '0',
  }
];

const DropDown: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']} className="group-hover:block hidden">
    <div onClick={(e) => e.preventDefault()}>
      <Space>
        <BsThreeDots className="w-4 h-4"/>
      </Space>
    </div>
  </Dropdown>
);

export default DropDown;