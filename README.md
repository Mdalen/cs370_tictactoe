# cs370_tictactoe
This is a series of webpages using the bootstrap framework to play a simple game of tictactoe
to reset any of the games, simply reload the page
there is no need to connect to anything else, simply drag and drop

Version 1 /v1/
This is a "stupid" version of the AI
it will not check for any correct moves from the user, and it will simply pick a random empty square for every move
this will go on until someone wins or draws

Version 2 /v2/
This is an improved version that will check for the user to make correct moves
it will force the user to make a valid move before proceeding 
other than that, it is the same as version 1, it will make a random move every time until there are no moves

Version 3 /v3/
This is the first "smart" AI 
it uses a min-max recursive algorithm to determine the best moev instead of making a random move
in this way, it is guaranteed to win or draw every single game without fail, 
because the player does not have a winning strategy and the AI will always play optimally

Version 4 /v4/
This is an improved version of v3
it adds on an alpha-beta pruning algorithm onto the min-max recursive functions
this allows it to retain the same functionality, but work much faster than previously
it may not be noticeable though, since v3 is not incredibly slow on its own, but there is an improvement here
as before, it will win or draw every single match without fail

