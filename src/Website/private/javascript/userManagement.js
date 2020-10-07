window.onload = function (){
    loadData(0);
}



function changeFieldStatus(input) {
    let textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}

function changeSelectStatus(input) {
    let dropDown = document.getElementById(input);
    dropDown.disabled = !dropDown.disabled;
}

function deleteUserMessage() {
    confirm("ACHTUNG!\nSie sind dabei den gewälten User zu löschen.")

}

function resetUserPasswordMessage() {
    confirm("ACHTUNG!\nSie sind dabei das Passwort des Benutzers" +
        " zurückzusetzten.");
}


function loadData(i){

    document.getElementById("firstName").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("lastName").value =
        document.getElementById("tr"+i.toString()+"td2").innerHTML;
    document.getElementById("e-Mail").value   =
        document.getElementById("tr"+i.toString()+"td3").innerHTML;
    document.getElementById("rolle").value    =
        document.getElementById("tr"+i.toString()+"td4").innerHTML;

    var data ={
        workerid : document.getElementById("tr"+i.toString()+"td5").innerHTML,
        mail : document.getElementById("tr"+i.toString()+"td3").innerHTML,
    } ;
    console.log(data);
    $.ajax({
        type : 'post',
        url : '/sendWorkerInfos',
        data: data,
        data_type : 'json'
    }).done(()=>{
        console.log("Workerid is transported");
    });
}



function changeFieldStatus(input) {
    let textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}

function changeSelectStatus(input) {
    let dropDown = document.getElementById(input);
    dropDown.disabled = !dropDown.disabled;
}

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

/**
 * autocompletion for the mail input, takes the first letter
 * of the first name and transform it to lowercase
 */
function setEmail() {
    let firstLetter = (document.getElementById("firstName").value)
        .charAt(0).toLowerCase();
    let lastName = (document.getElementById("lastName").value)
        .toLowerCase();

    document.getElementById("email").value = firstLetter + "."
        + lastName + "@dallmann-bau.de";
}

/**
 * triggered with a click on the password input and
 * writes a standard password in the field
 */
function setDefaultPassword()
{
    document.getElementById("password").value = "123456";
}


/**
 * preselect the rights on the tab "Rechte" after which "Rolle"
 * is choosen in the dropdown menu
 */
function selectPermission()
{
    var length = document.getElementsByName("adminPermission")
        .length
    for (var i = 0; i < length ; i++)
    {
        document.getElementsByName("adminPermission")
            [i].checked = false;
        document.getElementsByName("workshopPermission")
            [i].checked = false;
        document.getElementsByName("foremanPermission")
            [i].checked = false;
        document.getElementsByName("accountingPermission")
            [i].checked = false;
    }

    let role = document.getElementById("role").value;
    let permission = role.toString() + "Inherited";
    document.getElementById(permission).checked = true;
}

/**
 * function to delete checked radio buttons
 * @param radioname declares the radio buttons which should be cleared
 */
function removeCheckedRadio(radioname)
{
    for (var i = 0; i < document.getElementsByName(radioname).length; i++)
    {
        document.getElementsByName(radioname)[i].checked = false;
    }
}





