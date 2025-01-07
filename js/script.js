let gridElement = document.getElementById('number-grid');
   let currentPlayer = 1;
   let currentNumber = 1;
   let numberArray = [];
   let player1Name = '';
   let player2Name = '';
   let gridSize = 4; // Default grid size

   function startGame() {
       player1Name = document.getElementById('player1-name').value || 'Player 1';
       player2Name = document.getElementById('player2-name').value || 'Player 2';
       gridSize = parseInt(document.getElementById('grid-size').value);
       document.getElementById('current-player').textContent = `${player1Name}'s Turn`;
       document.querySelector('.game-container').style.display = 'block'; // Show game
       document.querySelector('.player-input-container').style.display = 'none'; // Hide input form
       shuffleNumbers();
       resetGridVisibility();
   }

   function shuffleNumbers() {
       const totalCells = gridSize * gridSize;
       numberArray = [...Array(totalCells).keys()].map(i => i + 1);
       numberArray.sort(() => Math.random() - 0.5);

       gridElement.innerHTML = '';
       gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
       numberArray.forEach(num => {
           let cell = document.createElement('div');
           cell.classList.add('cell', 'hidden');
           cell.textContent = num;
           cell.dataset.number = num;
           cell.onclick = () => handleClick(cell, num);
           gridElement.appendChild(cell);
       });
   }

   function handleClick(cell, number) {
       if (!cell.classList.contains('revealed')) {
           cell.classList.add('revealed');
           cell.classList.remove('hidden');

           if (number === currentNumber) {
               currentNumber++;
               if (currentNumber > numberArray.length) {
                   document.getElementById('status').textContent = `${currentPlayer === 1 ? player1Name : player2Name} Wins!`;
                   document.querySelectorAll('.cell').forEach(c => c.classList.add('winner'));
               }
           } else {
               document.getElementById('status').textContent = `Wrong number! Switching players...`;
               setTimeout(() => {
                   switchPlayer();
                   resetGridVisibility();
               }, 1000);
           }
       }
   }

   function resetGridVisibility() {
       document.querySelectorAll('.cell').forEach(cell => {
           cell.classList.add('hidden');
           cell.classList.remove('revealed');
       });
   }

   function switchPlayer() {
       currentPlayer = currentPlayer === 1 ? 2 : 1;
       document.getElementById('current-player').textContent = `${currentPlayer === 1 ? player1Name : player2Name}'s Turn`;
       currentNumber = 1; // Reset the sequence for the new player
       resetGridVisibility(); // Ensure the grid is hidden with the same number order.
   }

   function restartGame() {
       document.querySelector('.player-input-container').style.display = 'flex'; // Show input form again
       document.querySelector('.game-container').style.display = 'none'; // Hide game
       document.getElementById('status').textContent = '';
       currentNumber = 1;
   }
