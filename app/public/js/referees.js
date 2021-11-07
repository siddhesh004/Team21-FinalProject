const RefereeApp = {
    data() {
      return {
        referees:[],
        dategames:[],
        assignmentrefs:[],
        pastassignmentrefs:[],
        futureassignmentrefs:[],
        refForm: {},
        assignmentForm: {},
        dateForm: {},
        games:[],
        assignments:[],
        gameForm: {},
        selectedGame: null,
        selectedReferee: null
      }
    },
    computed: {

    },
    methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },
      selectReferee(o) {
        this.selectedReferee = o;
        this.refForm = Object.assign({}, this.selectedReferee);
        this.fetchAssignmentsforReferee(o);
      },
      fetchAssignments(){


        fetch('/api/assignment')
        .then( response => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            this.assignments = responseJson;
        })
        .catch( (err) => {
            console.error(err);
        })

    },
      fetchAssignmentsforReferee(o){
        this.selectedReferee = o;
        this.fetchPastAssignmentsforReferee(o);
        this.fetchFutureAssignmentsforReferee(o);

        fetch('api/reports/index.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json())
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assignmentrefs = json;
            });

    },
      fetchPastAssignmentsforReferee(o){
        this.selectedReferee = o;

        fetch('api/reports/past.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json())
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.pastassignmentrefs = json;
            });

    },
    fetchFutureAssignmentsforReferee(o){
      this.selectedReferee = o;

      fetch('api/reports/future.php', {
          method:'POST',
          body: JSON.stringify(o),
          headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json())
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.futureassignmentrefs = json;
          });

  },
      postRef(evt) {
        if (this.selectedReferee === null) {
            this.postNewRef(evt);
        } else {
            this.postEditReferee(evt);
        }
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

              },
        postDeleteReferee(r) {
              if (!confirm("Are you sure you want to delete the record for "+r.ref_name+"?")) {
                  return;
              }
              console.log("Starting to Delete");
              fetch('api/referees/delete.php', {
                  method:'POST',
                  body: JSON.stringify(r),
                  headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    }
                  })
                  .then( response => response.json() )
                  .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.referees = json;



                  });
              },
              declineAssignment(a) {
                    if (!confirm("Are you sure you want to delete the record for "+a.a_id+"?")) {
                        return;
                    }
                    console.log("Starting to Decline");
                    fetch('api/assignment/decline.php', {
                        method:'POST',
                        body: JSON.stringify(a),
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                          }
                        })
                        .then( response => response.json() )
                        .then( json => {
                          console.log("Returned from post:", json);
                          // TODO: test a result was returned!
                          this.assignments = json;



                        });
                    },
          postEditReferee(evt) {
              this.refForm.referee_id = this.selectedReferee.referee_id;


              console.log("Updating!", this.refForm);

              fetch('api/referees/update.php', {
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

                  this.refForm = {};
                });
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
            findDateRange(evt) {
              //     this.offerForm.studentId = this.selectedStudent.id;

                  // console.log("Posting!", this.bookForm);
                  console.log("Finding Date Range! for", this.dateForm);


                  fetch('api/reports/date.php', {
                      method:'POST',
                      body: JSON.stringify(this.dateForm),
                      headers: {
                        "Content-Type": "application/json; charset=utf-8"
                      }
                    })
                    .then( response => response.json() )
                    .then( json => {
                      console.log("Returned from post:", json);
                      // TODO: test a result was returned!
                      this.dategames = json;

                      // reset the form
                      this.dateForm = {};
                    });

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
                  },
                  postAssignment(evt) {
                    //     this.offerForm.studentId = this.selectedStudent.id;

                        // console.log("Posting!", this.bookForm);
                        console.log("Posting!");

                        fetch('api/assignment/create.php', {
                            method:'POST',
                            body: JSON.stringify(this.assignmentForm),
                            headers: {
                              "Content-Type": "application/json; charset=utf-8"
                            }
                          })
                          .then( response => response.json() )
                          .then( json => {
                            console.log("Returned from post:", json);
                            // TODO: test a result was returned!


                            // reset the form
                            this.assignmentForm = {};
                          });

                        },

      },
    created() {
        this.fetchGameData();
        this.fetchRefereeData();
        this.fetchAssignments();

    }

  }



  Vue.createApp(RefereeApp).mount('#refereeApp');
