<template>
  <div id="app">
    <!-- Assume that authentication has already occurred and at this point,
        we are logged in and we have the customer number and name
    -->
    <AppHeader :custNo='sessionObject.custNo' :custName='sessionObject.custName' />

    <!-- Default view shows client sales list with New Sale button on top -->
    <div v-if="showSalesList" class="panelContainer">
      <div class="newSaleBtnContainer">
        <button type="button" class="btn btn-primary" @click="toggleSalesList()">
          <b>Create New Sale</b>
          <img src="./assets/checkout.png" width="50px" title="Create New Sale" />
        </button>
      </div>
      <SalesList :salesData='salesData' />
    </div>
    <div v-else class="panelContainer">
      <NewSalePanel :cancelAction="toggleSalesList" :confirmAction="addNewSale"/>
    </div>
  </div>
  </template>

<script>
import AppHeader from './components/AppHeader.vue';
import SalesList from './components/SalesList.vue';
import NewSalePanel from './components/NewSalePanel.vue';

// DEV Note:
// We get out sales test data from randomapi using an API that I created.
// Unfortunately, you can only query so many results per day for free,
// so I have created a fallback JSON data file in case we've already used
// up our free data.
import testData from './testData.json';

export default {
  name: 'app',
  components: {
    AppHeader,
    NewSalePanel,
    SalesList,
  },
  data() {
    return {
      salesData: [],
      showSalesList: true,
    };
  },
  methods: {
    addNewSale(amount, description, effectiveDate) {
      // Add the new details to the top of our sales list
      // Obviously I'm just manipulating the UI here for prettiness,
      // as we should we pushing this data to our backend.
      this.salesData.unshift({
        id: Math.random().toString(36).replace('0.', ''),
        CustomerNo: this.sessionObject.custNo,
        amount,
        description,
        effectiveDate,
        paidDate: null,
        paymentRef: null,
        paymentFlag: null,
      });
      this.toggleSalesList();
    },
    toggleSalesList() {
      this.showSalesList = !this.showSalesList;
    },
    fetchSalesData() {
      // Generate random sales data from a server I have created
      const salesDataUrl = 'https://randomapi.com/api/5535d26235804ff5c92f13157ae10c1c?results=10';
      this.axios.get(salesDataUrl)
        .then((response) => {
          this.salesData = response.data.results;
        })
        .catch(() => {
          // Use our fallback imported data
          this.salesData = testData.results;
        });
    },
  },
  created() {
    this.fetchSalesData();
  },
  props: {
    sessionObject: Object,
  },
};
</script>

<style>
html {
    background: grey; /* fallback color */
    background: linear-gradient( to bottom, rgb(50, 50, 50), white);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    font-weight: 300;
    min-width: 320px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.ml10 {
  margin-left: 10px;
}
.mr10 {
  margin-right: 10px;
}
#app {
  background-color: #fff;
  font-family: Avenir-Roman,"sans-serif";
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.panelContainer {
    margin-left: 10px;
    margin-right: 10px;
}
.newSaleBtnContainer {
  top: 65px;
  position: absolute;
  z-index: 1;
}
.newSaleBtnContainer button {
  font-size: larger;
  border: solid 1px grey;
}
.newSaleBtnContainer button:hover {
  border: solid 1px lightgrey;
}
.newSaleBtnContainer button b {
  vertical-align: middle;
}
.newSaleBtnContainer:hover * {
  transform: scale(1.05);
}

.newSaleContainer,
.table {
  top: 140px;
  position: absolute;
  width: calc(100% - 20px);
}
.table {
  display: table;
}
</style>
