import * as tf from '@tensorflow/tfjs';

function getImageData(img) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  context.drawImage(img, 0, 0);
  return context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
}

function processImage(img) {
  const imageData = getImageData(img);

  const res = tf.tidy(() => {
    let data = tf.fromPixels(imageData, 3);
    //data = tf.image.resizeBilinear(data, [217, 300], true);
    //      .toFloat()
    //      .div(tf.scalar(255.0));

    return data;
  });

  const canvas = document.getElementById('transform');
  tf.toPixels(res, canvas);
}

const original = document.getElementById('original');
if (original.naturalHeight !== 0) {
  processImage(original);
} else {
  original.onload = () => processImage(original);
}
