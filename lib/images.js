var _ = require('lodash')

var meteorImages = [
  'allison.png', 'carmer.png', 'dao.png', 'horace.png', 'jeff.png',
  'joanne.png', 'jorge.png', 'josh.png', 'lovisa.png', 'marissa.png',
  'meeka.png', 'mejia.png', 'rachel.png', 'steve.png', 'tess.png'
]

var playerImages = [
  'alon.png', 'bret.png', 'chris.png', 'george.png', 'hecker.png',
  'holzmann.png', 'jeff.png', 'matt.png', 'mb.png', 'mimi.png', 'rose.png',
  'russell.png', 'ryan.png', 'travis.png'
]

function addImage(objectName) {
  var image = new Image();
  if(objectName === 'meteor') {
    image.src = './images/staff/' + _.sample(meteorImages);
  } else if (objectName === 'player') {
    image.src = './images/students/' + _.sample(playerImages);
  } else {
    image.src = './images/bullet/ruby.png';
  }
  return image
}

module.exports = addImage;
