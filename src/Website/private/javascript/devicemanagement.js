function loadData(i){
    document.getElementById("invnumber").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("hiddeninvnumberbooking").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("hiddeninvnumberhistory").value  =
        document.getElementById("tr"+i.toString()+"td1").innerHTML;
    document.getElementById("category").value =
        document.getElementById("tr"+i.toString()+"td2").innerHTML;

    document.getElementById("model").value   =
        document.getElementById("tr"+i.toString()+"td3").innerHTML;
    /*document.getElementById("rolle").value    =
        document.getElementById("tr"+i.toString()+"td4").innerHTML;*/
}