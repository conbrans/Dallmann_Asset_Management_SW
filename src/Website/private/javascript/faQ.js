setTimeout(() => {
    const container = document.getElementById("text");
    const links = container.getElementsByClassName("link");
    const picture = document.getElementById("picture");
    // show the first icon
    picture.getElementsByClassName("fas")[0].style.display = "block";

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {

            const current = document.getElementsByClassName("active");
            const clickedIcon = document.getElementsByClassName("fas")[i];
            const icontoHide = "fa-" + (current[0].id).toString();
            const iconToShow = "fa-" + (this.id).toString();

            picture.getElementsByClassName(icontoHide)[0].style.display = "none";
            picture.getElementsByClassName(iconToShow)[0].style.display = "block";

            current[0].className = current[0].className.replace("active", "");
            this.className += " active";
        });
    }
}, 1);