(() => {
    "use strict";
    document.querySelector(".login-button").addEventListener("click", () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
        });
    });
    let active_user;
    firebase.auth().onAuthStateChanged((_user) => {
        if (_user) {
            active_user = _user;
        }
    })

    document.querySelector("#org-food-available").addEventListener("click", () => {
        // firebase.database().ref(active_user.uid).update({food: "NEEDED"});
    });
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


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
