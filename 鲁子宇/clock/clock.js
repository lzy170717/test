function inherit(child, parent) {
	function tempCtor() {};
	tempCtor.prototype = parent.prototype;
	child.superClass_ = parent.prototype;
	child.prototype = new tempCtor();
	child.prototype.constructor = child;
	console.log(child);
	console.log(parent);
}

function Canvas(canvas) {
	this.canvas = canvas;
}

Canvas.prototype = {
	
	constructor: Canvas,

	init: function() {
		this.ctx = this.canvas.getContext("2d");
		var that = this;

		setInterval(function() {
			var date = new Date();
			that.hour = date.getHours();
			that.minute = date.getMinutes();
			that.second = date.getSeconds();
			that.ctx.clearRect(0,0,500,500);
			that.createClock();
		}, 1000)

	},

	createClock: function() {
		this.createCircle();
		this.craeteCenterPoint();
		this.createMinuteDash();
		this.drawText();
		this.drawHour();
		this.drawMinute();
		this.drawSecond();
	},

	createCircle: function() {
		this.ctx.beginPath();
		this.ctx.save();
		this.ctx.strokeStyle = "#aaa";
		this.ctx.arc(250, 250, 100, 0, Math.PI*2);
		this.ctx.stroke();
		this.ctx.restore();
	},

	craeteCenterPoint: function() {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.fillStyle = "#ccc";
		this.ctx.arc(250, 250, 5, 0, Math.PI*2);
		this.ctx.fill();
		this.ctx.restore();
	},

	createMinuteDash: function() {
		this.ctx.save();
		this.ctx.translate(250, 250);
		for (var i = 0; i < 60; i++) {
			this.ctx.moveTo(0, -98);
			if (i % 5 == 0) {
				this.ctx.lineTo(0, -92);
			}else {
				this.ctx.lineTo(0, -96);
			}
			this.ctx.stroke();
			this.ctx.rotate(Math.PI / 30);
		}
		this.ctx.restore();
	},

	drawText: function() {
		this.ctx.save();
		this.ctx.translate(250, 250);
		for (var i = 0; i < 12; i++) {
			var x = Math.sin(Math.PI/6 * (i+1)) * 80,
				y = -Math.cos(Math.PI/6 * (i+1)) * 80;

			this.ctx.textAlign = "middle";
			this.ctx.fillText(i+1, x-5, y+6);
		}
		this.ctx.restore();
	},

	drawHour: function() {
		this.ctx.save();
		this.ctx.translate(250, 250);
		var hour = (this.hour + (this.minute / 60)).toFixed(2),
			angle = hour * (Math.PI/6);
		this.ctx.rotate(angle);
		this.ctx.moveTo(0, -50);
		this.ctx.lineTo(0, 10);
		this.ctx.rect(-1, -1, 2, -50);
		this.ctx.stroke();
		this.ctx.restore();
	},

	drawMinute: function() {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.translate(250, 250);
		var angle = this.minute * (Math.PI/30);
		this.ctx.strokeStyle = "green";
		this.ctx.rotate(angle);
		this.ctx.moveTo(0, -60);
		this.ctx.lineTo(0, 10);
		this.ctx.stroke();
		this.ctx.restore();
	},

	drawSecond: function() {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.translate(250, 250);
		var angle = this.second * (Math.PI/30);
		this.ctx.strokeStyle = "red";
		this.ctx.rotate(angle);
		this.ctx.moveTo(0, -70);
		this.ctx.lineTo(0, 10);
		this.ctx.stroke();
		this.ctx.restore();
	}
}





function newCanvas(canvas) {
	this.canvas = canvas;
}


inherit(newCanvas, Canvas);

newCanvas.prototype.drawSecond = function() {
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.translate(250, 250);
	var angle = this.second * (Math.PI/30);
	this.ctx.strokeStyle = "#ff0";
	this.ctx.rotate(angle);
	this.ctx.moveTo(0, -70);
	this.ctx.lineTo(0, 10);
	this.ctx.stroke();
	this.ctx.restore();
}


