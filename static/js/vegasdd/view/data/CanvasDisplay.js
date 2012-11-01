Ext.define('vegasdd.view.data.CanvasDisplay', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.canvasdisplay',
    bodyStyle: {
        background: '#fff',
    },

    initComponent: function() {
	var me = this;
	this.width  = 800;
	this.height = 600;
	this.vertMargin  = 50;
	this.hortMargin = 50;
	var cwidth      = this.width + this.hortMargin;
	var cheight     = this.height + this.vertMargin;
        this.items = [{
	        xtype: "panel",
                html: "<canvas id='mycanvas' width='" + cwidth + "' height='" + cheight + "' style='border:1px solid #000000;'></canvas>"
	}];

	this.addListener('render', this.drawAxis);
	this.callParent(arguments);
    },

    drawDisplay: function(spectralData){
        var c = document.getElementById("mycanvas");
        var ctx = c.getContext("2d");

        var me = this;
        var numChannels = spectralData[0].length;
	var pointWidth  = (this.width - this.vertMargin) / numChannels;
	var pointHeight = 0.01 * this.height;
	var xStart      = this.hortMargin;
	var yStart      = this.vertMargin;
	var value;
	for(var i = 0; i < spectralData.length; i++){
	    for(var j = 0; j < numChannels; j++){
		value = spectralData[i][j];
		ctx.fillStyle = this.getFillColor(value);
		ctx.fillRect(xStart + (pointWidth * j),
			     yStart + (pointHeight * i),
			     pointWidth,
			     pointHeight)
	    }
	}

    },

    drawAxis: function() {
        var c = document.getElementById("mycanvas");
        var ctx = c.getContext("2d");
	var l = this.hortMargin; //Short hand
        ctx.moveTo(l, this.vertMargin);
	ctx.lineTo(l, this.height);
	ctx.moveTo(l, this.vertMargin);
	ctx.lineTo(this.width, this.vertMargin);
	ctx.stroke();

	ctx.font = "20px Arial";
	ctx.fillText("channels", this.width / 2.0, this.vertMargin - 10)
    },
    
    getFillColor: function(value){
	var colors = ['#FF0000',
		      '#00FF00',
		      '#0000FF',
                      '#800080',
                      '#FFFF00',
                      '#FFA500'];
	return colors[value - 5];

    },

});