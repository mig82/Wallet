define(function () {
	function splitBySpaces(s){
		//Remove any preexisting whitespaces
		s = s.replace(/\s/g, "");
		var spaced = "";

		//Add whitespaces for every four characters.
		for(var k = 0; k < s.length; k++){
			spaced += s[k];
			if((k+1)%4===0) spaced+=" ";
		}
		return spaced;
	}

    return splitBySpaces;
});
