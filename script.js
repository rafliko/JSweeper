var c = document.getElementById("canv");
var ctx = c.getContext("2d");
var tex = document.getElementById("tex");
var txt = document.getElementById("txt");
const scale = 32;
var w;
var h;
var fx;
var fy;
var mineCount;
var hiddenCount;
var firstClick;
var grid = new Array(w);

window.onload = easy();

function easy()
{
	w = 9
	h = 9
	mineCount = 10
	txt.innerHTML = "EASY (9x9, 10 mines)";
	start();
}

function medium()
{
	w = 16
	h = 16
	mineCount = 40
	txt.innerHTML = "MEDIUM (16x16, 40 mines)";
	start();
}

function hard()
{
	w = 30
	h = 16
	mineCount = 99
	txt.innerHTML = "HARD (30x16, 99 mines)";
	start();
}

function start()
{
	hiddenCount = w * h;
	firstClick = true;
	c.width = w*scale;
	c.height = h*scale;
	for(let x=0;x<w;x++)
	{
		grid[x] = new Array(h);
		for(let y=0;y<h;y++)
		{
			grid[x][y] = {val:0, hidden:1} ;
		}
	}
	setInterval(update,1000/60);
}

c.onclick = function(e)
{
	var mx = Math.floor((e.pageX - this.offsetLeft) / scale); 
	var my = Math.floor((e.pageY - this.offsetTop) / scale);  
	if(firstClick) { fx = mx; fy = my; firstClick = false; setMines(); setValues();}
	if(grid[mx][my].hidden == 1) { grid[mx][my].hidden = 0; hiddenCount--; }
	console.log("L,"+mx+","+my);
}

c.oncontextmenu = function(e) 
{ 
	e.preventDefault(); 
	var mx = Math.floor((e.pageX - this.offsetLeft) / scale); 
	var my = Math.floor((e.pageY - this.offsetTop) / scale);
	if(grid[mx][my].hidden == 1) grid[mx][my].hidden = 2;
	else if(grid[mx][my].hidden == 2) grid[mx][my].hidden = 1;
	console.log("R,"+mx+","+my);
}

function update()
{
	ctx.clearRect(0,0,c.width,c.height);
	for(let x=0;x<w;x++)
	{
		for(let y=0;y<h;y++)
		{
			switch(grid[x][y].hidden)
			{
				case 0:
					if(grid[x][y].val == 9) {uncoverAll(); txt.innerHTML = "GAME OVER!";}
					if(grid[x][y].val == 0) uncoverAdjacent(x,y);
					ctx.drawImage(tex,scale*grid[x][y].val,0,scale,scale,x*scale,y*scale,scale,scale);
					break;
				case 1:
					ctx.drawImage(tex,scale*10,0,scale,scale,x*scale,y*scale,scale,scale);
					break;
				case 2:
					ctx.drawImage(tex,scale*11,0,scale,scale,x*scale,y*scale,scale,scale);
					break;
			}
		}
	}
    if(hiddenCount == mineCount) txt.innerHTML = "YOU WIN!";
}

function clearMines()
{
	
}

function setMines()
{
	var count = 0;
	while (count < mineCount)
	{
		var minex = Math.floor(Math.random() * w);
		var miney = Math.floor(Math.random() * h);
		if(grid[minex][miney].val != 9 && minex != fx && miney != fy) {count++; grid[minex][miney].val = 9}
	}
}

function setValues()
{
	for(let x=0;x<w;x++)
	{
		for(let y=0;y<h;y++)
		{
			if(grid[x][y].val != 9)
			{
				if(x < w-1 && grid[x+1][y].val==9) grid[x][y].val++;
				if(x > 0 && grid[x-1][y].val==9) grid[x][y].val++;
				if(y < h-1 && grid[x][y+1].val==9) grid[x][y].val++;
				if(y > 0 && grid[x][y-1].val==9) grid[x][y].val++;
				if(x < w-1 && y < h-1 && grid[x+1][y+1].val==9) grid[x][y].val++;
				if(x < w-1 && y > 0 && grid[x+1][y-1].val==9) grid[x][y].val++;
				if(x > 0 && y < h-1 && grid[x-1][y+1].val==9) grid[x][y].val++;
				if(x > 0 && y > 0 && grid[x-1][y-1].val==9) grid[x][y].val++;
			}
		}
	}
}

function uncoverAll()
{
	for(let x=0;x<w;x++)
	{
		for(let y=0;y<h;y++)
		{
			grid[x][y].hidden = 0;
		}
	}
}

function uncoverAdjacent(x,y)
{
	if(x < w-1 && grid[x+1][y].hidden != 0) { grid[x+1][y].hidden = 0; hiddenCount--; }
    if(x > 0 && grid[x-1][y].hidden != 0) { grid[x-1][y].hidden = 0; hiddenCount--; }
    if(y < h-1 && grid[x][y+1].hidden != 0) { grid[x][y+1].hidden = 0; hiddenCount--; }
    if(y > 0 && grid[x][y-1].hidden != 0) { grid[x][y-1].hidden = 0; hiddenCount--; }
    if(x < w-1 && y < h-1 && grid[x+1][y+1].hidden != 0) { grid[x+1][y+1].hidden = 0; hiddenCount--; }
    if(x < w-1 && y > 0 && grid[x+1][y-1].hidden != 0) { grid[x+1][y-1].hidden = 0; hiddenCount--; }
    if(x > 0 && y < h-1 && grid[x-1][y+1].hidden != 0) { grid[x-1][y+1].hidden = 0; hiddenCount--; }
    if(x > 0 && y > 0 && grid[x-1][y-1].hidden != 0) { grid[x-1][y-1].hidden = 0; hiddenCount--; }
}