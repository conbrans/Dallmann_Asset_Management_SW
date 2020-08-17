function getCurrentDate()
{
   const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    if(dd<10)
    {
        dd = '0'+dd;
    }

    if (mm<10)
    {
        mm = '0' + mm;
    }


    console.log(dd);
    console.log(mm);
    console.log(yyyy);
    console.log();
    const dateString = yyyy + "-" + mm + "-" + dd;

    console.log(dateString);


    document.getElementById("booking_start").setAttribute("min",dateString);
    document.getElementById("booking_end").setAttribute("min",dateString);
}