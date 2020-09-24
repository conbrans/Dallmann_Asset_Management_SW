setTimeout(()=>
{
    var searchField = document.getElementById("header-Search");
    searchField.addEventListener('keyup',doSomethingDifferent,true);
},1)

var alreadySent = false;


function doSomethingDifferent()
{
    clearTimeout(timer);
    var interval = 4000;
    var timer = setTimeout(submitTheValue,interval);
}

function submitTheValue()
{
    setTimeout(()=> {
        document.getElementById("formSearch").submit();},1000)
}
