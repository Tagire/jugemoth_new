/*
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var canvas = document.getElementById('carbasus'),
context = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;

shift1 = new bindedParameter('shift1');
shift1.addTo('#controls');
shift1.setValue(340);

shift2 = new bindedParameter('shift2');
shift2.addTo('#controls');
shift2.setValue(390);

shift3 = new bindedParameter('shift3');
shift3.addTo('#controls');
shift3.setValue(440);


function drawCloudsType1() {

	var drawCircle = function(x, y, r) {
			context.lineWidth = 5;
			context.arc(x, y, r, 0, 2 * Math.PI, false);
	}

	var drawHorizon = function(color, shiftByY) {
		var shiftByXSmall = Math.random()*113*Math.PI;
		var shiftByXBig = Math.random()*224*Math.PI;

		var cloudFunction = function(x, cloudshift1, cloudshift2) {
			return (Math.sin((x+cloudshift1)/(23*Math.PI)) * 35 - Math.sin((x)/(10*Math.PI)) * 20 - Math.sin((x+cloudshift2)/(18*Math.PI)) * 20 -50) + shiftByY;
		}

		context.beginPath();
		for (var x = 0; x < 640; x+=20) {
			var r = Math.pow(cloudFunction(x, shiftByXSmall, shiftByXBig) - cloudFunction(x+20, shiftByXSmall, shiftByXBig),2) + 400;
			r = r * (Math.random()+0.5);
			r = Math.sqrt(r);
			drawCircle(x, cloudFunction(x, shiftByXSmall, shiftByXBig), r-8);
		}
		context.closePath();
		context.fillStyle = color;
		context.fill();

		var pixels = context.getImageData(0,0,640,480);
		var bigint = parseInt(color, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;

		for (var x = 0; x < 640; x++) {
			for (var y = 479; y > cloudFunction(x, shiftByXSmall, shiftByXBig); y--) {
			
				pixels.data[(x+y*640)*4] = r;
				pixels.data[(x+y*640)*4+1] = g;
				pixels.data[(x+y*640)*4+2] = b;
				pixels.data[(x+y*640)*4+3] = 255;
			}
		}
		context.putImageData(pixels,0,0);
	}
	drawHorizon('221122', shift1.value);
	drawHorizon('222233', shift2.value);
	drawHorizon('223944', shift3.value);
}

//drawCircle(150, 75, 50);

function drawStars(starCount, color) {
	context.fillRect(0, 0, 640, 480);
	context.fillStyle = 'black';
	context.fill();

	drawDot = function (x,y) {
		context.fillRect(x,y,1,1);
		context.fillStyle = 'white';
		context.fill();
	}

	drawCross = function (x,y) {
		context.fillRect(x,y-1,1,3);
		context.fillRect(x-1,y,3,1);
		context.fillStyle = 'white';
		context.fill();
	}

	for (var i = 0; i < starCount; i++) {
		var x = Math.floor(Math.random() * 640) + 1;
		var y = Math.floor(Math.random() * 480) + 1;
		if (Math.random() < 0.3) {
			drawCross(x,y);
		} else {
			drawDot(x,y);
		}
	}
}

function clearCanvas() {
	context.beginPath();
	context.fillStyle = 'black';
	context.fillRect(0, 0, 640, 480);
	context.fill();
	context.closePath();
}

//drawStars(50, '#fff');
clearCanvas();
drawCloudsType1();


