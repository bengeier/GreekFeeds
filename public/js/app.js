(() => {
    "use strict";

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
let org;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase.database().ref(user.uid).on("value", function(snapshot) {
      org = snapshot.val()['org'];
      console.log(user.uid + " " + org);

    }, function (error) {
      console.log("Error: " + error.code);
    });
  }
});

document.querySelector(".button").addEventListener("click", () => {
    firebase.database().ref("fraternities").update({[org]: "Needed"});
});

document.querySelector(".list-button").addEventListener("click", () => {
    firebase.database().ref("fraternities").on("value", function(snapshot) {
      snapshot.forEach(function(child) {
        if (child.val() === "Needed") {
          console.log(child.key);
        }
      });
    }, function (error) {
      console.log("Error: " + error.code);
    });
  });


    let food_button_state = 'ready';

    document.querySelector("#org-food-available").addEventListener("click", e => {
        let btn = e.target;
        let old_state = food_button_state;
        if (food_button_state === 'ready') {
            food_button_state = 'needs-confirmation';

        } else if (food_button_state === 'needs-confirmation') {
            btn.classList.add('pending');
            food_button_state = 'loading'
            btn.setAttribute('data-state', 'loading');

            // simulate firebase call
            setTimeout(() => {
                btn.classList.add('done-pending')
                food_button_state = 'confirmed'
                console.log(old_state + " => " + food_button_state);
            }, 2500);
        }
        console.log(old_state + " => " + food_button_state);
    });
})();
