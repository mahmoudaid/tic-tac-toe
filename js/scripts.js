/*
* Author: Mahmoud Eid.
* Description: Tic Tac Toe game.
* Browsers the project was checked: Google Chrome, Mozilla Firefox, Safari.
*/

(function () {

	'use strict';

	var body = document.getElementsByTagName("body")[0];

	/*===========================================================
	Players
	===========================================================*/

	function Players() {
		this.activePlayer = '';
		this.player1BoxClass = 'box-filled-1';
		this.player1Icon = 'url(img/o.svg)';
		this.player1SelectedBoxes = [];
		this.player2BoxClass = 'box-filled-2';
		this.player2Icon = 'url(img/x.svg)';
		this.player2SelectedBoxes = [];
	}

	// Set active player
	Players.prototype.setActivePlayer = function (player) {
		var activePlayer = document.getElementsByClassName(player)[0];
		activePlayer.classList.add("active");
		activePlayer.id = player;
		this.activePlayer = player;
	};

	// Switch player
	Players.prototype.switchPlayer = function () {
		var currentPlayer = document.getElementsByClassName("players active")[0];
		currentPlayer.classList.remove("active");
		if(currentPlayer.id === 'player1'){
			this.setActivePlayer('player2');
		}else if(currentPlayer.id === 'player2'){
			this.setActivePlayer('player1');
		}
	};

	/*===========================================================
	Game
	===========================================================*/
	function Game() {
		this.isStarted = false;
		this.isPlaying = false;
		this.isFinished = false;
		this.trueResults = [
			// Horizontal
			['1', '2', '3'],
			['4', '5', '6'],
			['7', '8', '9'],
			// Vertical
			['1', '4', '7'],
			['2', '5', '8'],
			['3', '6', '9'],
			// Diagonal
			['1', '5', '9'],
			['3', '5', '7'],
		];
		this.winner = '';
	}

	// check running game results
	Game.prototype.checkResults = function(playerSelections, players) {
		// Check if player selection equal or greater than 3 boxes.
		if(playerSelections.length >= 3){
			for (var i = 0; i < game.trueResults.length; i++) {
				// if player selections match one of ture results array.
				if(playerSelections.indexOf(game.trueResults[i][0]) !== -1 && playerSelections.indexOf(game.trueResults[i][1]) !== -1 && playerSelections.indexOf(game.trueResults[i][2]) !== -1){
					// Set winner and finish the game.
					this.winner = players.activePlayer;
					this.finish();
				}
			}
		}

		// check if no winner and all boxes are filled, set winner to tie and finish the game.
		if(players.player1SelectedBoxes.length + players.player2SelectedBoxes.length === 9 && !this.winner){
			this.winner = 'tie';
			this.finish();
		}
		
		return false;
	};

	// Start game
	Game.prototype.start = function() {
		this.isPlaying = false;
		this.isStarted = true;
		body.innerHTML = game.toHTML();

		var startButton = document.getElementsByClassName("button")[0];
		startButton.onclick = function () {
			game.play();
		};
	};

	// Play the game
	Game.prototype.play = function() {
		this.isPlaying = true;
		this.isFinished = false;
		body.innerHTML = game.toHTML();
		// Set active player
		var players = new Players();
		players.setActivePlayer('player1');

		var box = document.getElementsByClassName("box");
		// Loop througth boxes
		for (var i = 0; i < box.length; i++) {
      		/* jshint loopfunc: true */
			// when mouseover set active player icon as box background.
			box[i].onmouseover = function () {
				// Make sure that box not filled before.
				if(!this.classList.contains("filled")){
					this.style.backgroundImage = players[players.activePlayer+'Icon'];
				}
			};
			// when mouseout unset box background.
			box[i].onmouseout = function () {
				// Make sure that box not filled before.
				if(!this.classList.contains("filled")){
					this.style.backgroundImage = 'unset';
				}
			};

		
			box[i].id = i+1; // boxes from 1 to 9

			box[i].onclick = function () {
				// check if not filled before
				if(!this.classList.contains("filled")){
					// set filled classes
					this.classList.add("filled", players[players.activePlayer+'BoxClass']);
					// add to player filled boxes
					players[players.activePlayer+'SelectedBoxes'].push(this.id);
					// remove cursor
					this.style.cursor = 'unset';
					// Check results if return false switch player.
					if(!game.checkResults(players[players.activePlayer+'SelectedBoxes'], players) && game.isPlaying){
						// switch player
						players.switchPlayer();
					}
				}
			};

		}
	};

	// Finish the game and show results
	Game.prototype.finish = function() {
		this.isPlaying = false;
		this.isFinished = true;
		body.innerHTML = game.toHTML();
		// Add results to page
		var finish = document.getElementById("finish");
		var resultClass;
		var resultMessage = 'Winner';
		if(this.winner === 'player1'){
			resultClass = 'screen-win-one';
		}else if(this.winner === 'player2'){
			resultClass = 'screen-win-two';
		}else if(this.winner === 'tie'){
			resultClass = 'screen-win-tie';
			resultMessage = 'It\'s a Tie!';
		}

		finish.classList.add(resultClass);
		var message = document.getElementsByClassName("message")[0];
		message.innerText = resultMessage;

		var newGameButton = document.getElementsByClassName("button")[0];
		newGameButton.onclick = function () {
			game = new Game();
			game.play();
		};
	};

	// Print page html depend on current status of the game.
	Game.prototype.toHTML = function() {
		var startScreen = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>';

		var playScreen = '<div class="board" id="board">';
		playScreen += '<header><h1>Tic Tac Toe</h1>';
		playScreen += '<ul>';
	    playScreen += '<li class="players player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>';
	    playScreen += '<li class="players player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>';
	    playScreen += '</ul>';
	  	playScreen += '</header>';
	  	playScreen += '<ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li>';
	    playScreen += '<li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul></div>';

	    var finishScreen = '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>';
		
		if(this.isStarted && !this.isPlaying && !this.isFinished){
			return startScreen;
		}else if(this.isPlaying && !this.isFinished) {
			return playScreen;
		}else if(this.isFinished) {
			return finishScreen;
		}
	};

	/*===========================================================
	Start new game
	===========================================================*/
	var game = new Game();
	game.start();

}());