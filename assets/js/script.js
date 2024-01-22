let brand = document.querySelector(".brand");
let search = document.querySelector("input[type=search]");
let arr_1 = [];
let arr_2 = [];

function getAllData() {
    fetch("http://localhost:3000/Sierra")
    .then(res => res.json())
    .then(data => {
        arr_2 = data;
        brand.innerHTML = "";
        arr_1 = arr_1.length || search.value ? arr_1 : data;
        arr_1.forEach(element => {
            brand.innerHTML += `
                <div class="online">
                    <img src="${element.image}" alt="">
                    <h3>${element.name}</h3>
                    <p>${element.desc}</p>
                    <button onclick="viewDetails(${element.id})">View Details</button>
                </div>
            `
        })
    })
}

getAllData();

//--View Details--//
function viewDetails(id) {
    window.location = `./details.html?id=${id}`
}

//--Search--//
search.addEventListener("input", (e)=>{
    arr_1 = arr_2;
    arr_1 = arr_1.filter((el)=> {
        return el.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    getAllData();
})

//--Sort--//
let sort = document.querySelector("#sort");

sort.addEventListener("change", (e)=> {
    if(e.target.value == "asc"){
        arr_1 = arr_1.sort((a,b)=> a.name.localeCompare(b.name))
    }
    if(e.target.value == "dsc"){
        arr_1 = arr_1.sort((a,b)=> b.name.localeCompare(a.name))
    }
    else{
        arr_1 = [];
    }
})

//--Modal--//
let modal = document.querySelector(".modal");
let list = document.querySelector("#list");

list.addEventListener("click", ()=> {
    modal.classList.toggle("none");
})

//--Navbar--//
let nav = document.querySelector("nav");

window.addEventListener("scroll", ()=> {
    if(window.scrollY>200){
        nav.style.position = "fixed";
        nav.style.backgroundColor ="rgb(112, 114, 140)"
    }
    else{
        nav.style.position = "";
        nav.style.backgroundColor =""
    }
})