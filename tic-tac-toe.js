let Box= document.querySelectorAll(".box");
let Reset= document.querySelector("#reset");
let NewGame= document.querySelector("#newGame");
let Msg= document.querySelector(".msg");
let MsgIs= document.querySelector(".msgIs");

let turnO = true;
let gameOver = false;
let roundCount = 0;
let score = { O: 0, X: 0 };

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

Box.forEach(box => {
    box.addEventListener("click", ()=>{
        console.log("clicked");
        //Player O turn
        if(turnO && box.innerText === ""){
            box.innerText = "O";
            turnO = false;
            box.style.color = "blue";
            box.style.fontSize = "45px";
        }
        //Player X turn
        else if(!turnO && box.innerText === ""){
            box.innerText = "X";
            turnO = true;
            box.style.color = "red";
            box.style.fontSize = "45px";
        }
        box.disabled=true;
        checkWin();
    })
});

const showWinner=(winner)=>{
    MsgIs.innerText= `Congratulations!!! Winner is ${winner}`;
    Msg.classList.remove("hide");
    disableBoxes();
    gameOver=true;
    score[winner]++;
    roundCount++;
    checkUltimateWinner();
}
const showDraw = () => {
    MsgIs.innerText = "😮 It's a Draw!";
    Msg.classList.remove("hide");
    disableBoxes();
    gameOver = true;
    roundCount++;

    checkUltimateWinner();
};

const checkWin = () => {
    for(pattern of winCombos){
        let pos1=Box[pattern[0]].innerText;
        let pos2=Box[pattern[1]].innerText;
        let pos3=Box[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                console.log(pos1);
                showWinner(pos1);
                return;
            }
        }
    }
    if ([...Box].every(box => box.innerText !== "")) {
        showDraw();
    }   
}
const disableBoxes=()=>{
    for(let box of Box){
        box.disabled=true;
    }
}
const clearBoxes = () => {
    Box.forEach(box => box.innerText = "");
    Box.forEach(box=> box.disabled=false);
    turnO = true;
    Msg.classList.add("hide");
    gameOver = false;
};
const checkUltimateWinner = () => {
    if (roundCount >= 3) {
        let ultimateMsg = "";
        if (score.O > score.X) {
            ultimateMsg = `🏆 Player O is the Ultimate Winner (${score.O}-${score.X})!`;
        } else if (score.X > score.O) {
            ultimateMsg = `🏆 Player X is the Ultimate Winner (${score.X}-${score.O})!`;
        } else {
            ultimateMsg = `🤝 It's a Tie! Final Score: O(${score.O}) - X(${score.X})`;
        }
        alert(ultimateMsg);

        roundCount = 0;
        score = { O: 0, X: 0 };
    }
};

NewGame.addEventListener("click", () => {
    if (gameOver) {
        clearBoxes();
    } else {
        alert("You can only start a new game after someone wins!");
    }
});
Reset.addEventListener("click", () => {
    if (gameOver) {
        alert("Start new game :) ");
    } else {
        clearBoxes();
    }
});