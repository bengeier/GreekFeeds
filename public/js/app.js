(() => {
    "use strict";

    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    document.querySelector(".login-button").addEventListener("click", () => {
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: 'index.html'
        });
    });

    let org;
    firebase.auth().onAuthStateChanged((user) => {
        console.log('changed', user);
        if (user) {
            firebase.database().ref(user.uid).on("value", function(snapshot) {
                let db_user = snapshot.val()
                org = (db_user && db_user['org']) || 'unknown';
                console.log(user.uid + " " + org);
                document.querySelector('.login-button').remove()
                change_button_state('ready');


            }, function (error) {
                console.log("Error: " + error.code);
            });
        }
    });

    document.querySelector(".list-button").addEventListener("click", () => {
        firebase.database().ref("fraternities").on("value", function(snapshot) {
            snapshot.forEach(function(child) {
                if (child.val() === "Needed") {
                    console.log(child.key);
                } else {
                    console.log("not needed: " + child.key)
                }
            });
        }, function (error) {
            console.log("Error: " + error.code);
        });
    });




    let bg_fill = document.querySelector(".bg-fill");

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
        food_btn_hint.innerText = data[1].replace('{{org}}', deslug(org));

        if (data.length > 2) {
            data[2]();
        }
    };




    function deslug(slugged_str) {
        let re = /[-_]/g
        return titleCase(slugged_str.replace(re, ' '));
        function titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                // You do not need to check if i is larger than splitStr length, as your for does that for you
                // Assign it back to the array
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            // Directly return the joined string
            return splitStr.join(' '); 
        }
    }

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
            firebase.database().ref("fraternities").update({[org]: "Needed"});
        }
    });
    document.querySelector('.content').addEventListener('click', e => {
        if (food_button_state == 'needs-confirmation') {
            change_button_state('ready')
        } else {
        }
    })
})();
