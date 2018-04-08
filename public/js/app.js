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
    let active_user;
    firebase.auth().onAuthStateChanged((_user) => {
        if (_user) {
            active_user = _user;
        }
    });

    var usernameee = null;
    document.querySelector(".button").addEventListener("click", () => {
        let org = firebase.database().ref(active_user.uid).on("value", function(snapshot) {
            return snapshot.val()['org'];
        }, function (error) {
            console.log("Error: " + error.code);
        });

        //firebase.database().ref("fraternities").update([org]: "Needed");
    });





    let org='Theta Chi'; // todo remove
    const button_strings = {
        'ready':                '<i class="fas fa-gift"></i> Pickup',
        'needs-confirmation':   '<i class="fas fa-child"></i> Confirm food ready at {{org}}',
        'loading':              '<i class="fas fa-ellipsis-h"></i> Confirming your request...',
        'confirmed':            '<i class="fas fa-bus"></i> Great! Your food will be picked up and delivered to Atlanta Mission.'
    }

    let food_button_state;
    let food_btn = document.querySelector("#org-food-available");
    let change_button_state = (new_state) => {
        console.log(food_button_state + " => " + new_state);
        food_button_state = new_state;
        food_btn.innerHTML = button_strings[new_state].replace('{{org}}', org);
    };


    change_button_state('ready');

    food_btn.addEventListener("click", e => {
        e.stopPropagation();
        let btn = e.target;
        let old_state = food_button_state;
        if (food_button_state === 'ready') {
            change_button_state('needs-confirmation');
        } else if (food_button_state === 'needs-confirmation') {
            btn.classList.add('pending');
            change_button_state('loading');

            // simulate firebase call
            setTimeout(() => {
                btn.classList.add('done-pending')
                change_button_state('confirmed');
            }, 2500);
        }
    });
    document.querySelector('.content').addEventListener('click', e => {
        if (food_button_state == 'needs-confirmation') {
            change_button_state('ready')
        }
    })
})();
