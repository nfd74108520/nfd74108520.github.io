var app = new Vue({
  el: "#app",
  data: {
    myCart: [
      {
        productName: "牛奶",
        price: 90,
        amount: 10,
      },
      {
        productName: "咖啡",
        price: 40,
        amount: 20,
      },
      {
        productName: "布丁",
        price: 30,
        amount: 30,
      },
      {
        productName: "糖果",
        price: 10,
        amount: 40,
      },
    ],
  },
  methods: {},
  watch: {},
  computed: {
    total: function () {
      let result = this.myCart
        .map((x) => x.price * x.amount)
        .reduce((x, y) => { return x + y});
      return result;
    },
  },
});
