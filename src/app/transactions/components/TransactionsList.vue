<template>
  <div id="transactions-list">
    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Transactions</h1>
      </div>
      <div class="level-right">
        <label>From</label>
        <p class="control has-icon has-addons">
          <datepicker
            name="month"
            input-class="input"
            format="MM/dd/yyyy"
            v-model="startDate"
          ></datepicker>
          <span class="icon">
            <i class="fa fa-calendar" aria-hidden="true"></i>
          </span>
        </p>
        <label>To</label>
        <p class="control has-icon has-addons">
          <datepicker
            name="month"
            input-class="input"
            format="MM/dd/yyyy"
            v-model="endDate"
          ></datepicker>
          <span class="icon">
            <i class="fa fa-calendar" aria-hidden="true"></i>
          </span>
        </p>
      </div>
    </nav>

    <table class="table is-bordered">
      <thead>
        <tr>
          <th>Date</th>
          <th>Business</th>
          <th>Category</th>
          <th>Account</th>
          <th>Note</th>
          <th>Debit</th>
          <th>Credit</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="transaction, key in sortedTransactions"
          :class="{ 'is-delinquent': false }"
        >
          <component
            :is="transactionComponent(transaction)"
            v-model="transaction"
            v-on:updated-transaction="activeTransaction = null"
            v-on:edit-transaction="activeTransaction = transaction"
          ></component>
        </template>
        <CreateUpdateTransaction></CreateUpdateTransaction>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Datepicker from 'vuejs-datepicker';

import CreateUpdateTransaction from './CreateUpdateTransaction';
import Transaction from './Transaction';
import { sortObjects } from '../../../utils';

export default {
  name: 'transactions-list',

  components: {
    Transaction,
    CreateUpdateTransaction,
    Datepicker
  },

  data () {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return {
      activeTransaction: null,
      startDate: firstDay,
      endDate: lastDay
    };
  },

  mounted () {
    this.updateDateFilters({ startDate: this.startDate, endDate: this.endDate });
    this.loadTransactions();
  },

  methods: {
    ...mapActions([
      'createTransaction',
      'updateTransaction',
      'loadTransactions',
      'updateDateFilters'
    ]),

    transactionComponent (transaction) {
      console.log(transaction.date);
      if (this.activeTransaction && this.activeTransaction === transaction) {
        return 'CreateUpdateTransaction';
      }
      return 'Transaction';
    },
  },

  computed: {
    ...mapState({
      'transactions': state => state.transactions.transactions
    }),

    sortedTransactions () {
      return sortObjects(this.transactions, 'date', false);
    }
  },

  watch: {
    startDate: function (val) {
      this.updateDateFilters({ startDate: val })
      this.loadTransactions();
    },

    endDate: function (val) {
      this.updateDateFilters({ endDate: val })
      this.loadTransactions();
    }
  }
};
</script>

<style scoped lang='scss'>
#transactions-list-view {
	background-color: #000000;
	color: #ffffff;
}
</style>
