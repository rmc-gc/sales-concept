<template>
  <div>
    <table class="table table-light table-striped table-responsive">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="text-right">Amount
              <img class="table-search" src="../assets/search.png" width="20px"
                @click="doSearch('amount')" />
          </th>
          <th scope="col">Description
              <img class="table-search" src="../assets/search.png" width="20px"
                @click="doSearch('description')" /></th>
          <th scope="col" class="text-center">Effective Date
              <img class="table-search" src="../assets/search.png" width="20px"
                @click="doSearch('effectiveDate')" /></th>
          <th scope="col" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in salesData" :key="row.id">
          <td class="text-right">{{row.amount | currency }}</td>
          <td class="truncate" :title="row.description">{{row.description}}</td>
          <td class="text-center">{{row.effectiveDate | moment('DD-MMM-YY')}}</td>
          <td class="text-center">
            <!-- Paid-in-full when we have a payment reference -->
            <div v-if="row.paymentRef">
              <img src="../assets/paid-in-full.png" width="50px"
                :title="paidDateTooltip(row)" />
            </div>
            <!-- Sale can be cancelled if no payment ref associated -->
            <div v-if="!row.paymentRef">
              <a @click="cancelSale(row)">Cancel Sale</a>
            </div>
            <!-- Sale can be marked as PAID if no payment ref associated with it -->
            <div v-if="!row.paymentRef">
              <a @click="markAsPaid(row)">Mark as PAID</a>
            </div>
            <!-- Sale can be marked as PAID if no payment ref associated with it -->
            <div v-if="!row.paymentRef">
              <a @click="payRequest(row)">Pay Request</a>
            </div>
            <!-- Capture card details -->
            <div v-if="!row.paymentRef">
              <a @click="captureCardDetails(row)">Process Card</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-if="showModal" @close="showModal = false">
      <h5 slot="header">Pay Request</h5>
      <div slot="body">Pay outstanding amount of {{selectedRow.amount | currency}} via this link:
        <a :href="payRequestUrl" target="_blank">{{payRequestUrl}}</a>
      </div>
    </modal>

    <CaptureCardDetails v-if="captureCard"
        :row="selectedRow"
        :cancelAction="toggleCardCapture"
        :confirmAction="cardCaptured"/>
  </div>
</template>

<script>
import CaptureCardDetails from './CaptureCardDetails.vue';
import Modal from './Modal.vue';

export default {
  name: 'SalesList',
  components: {
    CaptureCardDetails,
    Modal,
  },
  props: {
    salesData: Array,
  },
  data() {
    return {
      showModal: false,
      selectedRow: null,
      captureCard: false,
    };
  },
  computed: {
    payRequestUrl() {
      return `https://payrequest.link/${this.selectedRow.id}`;
    },
  },
  methods: {
    toggleCardCapture() {
      this.captureCard = !this.captureCard;
    },
    cardCaptured() {
      // eslint-disable-next-line
      alert(`Let's assume that some backend process is taking the card payment and everything's hunky-dory!`);

      this.markAsPaid(this.selectedRow);
      this.toggleCardCapture();
    },
    paidDateTooltip(row) {
      return `Paid: ${this.$moment(row.paidDate).format('DD-MMM-YY')}`;
    },
    cancelSale(row) {
      // eslint-disable-next-line
      alert(`Cancel Sale for:\n\n\tCustomer No: ${row.customerNo}\n\tSale Ref: ${row.id} \
        \n\nTODO: Mark sale as cancelled in DB`);

      // We want to return all rows that are NOT the row we're cancelling
      this.salesData = this.salesData.filter(currentRow => currentRow.id !== row.id);
    },
    markAsPaid(row) {
      // TODO: Patch DB with payment data as I can only manipulate our test data here

      // eslint doesn't like me updating the row object passed in as param
      // but it's OK, I know what I'm doing :-)

      // eslint-disable-next-line
      row.paidDate = this.$moment().format();
      // eslint-disable-next-line
      row.paymentRef = 'ONLINE';
      // eslint-disable-next-line
      row.paymentFlag = 'U';
    },
    payRequest(row) {
      this.selectedRow = row;
      this.showModal = true;
    },
    doSearch(column) {
      // eslint-disable-next-line
      alert(`Search on '${column}'`);
    },
    captureCardDetails(row) {
      this.selectedRow = row;
      this.captureCard = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-search {
  cursor: pointer;
  transition: transform .2s;
}
.table-search:hover {
  transform: scale(1.5);
}

@media only screen and (max-width: 500px) {
  .table {
    display: block;
  }
  .truncate {
    display: block;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
td a {
  cursor: pointer;
  font-size: smaller;
  color: blue !important;
  text-decoration: underline !important;
  white-space: nowrap;
}
</style>
