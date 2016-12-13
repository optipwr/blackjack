// JS wait for the DOM!
$(document).ready(function(){
// -----------------------------------
// -------------GLOBALS---------------
// -----------------------------------
var theDeck = [];
var playersHand = [];
var dealersHand = [];
// Need a way to make the deck
createDeck();

// Get deal working
	$('.deal-button').click(function(){
		// Shuffle the deck
		shuffleDeck();
		// Add card 0 to playersHand
		playersHand.push(theDeck[0]);
		// Add card 1 to the dealersHand etc. etc.
		dealersHand.push(theDeck[1]);
		playersHand.push(theDeck[2]);
		dealersHand.push(theDeck[3]);

		// Put the first card in the players hand
		placeCard(playersHand[0], 'player', 'one');
		// Put the second card in the players hand
		placeCard(playersHand[1], 'player', 'two');

		// Put the first card in the dealers hand
		placeCard(dealersHand[0], 'dealer', 'one');
		// Put the second card in the dealers hand
		placeCard(dealersHand[1], 'dealer', 'two');

		calculateTotal('player', playersHand);
		calculateTotal('dealer', dealersHand);
	});


// Need a way to make the deck
// Shuffle the new deck
// update the DOM with the player cards
// Get hit working
	$('.hit-button').click(function(){
		playersHand.push(theDeck[4]);
		placeCard(playersHand[2], 'player', 'three');
		calculateTotal('player', playersHand);
	});


// Put the card in the right place
// Update the total
// Check if the player busted
// Get stand working
	$('.stand-button').click(function(){
		console.log(this);
	});


// Run the dealer "hit" until it has more than 16
// Once dealer has more than 16, checkwin
// Post a message after checkin


	function createDeck(){
		// Fill the deck with:
		// 52 cards
		// 4 suits(h, s, d, c)
		// 1-13 (11 = J, 12 = Q, 13 = K)
		var suits = ['h', 's', 'd', 'c'];
		// Loop through all 4 suits
		for(let s = 0; s < suits.length; s++){
			// Loop through all 13 cards for each suits
			for(let c = 1; c <= 13; c++){
				theDeck.push(c+suits[s]);
			}
		}
	}

	function shuffleDeck(){
		for(let i = 0; i < 9001; i++){
			card1ToSwitch = Math.floor(Math.random() * theDeck.length);
			card2ToSwitch = Math.floor(Math.random() * theDeck.length);
			var temp = theDeck[card1ToSwitch];
			theDeck[card1ToSwitch] = theDeck[card2ToSwitch];
			theDeck[card2ToSwitch] = temp;
		}
	}

	function placeCard(whatCard, who, whichSlot){
		var classToTarget = '.' + who + '-cards .card-' + whichSlot;
		// console.log(classToTarget);
		$(classToTarget).html('<img src="images/cards/' + whatCard + '.png">');
	}

	function calculateTotal(who, theirHand){
		var cardValue = 0;
		var total = 0;
		for(let i = 0; i < theirHand.length; i++){
			cardValue = Number(theirHand[i].slice(0, -1));
			if(cardValue > 10){
				cardValue = 10;
			}
			if((cardValue === 1)&&(total < 11)){
				cardValue = 11;
			}
			total += cardValue;
		}
	var classToTarget = '.' + who + '-total-number';
	$(classToTarget).text(total);
	}

});





