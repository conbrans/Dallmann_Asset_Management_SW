window.onload = function () {
    loadData(0);
}
$(document).ready(function () {
    var table = $("#example");
    var users = $.ajax({
        url: "/showUsers",
    }).done(data => {
        table.DataTable({
            data: data,
            columns: [
                {"data": "workerId"},
                {"data": "firstname"},
                {"data": "surname"},
                {"data": "eMail"},
                {"data": "role"},
            ],
            colReorder: {
                fixedColumnsLeft: 1,
            },
            language: {
                search: "Suche nach:",
                info: "Zeige Nr. _START_ bis _END_ von _TOTAL_ Nutzern",
                lengthMenu: "Zeige _MENU_ Nutzer",
                zeroRecords: "Keine Einträge verfügbar",

                paginate: {
                    first: "Erste Seite",
                    last: "Letzte Seite",
                    next: "Nächste",
                    previous: "Vorherige"
                },
                infoFiltered: "(von _MAX_ Nutzern insgesamt)",
            }
        });

        $('#example tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#example tbody .selected').removeClass('selected');
                $(this).addClass('selected');
                var data = {
                    workerid: this.cells.item(0).innerText,
                    mail: this.cells.item(3).innerText,
                };
                $.ajax({
                    type: 'post',
                    url: '/sendWorkerInfos',
                    data: data,
                    data_type: 'json'
                }).done(() => {
                    $.ajax({
                        type : 'get',
                        url : '/showUser',
                    }).done(data=>{
                        document.getElementById("firstName"). value = data[0].firstname;
                        document.getElementById("lastName"). value = data[0].surname;
                        document.getElementById("e-Mail"). value = data[0].eMail;
                        document.getElementById("rolle").value = data[0].role;
                    })
                });
            }
        });
    });
});

function deleteUserMessage() {
    confirm("ACHTUNG!\nSie sind dabei den gewälten User zu löschen.")

}

function resetUserPasswordMessage() {
    confirm("ACHTUNG!\nSie sind dabei das Passwort des Benutzers" +
        " zurückzusetzten.");
}


function checkPasswordRequirements() {
    let strength = 0;
    const strengthBar = document.getElementById("strength");
    let password = document.getElementById("password").value;

    if (password.match(/[!§@§%&()=?`²³{[]}\<>|]/)) {
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
        document.getElementById("password").style.background = "lightgreen";
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
function setDefaultPassword() {
    document.getElementById("password").value = "123456";
}
