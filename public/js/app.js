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

  firebase.database().ref("fraternities").update([org]: "Needed");
});

document.querySelector(".list-button").addEventListener("click", () => {
//firebase.database().ref("fraternities").update({'alpha_phi': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_xi_delta': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_chi_omega': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_gamma_delta': "NEEDED"});
//firebase.database().ref("fraternities").update({'kappa_alpha_theta': "NEEDED"});
//firebase.database().ref("fraternities").update({'phi_mu': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_delta_pi': "NEEDED"});
//firebase.database().ref("fraternities").update({'zeta_tau_alpha': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_delta_chi': "NEEDED"});
//firebase.database().ref("fraternities").update({'theta_chi': "NEEDED"});
//firebase.database().ref("fraternities").update({'phi_gamma_delta': "NEEDED"});
//firebase.database().ref("fraternities").update({'phi_sigma_kappa': "NEEDED"});
//firebase.database().ref("fraternities").update({'delta_upsilon': "NEEDED"});
//firebase.database().ref("fraternities").update({'lambda_chi_alpha': "NEEDED"});
//firebase.database().ref("fraternities").update({'pi_kappa_phi': "NEEDED"});
//firebase.database().ref("fraternities").update({'phi_kappa_sigma': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_epsilon_pi': "NEEDED"});
//firebase.database().ref("fraternities").update({'delta_tau_delta': "NEEDED"});
//firebase.database().ref("fraternities").update({'tau_kappa_epsilon': "NEEDED"});
//firebase.database().ref("fraternities").update({'delta_chi': "NEEDED"});
//firebase.database().ref("fraternities").update({'beta_theta_pi': "NEEDED"});
//firebase.database().ref("fraternities").update({'sigma_chi': "NEEDED"});
//firebase.database().ref("fraternities").update({'kappa_sigma': "NEEDED"});
//firebase.database().ref("fraternities").update({'chi_psi': "NEEDED"});
//firebase.database().ref("fraternities").update({'zeta_beta_tau': "NEEDED"});
//firebase.database().ref("fraternities").update({'theta_xi': "NEEDED"});
//firebase.database().ref("fraternities").update({'delta_sigma_phi': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_sigma_phi': "NEEDED"});
//firebase.database().ref("fraternities").update({'alpha_tau_omega': "NEEDED"});
//firebase.database().ref("fraternities").update({'phi_kappa_theta': "NEEDED"});
//firebase.database().ref("fraternities").update({'chi_phi': "NEEDED"});
//firebase.database().ref("fraternities").update({'sigma_nu': "NEEDED"});
//firebase.database().ref("fraternities").update({'phi_delta_theta': "NEEDED"});
//firebase.database().ref("fraternities").update({'sigma_phi_epsilon': "NEEDED"});
//firebase.database().ref("fraternities").update({'sigma_alpha_epsilon': "NEEDED"});
//firebase.database().ref("fraternities").update({'kappa_alpha': "NEEDED"});
//firebase.database().ref("fraternities").update({'pi_kappa_alpha': "NEEDED"});
});

//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
