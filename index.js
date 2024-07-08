const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;


const winningposition=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,5]
];

function initGame(){
     currentPlayer="X";
     gameGrid=["","","","","","","","",""];

     // ui ko update ya empty karna padega 
     boxes.forEach((box,index)=>{
      box.innerText="";
      boxes[index].style.pointerEvents="all";
      // green colour ko remive karne k liye ,, css ke property ko intialize kar do
      box.classList=`box box${index+1}`;  
   })
     newGameBtn.classList.remove("active");
     gameInfo.innerText=`current player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
      if (currentPlayer==="X") {
         currentPlayer="0";
      }
      else{
         currentPlayer="X";
      }

      //UI ko update  kardo
      gameInfo.innerText=`currentplayer-${currentPlayer}`;

}

function checkGameOver(){


   //   newGameBtn.classList.add("active");
     let answer="";
     winningposition.forEach((position)=>{
      if ((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]) &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])) {
                   

                    if (gameGrid[position[0]]==="X") {
                         answer="X";
                    }
                     else
                     answer="0";


                   boxes.forEach((box)=>{
                     box.style.pointerEvents="none";
                   })

                  boxes[position[0]].classList.add("win");
                  boxes[position[1]].classList.add("win");
                  boxes[position[2]].classList.add("win");
                  
      }
     }); 
     
     if (answer!=="") {
        gameInfo.innerText=`winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
     }
      let fillcount=0;
     gameGrid.forEach((box)=>{
      if (box!=="") {
         fillcount++;
      }
     });

     if (fillcount===9) {
      gameInfo.innerText="Game Tied";
      newGameBtn.classList.add("active");
     }
}



function handleCLick(index){
     if (gameGrid[index] === "" ) {
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";

        // swap karo turn ko
        swapTurn();
        //check karo koi jeeta to nahi
        checkGameOver();
     }
}


boxes.forEach((box,index)=>{
   box.addEventListener("click",() => {
      handleCLick(index);
   })
});


newGameBtn.addEventListener("click",initGame);