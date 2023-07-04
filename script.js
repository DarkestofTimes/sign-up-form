const inputs = document.querySelectorAll(".input");
const button = document.querySelector(".button");
const requiredFields = document.querySelectorAll(".input[required]");
const patterns = {
  phonenumber: /^(\d{1,2}\s?)?\(?\d{3,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{4,5}$/,
  first: /^[a-z\d]{2,12}$/i,
  last: /^[a-z\d]{2,12}$/i,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
  passwordConfirm: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
  email:
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
};

function validate(field, regex) {
  let siblingWithTip = field.parentElement.parentElement.nextElementSibling;
  if (field.attributes.name.value === "passwordConfirm") {
    if (
      field.value === document.querySelector('input[name="password"]').value &&
      field.value !== ""
    ) {
      field.className = "valid";
      if (siblingWithTip && siblingWithTip.classList.contains("tip")) {
        siblingWithTip.remove();
      }
    } else {
      field.className = "invalid";
      if (!siblingWithTip || !siblingWithTip.classList.contains("tip")) {
        const tipP = document.createElement("p");
        tipP.className = "tip";
        tipP.textContent = "Password doesn't match";
        field.parentElement.parentElement.insertAdjacentElement(
          "afterend",
          tipP
        );
      }
    }
  } else if (regex.test(field.value)) {
    field.className = "valid";
    if (siblingWithTip && siblingWithTip.classList.contains("tip")) {
      siblingWithTip.remove();
    }
  } else {
    field.className = "invalid";
    switch (field.attributes.name.value) {
      case "email":
        if (!siblingWithTip || !siblingWithTip.classList.contains("tip")) {
          const tipP = document.createElement("p");
          tipP.className = "tip";
          tipP.textContent = "Enter valid Email address";
          field.parentElement.parentElement.insertAdjacentElement(
            "afterend",
            tipP
          );
        }
        break;
      case "phonenumber":
        if (!siblingWithTip || !siblingWithTip.classList.contains("tip")) {
          const tipP = document.createElement("p");
          tipP.className = "tip";
          tipP.textContent = "Phone number should be 10 to 15 digits";
          field.parentElement.parentElement.insertAdjacentElement(
            "afterend",
            tipP
          );
        }
        break;
      case "password":
        if (!siblingWithTip || !siblingWithTip.classList.contains("tip")) {
          const tipP = document.createElement("p");
          tipP.className = "tip";
          tipP.textContent =
            "Password should contain at least one Upper case character, lower case character and a digit, and be at least 8 character long";
          field.parentElement.parentElement.insertAdjacentElement(
            "afterend",
            tipP
          );
        }
        break;
    }
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", (ev) => {
    validate(ev.target, patterns[ev.target.attributes.name.value]);
  });
});

button.addEventListener("click", (ev) => {
  ev.preventDefault();
  requiredFields.forEach((field) => {
    if (field.className === "valid") {
      console.log("sent");
    } else {
      console.log("not sent");
    }
  });
});
