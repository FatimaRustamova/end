let form = document.querySelector("form");
let file = document.querySelector("input[type=file]");
let image = document.querySelector("#image");
let name = document.querySelector("#name");
let desc = document.querySelector("#desc");
let table = document.querySelector("#table");

file.addEventListener("input", (e)=>{
    let file = e.target.files[0];
    if(file){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=> {
            image.src = reader.result
        }
    }
})

form.addEventListener("submit", (event)=> {
    event.preventDefault();

    let imageInp = file.value.trim();
    let nameInp = name.value.trim();
    let descInp = desc.value.trim();

    let inputs = [file, name, desc];

    if(imageInp && nameInp && descInp){
        let reader = new FileReader();
        let src = file.files[0];
        reader.onload = (e)=> {
            let obj = {
                image: e.target.result,
                name: name.value,
                desc: desc.value
            }
            axios.post("http://localhost:3000/Sierra", obj)
            .then(res => {
                window.location = './index.html'
            })
        }
        reader.readAsDataURL(src);
    }
    else {
        inputs.forEach(input => {
            let p_text_display = input.value.trim() == "" ? 'block' : 'none'
            input.previousElementSibling.style.display = p_text_display;
        })
    }
})

fetch("http://localhost:3000/Sierra")
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        table.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.desc}</td>
                <td>
                    <button onclick="deleteEl(${element.id})">Delete</button>
                </td>
                <td>
                    <button onclick="updateEl(${element.id})">Update</button>
                </td>
            </tr>
        `
    })
})

//--Delete--//
function deleteEl(id) {
    axios.delete(`http://localhost:3000/Sierra/${id}`);
    window.location.reload();
}

//--Update--//
function updateEl(id) {
    window.location = `./update.html?id=${id}`
}