import { get, groupBy } from 'lodash';
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
import { ListHeader } from '../components/list';
import { colors, fonts, padding, position } from '../styles';
import { TransactionCoinRow } from '../components/coin-row';
import { sortList } from '../utils';

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
    // console.log('transaction', transaction);

    return {
      ...tx,
      balance: value,
      name: asset.name,
      native: {
        balance: get(native, 'USD.value'),
      },
      symbol: asset.symbol,
    };
  });

  return sortList(sortedTransactions, 'timestamp.ms');
};

// const buildTransactionSections = (transactions) => {
//   const sections = {
//     pending: {},
//     today: {},
//     yesterday: {},
//     thisMonth: {},
//     months: [],
//     monthYears: [],
//   };

//   transactions.map(tx => {
//     if (tx.pending) {
//       sections.pending = {

//       }
//     }
//   });
//   const txByPending = groupBy(transactions, ({ pending }) => pending);

//   if (txByPending.true) {
//     pendingSection = {
//       data: txByPending.true,
//       renderItem: TransactionCoinRow,
//       title: 'Pending',
//     };
//   }

//   console.log('txByPending', txByPending);

//   // {
//   //     data: ,
//   //     renderItem: TransactionCoinRow,
//   //     title: 'Yesterday',
//   //   }
//   return sections;
//   // [
//   //   pendingSection,
//   // ];
// };

const ActivityScreen = ({ fetchingTransactions, transactions, ...props }) => {
  const sections = {
    balances: {
      data: sortTransactions(transactions),
      renderItem: TransactionCoinRow,
      title: 'Yesterday',
    },
  };
  // const test = buildTransactionSections(sortTransactions(transactions));

  // console.log('fetchingTransactions', fetchingTransactions);
  // console.log('test', test);


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
          renderSectionHeader={({ section }) => <ListHeader {...section} />}
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
