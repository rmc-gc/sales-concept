<template>
  <div>
    <div class="float-left ml10">
      <a class="logo" href="https://www.payadvantage.com.au" target="_blank">Pay Advantage</a>
    </div>
    <div class="float-right mr10 logout">
      <img src="../assets/logout.png"
        width="45px" height="45px" title="Logout"
        v-on:click="performLogout" />
    </div>
    <div class="float-right customer-number mr10">
      <div>
        <span class="hide-on-mobile">Customer </span>
        <span>#<b>{{custNo}}</b></span>
      </div>
      <div class="hide-on-mobile">
        <span><b>{{custName}}</b></span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    custNo: String,
    custName: String,
  },
  methods: {
    performLogout() {
      // eslint-disable-next-line
      alert('Logout, invalidate session etc...');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logout {
  cursor: pointer;
  margin-top: 0.5rem;
  background-color: lightgray;
  border: 1px solid black;
  background-position-y: 3px;
}
.logout:hover {
  background-color: gray;
}
.customer-number {
  margin-top: 0.5rem;
  font-size: 16px;
  color: white;
  text-shadow: 1px 1px black;
  text-align: right;
}
.logo {
    cursor: pointer;
    display: block;
    background: no-repeat url(https://www.payadvantage.com.au/wp-content/themes/pay-advantage/assets/images/pay-advantage.svg);
    font-size: 0;
    width: 200px;
    height: 40px;
    margin-top: 0.5rem;
}

@media only screen and (max-width: 500px) {
  .logo {
    width: 170px;
  }
}
@media only screen and (max-width: 450px) {
  .hide-on-mobile {
    display: none;
  }
  .logo {
    width: 140px;
  }
  .customer-number {
    margin-top: 0.9rem;
  }
}
@media only screen and (max-width: 450px) {
  .customer-number {
    margin-top: 1rem;
    font-size: 14px;
  }
}
</style>
