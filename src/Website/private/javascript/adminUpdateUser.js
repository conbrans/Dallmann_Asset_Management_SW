/**
 * author = Constantin Brans
 */
function checkPasswordRequirements() {
    let strength = 0;
    const strengthBar = document.getElementById("strength");
    let password = document.getElementById("password").value;


    if (password.match(/[!§@§%&()=?`²³{[]}\<>|]/))
    {
        strength += 1;
    }
    if (password.match(/[a-z]/)) {
        strength += 1;
    }
    if (password.match(/[0-9]/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]/)) {
        strength += 1;
    }
    if (password.length >= 8) {
        strength += 2;
    }


    switch (strength) {
        case 0:
            strengthBar.value = 0;
            break
        case 1:
            strengthBar.value = 20;
            break
        case 2:
            strengthBar.value = 40;
            break
        case 3:
            strengthBar.value = 60;
            break
        case 4:
            strengthBar.value = 80;
            break
        case 5:
            strengthBar.value = 100;
            break
        default:
            strengthBar.value = 0;
    }

}


function checkPasswords() {
    let password = document.getElementById("password").value;
    let password1 = document.getElementById("passwordCorrect").value;

    passwordBackground = document.getElementById("passwordCorrect");

    if (password != password1 || password.length > 255) {
        passwordBackground.style.background = "red";
        return false;
    } else {
        passwordBackground.style.background = "lightgreen";
        document.getElementById("password").style.
            background = "lightgreen";
        return true;
    }
}