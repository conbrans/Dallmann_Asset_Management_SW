function loadData(i){
    document.getElementById("invnumber").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("hiddeninvnumberbooking").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("hiddeninvnumberhistory").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("hiddeninvnumberdelete").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("model").value   =
        document.getElementById("tr"+i.toString()+"td3").innerHTML;

    switch (document.getElementById("tr"+i.toString()+"td2").innerHTML) {
        case "Rüttelplatten":
            document.getElementById("category").value="0001";
            break;
        case "Stampfer":
            document.getElementById("category").value="0002";
            break;
        case "Motorflex":
            document.getElementById("category").value="0003";
            break;
        case "Rohrgreifer":
            document.getElementById("category").value="0004";
            break;
        case "Kettensägen":
            document.getElementById("category").value="0005";
            break;
        case "Motorhammer":
            document.getElementById("category").value="0006";
            break;
        case "Leiter":
            document.getElementById("category").value="0007";
            break;
        case "Exoten":
            document.getElementById("category").value="0008";
            break;
    }
}



function deleteDeviceMessage() {
    confirm("ACHTUNG!\nSie sind dabei das gewählte Gerät undwideruflich zu" +
        " löschen.");
}