const postURL = "https://jsonplaceholder.typicode.com/todos";

fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

    fetch(postURL, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
    });




//함수가 끝나기 전에 다음 함수가 실행됨 -> 데이터가 안들어가ㅠㅠ