# OOP Connect Four

## About this implementation
This project is part of the object-oriented programming curriculum at App
Academy. This implemenation is by Juliet Shafto and Yongho Kim.

### Project Status
The UI is already created at the start of the project, but the game has not been implemented

## Project Requirements

### Start a new game
- In `index.html`
    - [ ] Add the "is-invisible" class to #board-holder.
    - [ ] Add the "disabled" attribute to #new-game.
- In connect-four.js: Add an event handler for the window's "DOMContentLoaded" event. In that handler, have it:
    - [ ] At the top of the file, declare a global variable named `game` and set it to `undefined`.
    - [ ] Create an event handler for the "keyup" event of `#player-1-name`. In the event handler, have it set #new-game's "disabled" property to false if both #player-1-name and #player-2-name have non-empty content, enable #new-game. Otherwise, disable #new-game.
    - [ ] Create an event handler for the "keyup" event of `#player-2-name`. In this event handler, do the exact same thing you did in the `#player-1-name` handler. Now, think, did you copy and paste some code? If so, can you refactor it somehow to remove duplication because the intended behavior is identical?
    - [ ] Create an event handler for the "click" event of `#new-game` that, when clicked:
        - [ ] Sets the global variable game to a new instance of the Game class passing in the two players' names.
        - [ ] Sets the values of the two player name input elements to empty strings.
        - [ ] Sets the disabled property on `#new-game` to `true`, thereby disabling it. (See if you have this functionality already written somewhere and, if you do, somehow reuse it so prevent code duplication.)
        -[ ] Calls a function named `updateUI()`.
    - [ ] Declare a function named `updateUI()` after the `game` variable declaration and before the event listener for "DOMContentLoaded". In that function, put the following logic:
        - [ ] If `game` is `undefined`, have it add the "is-invisible" class to `#board-holder`.
        - [ ] If `game` is not `undefined` have it remove the "is-invisible" class from `#board-holder` and set the inner HTML of the `#game-name` element to the value returned by the `getName()` function of the object stored in the `game` variable.
    - [ ] At the top of the file, import the `Game` class from the file at the path `./game.js` using `import { Game } from './game.js'`; because you want to load a file that will contain the `Game` class. Remember that you have to use the ".js" on the file name because you're loading these directly in the browser.
- [ ] Create a file named `game.js` in the same directory as the `connect-four.js` file. In that file, declare and export a class named `Game` that has
    - [ ] A constructor that takes the names of the two players and sets them to instance variables on the object. (Remember that creating instance variables requires the use of the `this` keyword, such as `this.name1 = playerOneName`;, for example, creates an instance variable named `name1` and sets it to the value of `playerOneName`.)
    - [ ] A method named `getName()` that returns a string of _"Player 1 Name vs. Player 2 Name"_.

### Indicating The Current Player

- In game.js:
    - [ ] In the constructor of the `Game` class, create a new instance variable to track the current player and set it to `1` to indicate that its the first player.
    - [ ] Create a method called `playInColumn()` that will handle the click of the user. In that method, change the value of the current player to the other player. If it was `1`, then make it `2`; otherwise, make it `1`.
- In connect-four.js:
    - [ ] In the event handler for "DOMContentLoaded", register an event handler for the "click" event on `#click-targets`.
    - [ ] In the `#click-targets` event handler that you just created, have it call the `playInColumn` method of the object in the global variable `game`. Then, have it call the `updateUI` method.
    - [ ] In the `updateUI` method, in the portion of the code that uses the `game` object, have it get the current player from the instance variable that you created in the constructor of the `Game` class. Use that value to determine if you need to add "red" and remove "black" from the `#click-targets` element for player two, or if you need to add "black" and remove "red" for player one from that element.

### Placing A Played Token
#### Create the "Column" class
- In the column.js file:
    - [ ] Create and export a class named `Column`.
    - [ ] Create a constructor that will create a way to manage the tokens stored in the column.
    - [ ] Create a method named `add` that takes a player number and stores it in the "bottom-most" entry in the column.
    - [ ] Create a method named `getTokenAt` which takes a row index number between `0` and `5` and returns `null` if there's no token there, `1` if player one's token is there, or `2` if player two's token is there.

