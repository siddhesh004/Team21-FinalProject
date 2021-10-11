const BookApp = {
    data() {
      return {

        // "books": {title:{}, author:{}, year_pub:{}, pages:{}, msrp:{}}
        books:[]
      }
    },
    computed: {

    },
    methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },

    fetchBookData() {
          fetch('/api/books')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
        }
      },
    created() {
        // this.fetchUserData();
        this.fetchBookData();
    }

  }



  Vue.createApp(BookApp).mount('#bookApp');
