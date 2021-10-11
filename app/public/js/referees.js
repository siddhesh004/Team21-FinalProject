const RefereeApp = {
    data() {
      return {

        // "books": {title:{}, author:{}, year_pub:{}, pages:{}, msrp:{}}
        referees:[]
      }
    },
    computed: {

    },
    methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },

    fetchRefereeData() {
          fetch('/api/referees')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.referees = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
        }
      },
    created() {
        // this.fetchUserData();
        this.fetchRefereeData();
    }

  }



  Vue.createApp(RefereeApp).mount('#refereeApp');
