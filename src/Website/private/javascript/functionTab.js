/**
 * Timeout to call the "Benutzerdaten" tab as standard
 */
setTimeout(() => {

    document.getElementById("defaultOpen").click();},1)

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
        tablinks[i].className = tablinks[i].
        className.replace(" active", "");
    }

    // Show the current tab,
    // and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}