<template>
  <div id="budget-categorycreate-edit-view">
    <form @submit.prevent="processSave" class="form">
      <div class="control is-horizontal">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <input type="text" v-model="budgetCategory.category">
          </div>
          <div class="control is-expanded">
            $<input type="number" class="input" v-model="budgetCategory.budgeted">
          </div>
          <div class="control is-expanded">
            ${{ budgetCategory.spent }}
          </div>
          <button @click.prevent="processSave">Add</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'budget-categorycreate-edit-view',
  components: {},
  data () {
    return {
      budgetCategory: {},
    };
  },
  mounted() {

  },

  methods: {
    ...mapActions([
    ]),

    processSave() {

    }
  },
  computed: {
    ...mapGetters([
    ])
  },
};
</script>

<style lang="css" scoped>
</style>
