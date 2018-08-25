import { get } from 'lodash';
import React, { Fragment } from 'react';
import { Monospace } from '../text';
import BalanceText from './BalanceText';
import CoinName from './CoinName';
import CoinRow from './CoinRow';
import TransactionStatusBadge from './TransactionStatusBadge';
import BottomRowText from './BottomRowText';


const TransactionCoinRow = ({ item, ...props }) => (
  // console.log('transaction row', props),
  <CoinRow
    {...item}
    {...props}
    bottomRowRender={({ name, native }) => {
      // console.log('native', native);
      // console.log('asset', asset);
      // console.log('name', get(asset, 'name'));
      return (
        <Fragment>
          <CoinName>{name}</CoinName>
          <BalanceText>{get(native, 'balance.display')}</BalanceText>
        </Fragment>
      );
    }}
    topRowRender={({ balance }) => {
      return (
        <Fragment>
          <TransactionStatusBadge />
          <BottomRowText>{get(balance, 'display')}</BottomRowText>
        </Fragment>
      );
    }}
  />
);

export default TransactionCoinRow;
