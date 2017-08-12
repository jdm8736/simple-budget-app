import localforage from 'localforage'
import { processAPIData } from '../../utils'

const BUDGET_NAMESPACE = 'BUDGET-'
const CATEGORY_NAMESPACE = 'CATEGORY-'

export const saveBudget = (budget) => {
  budget = Object.assign({}, budget)
  budget.month = budget.month.toJSON()

  return localforage.setItem(
    BUDGET_NAMESPACE + budget.id,
    budget
  ).then((value) => {
    return value
  }).catch((err) => {
    console.error('OMG THIS IS TERRIBLE SEE: ', err)
  })
}

export const fetchBudgets = () => {
  return localforage.startsWith(BUDGET_NAMESPACE).then(res => {
    let budgets = processAPIData(res)
    Object.keys(budgets).forEach(o => {
      budgets[o].month = new Date(budgets[o].month)
    })

    return budgets
  })
}

export const saveCategory = (category) => {
  return localforage.setItem(
    CATEGORY_NAMESPACE + category.id,
    category
  ).then(value => {
    return value
  }).catch(err => {
    console.err('THERE IS A PROBLEM ', err)
  })
}

export const fetchCategories = () => {
  return localforage.startsWith(CATEGORY_NAMESPACE).then(res => {
    return processAPIData(res)
  })
}
