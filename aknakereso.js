var c = document.getElementById('tabla')
var ctx = c.getContext("2d");

var tablaMeret = document.getElementById('tabla').width;
var mezoDB = 10;
var mezoMeret = tablaMeret / mezoDB;

var mezoKat = {x:0, y:0};
var talalt = 0;
var vege = false;
var rejtett = true;
var szam = 0;

let time = 100;
let tc;

var bombaDB = Math.floor(Math.random() * 10) + 5;;
var bombaLista = [];
var zaszloLista = [];

var mezo = new Image();
mezo.src = 'mezo.png';
mezo.addEventListener('load', drawTiles, false);

var bomb = new Image();
bomb.src = 'bomba.jpg';

var zaszlo = new Image();
zaszlo.src = 'zaszlo.png';

var nulla = new Image();
nulla.src = 'nulla.png';

var egy = new Image();
egy.src = 'egy.png';

var ketto = new Image();
ketto.src = 'ketto.png';

var harom = new Image();
harom.src = 'harom.png';

var negy = new Image();
negy.src = 'negy.png';

var ot = new Image();
ot.src = 'ot.png';

var hat = new Image();
hat.src = 'hat.png';

var het = new Image();
het.src = 'het.png';

var nyolc = new Image();
nyolc.src = 'nyolc.png';

idobe();

function idobe() {
	tc = setInterval(time_count, 1000);
	 $('#time').text(time);
}

function drawTiles() {
	ctx.clearRect(0, 0, 400, 400);
	
	for (var i = 0; i < mezoDB; ++i) {
		for (var j = 0; j < mezoDB; ++j) {
			ctx.drawImage(mezo, i * mezoMeret, j * mezoMeret, mezoMeret, mezoMeret);
		}
	}
	bomba();
}

function bomba() {
		for(var i=0; i<bombaDB; i++){
			bombaLista[i]=[
				Math.floor(Math.random()*10),
				Math.floor(Math.random()*10)
				]
		}
		console.log(bombaLista);
}

function drawBomba() {
	var a, b = 0;
	for (var i = 0; i < bombaDB; ++i) {
		a = bombaLista[i][0];
		b = bombaLista[i][1];
		ctx.drawImage(bomb, a * mezoMeret, b * mezoMeret, mezoMeret, mezoMeret);
	}
}

document.getElementById('tabla').onclick = function(e) {
	if( vege == false){
		mezoKat.x = Math.floor((e.pageX - this.offsetLeft) / mezoMeret);
		mezoKat.y = Math.floor((e.pageY - this.offsetTop) / mezoMeret);
		console.log(mezoKat.x+" "+mezoKat.y);
	
	for(var i=0; i<bombaDB; i++){
		if(mezoKat.x == bombaLista[i][0] && mezoKat.y == bombaLista[i][1]){
			ctx.drawImage(bomb, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
			alert('Vesztettél');
			clearInterval(tc);
			drawBomba();
			vege = true;
		}else{
			szamiras();
		}
	}
	}
}

document.getElementById('tabla').oncontextmenu = function(e) {
	var talaltMezo = [];
	if( vege == false){
		e.preventDefault();
		mezoKat.x = Math.floor((e.pageX - this.offsetLeft) / mezoMeret);
		mezoKat.y = Math.floor((e.pageY - this.offsetTop) / mezoMeret);
		ctx.drawImage(zaszlo, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
	
	for(var i=0; i<bombaDB; i++){
		if(mezoKat.x == bombaLista[i][0] && mezoKat.y == bombaLista[i][1]){
			talalt=talalt+1;
		}
	}
	if(talalt == bombaDB){
		alert('Nyertél');
		vege = true;
	}
	}
}

function uj() {
	bombaLista = [];
	drawTiles();
	time = 100;
	talalt = 0;
	vege = false;
	clearInterval(tc);
	idobe();
}

function time_count() {
       time--;
        $('#time').text(time);
        if (talalt == bombaDB) {
            clearInterval(tc);
            var person = prompt("Adja meg a nevét:", "anonymus");
            localStorage.setItem(person, Number(time));
            fill_toplist();
        }
		if ( time === 0 ) {
			alert('Vesztettél');
			 clearInterval(tc);
			 vege = true;
			 drawBomba();
		}
}

function fill_toplist() {
    var data = [];
    for (var i = 0; i < localStorage.length; i++) {
        data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
    }
    data.sort(function (a, b) {
         return b[1] - a[1];
    });
    for (let act_data of data.keys()) {
        if (act_data < 10) {
            $('#list').append(data[act_data][0] + ' - ' + data[act_data][1] + '<br><hr>');
        }
    }
}

function szamiras() {
	szam = 0;
	for(var i=0; i<bombaDB; i++){
		if(mezoKat.x == bombaLista[i][0] && mezoKat.y-1 == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x == bombaLista[i][0] && mezoKat.y+1 == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x+1 == bombaLista[i][0] && mezoKat.y == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x-1 == bombaLista[i][0] && mezoKat.y == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x+1 == bombaLista[i][0] && mezoKat.y+1 == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x-1 == bombaLista[i][0] && mezoKat.y-1 == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x+1 == bombaLista[i][0] && mezoKat.y-1 == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x-1 == bombaLista[i][0] && mezoKat.y+1 == bombaLista[i][1]){
			szam=szam+1;
		}
		if(mezoKat.x == bombaLista[i][0] && mezoKat.y == bombaLista[i][1]){
			szam=szam+10;
		}
	}
	
		if(szam==0){
			ctx.drawImage(nulla, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);	
		}
		if(szam==1){
			ctx.drawImage(egy, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
		if(szam==2){
			ctx.drawImage(ketto, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
		if(szam==3){
			ctx.drawImage(harom, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
		if(szam==4){
			ctx.drawImage(negy, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
		if(szam==5){
			ctx.drawImage(ot, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
		if(szam==6){
			ctx.drawImage(hat, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
		if(szam==7){
			ctx.drawImage(het, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
		if(szam==8){
			ctx.drawImage(nyolc, mezoKat.x * mezoMeret, mezoKat.y * mezoMeret, mezoMeret, mezoMeret);
		}
	
	console.log(szam);
}


