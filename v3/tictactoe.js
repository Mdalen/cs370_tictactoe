$(document).ready(function(){

	//make a global variable of the board we're playing on
	//this will be a simple array of the states of the board squares
	//-1 denotes a player owned square
	//1 dentoes a computer owned square
	//0 denotes a blank unowned square
	var board = [0,0,0,0,0,0,0,0,0];
	
	//make a function that resizes the squares vertically along with the horizontal
	//of bootstrap
	function resizeSquares(){
		$(".board-square").each(function(){
			var height = $(this).width();
			$(this).height(height);
		});
	}
	//call it immediately to try to hide this from the user
	resizeSquares();

	//make a funciton to check if the game is over yet
	//run through the 8 possible win conditions, and if it is not over
	//then return 0
	//else return the winner
	//-1 is the player, 1 is the computer
	var gameOver = function(arg){
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

	//make a function to check whether or not the board is full or not
	//returns 1 if there is still an empty space
	//returns 0 if there are no unclaimed spaces
	var boardNotFilled = function(e){
		for(k=0;k<9;k++){
			if(e[k]==0){
				return 1;
			}
		}
		return 0;
	}

	//make a function to calculate the next move through being recursively called
	//it takes a board as an argument, most likely the current state of the main board
	//it also takes a min/max value, which will always be max in this case
	//it then recursively runs through all the possible moves left
	//til game completion and decides which is the best move
	var recursMove = function(recBoard, max){
		var newBoard = recBoard.slice();
		alert("newboard is "+newBoard);
		var val = 0;
		if(boardNotFilled(newBoard)==0){
			return gameOver(newBoard);
		}
		if(gameOver(newBoard)!=0){
			return gameOver(newBoard);
		}
		else{
			if(max){
				val = -1;
				for(m=0;m<9;m++){
					newBoard = recBoard.slice();
					newBoard[m] = 1;
					maxChild = recursMove(newBoard, false);
					if(maxChild>val){
						val = maxChild;
					}
				}
				return val;
			}
			else{
				val = 1;
				for(n=0;n<9;n++){
					newBoard = recBoard.slice();
					newBoard[n] = -1;
					minChild = recursMove(newBoard, true);
					if(minChild<val){
						val = minChild;
					}
				}
				return val;
			}
		}
	}

	var getMove = function(){
		var tempBoard = board.slice();
		var currentMax = -2;
		var currentMove = 9;
		for(i=0;i<9;i++){
			tempBoard = board.slice();
			alert("trying "+i);
			if(board[i]==0){
				tempBoard[i] = 1;
				var getChild = recursMove(tempBoard, false);
				if(getChild>currentMax){
					alert("decided on "+i);
					currentMax = getChild;
					currentMove = i;
				}
			}
		}
		return currentMove;
	}

	//make a function that handles the logic of processing the player's turn
	//this will be called by the event handler
	var makePlayerMove = function(){
		//unbind the event so the player can't make a move while we handle this
		$(".board-square").unbind("click");
		//hide the message
		$("#message-to-user").css("visibility", "hidden");
		//get the id of the square
		var id = $(this).attr("id");
		//extract the number form it
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

	//make a function that handles the computer's turn
	//this one will make a random legal move every time
	function makeComputerMove(){
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

	//make a function handler to deal with user input on the squares
	//this will be a click event
	$(".board-square").click(makePlayerMove);

	//on a resize of the window
	//call the resize function we defined above
	$(window).resize(function(){
		resizeSquares();
		
	});
});