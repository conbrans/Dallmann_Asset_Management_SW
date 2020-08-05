/**
 * author = Constantin Brans
 */


/**
 * Timeout to call the "Benutzerdaten" tab as standard
 */
setTimeout(() => {

document.getElementById("defaultOpen").click();},1)


/**
 * autocompletion for the mail input, takes the first lest of the first name and transform it to lowercase
 */
function setEmail()
{
        let firstLetter = (document.getElementById("firstName").value).charAt(0).toLowerCase();
        let lastName  = (document.getElementById("lastName").value).toLowerCase();


        document.getElementById("email").value =  firstLetter +"."+ lastName + "@dallmann-bau.de";

}



function setDefaultPassword()
{
    document.getElementById("password").value = "123456";
}


/**
 * method to switch between the tabs "Benutzerdaten" and "Rechte"
 * @param evt
 * @param tab which well be opened
 */
function openTab(evt, tab) {

        let i;
// Get all elements with class="tabcontent" and hide them
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
    let tablinks = document.getElementsByClassName("tablinks");
    for ( i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tab).style.display = "block";
        evt.currentTarget.className += " active";
}

function selectPermission()
{
    for (var i = 0;i<document.getElementsByName("adminPermission").length;i++)
    {
        document.getElementsByName("adminPermission")[i].checked = false;
        document.getElementsByName("workshopPermission")[i].checked = false;
        document.getElementsByName("foremanPermission")[i].checked = false;
        document.getElementsByName("accountingPermission")[i].checked = false;
    }

    let role = document.getElementById("role").value;
    let permission = role.toString() + "Inherited";
    document.getElementById(permission).checked = true;
}

function removeCheckedRadio(radioname)
{
    for (var i = 0;i<document.getElementsByName(radioname).length;i++)
    {
        document.getElementsByName(radioname)[i].checked = false;
    }
}



