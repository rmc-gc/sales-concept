<template>
  <div class="modal-mask">
    <div class="cardContainer">
      <h4>Enter card details</h4>

      <div class="form-group">
        <label for="ccName">Payment Amount</label>
        <div class="input-group">
          <span class="input-group-addon dollar">$</span>
          <input type="text"
                  readonly
                  class="form-control"
                  id="amout"
                  name="amount"
                  v-model="row.amount">
        </div>
      </div>
      <div class="form-group">
        <label for="ccName">Name on Card</label>
        <input type="text"
                class="form-control"
                id="cc-name"
                name="cc-name"
                placeholder="Name on credit card"
                v-model="ccName">
      </div>
      <div class="form-group">
        <label for="credit-card">Card Number</label>
        <input type="text"
                class="form-control"
                id="credit-card"
                name="credit-card"
                v-mask="{mask: '9999 - 9999 - 9999 - 9999', greedy: true}"
                @change="ccMaskCheck"
                v-model="ccNumber">
      </div>
      <div class="form-group">
        <label for="exp-date">Expiry Date</label>
        <input type="month"
                class="form-control"
                id="exp-date"
                name="exp-date"
                :min="getToday()"
                :max="getMaxDate()"
                v-model="expiryDate">
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
  </div>
</template>

<script>
export default {
  name: 'CaptureCardDetails',
  props: {
    row: Object,
    cancelAction: Function,
    confirmAction: Function,
  },
  data() {
    return {
      ccName: null,
      ccNumber: null,
      ccNumberIsComplete: false,
      expiryDate: null,
    };
  },
  methods: {
    getToday() {
      return this.$moment().format('YYYY-MM');
    },
    getMaxDate() {
      return this.$moment().add(10, 'years').format('YYYY-MM');
    },
    ccMaskCheck(field) {
      this.ccNumberIsComplete = field.target.inputmask.isComplete();
    },
    isFormIncomplete() {
      // If any of the input fields are empty/incomplete then Confirm button is disabled
      return (this.ccName === null || this.ccName.length === 0
              || !this.ccNumberIsComplete
              || this.expiryDate === null
              || this.$moment(this.expiryDate).format('YYYY-MM') < this.getToday());
    },
    onCancel() {
      this.cancelAction();
    },
    onConfirm() {
      this.confirmAction();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardContainer {
  top: 150px;
  position: absolute;
  z-index: 9999;
  max-width: 340px;
  margin-left: calc((100% - 340px) / 2);
  padding: 20px;
  background: lightgray;
  border: 1px solid grey;
  border-radius: 6px;
}
.panelFooter {
  margin-top: 20px;
}
.input-group-addon.dollar {
    position: relative;
    width: 20px;
    height: 38px;
    border: 1px solid;
    text-align: center;
    display: inline-block;
    padding-top: 6px;
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

.panelFooter {
  display: flex;
  flex-flow: column;
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>
