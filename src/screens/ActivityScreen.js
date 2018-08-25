import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { SectionList } from 'react-native';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompact';
import styled from 'styled-components/primitives';
import { BackButton, Header } from '../components/header';
import { ButtonPressAnimation } from '../components/buttons';
import Icon from '../components/icons/Icon';
import { Column, Row } from '../components/layout';
import { Monospace } from '../components/text';
import { colors, fonts, padding, position } from '../styles';
import { TransactionCoinRow } from '../components/coin-row';

import {
  AssetListFooter,
  AssetListHeader,
  AssetListSkeleton,
  AssetListItem,
} from '../components/asset-list';

const Container = styled(Column)`
  ${position.size('100%')}
  background-color: ${colors.white};
  flex: 1;
`;

const List = styled(SectionList)`
  ${position.size('100%')}
  background-color: ${colors.white};
`;

const assetListKeyExtractor = (item, index) => (
  get(item, Array.isArray(item) ? '[0].id' : 'symbol') + index
);

const sortTransactions = (transactions) => {
  const sortedTransactions = transactions.map((transaction) => {
    const { asset, native, value, ...tx } = transaction;
    // console.log('TRANSACTION', tx);
    console.log('transaction', transaction);

    return {
      // ...tx,
      balance: value,
      name: asset.name,
      native: {
        balance: get(native, 'USD.value'),
      },
      symbol: asset.symbol,
    };
    // {
    //   balance: tx.value,
    // };
  });

  return sortedTransactions;
}

const ActivityScreen = ({ fetchingTransactions, transactions, ...props }) => {
  const sections = {
    balances: {
      data: sortTransactions(transactions),
      renderItem: TransactionCoinRow,
      title: 'Yesterday',
    },
  };

  console.log('fetchingTransactions', fetchingTransactions);

  return (
    <Container>
      <Header align="end">
        <BackButton
          color={colors.brightBlue}
          direction="left"
        />
      </Header>
      {!fetchingTransactions && (
        <List
          initialNumToRender={13}
          keyExtractor={assetListKeyExtractor}
          renderItem={AssetListItem}
          renderSectionFooter={AssetListFooter}
          renderSectionHeader={headerProps => <AssetListHeader {...headerProps} />}
          sections={[sections.balances]}
        />
      )}
    </Container>
  );
}

ActivityScreen.propTypes = {
  //
};


const reduxProps = ({
  account: {
    fetchingTransactions,
    hasPendingTransaction,
    transactions,
  },
}) => ({
  fetchingTransactions,
  hasPendingTransaction,
  transactions,
});

export default compose(
  connect(reduxProps, null),
  withHandlers({
    //
  }),
)(ActivityScreen);
