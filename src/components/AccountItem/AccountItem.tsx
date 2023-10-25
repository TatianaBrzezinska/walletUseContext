import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Statistic, Button, Typography, Dropdown, Modal } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { AccountModal } from '../.';
import { deleteAccount } from '../../store/actions';
import { Dispatch } from '../../store';

import './AccountItem.css';

interface AccountItemProps {
  balance: number;
  name: string;
  id: string;
  color?: string;
}

export const AccountItem = ({ id, balance, name, color }: AccountItemProps) => {
  const dispatch = useDispatch<Dispatch>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const menuItems = [
    {
      key: '1',
      label: 'Change',
      onClick: () => setIsEditModalVisible(true),
    },
    {
      key: '2',
      label: 'Delete',
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: 'Delete the account?',
          icon: <ExclamationCircleOutlined />,
          content: 'It will be impossible to undo the deletion',
          cancelText: 'Cancel',
          okText: 'Delete',
          onOk() {
            return dispatch(deleteAccount(id));
          },
          onCancel() {},
        });
      },
    },
  ];

  return (
    <>
      <section
        className="account-item"
        style={{ background: color !== undefined ? color : '#000' }}
      >
        <header className="account-item__header">
          <Statistic value={name} groupSeparator=" " suffix="" valueStyle={{ color: 'white' }} />
          <Dropdown menu={{ items: menuItems }}>
            <Button shape="circle" size="small" icon={<EllipsisOutlined />} />
          </Dropdown>
        </header>

        <Typography.Title style={{ color: 'white' }} level={4}>
          {balance} $
        </Typography.Title>
      </section>

      <AccountModal
        id={id}
        name={name}
        balance={balance.toString()}
        color={color}
        closeModal={() => setIsEditModalVisible(false)}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};