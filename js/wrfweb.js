//Init to default values
var picIndex = 1;
var max = 0;
var min = 1;
var imgpath = '<img src="';
var date  = $("#date > .btn.active").val();;
var datestring = getDateString(date);
var forecast = $("#forecast > .btn.active").val();
var meteo = $('select option:selected').val();
var format;
if($("input[name=gif]").is(":checked")) {
	format = '.gif">';
	$( '[class = prev]' ).replaceWith('<p class = "prev"></p>');
	$( '[class = next]' ).replaceWith('<p class = "next"></p>');

} else {
	format = '.png">';
	picIndex = 1;
	$('[class = prev]').replaceWith('<p class = "prev" onclick="plusSlides(-1)">&#10094;</p>');
	$('[class = next]').replaceWith('<p  class = "next" onclick="plusSlides(1)">&#10095;</p>');
}
optionChange();

var forecast36H = [
	{"Id": "freeze", "Name": "Морозы"},
	{"Id": "precipitation", "Name": "Осадки"},
	{"Id": "preciptotal", "Name": "Осадки с накоплением"},
	{"Id": "pressureLevel_500", "Name": "Давление на уровне 500"},
	{"Id": "pressureLevel_700", "Name": "Давление на уровне 700"},
	{"Id": "pressureLevel_850", "Name": "Давление на уровне 850"},
	{"Id": "snowfall", "Name": "Снег"},
	{"Id": "temperature", "Name": "Температура"},
	{"Id": "wind", "Name": "Ветер"},
];
var forecast168H = [
	{"Id": "freeze", "Name": "Морозы"},
	{"Id": "precipitation", "Name": "Осадки"},
	{"Id": "preciptotal", "Name": "Осадки с накоплением"},
	{"Id": "precip_daily_total", "Name": "Осадки с накоплением за сутки"},
	{"Id": "pressureLevel_500", "Name": "Давление на уровне 500"},
	{"Id": "pressureLevel_700", "Name": "Давление на уровне 700"},
	{"Id": "pressureLevel_850", "Name": "Давление на уровне 850"},
	{"Id": "snowfall", "Name": "Снег"},
	{"Id": "temperature", "Name": "Температура"},
	{"Id": "wind", "Name": "Ветер"},
];
var forecastCARFFG = [
	{"Id": "freeze", "Name": "Морозы"},
	{"Id": "precipitation", "Name": "Осадки"},
	{"Id": "preciptotal", "Name": "Осадки с накоплением"},
	{"Id": "snowfall", "Name": "Снег"},
	{"Id": "temperature", "Name": "Температура"},
	{"Id": "wind", "Name": "Ветер"},
];

//Date option button group
$('#date > .btn').click(function() {
	picIndex = 1;
	$("#date > .btn").removeClass("active");
	$(this).addClass("active");
	date = $("#date > .btn.active").val();
	var d = new Date();
	datestring = getDateString(date);
	optionChange();
});

//Forecast resolution and length button group
$('#forecast > .btn').click(function(){
	picIndex = 1;
	$("#forecast > .btn").removeClass("active");
	$(this).addClass("active");
	forecast = $(this).val();
	$('#meteo').find('option').remove().end();
	//When forecast resolution changes, meteo options updates to its values according to resolution
	//Also meteo changes to first index value
	if (forecast == '36H/13km') {
		for (var i = 0; i < forecast36H.length; i++) {
			$('#meteo').append('<option value="' + forecast36H[i].Id + '">' + forecast36H[i].Name + '</option>');
		}
		$("meteo").attr('selectedIndex', 0);
		meteo = $('select option:selected').val();
	} else if (forecast == '168H') {
		for (var i = 0; i < forecast168H.length; i++) {
			$('#meteo').append('<option value="' + forecast168H[i].Id + '">' + forecast168H[i].Name + '</option>');
		}
		$("meteo").attr('selectedIndex', 0);
		meteo = $('select option:selected').val();
	} else if (forecast == 'CARFFG') {
		for (var i = 0; i < forecastCARFFG.length; i++) {
			$('#meteo').append('<option value="' + forecastCARFFG[i].Id + '">' + forecastCARFFG[i].Name + '</option>');
		}
		$("meteo").attr('selectedIndex', 0);
		meteo = $('select option:selected').val();
	}
	optionChange();
});

//Meteorological parameters option box(like precipitation, temperature, wind)
$("#meteo").change(function(){
	picIndex = 1;
	meteo = $('select option:selected').val();
	optionChange();
});

$('#gif').change(function() {
	if($("input[type=checkbox]").is(":checked")) {
		format = '.gif">';
		$( '[class = prev]' ).replaceWith('<p class = "prev"></p>');
		$( '[class = next]' ).replaceWith('<p class = "next"></p>');
	} else {
		picIndex = 1;
		format = '.png">';
		$('[class = prev]').replaceWith('<p class = "prev" onclick="plusSlides(-1)">&#10094;</p>');
		$('[class = next]').replaceWith('<p  class = "next" onclick="plusSlides(1)">&#10095;</p>');
	}
	optionChange();
});

// Next/previous controls
function plusSlides(n) {
	if (forecast == '36H/13km') {
		if (meteo == 'precipitation' || meteo == 'preciptotal' || meteo == 'snowfall') {
			max = 12;
		} else {
			max = 13;
		}
	} else if (forecast == '168H') {
		if (meteo == 'precipitation' || meteo == 'preciptotal' || meteo == 'snowfall') {
			max = 56;
		} else if (meteo == 'precip_daily_total') {
			max = 6;
		} else {
			max = 57;
		}
	} else if (forecast == 'CARFFG') {
		if (meteo == 'precipitation' || meteo == 'preciptotal' || meteo == 'snowfall') {
			max = 8;
		} else {
			max = 9;
		}
	}
	if (picIndex + n < min) {
		picIndex = max;
	} else if (picIndex + n > max) {
		picIndex = 1;
	} else {
		picIndex += n;
	}
	optionChange();
}


function optionChange() {
	if (format == '.gif">') {
		picPath = meteo + format;
	} else if (format == '.png">') {
		picPath = meteo + (picIndex < 10 ? '.00000' : '.0000') + picIndex + format;
	}
	var path = imgpath +  datestring + '/' + forecast + '/' + meteo + '/' + picPath;
	$( "#image" ).html( path );
}

function getDateString(date) {
	var d = new Date();
	if (date == 'today') {
		d.setDate(d.getDate() -14);
		var year = d.toLocaleDateString('en-US', {year : 'numeric'});
		var month = d.toLocaleDateString('en-US', {month : '2-digit'});
		var day = d.toLocaleDateString('en-US', {day : '2-digit'});
		result = day + "." + month + "." + year;
	} else if (date == 'yesterday') {
		d.setDate(d.getDate()-15);
		var year = d.toLocaleDateString('en-US', {year : 'numeric'});
		var month = d.toLocaleDateString('en-US', {month : '2-digit'});
		var day = d.toLocaleDateString('en-US', {day : '2-digit'});
		result = day + "." + month + "." + year;
	} else if (date == 'beforeyesterday') {
		d.setDate(d.getDate()-16);
		var year = d.toLocaleDateString('en-US', {year : 'numeric'});
		var month = d.toLocaleDateString('en-US', {month : '2-digit'});
		var day = d.toLocaleDateString('en-US', {day : '2-digit'});
		result = day + "." + month + "." + year;
	}
	return result;
}
