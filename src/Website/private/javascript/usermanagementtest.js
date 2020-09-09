/**
 * author = Constantin Brans
 */
function loadData(i){
   document.getElementById("firstName").value  =
       document.getElementById("tr"+i.toString()+"td1").innerHTML;
   document.getElementById("lastName").value =
       document.getElementById("tr"+i.toString()+"td2").innerHTML;
   document.getElementById("e-Mail").value   =
       document.getElementById("tr"+i.toString()+"td3").innerHTML;
    document.getElementById("e-Mailhidden").value   =
        document.getElementById("tr"+i.toString()+"td3").innerHTML;
   document.getElementById("rolle").value    =
       document.getElementById("tr"+i.toString()+"td4").innerHTML;
}

function loadDataForBox(i)
{
    document.getElementById("deleteE_mail").value =
        document.getElementById("tr"+i.toString()+"td3").innerHTML;
    document.getElementById("reset_Password").value =
        document.getElementById("tr"+i.toString()+"td3").innerHTML;
}

function changeFieldStatus(input) {
    let textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}

function changeSelectStatus(input) {
    let dropDown = document.getElementById(input);
    dropDown.disabled = !dropDown.disabled;
}