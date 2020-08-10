function test()
{
    console.log("TEST");
    fetch('https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/d67f7078d43adefd24be6989de0feda62f896a71/test.json')
        .then(response => response.json())
        .then(data => console.log(data));
}