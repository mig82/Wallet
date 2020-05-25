define(function () {
	function splitByFours(iban){
		//Remove any preexisting whitespaces
		iban = iban.replace(/\s/g, "");
		var spaced = "";

		//Add whitespaces for every four characters.
		for(var k = 0; k < iban.length; k++){
			spaced += iban[k];
			if((k+1)%4===0) spaced+=" ";
		}
		return spaced;
	}

    return splitByFours;
});