#### Create "Column" objects in the "Game" class
- In game.js:
    - [ ] Add to the `Game` constructor a new instance variable named `columns` and initialize it to an array of seven `Column` objects.
    - [ ] Add a method named `playInColumn` that takes the index of the column in which to play, uses that index to select the correct column from the array of `columns`, and calls the `add` method on that column object passing in the number of the current player. Make sure that you leave the toggling of the current player from one to two and back, again, in the method at the end of it.
    - [ ] Add a method named `getTokenAt` that takes the row index and the column index. Use the column index to get the correct column from the `columns` array. Then, call the `getTokenAt` method on the column object passing in just the row number. Return the return value of that function.

#### Add a click handler for the click targets
- In connect-four.js, in the event handler for click targets that you already have, before the call to the `playInColumn` method,
    - [ ] Parse the number of the click target that the player clicked on.
        - Make sure your event handler is getting the event object in its parameter list.
    - [ ] Access the "id" property of the "target" property of the click event.
        - [ ] If it's a click that you want to handle, make sure that `id` value starts with the string "column-".
        - [ ] If it does, then use `Number.parseInt` to convert the last character of the id into a number. Pass that number into the `playInColumn` method.

#### Update the tokens in the board
- [ ] In the `updateUI` method, it's now time to show the tokens in the board. Create a `for` loop that will loop through the values from zero to five, inclusive; that will be the row index. Then, inside that for-block, create another `for` loop that loops from the values zero to six, inclusive; that will be the column index. Now, you have a row index and a column index to use to update the board. Inside the inner loop:
    - [ ] Select the element `#square-«row»-«column»` using the row and column indexes that you have.
    - [ ] Use the `getTokenAt` method on the `Game` object stored in the global `game` variable. The value that gets returned from `getTokenAt` will determine what you should do:
        - [ ] First, clear out the inner HTML of the square you selected in the previous step by setting it to an empty string
        - [ ] If the value returned by `getTokenAt` is `1`, then create a "div" element, make sure it has both the "token" and "black" classes, and add it as the child to the square.
        - [ ] If the value returned by `getTokenAt` is `2`, then create a "div" element, make sure it has both the "token" and "red" classes, and add it as the child to the square.

### Full Columns
- In the Column class:
    - [ ] Depending on how you implemented it, just don't add the token if there is no available slot for it.
    - [ ] Add a method named `isFull` and have it return `true` if there are no more available slots (that is, there are already six tokens in it).

- Add an `isColumnFull` method that takes a column index between `0` and `5`, inclusive, and returns the value of the `isFull` method invoked on the appropriate `Column` object stored in the `columns` array.
- [ ] In the updateUI method, create a for loop that iterates over the values from 0 to 6, inclusive. For each value:
    - [ ] Select the element with the id of "column-«column index»".
    - [ ] If the value returned from the `isColumnFull` method on the `Game` object is `true`, then add the "full" class to the element selected in the previous step.
    - [ ] If the value returned from the `isColumnFull` method on the `Game` object is `false`, then remove the "full" class to the element selected in the previous step.

### Determine The Tie
- [ ] Check if all of the columns are full, using the `isFull` method on each `Column` object.
    - [ ] Put this behavior in the `Game` class.
    - [ ] Declare an instance variable in the constructor named `winnerNumber`. You'll set that to `1` if Player One wins, `2` if Player Two wins, and `3` if both win (that is, it is a tie). Set `winnerNumber` in the constructor equal to `0` to indicate that no one has won.

### Determine A Win Column Win
- [ ] Create a new file named column-win-inspector.js. In it, create and export a class named `ColumnWinInspector`.
    - [ ] Create a constructor that accepts a `Column` object.
- [ ] Create a method named `inspect` that takes no parameters. In that method, have it check to see if the column has four contiguous tokens of the same player.
    - [ ] If they do, return that player's number. Otherwise, return `0`.
- In the game.js file
    - [ ] import the `ColumnWinInspector` class so that you can use it.
    - [ ] Create a new method in the `Game` class called `checkForColumnWin`. Call it after you call the `checkForTie` method in the `playInColumn` method.
        - [ ] If the value of `winnerNumber` is already non-zero, skip the method.
        - [ ] In the `checkForColumnWin`, loop over every column in the `columns` array.
            - [ ] For each column, create a new instance of the `ColumnWinInspector` class handing it the column that you're currently inspecting.
            - [ ] Call the `inspect` method on the `inspector` object. If it returns `1` or `2`, then there's a winner. Set the value of `winnerNumber` to the value and stop inspecting
