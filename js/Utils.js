var notations = ['', ' Mi', ' Bi', ' Tr', ' Qa', ' Qi', ' Sx', ' Sp', ' Oc', ' No', ' Dc']

function numberFormatters (value) {
	var base = 0,
	notationValue = '';
	if (value >= 1000000 && isFinite(value)) {
		value /= 1000;
		while(Math.round(value) >= 1000) {
			value /= 1000;
			base++;
		}
		if (base > notations.length) {return 'Infinity';} else {notationValue = notations[base];}
	}
	return ( Math.round(value * 1000) / 1000 ) + notationValue;
};


function Beautify(value, floats) {
	var negative=(value<0);
	var decimal='';
	if (value<1000000 && floats>0) 
		decimal='.'+(value.toFixed(floats).toString()).split('.')[1];

	value=Math.floor(Math.abs(value));

	var output=numberFormatters(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	
	return negative?'-'+output:output+decimal;
}