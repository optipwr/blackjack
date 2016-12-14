// GLOBAL VARIABLES
var theDeck = createDeck();
var playersHand = [];
var dealersHand = [];

$(document).ready(function(){

	$('.deal-button').click(function(){
		shuffleDeck();
		playersHand.push(theDeck[0]);
		playersHand.push(theDeck[2]);

		placeCard('player', 'one', playersHand[0]);
		placeCard('player', 'two', playersHand[1]);

		dealersHand.push(theDeck[1]);
		dealersHand.push(theDeck[3]);

		placeCard('dealer', 'one', dealersHand[0]);
		placeCard('dealer', 'two', dealersHand[1]);
	});

	$('.hit-button').click(function(){

	});

	$('.stand-button').click(function(){

	});


});

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

function shuffleDeck(){
	for(let i = 0; i < 9001; i++){
		var card1ToSwitch = Math.floor(Math.random() * theDeck.length);
		var card2ToSwitch = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1ToSwitch];
		theDeck[card1ToSwitch] = theDeck[card2ToSwitch];
		theDeck[card2ToSwitch] = temp;
	}
}

function placeCard(who, where, whatCard){
	var classSelector = '.' + who + '-cards .card-' + where;
	$(classSelector).html('<img src="images/cards/' + whatCard + '.png">');
}