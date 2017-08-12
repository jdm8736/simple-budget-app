<template>
  <div id="budget-create-edit-view">
    YOU CAN DO IT TOO

    <router-link :to="{ name: 'budgetsList' }">View all budgets</router-link>
    <form @submit.prevent="processSave" class="form">
      <label for="month" class="label">Month</label>
      <p class="control">
        <datepicker name="month" input-class="input" format="MMMM yyyy" v-model="selectedBudget.month"></datepicker>
      </p>
      <label for="budgeted" class="label">Budgeted amount</label>
      <p class="control">
        Budgeted: ${{ selectedBudget.budgeted }}
      </p>
      <p class="control">
        Spent: ${{ selectedBudget.spent }}
      </p>
      <p class="control">
        Income: ${{ selectedBudget.income }}
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'budgetsList' }">
            <button class="button is-link">Cancel</button>
          </router-link>
        </p>
      </div>
    </form>
    <create-update-budget-category></create-update-budget-category>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'

import CreateUpdateBudgetCategory from './CreateUpdateBudgetCategory'

export default {
  name: 'budget-create-edit-view',
  components: {
    Datepicker,
    CreateUpdateBudgetCategory
  },

  data: () => {
    return {
      selectedBudget: {},
    };
  },

  mounted () {
    if ('budgetId' in this.$route.params) {
      this.loadBudgets().then(() => {
        let selectedBudget = this.getBudgetById(this.$route.params.budgetId);
      if (selectedBudget) {
        this.selectedBudget = Object.assign({}, selectedBudget)
      }
      });
    }
  },

  methods: {
    ...mapActions([
      'createBudget',
      'updateBudget',
      'loadBudgets'
    ]),

    resetAndGo () {
      this.selectedBudget = {}
    },

    saveNewBudget () {
      this.createBudget(this.selectedBudget).then(() => {
        this.resetAndGo()
      }).catch(err => {
        console.error(err)
      })
    },

    saveBudget () {
      this.updateBudget(this.selectedBudget).then(() => {
        this.resetAndGo();
      });
    },
    processSave() {
      this.$route.params.budgetId ? this.saveBudget() : this.saveNewBudget();
    }
  },

  computed: {
    ...mapGetters([
      'getBudgetById',
    ])
  },
};
</script>

<style lang="css" scoped>
</style>
