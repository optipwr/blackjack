// GLOBAL VARIABLES
var theDeck = createDeck();
var playersHand = [];
var dealersHand = [];
var hitCounter = 0;
var totalCredit = 2000;
var betValue = 0;
var playerWin = false;
var hasDealt = false;
var hasHit = 0;

$(document).ready(function(){

	$('.deal-button').click(function(){
		if(betValue == 0){
			// Do nothing!
		}
		else{
			// Disables Deal button after hand is dealt
			$('.deal-button').attr('disabled', true);
			// Animation for cards being dealt
			$('.card-move-1').css('animation', 'card-move-1 1s');
			$('.card-move-2').css('animation', 'card-move-2 1s');
			shuffleDeck();
			// Use shift to remove the top card from the deck as card goes to either player or dealer
			playersHand.push(theDeck.shift());
			dealersHand.push(theDeck.shift());
			playersHand.push(theDeck.shift());
			dealersHand.push(theDeck.shift()); //Pushes the dealer's second card value

			placeCard('player', 1, playersHand[0]);
			placeCard('player', 2, playersHand[1]);
			placeCard('dealer', 1, dealersHand[0]);
			placeCard('dealer', 2, 'deck'); //Dealer's second card showing only the card back.

			calculateTotal(playersHand, 'player'); //Checking win condition on initial deal
			calculateTotal(dealersHand, 'dealer');
			hitCounter++;
			hasDealt = true;
			if(calculateTotal(playersHand, 'player') === 21){
				placeCard('dealer', 2, dealersHand[1]); //Will reveal the second initial card the dealer got to show you how dealer won
				checkWin();
			}
		}
	});

	$('.hit-button').click(function(){
		if(hasDealt){
			if((calculateTotal(playersHand, 'player') < 21)&&(hasHit == 0)){
				$('.card-move-3').css('animation', 'card-move-3 1s 1');
				playersHand.push(theDeck.shift());
				var slotForNewCard = playersHand.length;
				placeCard('player', slotForNewCard, playersHand[playersHand.length-1]);
				calculateTotal(playersHand, 'player');
				hasHit++;
			}
			else {
				$('.card-move-4').css('animation', 'card-move-4 1s 1');
				playersHand.push(theDeck.shift());
				var slotForNewCard = playersHand.length;
				placeCard('player', slotForNewCard, playersHand[playersHand.length-1]);
				calculateTotal(playersHand, 'player');
			}
		}

	});


	$('.stand-button').click(function(){
		if(hasDealt){
			placeCard('dealer', 2, dealersHand[dealersHand.length - 1]);  //Shows card that was hidden
			var dealerTotal = calculateTotal(dealersHand, 'dealer');
			while(dealerTotal < 17){
				// Dealer will always hit while less than 17
				dealersHand.push(theDeck.shift());
				var slotForNewCard = dealersHand.length;
				placeCard('dealer', slotForNewCard, dealersHand[dealersHand.length-1]);
				dealerTotal = calculateTotal(dealersHand, 'dealer');
			}
			// The dealer has 17 or more Player hit stand. Check to see who won.
			checkWin();
		}
		if(totalCredit == 0){
			$('.intro').html("Game Over. You are out of credit.");
		}
	});


	$('.btn-fifty').click(function(){
		if(totalCredit >= 50){
			$('#credit').text(totalCredit -= 50);
			$('#bet').text(betValue += 50);
		}
	});

	$('.btn-hundred').click(function(){
		if(totalCredit >= 100){
			$('#credit').text(totalCredit -= 100);
			$('#bet').text(betValue += 100);
		}
	});

	$('.btn-twoFifty').click(function(){
		if(totalCredit >= 250){
			$('#credit').text(totalCredit -= 250);
			$('#bet').text(betValue += 250);
		}
	});

	$('.btn-fiveHundred').click(function(){
		if(totalCredit >= 500){
			$('#credit').text(totalCredit -= 500);
			$('#bet').text(betValue += 500);
		}
	});


});

