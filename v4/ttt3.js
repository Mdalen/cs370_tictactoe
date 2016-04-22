
var board = [0,0,0,0,0,0,0,0,0];

function gameOver(arg){
	//first, check the horizontal rows
	if ( arg[0]==arg[1]&&arg[0]==arg[2]&&arg[1]==arg[2]&&arg[0]!=0 ) { return arg[0]; }
	else if ( arg[3]==arg[4]&&arg[3]==arg[5]&&arg[4]==arg[5]&&arg[3]!=0 ) { return arg[3]; }
	else if ( arg[6]==arg[7]&&arg[6]==arg[8]&&arg[7]==arg[8]&&arg[6]!=0 ) { return arg[6]; }
	//then check the vertical collumns
	else if ( arg[0]==arg[3]&&arg[0]==arg[6]&&arg[3]==arg[6]&&arg[0]!=0 ) { return arg[0]; }
	else if ( arg[1]==arg[4]&&arg[1]==arg[7]&&arg[4]==arg[7]&&arg[1]!=0 ) { return arg[1]; }
	else if ( arg[2]==arg[5]&&arg[2]==arg[8]&&arg[5]==arg[8]&&arg[2]!=0 ) { return arg[2]; }
	//then check the diagonals
	else if ( arg[0]==arg[4]&&arg[0]==arg[8]&&arg[4]==arg[8]&&arg[0]!=0 ) { return arg[0]; }
	else if ( arg[2]==arg[4]&&arg[2]==arg[6]&&arg[4]==arg[6]&&arg[2]!=0 ) { return arg[2]; }
	//else, it's a deadlock
	return 0;
}

//boardnotfilled
//returns a 1 if there are empty spaces on the board
//returns a 0 if it is full
function boardNotFilled(e){
	//loop over all spaces
	for(var i=0; i<9;i++){
		//check if it is 0
		if(e[i]==0){
			//if so return 1
			return 1;
		}
	}
	//else return 0
	return 0;
}

//recurs max
//takes in an array as an input
//returns a -1 to 1 value of the outcome of choosing this path
//recursively calls recursMin
function recursMax(recBoard, lastMin){
	//grab a copy of the board
	var boardCopy = recBoard.slice();
	//make a max value
	var maxVal = -Infinity;

	//check if it is a base case
	if(boardNotFilled(boardCopy)==0||gameOver(boardCopy)!=0){
		return gameOver(boardCopy);
	}

	//else
	else{
		//iterate over all possible moves
		for(var i=0;i<9;i++){
			//reset all changes to the board
			boardCopy = recBoard.slice();
			//check if the space is free or not
			if(boardCopy[i]==0){
				//make the move in the simulation 
				boardCopy[i] = 1;
				//run it through the min function
				var possibleMove = recursMin(boardCopy, maxVal);
				//compare it to the maximum value
				if(possibleMove>maxVal){
					maxVal = possibleMove;
				}
			}
			if(maxVal>lastMin){
				return maxVal;
			}
		}
		return maxVal;	
	}
}

//recursMin
//takes in an array as an input
//returns a -1 to 1 value of the result of taking this path
//recursively calls recursMax
function recursMin(recBoard, lastMax){
	//grab a copy of the board
	var boardCopy = recBoard.slice();
	//make a min value
	var minVal = Infinity;

	//check if it is a base case or not
	if(boardNotFilled(boardCopy)==0||gameOver(boardCopy)!=0){
		return gameOver(boardCopy);
	}

	//else
	else{
		//iterate over all possible moves
		for(var i=0;i<9;i++){
			//reset all changes to the board
			boardCopy = recBoard.slice();
			//check if the space is free or not
			if(boardCopy[i]==0){
				//make the move for the plyer in the simulation
				boardCopy[i] = -1;
				//run it through the max function
				var possibleMove = recursMax(boardCopy, minVal);
				//compare it to the minimum value
				if(possibleMove<minVal){
					//if it is smaller, make this the new min
					minVal = possibleMove;
				}
			}
			if(minVal<lastMax){
				return minVal;
			}
		}
		return minVal;
	}
}

//getmove
//returns an index of the best move for this turn 
//calls the max function every time and uses the return to calculate the index
function getMove(){
	//make a copy of the board
	var boardCopy = board.slice();
	//make a max variable
	var maxVal = -Infinity;
	//make a move variable
	var moveVal = 0;
	//iterate over the possible moves
	for(var i=0;i<9;i++){
		boardCopy = board.slice();
		if(boardCopy[i]==0){
			//check if the computer would win if it moved there
			boardCopy[i] = 1;
			if(gameOver(boardCopy)==1){
				//if so, return this move
				return i;
			}
		}
	}

	for(var i=0;i<9;i++){
		boardCopy = board.slice();
		if(boardCopy[i]==0){
			//else, check if the player would win if they made this move
			boardCopy[i] = -1;
			if(gameOver(boardCopy)==-1){
				//if so, return that move
				return i;
			}
		}
	}

	for(var i=0;i<9;i++){
		//reset the changes we made to the board
		boardCopy = board.slice();
		//check if the space is free or not
		if(boardCopy[i]==0){

			//else, this means that we need to evaluate this move through simulation
			//set the board back to us making this move
			boardCopy[i] = 1;
			var currentVal = recursMin(boardCopy, maxVal);

			//now compare it to the max
			if(currentVal>maxVal){
				//make this our new max if it's larger
				maxVal = currentVal;
				//set the current index to this one
				moveVal = i;
			}
		}
	}
	//at the end, return the final move that was considered the maximum
	return moveVal;
}

//document ready function
//called when the page finishes loading
$(document).ready(function(){


	//makecomputermove
	//handles the logic of dealing with the computer's turn
	var makeComputerMove = function(){
		if(gameOver(board)==0&&boardNotFilled(board)==1){
			var move = getMove();
	
			board[move] = 1;
			$("#sq"+(move+1)).attr("src", "o.png");

			if(gameOver(board)==1){
				$("#message-to-user").text("Game Over: I Win!");
				$("#message-to-user").css("visibility", "visible");
			}
			else{
					//now that everything's done, we can allow a move again
				$(".board-square").click(makePlayerMove);
			}
		}
		else{
			if(gameOver(board)==-1){
				$("#message-to-user").text("Game Over: You Win!");
			}
			else{
				$("#message-to-user").text("Game Over: Draw!");
			}
			$("#message-to-user").css("visibility", "visible");
			//we don't return control back if the game is over
		}
	}

	//makeplayermove
	//handles the logic of making a move for the player
	var makePlayerMove = function(){
		//unbind the event so the player can't make a move while we handle this
		$(".board-square").unbind("click");
		//hide the message
		$("#message-to-user").css("visibility", "hidden");
		//get the id of the square
		var id = $(this).attr("id");
		//extract the number from it
		id = id[2]-1;
		//check if it's a legal move
		if(board[id]==0){
			//modify the board for that entry
			board[id] = -1;
			//change the picture displayed in that section
			var source = "favicon-96x96.png";
			$(this).attr("src", source);
			//call the function to tell the computer to make a move
			makeComputerMove();
		}
		//else return control back and tell the user to pick another one
		else{
			$(".board-square").click(makePlayerMove);
			$("#message-to-user").text("Invalid Move: You Must Pick a Different Square");
			$("#message-to-user").css("visibility", "visible");
		}
	}

	//make a function handler to deal with user input on the squares
	//this will be a click event
	$(".board-square").click(makePlayerMove);
});