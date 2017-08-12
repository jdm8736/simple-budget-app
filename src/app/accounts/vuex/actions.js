import { guid } from '../../../utils'
import { deleteAccount as deleteAccountFromAPI, saveAccount, fetchAccounts } from '../api'

export const createAccount = ({ commit }, data) => {
  let id = guid()
  let account = Object.assign({ id: id }, data)
  commit('CREATE_ACCOUNT', {account: account})
  saveAccount(account).then((value) => {
    // we have saved it, now what?!?
  })
}

export const updateAccount = ({ commit }, data) => {
  commit('UPDATE_ACCOUNT', { account: data })
  saveAccount(data)
}

export const deleteAccount = ({ commit }, data) => {
  commit('DELETE_ACCOUNT', { account: data })
  deleteAccountFromAPI(data)
};

export const loadAccounts = (state) => {
  // loads accounts only if they are not already loaded
  // later we might want to reload them by force
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    return fetchAccounts().then((res) => {
      state.commit('LOAD_ACCOUNTS', res)
    })
  }
}
