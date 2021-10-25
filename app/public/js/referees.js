const RefereeApp = {
    data() {
      return {

        // "books": {title:{}, author:{}, year_pub:{}, pages:{}, msrp:{}}
        referees:[],
        refForm: {}
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
        },
        postNewRef(evt) {
          //     this.offerForm.studentId = this.selectedStudent.id;

              // console.log("Posting!", this.bookForm);
              console.log("Posting!");

              fetch('api/referees/create.php', {
                  method:'POST',
                  body: JSON.stringify(this.refForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.referees = json;

                  // reset the form
                  this.refForm = {};
                });

              }
      },
    created() {
        // this.fetchUserData();
        this.fetchRefereeData();
    }

  }



  Vue.createApp(RefereeApp).mount('#refereeApp');
