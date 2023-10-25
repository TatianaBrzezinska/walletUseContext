import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { AccountItem, AccountsHeader } from '../.';
import { getAccounts } from '../../store/selectors';
import { fetchAccounts } from '../../store/actions';
import { Dispatch } from '../../store';

import './Accounts.css';

export const Accounts = () => {
  const dispatch = useDispatch<Dispatch>();
  const accounts = useSelector(getAccounts);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchAccounts()).then(() => setLoader(false));

    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <Spin>
        <section className="accounts-list-loader" />
      </Spin>
    );
  }

  return (
    <section className="accounts">
      <AccountsHeader />
      <div className="accounts-wrap">
        <div className="accounts-list">
          {(accounts as any).map((item: any) => (
            <AccountItem
              key={item.id}
              id={item.id}
              balance={item.balance}
              name={item.name}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
