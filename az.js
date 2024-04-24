// Add click event listener to the extract-cave image
document.getElementById('extract-cave').addEventListener('click', function() {
  // Show the cave-txt popup window by removing the hide class
  document.getElementById('cave-txt').classList.remove('hide');
  // Update the content of the cave-txt popup window
  document.getElementById('cave-txt').innerHTML = `
    <h>Cave extraction</h>
    <p>Timer:60 seconds</p>
    <p>Cost:Free</p>
    <p>Enemy:None</p>
    <!-- Reference to the image of the location -->
    <img class="extraction" src="data/locations/cave.png" alt="cave extraction">
  `;
});

// Add click event listener to close the cave-txt modal
document.getElementById('cave-txt').addEventListener('click', function() {
  // Hide the cave-txt popup window by adding the hide class
  document.getElementById('cave-txt').classList.add('hide');
});
