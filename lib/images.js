var _ = require('lodash')
var meteorImages = [
  'allison.png', 'carmer.png', 'dao.png', 'horace.png', 'jeff.png',
  'joanne.png', 'jorge.png', 'josh.png', 'lovisa.png', 'marissa.png',
  'meeka.png', 'mejia.png', 'rachel.png', 'steve.png', 'tess.png'
]

var playerImages = {
  alon: 'alon.png', bret: 'bret.png', chris: 'chris.png', george: 'george.png',
  hecker: 'hecker.png', holzmann: 'holzmann.png', jeff: 'jeff.png',
  matt: 'matt.png', mb: 'mb.png', mimi: 'mimi.png', rose: 'rose.png',
  russell: 'russell.png', ryan: 'ryan.png', travis: 'travis.png'
}

function addImage(objectName) {
  var image = new Image();
  if (document.getElementById('player') !== null){
    var selectedPlayer = document.getElementById('player').value;
  } else {
    var selectedPlayer = "";
  }
  if(objectName === 'meteor') {
    image.src = './images/staff/' + _.sample(meteorImages);
  } else if (objectName === 'player' && selectedPlayer === "") {
    image.src = './images/students/' + _.sample(playerImages);
  } else if (objectName === 'player' && selectedPlayer !== "") {
    image.src = './images/students/' + playerImages[selectedPlayer]
  }
   else if (objectName === 'bullet') {
    image.src = './images/bullet/ruby.png';
  }
  return image
}

module.exports = addImage;
