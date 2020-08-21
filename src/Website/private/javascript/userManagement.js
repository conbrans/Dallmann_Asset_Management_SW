function changeEntries() {
    let sql = "UPDATE USER SET name = '', surname = '', e_mail = '', password ='', course='', authorization='' " +
        "WHERE e_mail = ''";
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            if (result)
                console.log("Erfolgreich")
        })
}



function changeFieldStatus(input) {
    let textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}

function changeSelectStatus(input) {
    let dropDown = document.getElementById(input);
    dropDown.disabled = !dropDown.disabled;
}


/*function deleteUserMessage() {
    if(confirm("ACHTUNG!\nSie sind dabei den gewälten User zu löschen.")){

        let user = new UserToUpdate().getSelectedUser();
        console.log(user);
        console.log(JSON.stringify(user))

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        };

        fetch(' http://localhost:3032/deleteUser', options)
            .then(response => response.json())
            .then(data => { console.log(data)})
        location.reload();
    }
}*/

function resetUserPasswordMessage() {
    if(confirm("ACHTUNG!\nSie sind dabei das Passwort des Benutzers zurückzusetzten.")){

    }

}


/*function renderHTML(data) {
    var rowCounter = 0;
    for (i = 0; i < data.length; i++) {
        createTableContent("userListContent", rowCounter);
    }

    function createTableContent(id, counter) {
        var x = document.getElementById(id).insertRow(rowCounter);
        x.setAttribute("id", "row");
        x.setAttribute("class", "table-row");

        var column1 = x.insertCell(0);
        var column2 = x.insertCell(1);
        var column3 = x.insertCell(2);
        var column4 = x.insertCell(3);
        var column5 = x.insertCell(4);
        var column6 = x.insertCell(5);
        var column7 = x.insertCell(6);
        var column8 = x.insertCell(7);

        column1.innerHTML = data[i].name;
        column2.innerHTML = data[i].surname;
        column3.innerHTML = data[i].e_mail;
        column4.innerHTML = data[i].course;
        column5.innerHTML = data[i].authorization;
        column6.innerHTML = data[i].verified;
        column7.innerHTML = data[i].id;
        column8.innerHTML = data[i].password;

        rowCounter++;
    }
}*/

/*window.addEventListener('click', function () {
    var table = document.getElementById('userlist');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].addEventListener('click', function () {


            for (var j = 0; j < this.cells.length; j++) {
                var msg = '';
                msg += this.cells[j].innerHTML + ' ';
                console.log("i: "+i+"  j:"+ j +"  value: "+msg)
                switch (j) {
                    case 0:
                        document.getElementById("vorname").value = this.cells[j].innerHTML;
                    case 1:
                        document.getElementById("nachname").value = this.cells[j].innerHTML;
                    case 2:
                        document.getElementById("e-Mail").value = this.cells[j].innerHTML;
                    case 3:
                        document.getElementById("studiengang").value = this.cells[j].innerHTML;
                    case 4:
                        document.getElementById("rolle").value = this.cells[j].innerHTML;
                    case 5:
                        document.getElementById("verified").value = this.cells[j].innerHTML;
                    case 6:
                        document.getElementById("userID").value = this.cells[j].innerHTML;
                    case 7:
                        document.getElementById("password").value = this.cells[j].innerHTML;
                }
            }
            console.log(msg)
        });
    }
})*/

function addDeviceWindow() {
     window.open("html/addDevice.html", "Popup", "width=400,height=400");
}
