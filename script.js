// Dom content
let textbox = document.querySelector(".textbox")
let add_btn = document.querySelector(".add_btn")
let maincontent_div = document.querySelector(".maincontent_div")



//add item in todo list
add_btn.addEventListener("click",add)

//getting past data if not available then call a empty array
let data = JSON.parse(localStorage.getItem("note")) || []
function add(){
    if(textbox.value !=""){
        let value = textbox.value
        let container 
        container=
            `<div class="child">
                <span class="material-symbols-outlined radio" onclick="checked_unchecked()">radio_button_unchecked</span>
                <label for="${value}" class="text">${value}</label> 
                <div class="child2"></div>
                <span class="material-symbols-outlined">close</span> 
                <br>
            </div>`

        // empty text after the value store in a local storage
        textbox.value =""
        maincontent_div.innerHTML+=container

        // pushing new data in array
        data.push(value)
        
        // pushing array in local storage
        localStorage.setItem("note", JSON.stringify(data))
        window.location.reload()
        
        
    }
    
}   

// Checking if 'note' data is available in localStorage
if (localStorage.getItem("note") != "") { 
    // Getting the 'note' array from localStorage
    let noteArray = JSON.parse(localStorage.getItem("note"));
    
    // Getting the 's' array from localStorage
    let sArray = JSON.parse(localStorage.getItem("s")) || [];

    // Loop through each item in the 'note' array
    noteArray.forEach((element, index) => { 
        // Check if the current note exists in the 's' array
        let isStruck = sArray.includes(element);

        // Add the HTML content to the maincontent_div
        maincontent_div.innerHTML += `
        <div class="child">
            <span class="material-symbols-outlined radio" onclick="checked_unchecked(${index})">${isStruck ? "task_alt" : "radio_button_unchecked"}</span>
            <label for="${element}" class="text" style="text-decoration: ${isStruck ? 'line-through' : 'none'};">${element}</label>
            <div class="child2"></div>
            <span class="material-symbols-outlined" onclick="remove(${index})">close</span> 
            <br>
        </div>`;
    });
}


    
// deleting the div by index also upadting it on local storage        
function remove(index){

    // finding the div which has to delete and [index] means deleting a particluar that div which is click
    maincontent_div.querySelectorAll(".child")[index].remove()

    //updating it in array
    data.splice(index,1)

    //updating it in local storage
    localStorage.setItem("note",JSON.stringify(data))


}
        

let strikedata = JSON.parse(localStorage.getItem("s")) || []
function checked_unchecked(index) {
    let radioElement = maincontent_div.querySelectorAll(".radio")[index];
    let text = maincontent_div.querySelectorAll(".text")[index];
    
    if (radioElement.textContent === 'radio_button_unchecked') {
        radioElement.textContent = 'task_alt';
        text.style.textDecoration =" line-through"

        strikedata.push(maincontent_div.querySelectorAll(".text")[index].innerHTML)
        localStorage.setItem("s",JSON.stringify(strikedata))
        
        
        
        
    } else {
        radioElement.textContent = 'radio_button_unchecked';
        text.style.textDecoration =""

        JSON.parse(localStorage.getItem("s")).forEach((element ,index2)=>{
            if(maincontent_div.querySelectorAll(".text")[index].innerHTML===element){
                strikedata.splice(index2,1)
                localStorage.setItem("s",JSON.stringify(strikedata))
                
            }
        })
        
    }
}


        
