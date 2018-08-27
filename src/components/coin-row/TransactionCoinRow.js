import { get } from 'lodash';
import React, { Fragment } from 'react';
import { Monospace } from '../text';
import BalanceText from './BalanceText';
import CoinName from './CoinName';
import CoinRow from './CoinRow';
import TransactionStatusBadge from './TransactionStatusBadge';
import BottomRowText from './BottomRowText';
import { colors } from '../../styles';

const getTransactionStatus = ({ pending, to }) => {
  if (pending) return 'pending';
  const myWalletAddress = '';
  return to === myWalletAddress ? 'received' : 'sent';
}

const TransactionCoinRow = ({ item, ...props }) => (
  // console.log('transaction row', props),
  <CoinRow
    {...item}
    {...props}
    bottomRowRender={({ name, native }) => {
      // console.log('native', native);
      const nativeDisplay = get(native, 'balance.display');
      // console.log('asset', asset);
      // console.log('name', get(asset, 'name'));
      // console.log('nativeDisplay', nativeDisplay);
      return (
        <Fragment>
          <CoinName>{name}</CoinName>
          <BalanceText color={nativeDisplay ? null : colors.blueGreyLight}>
            {nativeDisplay || '$0.00'}
          </BalanceText>
        </Fragment>
      );
    }}
    topRowRender={({ balance, ...tx }) => {
      return (
        <Fragment>
          <TransactionStatusBadge status={getTransactionStatus(tx)} />
          <BottomRowText>{get(balance, 'display')}</BottomRowText>
        </Fragment>
      );
    }}
  />
);

export default TransactionCoinRow;
