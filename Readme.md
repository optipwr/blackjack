# BlackJack

##About:
---
This is a single player BlackJack game where you play vs. the dealer. See how much credit you can earn by placing bets in this fun, simple game. Good luck!

##Technology Used:
---
-HTML5
-CSS3
-JavaScript
-jQuery

##How to Play:
---
Stanard BlackJack rules apply:
1. Start by selecting your bet
2. Select the "Deal" button
3. Either select "Hit" if you want another card, or "Stand" if you are content with where you are at
4. Once the outcome is displayed you can click "Reset Hand" to start over and your credit will be adjusted

##Challenges:
---
1. Pairing the playersHand and dealersHand array to match the card images.
2. Checking win conditions.
3. Setting logic for the dealer to either hit or stand.

##Code Snippets:
---
Example of the Deal button

```javascript
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
```

Creating the Deck

```javascript
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
```

##Screenshots:
---
Shot of game being played
![alt text](https://github.com/optipwr/blackjack/blob/master/images/blackjack.png 'blackjack.png')