- Update the name of the game:
    - [ ] In the `getName` method, if the `winnerNumber` is `1`, return the message "«Player one name» wins!". If the `winnerNumber` is `2`, return the message "«Player two name» wins!". Otherwise, just return the "tie" message or the "vs" message like before.
- Make it so the columns are "full"
    - If there is a winner, it's as if all of the columns are full. In the `isColumnFull` method, check to see if `winnerNumber` is `1` or `2`. If so, just return `true`.

### Determine A Win Row Win
- For the new class:
    - [ ] Create a file named row-win-inspector.js.
    - [ ] Create and export a class named `RowWinInspector`.
    - [ ] Declare the constructor to have a `columns` parameter that should contain four column objects. Save them in an instance variable.
    - [ ] Create an `inspect` method (with no parameters) that loops through the six rows and checks the token at each row in each of the columns. If any of the rows have identical entries in all four areas, then return the value of that winner's number. Otherwise, if there is no winner, return `0`.
- In `Game` class:
    - [ ] At the end of the `playInColumn` method, call a new method, this time named `checkForRowWin`.
    - [ ] Create the `checkForRowWin` method in the `Game` class.
    - If the value of `winnerNumber` is already non-zero, skip the method.
    - [ ] Slice the `columns` array with groups of columns 0 - 3, 1 - 4, 2 - 5, and 3 - 6.
    - [ ] For each of those slices, create a new instance of the `RowWinInspector` class.
    - [ ] Call the `RowWinInspector` class' `inspect` method. If the return value is greater than `0`, then set the winner number and break.

### Determine a Diagonal Win
- [ ] Create an inspector just for the diagonals.
- [ ] Do the same kind of column splicing.
- [ ] Check the diagonals in both directions inside the slice. Return the value if you find four entries.
- [ ] Hook it up into the `Game` the same way that you did `checkForTie`, `checkForColumnWin`, and `checkForRowWin`.

### Saving Game State
#### Save the Game Into Local Storage
- [ ] Create and export a `GameJsonSerializer` class.
- [ ] Have its constructor take a `Game` object.
- [ ] The serializer should only talk directly to the `Game` object.
    - [ ] get the data out and store it in a way that you can put it back into a `Game` object using only the methods and properties available to you, namely:
        - `getTokenAt(rowIndex, columnIndex)`
        - `player1Name`
        - `player2Name`
        - `playInColumn(columnIndex)`

#### Save the Game Into Local Storage
- Declare and export a class named `GameJsonDeserializer` which has a constructor that accepts the JSON string.
- It should have a `deserialize` method that calls `JSON.parse` on the JSON string.
- Then, it should create a new instance of the `Game` class and pass in the save player names to the constructor.
- Then, using the `playInColumn` method, you need to restore the state of the board. Once you've done that, return that configured `Game` object.

#### Integrating the storage methods
- [ ] Use the `GameJsonSerializer` at the end of the handler for the click targets. Create a new serializer by passing in the `Game` object into its constructor, call `serialize` on it, and save the returned string into local storage.
- [ ] Use the `GameJsonDeserializer` as the last line of the "DOMContentLoaded" handler.
    - It should read a value from local storage and, if that value's not `null`, then create an instance of the `deserializer` and pass the string into its constructor.
    - Call the `deserialize` method and set the global game variable to the return value.
    - Call `updateUI` because you now have a game!

### Bonus Goal: Animate Your Token Drop
Right now, when a player clicks above the column, it just shows up at the appropriate place in the board. It's up to you to now animate that so that it from above the board down to its final resting place in the column. While the token is animating its fall, the game should not process any clicks.

You can do this a few different ways. Here are some hints that you can use exclusively or in combination with one another.
- You can try to use CSS transitions to have the CSS "move" the token for you.
- You can try using a third-party library like tween to "more" the token for you.
- You can use CSS positioning and write a JavaScript setInterval to "move" the token yourself.
