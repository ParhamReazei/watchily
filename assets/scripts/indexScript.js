//login handling
const userName = document.getElementById("userName");
const userPass = document.getElementById("password");
const formLoginSubmission = async (e) => {
  e.preventDefault();
  if (!userName || !userPass) {
    document.getElementById("wrongText").style = "display:block";
  } else {
    document.getElementById("wrongText").style = "display:none";
    const response = await fetch(
      "https://6489722d5fa58521caaf9b75.mockapi.io/users",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let validity;
        data.map((item) => {
          if (item.username == userName.value) {
            if (userPass.value == item.password) {
              location.href = "/assets/pages/home.html";
              localStorage.setItem("userName", userName.value);
              validity = true;
            }
          }
        });
        if (!validity) {
          document.getElementById("wrongText").style = "display:block";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

//sign up handeling
const userRealName = document.getElementById("userRealName");
const formSignupSubmission = async (e) => {
  e.preventDefault();
  if (userName.value && userPass.value && userRealName.value) {
    let validity;
    const response = await fetch(
      "https://6489722d5fa58521caaf9b75.mockapi.io/users",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const targetUser = data.find((item) => item.username == userName.value);
        if (targetUser) {
          document.getElementById("wrongText").style = "display:block";
          document.getElementById("wrongText").innerHTML =
            "Your username<br> already exists,<br> try a new one";
        } else {
          validity = true;
        }
        if (validity) {
          (async () => {
            const response = await fetch(
              "https://6489722d5fa58521caaf9b75.mockapi.io/users",
              {
                method: "POST",
                body: JSON.stringify({
                  name: userRealName.value,
                  username: userName.value,
                  password: userPass.value,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            )
              .then((response) => {
                response.json();
                localStorage.setItem("userName", userName.value);
                location.href = "/assets/pages/home.html";
              })
              .then((json) => {
                return json.json();
              })
              .catch((error) => {
                console.log(error);
              });
          })();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    document.getElementById("wrongText").style = "display:block";
  }
};

//handling stay signed in
const checkBox = document.querySelector("#staySignedIn");
const checkBoxTag = document.querySelector(".stay-signed-in");
function signedInHandler() {
  if (checkBox.checked) {
    checkBox.checked = false;
    localStorage.setItem("checkBox", "not-checked");
  } else {
    checkBox.checked = true;
    localStorage.setItem("checkBox", "checked");
  }
}
function loadingLoginPage() {
  if (!checkBox.checked) {
    localStorage.clear();
  } else {
    location.href = "/assets/pages/home.html";
  }
}
