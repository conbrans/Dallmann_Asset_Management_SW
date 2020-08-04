setTimeout(() => {



document.getElementById("defaultOpen").click();},1)

function setEmail()
{
        let firstLetter = (document.getElementById("firstName").value).charAt(0).toLowerCase();
        let lastName  = (document.getElementById("lastName").value).toLowerCase();
        let email = firstLetter +"."+ lastName + "@dallmann-bau.de";

        document.getElementById("email").value = email;

}

function openTab(evt, side) {

        // Get all elements with class="tabcontent" and hide them
        var tabcontent = document.getElementsByClassName("tabcontent");
        for (var i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
       var tablinks = document.getElementsByClassName("tablinks");
        for ( var i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(side).style.display = "block";
        evt.currentTarget.className += " active";
}