const GameApp = {
    data() {
      return {
        games:[],
        gameForm: {},
        selectedGame: null
      }
    },
    computed: {

    },
    methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },
      selectGame(o) {
        this.selectedGame = o;
        this.gameForm = Object.assign({}, this.selectedGame);
      },
      postGame(evt) {
        if (this.selectedGame === null) {
            this.postNewGame(evt);
        } else {
            this.postEditGame(evt);
        }
      },

    fetchGameData() {
          fetch('/api/games')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.games = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
        },
        postNewGame(evt) {
          //     this.offerForm.studentId = this.selectedStudent.id;

              // console.log("Posting!", this.bookForm);
              console.log("Posting!");

              fetch('api/games/create.php', {
                  method:'POST',
                  body: JSON.stringify(this.gameForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.games = json;

                  // reset the form
                  this.gameForm = {};
                });

              },
        postDeleteReferee(g) {
              if (!confirm("Are you sure you want to delete this record for?")) {
                  return;
              }
              console.log("Starting to Delete");
              fetch('api/games/delete.php', {
                  method:'POST',
                  body: JSON.stringify(g),
                  headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    }
                  })
                  .then( response => response.json() )
                  .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.games = json;



                  });
              },
          postEditGame(evt) {
              this.gameForm.game_id = this.selectedGame.game_id;


              console.log("Updating!", this.gameForm);

              fetch('api/games/update.php', {
                  method:'POST',
                  body: JSON.stringify(this.gameForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.games = json;

                  this.gameForm = {};
                });
            }

      },
    created() {
        // this.fetchUserData();
        this.fetchGameData();
    }

  }



  Vue.createApp(GameApp).mount('#gameApp');
