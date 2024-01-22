let id = new URLSearchParams(window.location.search).get("id");
let details = document.querySelector(".details");

fetch(`http://localhost:3000/Sierra/${id}`)
.then(res => res.json())
.then(data => {
    details.innerHTML += `
        <div class="online">
            <img src="${data.image}" alt="">
            <h3>${data.name}</h3>
            <p>${data.desc}</p>
        </div>
    `
})