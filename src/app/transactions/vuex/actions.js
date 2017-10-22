import { guid } from '../../../utils';
import { deleteTransaction as deleteTransactionFromAPI, deleteBusiness as deleteBusinessFromAPI, fetchBusinesses, fetchTransactions, saveBusiness, saveTransaction } from '../api';

const prepareTransaction = (getters, data) => {
  let budget = getters.getBudgetByDate(data.date);
  //TODO handle non-budgeted months
  if (!budget) throw new Error('Could not find a budget for the date ' + data.date);
  data.budget = budget.id;
  //TODO handle uncategorized txns
  let budgetCategory = getters.getBudgetCategoryByBudgetAndCategory(budget.id, data.category);
  if (!budgetCategory) throw new Error('Could not find a budget category for ' + data.category);
  return { preparedData: data, budgetCategory: budgetCategory, budget: budget };
};

export const createTransaction = ({ commit, dispatch, getters }, data) => {
  let { preparedData, budgetCategory, budget } = prepareTransaction(getters, data);

  let id = guid();
  let transaction = Object.assign({ id: id }, preparedData);

  dispatch('updateBudgetCategorySpent', {
    budgetCategory: budgetCategory,
    budget: budget,
    amount: transaction.amount
  });

  dispatch('updateAccountBalance', {
    account: getters.getAccountById(data.account),
    amount: transaction.amount
  });

  commit('CREATE_TRANSACTION', { transaction: transaction });
  saveTransaction(transaction);
};

export const updateTransaction = ({ commit, getters }, data) => {
  //TODO handle any change the user could make

  let { preparedData } = prepareTransaction(getters, data);

  commit('UPDATE_TRANSACTION', { transaction: preparedData });
  saveTransaction(preparedData);
};

export const deleteTransaction = ({ commit }, data) => {
  commit('DELETE_TRANSACTION', { transaction: data });
  deleteTransactionFromAPI(data);
};

export const loadTransactions = ({ state, commit }) => {
  return fetchTransactions(state.startDate, state.endDate).then((res) => {
    commit('LOAD_TRANSACTIONS', res);
  });
};

export const createBusiness = ({ commit, state }, data) => {
  let id = guid();
  let business = Object.assign({ id: id }, data);
  commit('CREATE_BUSINESS', { business: business });
  saveBusiness(business);

  return business;
};

export const loadBusinesses = ({ state, commit }) => {
  if (!state.businesses || Object.keys(state.businesses).length === 0) {
    //TODO handle errors
    return fetchBusinesses().then((res) => {
      commit('LOAD_BUSINESSES', res);
    });
  }
};

export const deleteBusiness = ({ commit }, data) => {
  commit('DELETE_BUSINESS', { business: data });
  deleteBusinessFromAPI(data);
};

export const updateDateFilters = ({ commit }, data) => {
  commit('UPDATE_DATE_FILTERS', { dateFilters: data });
}
