var userUpEmail = document.getElementById("userUpEmail");
var userUpName = document.getElementById("userUpName");
var userUpPassword = document.getElementById("userUpPassword");
var userInEmail = document.getElementById("userInEmail");
var userInPassword = document.getElementById("userInPassword");
var upMsg = document.getElementById("upMsg");
var inMsg = document.getElementById("inMsg");
var welcomeUser = document.getElementById("welcomeUser");
if (localStorage.getItem("users") != null) {
  usersList = JSON.parse(localStorage.getItem("users"));
} else {
  usersList = [];
}

function upInputsFull() {
  if (
    userUpEmail.value == "" ||
    userUpName.value == "" ||
    userUpPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}
function inInputsFull() {
  if (userInEmail.value == "" || userInPassword.value == "") {
    return false;
  } else {
    return true;
  }
}
function isEmailExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].uEmail.toLowerCase() == userUpEmail.value.toLowerCase()) {
      return true;
    }
  }
}

function signUpUser() {
  if (upInputsFull() == false) {
    upMsg.innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
  } else {
    var user = {
      uName: userUpName.value,
      uEmail: userUpEmail.value,
      uPassword: userUpPassword.value,
    };
    if (isEmailExist() == true) {
      upMsg.innerHTML = `<span class="text-danger m-3">Email already in use</span>`;
    } else if (Validation(userUpEmail) == true) {
      usersList.push(user);
      localStorage.setItem("users", JSON.stringify(usersList));
      upMsg.innerHTML = `<span class="text-danger m-3">Success</span>`;
      window.location.href = "index.html";
    } else {
      upMsg.innerHTML = `<span class="text-danger m-3">Email is invalid</span>`;
    }
  }
}

function signInUser() {
  if (inInputsFull() == false) {
    inMsg.innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
  } else {
    var signInInfo = {
      uEmail: userInEmail.value,
      uPassword: userInPassword.value,
    };
    if (localStorage.getItem("users") == null) {
      inMsg.innerHTML =
        '<span class="p-2 text-danger">Please register first</span>';
    } else {
      for (var i = 0; i < usersList.length; i++) {
        if (
          usersList[i].uEmail.toLowerCase() ==
            signInInfo.uEmail.toLowerCase() &&
          usersList[i].uPassword.toLowerCase() ==
            signInInfo.uPassword.toLowerCase()
        ) {
          localStorage.setItem("sessionUsername", usersList[i].uName);
          window.location.href = "Welcome.html";
          inMsg.innerHTML = '<span class="text-danger m-3">Welcome!</span>';

          break;
        } else {
          inMsg.innerHTML =
            '<span class="p-2 text-danger">incorrect email or password</span>';
        }
      }
    }
  }
}

function Validation(ele) {
  var Regex = {
    userUpEmail:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  if (Regex[ele.id].test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
  }
}

var username = localStorage.getItem("sessionUsername");
if (username) {
  var currentPage = document.querySelector("title").textContent;
  if (currentPage === "Welcome") {
    backBtnBoom();
  } else {
    window.location.href = "Welcome.html";
  }
}
if (username) {
  welcomeUser.innerHTML = "Welcome " + username;
}
function backBtnBoom() {
  window.history.forward();
}
setTimeout(backBtnBoom(), 0);
window.onunload = function () {
  null;
};
function logout() {
  localStorage.removeItem("sessionUsername");
}
