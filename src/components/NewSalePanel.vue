<template>
    <div class="newSaleContainer">
      <h4>Enter new sale details</h4>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input type="number"
                class="form-control"
                id="amount"
                placeholder="Amount"
                v-model="amount"/>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control"
                id="description"
                rows=3
                placeholder="Description"
                v-model="description"/>
      </div>
      <div class="form-group">
        <label for="effective-date">Effective Date</label>
        <input type="date"
                class="form-control"
                id="effective-date"
                placeholder="Effective Date"
                v-model="effectiveDate"/>
      </div>

      <div class="panelFooter">
        <button type="button"
                class="btn btn-secondary float-left"
                @click="onCancel()">
          <b>Cancel</b>
          <img src="../assets/cross.png" width="25px" title="Cancel" />
        </button>
        <button type="button"
                class="btn btn-success float-right"
                :disabled="isFormIncomplete()"
                @click="onConfirm()">
          <b>Confirm</b>
          <img src="../assets/tick.png" width="40px" title="Confirm" />
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NewSalePanel',
  props: {
    cancelAction: Function,
    confirmAction: Function,
  },
  data() {
    return {
      amount: null,
      description: null,
      effectiveDate: null,
    };
  },
  methods: {
    isFormIncomplete() {
      // If any of the input fields are empty then Confirm button is disabled
      return !(this.amount && this.description && this.effectiveDate);
    },
    onCancel() {
      this.cancelAction();
    },
    onConfirm() {
      this.confirmAction(this.amount, this.description, this.effectiveDate);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newSaleContainer {
  max-width: 700px;
  margin-left: calc((100% - 700px) / 2 - 10px);
  padding: 20px;
  background: lightgray;
  border: 1px solid grey;
  border-radius: 6px;
}
.panelFooter {
  margin-top: 20px;
}
button {
  height: 60px;
  min-width: 300px;
}
button b {
  vertical-align: middle;
}
button img {
  margin-left: 10px;
}
button:focus:not([disabled]) img,
button:hover:not([disabled]) img {
  transform: scale(1.3);
}

@media only screen and (max-width: 720px) {
  .newSaleContainer {
    max-width: unset;
    margin-left: unset
  }
}
@media only screen and (max-width: 700px) {
  button {
    min-width: 200px;
  }
}
@media only screen and (max-width: 500px) {
  .panelFooter {
    display: flex;
    flex-flow: column;
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
  }
}
</style>
