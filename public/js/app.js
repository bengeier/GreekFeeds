var button = document.querySelector(".login-button")
button.addEventListener("click", login)

function login() {
    firebase.database().ref("4MC3LfRBOcgvVM3RKN7aO6at2ZQ2").set({org: "Phi Mu"})
    firebase.database().ref("QjDV4I96PrZQuRlGwToPqU3zy1x2").set({org: "Alpha Xi Delta"})
    firebase.database().ref("Svga4QmFBkd2yNbeRk4EJnQGhrP2").set({org: "Theta Xi"})
    firebase.database().ref("eaT9W7hU9ybP3yHv8k7jAMlJjS03").set({org: "Delta Tau Delta"})
    firebase.database().ref("r2myD8gDS3RHPoc9z3LwcPOuoTE3").set({org: "Delta Upsilon"})
    firebase.database().ref("wL3w09B7J6UoFMTRTjwdpcx7p0D3").set({org: "Zeta Beta Tau"})
    firebase.database().ref("yZi1apDsq0dpdj1H2I0g0DDW4x93").set({org: "Sigma Alpha Epsilon"})
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(user.uid).set({org: "Theta Chi"})
        }
    });
}


//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
