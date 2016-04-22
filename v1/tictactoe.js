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
	function gameOver(){
		//first, check the horizontal rows
		if ( board[0]==board[1]&&board[0]==board[2]&&board[1]==board[2]&&board[0]!=0 ) { return board[0]; }
		else if ( board[3]==board[4]&&board[3]==board[5]&&board[4]==board[5]&&board[3]!=0 ) { return board[3]; }
		else if ( board[6]==board[7]&&board[6]==board[8]&&board[7]==board[8]&&board[6]!=0 ) { return board[6]; }
		//then check the vertical collumns
		else if ( board[0]==board[3]&&board[0]==board[6]&&board[3]==board[6]&&board[0]!=0 ) { return board[0]; }
		else if ( board[1]==board[4]&&board[1]==board[7]&&board[4]==board[7]&&board[1]!=0 ) { return board[1]; }
		else if ( board[2]==board[5]&&board[2]==board[8]&&board[5]==board[8]&&board[2]!=0 ) { return board[2]; }
		//then check the diagonals
		else if ( board[0]==board[4]&&board[0]==board[8]&&board[4]==board[8]&&board[0]!=0 ) { return board[0]; }
		else if ( board[2]==board[4]&&board[2]==board[6]&&board[4]==board[6]&&board[2]!=0 ) { return board[2]; }
		//else, it's a deadlock
		return 0;
	}

	function boardNotFilled(){
		for(i=0;i<9;i++){
			if(board[i]==0){
				return 1;
			}
		}
		return 0;
	}

	//make a function that handles the logic of processing the player's turn
	//this will be called by the event handler
	var makePlayerMove = function(){
		//unbind the event so the player can't make a move while we handle this
		$(".board-square").unbind("click");

		//get the id of the square
		var id = $(this).attr("id");
		//extract the number form it
		id = id[2]-1;
		//modify the board for that entry
		board[id] = -1;
		//change the picture displayed in that section
		var source = "favicon-96x96.png";
		$(this).attr("src", source);
		//call the function to tell the computer to make a move
		makeComputerMove();
	}
	function getRandomMove(){
		var move = Math.floor(Math.random()*9);
		return move;
	}

	//make a function that handles the computer's turn
	//this one will make a random legal move every time
	function makeComputerMove(){
		if(gameOver()==0&&boardNotFilled()==1){
			var move = getRandomMove();
			while(board[move]!=0){
				move = getRandomMove();
			}
			board[move] = 1;
			$("#sq"+(move+1)).attr("src", "o.png");

			if(gameOver()==1){
				$("#message-to-user").text("Game Over: I Win!");
				$("#message-to-user").css("visibility", "visible");
			}
			else{
					//now that everything's done, we can allow a move again
				$(".board-square").click(makePlayerMove);
			}
		}
		else{
			if(gameOver()==-1){
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