function checkWin(){
	playerTotal = calculateTotal(playersHand, 'player');
	dealerTotal = calculateTotal(dealersHand, 'dealer');

	// player has more than 21. player busts and loses
	if(playerTotal > 21){
		$('.dealer-win').text("Dealer wins with: ");
	}
	else if(dealerTotal > 21){
		$('.player-win').text("Player wins with: ");
		playerWin = true;
	}
	else{
		if(playerTotal > dealerTotal){
			$('.player-win').text("Player wins with: ");
			playerWin = true;
		}
		else if(dealerTotal > playerTotal){
			$('.dealer-win').text("Dealer wins with: ");
		}
		else{
			$('.player-win').text("It's a tie with: ");
			$('.dealer-win').text("It's a tie with: ");
		}
	}
	returnCredit();
}

function reset(){
	// the deck needs to be reset
	theDeck = createDeck(); //creates new deck
	// the player and dealer hands need to be reset
	playersHand = [];
	dealersHand = [];
	// reset the DOM
	// -cards
	$('.player-cards .card').html('');
	$('.dealer-cards .card').html('');
	// $('.deck').html('<img src="images/cards/deck.png">');
	$('.deal-button').attr('disabled', false);
	$('.player-win').text('Player Total: ');
	$('.dealer-win').text('Dealer Total: ');
	$('.card-move-1').css('animation', '');
	$('.card-move-2').css('animation', '');
	$('.card-move-3').css('animation', '');
	$('.card-move-4').css('animation', '');
	playerTotal = calculateTotal(playersHand, 'player');
	dealerTotal = calculateTotal(dealersHand, 'dealer');
	hitCounter = 0;
	playerWin = false;
	$('#bet').text(betValue = 0);
	$('#credit').text(totalCredit);
	hasDealt = false;
	// betValue = 0;
}

function createDeck(){
	var newDeck = [];
	var suits = ['h', 's', 'd', 'c'];
	for(let s = 0; s < suits.length; s++){
		for(let c = 1; c <= 13; c++){
			newDeck.push(c + suits[s]);
		}
	}
	return newDeck;
}
// Shuffle function that will switch the place of one random card with another 9001 times in order to randomize the deck
function shuffleDeck(){
	for(let i = 0; i < 9001; i++){
		var card1ToSwitch = Math.floor(Math.random() * theDeck.length);
		var card2ToSwitch = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1ToSwitch];
		theDeck[card1ToSwitch] = theDeck[card2ToSwitch];
		theDeck[card2ToSwitch] = temp;
	}
}
// Visuals to show the card image based on the card data
function placeCard(who, where, whatCard){
	var classSelector = '.' + who + '-cards .card-' + where;
	$(classSelector).html('<img src="images/cards/' + whatCard + '.png">');
	$(classSelector).hide().fadeIn(1000);
	
}
// This is the win condition checker
function calculateTotal(hand, who){
	var total = 0;
	var cardValue = 0;
	var numberOfAces = 0;
	for(let i = 0; i < hand.length; i++){
		if((hitCounter == 0)&&(who === 'dealer')&&(i === 1)){ //Followed Paul's logic here.
		}
		else{
			cardValue = Number(hand[i].slice(0, -1));
			if(cardValue > 10){
				cardValue = 10;
			}
			if((cardValue === 1)&&(total < 11)){
				cardValue = 11;
				numberOfAces++;
			}
			total += cardValue;
		}
		// if((total > 21)&&(hasAce == true)){
		// 	total -= 10;
		// }
		if((numberOfAces > 0)&&(total > 21)){
			total -= 10;
			numberOfAces--;
		}

		
	}
	var classSelector = '.' + who + '-total-number';
	$(classSelector).text(total);
	return total;
}

function returnCredit(){
	if(playerWin){
		totalCredit += betValue * 2;
	}
}


