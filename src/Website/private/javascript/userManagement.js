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
        inventoryNumber : $('#invnumber').val(),
    } ;
    $.ajax({
        type : 'post',
        url : '/sendInventoryNumber',
        data: data,
        data_type : 'text'
    }).done(()=>{
        console.log("Inventorynumber is transported")
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
