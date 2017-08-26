import localforage from 'localforage';
import { processAPIData } from '../../utils';

const TRANSACTION_NAMESPACE = 'TRANSACTION-';
const BUSINESS_NAMESPACE = 'BUSINESS-';

export const fetchTransactions = () => {
  return localforage.startsWith(TRANSACTION_NAMESPACE).then(res => {
    //TODO handle errors
    return processAPIData(res);
  })
}

export const saveTransaction = (transaction) => {
  return localforage.setItem(
    TRANSACTION_NAMESPACE + transaction.id,
    transaction
  ).then(value => {
    return value;
  }).catch(err => {
    console.error('The transaction was not saved: ', err);
  });
}

export const deleteTransaction = (transaction) => {
  return localforage.removeItem(
    TRANSACTION_NAMESPACE + transaction.id
  ).then(()=> {
    return true;
  }).catch(err => {
    console.error('The transaction was not deleted: ', err);
    return false;
  });
}

export const fetchBusinesses = () => {
  return localforage.startsWith(BUSINESS_NAMESPACE).then(res => {
    //TODO handle errors
    return processAPIData(res);
  })
}

export const saveBusiness = (business) => {
  return localforage.setItem(
    BUSINESS_NAMESPACE + business.id,
    business
  ).then(value => {
    return value;
  });
}

export const deleteBusiness = (business) => {
  return localforage.removeItem(
    BUSINESS_NAMESPACE + business.id
  ).then(() => {
    return true;
  }).catch(err => {
    console.error('The business was not deleted: ', err);
    return false;
  })
}
