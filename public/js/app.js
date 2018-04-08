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
            document.querySelector('.login-button').remove()
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




    let bg_fill = document.querySelector(".bg-fill");

    let org='Theta Chi'; // todo remove
    const button_strings = {
        'ready':                ['fa-gift', 'Tap the button to notify us that {{org}} has food available for donation'],
        'needs-confirmation':   ['fa-child', 'Please confirm your food donation from {{org}} to Atlanta Mission. Tap anywhere outside the button to cancel.', () => {
            bg_fill.classList.add('cancel', 'enabled');
        }, () => {bg_fill.classList.remove('enabled')}],
        'loading':              ['fa-ellipsis-h', 'Contacting server, please wait while your donation is processed.'],
        'confirmed':            ['fa-bus', 'Awesome! Place any perishable food in your refrigerator, and a volunteer will come pick it up.', 
            () => {
                bg_fill.classList.remove('cancel');
                bg_fill.classList.add('complete', 'enabled');
            }]
    }

    let food_button_state;
    let food_btn = document.querySelector("#org-food-available");
    let food_btn_hint = document.querySelector("#button-hint > div");

    let change_button_state = (new_state) => {
        let old_data = button_strings[food_button_state];
        if (old_data && old_data.length > 3) {
            old_data[3]();
        }
        console.log(food_button_state + " => " + new_state);
        food_button_state = new_state;
        let data = button_strings[new_state]; 
        food_btn.innerHTML = '<i class="fa ' + data[0] + '"></i>';
        food_btn_hint.innerText = data[1].replace('{{org}}', org);

        if (data.length > 2) {
            data[2]();
        }
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
        } else {
            debugger;
        }
    })
})();
