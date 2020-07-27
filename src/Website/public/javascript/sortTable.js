/**
 * calls the sortTable method with the value selected to which the table
 */
function getSelectedOption() {
    sortTable(document.getElementById("sort").value);
}


/**
 * sort a table after a given column, can be accessed with a option menu or with a click on the the head element
 * @param number, the row number after which the table is sorted, starts with 0
 */

function sortTable(number) {
    var table = document.getElementById("table");
    var  rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    switching = true;
    dir = "asc";
    switching = true;
    dir = "asc";

    while (switching) {

        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("td")[number];
            y = rows[i + 1].getElementsByTagName("td")[number];



            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}