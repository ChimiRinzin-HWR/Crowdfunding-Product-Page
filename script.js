const back = document.querySelector(".back"); // back this project button
const bookmark = document.querySelector(".bookmarkbutt"); // the bookmark button
const got = document.querySelector(".got"); // the bookmark button
const bm = document.querySelector(".bm"); // reference to change the actual bookmark button

const backproject = document.querySelector(".backproject"); // the back this project div or section
const thanks = document.querySelector(".thanks"); // the completion section

const cross = document.querySelector(".cross"); // the close button, actually the image
const form = document.querySelector("form"); // for refering to the changes to the radio button selection

const button1 = document.querySelectorAll(".button1"); // the select reward buttons in the first state
const button = document.querySelectorAll(".button"); // the continue buttons that are in the second state

const borderColorCyan = getComputedStyle(document.documentElement).getPropertyValue("--Moderatecyan");
const borderOriginalColor = "rgb(232,232,232)";

var selectedVal = "";

const backedmoney = document.querySelector(".backedmoney"); // for refering to the changes to the radio button selection
const backers = document.querySelector(".backers"); // for refering to the changes to the radio button selection

const progress = document.querySelector("progress");

var flags = [false, false, false, false];
var stocks = document.querySelectorAll(".stock"); // the stocks of pledges available

var currentDeposit = 0;
// the stocks are checked to decide on the div's
// "abledness"
myfunction1();
function myfunction1(){
    stocks.forEach(st => {
        // if stock turns out to be zero
        // we are styling it to its disabled style
        const stocknum = st.textContent;
        if(stocknum == "0"){
            // since the class names or id are shared with little difference
            // we are replacing the end string of second class name of the stocks elmeents
            const selClass = st.classList[1].slice(0, st.classList[1].length - 1);
            document.querySelector(`.${selClass}b`).classList.add("outofstock");
            document.querySelector(`.${selClass}d`).classList.add("outofstock");
            document.querySelector(`.${selClass}c`).disabled = true;
            document.getElementById(`${selClass}`).disabled = true;
        }
    })
}
// to make the progress bar represent the goal of money collection
const totalSumBacked = parseFloat(backedmoney.textContent.replace(/,/g, ""));
progress.value = totalSumBacked / 1000;

// for opening the "Back this Project" State
// this is in the most general way, without
// preselected pledge choice
back.addEventListener("click", function(){
    backproject.classList.add("backclicked");
    // perhaps the choices were abandoned with previous
    // iteration, so in order to reset it.
    if(selectedVal != ""){
        const entersel = document.querySelector(`.${selectedVal}p`);
        entersel.classList.remove("enterclicked");
        const rewardborder = document.querySelector(`.${selectedVal}b`)
        rewardborder.style.border = `2px solid ${borderOriginalColor}`;
        document.getElementById(selectedVal).checked = false;
    }
})

// for closing the "Back this Project" state
cross.addEventListener("click", function(){
    backproject.classList.remove("backclicked");
})

// Style addition and removal upon toggle
bookmark.addEventListener("click", function(){
    if(!bookmark.classList[1]){
        bookmark.classList.add("bookmarkclicked");
        bm.textContent = "Bookmarked"
    }
    else {
        bookmark.classList.remove("bookmarkclicked");
        bm.textContent = "Bookmark"
    }
})

// Changes to be done each time there is a different choice
form.addEventListener("change", function(){
    const selectedrad = document.querySelector(`input[name="reward"]:checked`);
    document.querySelectorAll(".error").forEach(er => {
        er.style.display = "none";
    })

    myfunction(selectedrad.value);
})

