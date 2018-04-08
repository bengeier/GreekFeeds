document.querySelector(".login-button").addEventListener("click", () => {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });
  firebase.auth().signInUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
});
let active_user;
firebase.auth().onAuthStateChanged((_user) => {
  if (_user) {
    active_user = _user;
  }
});
document.querySelector(".button").addEventListener("click", () => {
    firebase.database().ref(active_user.uid).update({food: "NEEDED"});
});
//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
