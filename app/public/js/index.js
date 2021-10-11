const MountApp = {
    data() {
      return {
        result: {},
        list: [5,6,7,8],
        message: "Waiting ..."
      }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },
    methods: {
      prettyDollar(n) {
        const d = new Intl.NumberFormat("en-US").format(n);
        return "$ " + d;
    },
        fetchUserData() {
            //Method 1:
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((json) => {
                console.log("Got json back:", json);
                this.result = json.results[0];
            })
            .catch( (error) => {
                console.error(error);
            });
        }
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
      },
    created() {
        this.fetchUserData();
        // this.fetchBookData();
    }

  }

  Vue.createApp(MountApp).mount('#sidApp');
