import * as components from './components'

export default [
  {
    path: '/',
    name: 'accountsListView',
    component: components.AccountsListView,
  },
  {
    path: '/accounts/create',
    name: 'createEditAccount',
    component: components.CreateEditAccount,
  }
]