// this is for opening up "Back this Project" state
// with the preselected choice
button1.forEach(butt => {
    butt.addEventListener("click", function(){
        backproject.classList.add("backclicked");
        const newClassName = butt.classList[1].slice(0, -1);
        myfunction(newClassName);
    })
})
button.forEach(butt => {
    butt.addEventListener("click", function(event){
        event.preventDefault();
        const selbutton = butt.classList[1];
        const selinput = document.getElementById(`${selbutton}in`);
        if(selbutton == "zero"){
            if(selinput.value == "" || parseFloat(selinput.value) <= 0){
                flags[0] = false;
                document.querySelector(`.${selbutton}e`).style.display = "block";
            }
            else {
                document.querySelector(`.${selbutton}e`).style.display = "none";
                flags[0] = true;
                currentDeposit = parseFloat(selinput.value);
            }
        }
        if(selbutton == "one"){
            if(selinput.value == "" || parseFloat(selinput.value) < 25){
                document.querySelector(`.${selbutton}e`).style.display = "block";
                flags[1] = false;
            }
            else {
                document.querySelector(`.${selbutton}e`).style.display = "none";
                flags[1] = true;
                const stockshown = document.querySelectorAll(`.${selbutton}s`);
                const stockshownval = parseInt(stockshown[0].textContent);
                stockshown[0].textContent = stockshownval - 1;
                stockshown[1].textContent = stockshown[0].textContent;
                stockshown[2].textContent = stockshown[0].textContent;
                currentDeposit = parseFloat(selinput.value);
            }
        }
        if(selbutton == "two"){
            if(selinput.value == "" || parseFloat(selinput.value) < 75){
                document.querySelector(`.${selbutton}e`).style.display = "block";
                flags[2] = false;
            }
            else {
                document.querySelector(`.${selbutton}e`).style.display = "none";
                flags[2] = true;
                const stockshown = document.querySelectorAll(`.${selbutton}s`);
                const stockshownval = parseInt(stockshown[0].textContent);
                stockshown[0].textContent = stockshownval - 1;
                stockshown[1].textContent = stockshown[0].textContent;
                stockshown[2].textContent = stockshown[0].textContent;
                currentDeposit = parseFloat(selinput.value);
            }
        }
        if(selbutton == "three"){
            if(selinput.value == "" || parseFloat(selinput.value) < 200){
                document.querySelector(`.${selbutton}e`).style.display = "block";
                flags[3] = false;
            }
            else {
                document.querySelector(`.${selbutton}e`).style.display = "none";
                flags[3] = true;
                const stockshown = document.querySelectorAll(`.${selbutton}s`);
                const stockshownval = parseInt(stockshown[0].textContent);
                stockshown[0].textContent = stockshownval - 1;
                stockshown[1].textContent = stockshown[0].textContent;
                stockshown[2].textContent = stockshown[0].textContent;
                currentDeposit = parseFloat(selinput.value);
            }
        }
        flags.forEach(fl =>{
            if(fl){
                backproject.classList.remove("backclicked");
                thanks.classList.add("thanksclicked");
            }
        })
    })
})
got.addEventListener("click", function(){
    thanks.classList.remove("thanksclicked");
    form.reset();
    const currentSum = parseFloat(backedmoney.textContent.replace(/,/g, ""));
    const backedmoneys = currentSum + currentDeposit;
    backedmoney.textContent = backedmoneys.toLocaleString('en-US', {maximumFractionDigits:2});
    const backershown = parseInt(backers.textContent.replace(/,/g, ""));
    backers.textContent = backershown + 1;
    progress.value = backedmoneys / 1000;
    myfunction1();
    currentDeposit = 0;
})
function myfunction(selval){
    if(selectedVal != ""){
        const entersel = document.querySelector(`.${selectedVal}p`);
        entersel.classList.remove("enterclicked");
        const rewardborder = document.querySelector(`.${selectedVal}b`)
        rewardborder.style.border = `2px solid ${borderOriginalColor}`;
    }
    selectedVal = selval;

    // since the second state might arrive using buttons from
    // first state other than the "Back this Project" button,
    // we have to control the state of the radio 
    // button selected
    if(!document.getElementById(selval).checked){
        document.getElementById(selval).checked = true;
    }
    // in order to allow for a transition for further action
    // that is for the pledge entry elements
    const entersel = document.querySelector(`.${selectedVal}p`);
    entersel.classList.add("enterclicked");

    // to change the border of the whole reward division element
    const rewardborder = document.querySelector(`.${selectedVal}b`);
    rewardborder.style.border = `2px solid ${borderColorCyan}`;
}