/*function Clock(canvas) {
	this.elem = canvas;
	this.ctx = canvas.getContext("2d")
}

Object.assign(Clock.prototype, {
	
	init: function() {
		this.drawCanvas();
		this.setInterval();
	},
	
	drawCanvas: function() {
		this.getTime();
		this.drawPannel();
		this.drawCenterPoint();
		this.drawMinutes();
		this.drawHours();
		this.drawHoursNum();
		this.drawHourPointer();
		this.drawMinutesPointer();
		this.drawSecondsPointer();
	},
	
	getTime: function() {
		var date = new Date();
		this.hours = date.getHours() + (date.getMinutes() / 60);
		this.minutes = date.getMinutes();
		this.seconds = date.getSeconds();
	},
	
	setInterval: function() {
		var that = this;
		setInterval(function() {
			that.ctx.clearRect(0, 0, 500, 500);
			that.drawCanvas()
		}, 1000)
	},
	
	drawPannel: function() {
		this.ctx.save()
		this.ctx.translate(250, 250);
		this.ctx.beginPath();
		this.ctx.arc(0, 0, 100, 0, Math.PI * 2);
		this.ctx.strokeStyle = "#999";
		this.ctx.fillStyle = "#efefef";
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.restore();
		
	},
	
	drawCenterPoint: function() {
		this.ctx.beginPath();
		this.ctx.arc(250, 250, 3, 0, Math.PI * 2);
		this.ctx.fillStyle = "red";
		this.ctx.fill();
	},
	
	drawMinutes: function() {
		this.ctx.save()
		this.ctx.translate(250, 250);
		
		for (var i = 0 ; i < 60 ; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, -97);
			this.ctx.lineTo(0, -94);
			this.ctx.lineWidth = 2;
			this.ctx.stroke();
			this.ctx.rotate(Math.PI / 180 * 6)
		}
		
		this.ctx.restore();
	},
	
	drawHours: function() {
		this.ctx.save()
		this.ctx.translate(250, 250);
		
		for (var i = 0 ; i < 12 ; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, -97);
			this.ctx.lineTo(0, -87);
			this.ctx.lineWidth = 2;
			this.ctx.stroke();
			this.ctx.rotate(Math.PI / 180 * 30)
		}
		
		this.ctx.restore();
	},
	
	drawHoursNum: function() {
		this.ctx.save()
		this.ctx.translate(250, 250);
		this.ctx.beginPath();
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "#666"
		
		for (var i = 1; i <= 12; i++) {
			this.ctx.beginPath();
			var x = Math.sin(Math.PI / 180 * 30 * i) * 78;
			var y = -Math.cos(Math.PI / 180 * 30 * i) * 78;
			this.ctx.fillText(i, x, y)
		}
		
		this.ctx.restore();
	},
	
	drawHourPointer: function() {
		this.ctx.save()
		this.ctx.translate(250, 250);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI / 180 * 30 * this.hours);
		this.ctx.moveTo(0, -40);
		this.ctx.lineTo(0, 10);
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
	},
	
	drawMinutesPointer: function() {
		this.ctx.save()
		this.ctx.translate(250, 250);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI / 180 * 6 * this.minutes);
		this.ctx.moveTo(0, -60);
		this.ctx.lineTo(0, 10);
		this.ctx.stroke();
		this.ctx.restore();
	},
	
	drawSecondsPointer: function() {
		this.ctx.save()
		this.ctx.translate(250, 250);
		this.ctx.beginPath();
		this.ctx.strokeStyle = "red"
		this.ctx.rotate(Math.PI / 180 * 6 * this.seconds);
		this.ctx.moveTo(0, -73);
		this.ctx.lineTo(0, 10);
		this.ctx.stroke();
		this.ctx.restore();
	}
})*/

