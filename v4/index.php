<!DOCTYPE html>
<html lang="en">
	<head>
		<title>M-Dalen CS 370 Assignment 5 Problem 1</title>
		<!--metadata-->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!--call the bootstrap cs sheets and the sheet for this specific page-->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		<link rel="stylesheet" href="tictactoe.css">
		<!--this is the jquery library-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<!--this is the bootstrap logic-->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
		<!--this is to handle the icon in the browser for the site-->
		<link rel="apple-touch-icon" sizes="57x57" href="apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="apple-icon-180x180.png">
		<link rel="icon" type="image/png" sizes="192x192"  href="android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
		<link rel="manifest" href="manifest.json">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="ms-icon-144x144.png">
		<meta name="theme-color" content="#ffffff">
	</head>
	<body>
		<div class="container-fluid">
		<!--create the label-->
			<div class="row">
				<div class="col-sm-1"></div>
				<div class="col-sm-10"><div class="alert alert-success text-center" id="signature">Mitchell Dalen - Tic Tac Toe Game - Version #4</div></div>
				<div class="col-sm-1"></div>
			</div>
			<!--create the message passign interface-->
			<!--instead of using alert all the time, we'll just have this message at the top that will be shown to the user-->
			<div class="row">
				<div class="col-sm-1"></div>
				<div class="col-sm-10"><div class="alert alert-warning text-center" style="visibility:hidden;" id="message-to-user">ERROR: THIS SHOULD NEVER HAPPEN</div></div>
				<div class="col-sm-1"></div>
			</div>
			<!--create the board to play on-->
			<div class="row">
				<div class="col-sm-12">
					<table class="table-condensed borderless">
						<tr>
							<td><img class="board-square" id="sq1" src="board-base.png" height="250px" width="250px"></td>
							<td><img class="board-square" id="sq2" src="board-base.png" height="250px" width="250px"></td>
							<td><img class="board-square" id="sq3" src="board-base.png" height="250px" width="250px"></td>
						</tr>
						<tr>
							<td><img class="board-square" id="sq4" src="board-base.png" height="250px" width="250px"></td>
							<td><img class="board-square" id="sq5" src="board-base.png" height="250px" width="250px"></td>
							<td><img class="board-square" id="sq6" src="board-base.png" height="250px" width="250px"></td>
						</tr>
						<tr>
							<td><img class="board-square" id="sq7" src="board-base.png" height="250px" width="250px"></td>
							<td><img class="board-square" id="sq8" src="board-base.png" height="250px" width="250px"></td>
							<td><img class="board-square" id="sq9" src="board-base.png" height="250px" width="250px"></td>
						</tr>
					</table>
				</div>
		
			</div>
		</div>
	</body>
	<!--Include the javascript to handle the logic of the game-->
	<script src="ttt3.js"></script>
</html>