import moment from 'moment'
import { guid } from '../../../utils'
import { saveBudget, fetchBudgets, saveCategory, fetchCategories } from '../api'

const verifyUniqueMonth = (budgets, budget) => {
  let month = moment(budget.month)
  return !Object.values(budgets).find(o => {
    if (o.id === budget.id) return false
    return month.isSame(o.month, 'month')
  })
}

export const createBudget = ({ commit, state }, data) => {
  if(!verifyUniqueMonth(state.budgets, data)) {
    return Promise.reject(new Error('OH NO YOU CANT DO THAT THERES ALREADY ONE'))
  }

  let id = guid()
  let budget = Object.assign({ id: id }, data)

  budget.budgeted = 0
  budget.spent = 0
  budget.income = 0

  commit('CREATE_BUDGET', { budget: budget })
  saveBudget(budget).then((value) => {
    // we SAVED the BUUUUDGEt
  })
}

export const updateBudget = ({ commit, state }, data) => {
  if(!verifyUniqueMonth(state.budgets, data)) {
    return Promise.reject(new Error('OH NO YOU CANT DO THAT THERES ALREADY ONE'))
  }
  commit('UPDATE_BUDGET', { budget: data })
  saveBudget(data)
}

export const loadBudgets = ({ state, commit }) => {
  if (!state.budgets || Object.keys(state.budgets).length === 0) {
    return fetchBudgets().then(res => {
      commit('LOAD_BUDGETS', res)
    })
  }
}

export const updateBudgetBalance = ({ commit, getters }, data) => {
  commit('UPDATE_BUDGET_BALANCE', data)
  saveBudget(getters.getBudgetById(data.budget.id))
}

export const createCategory = ({ commit, state }, data) => {
  let id = guid()
  let category = Object.assign({ id: id }, data)
  commit('CREATE_CATEGORY', { category: category })
  saveCategory(category)
  return category
}

export const loadCategories = ({ state, commit }) => {
  if (!state.categories || Object.keys(state.categories).length === 0) {
    return fetchCategories().then(res => {
      commit('LOAD_CATEGORIES', res)
    })
  }
}

export const createBudgetCategory = ({ commit, dispatch, getters }, data) => {
  if (!data.budget.budgetCategories || Object.keys(data.budget.budgetCategories).length === 0) {
    commit('CREATE_EMPTY_BUDGET_CATEGORY_OBJECT', data.budget)
  }

  let id = guid()
  let budgetCategory = Object.assign({ id: id }, data.budgetCategory)

  commit('CREATE_BUDGET_CATEGORY', { budget: data.budget, budgetCategory: budgetCategory })

  saveBudget(getters.getBudgetById(data.budget.id))

  dispatch('updateBudgetBalance', {
    budget: data.budget,
    param: 'budgeted',
    value: budgetCategory.budgeted
  })
}
