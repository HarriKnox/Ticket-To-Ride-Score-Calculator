(function()
{
	if (typeof ticketToRideCalculateScores === 'undefined')
	{
		var TTRSC = 'ticket-to-ride-score-calculator-';
		var nameFormatter = function(field) { return TTRSC + field.toLowerCase().replace(/\s+/g, '-') + '-'; };
		
		var colors = ['Black', 'Blue', 'Green', 'Red', 'Yellow'];
		var colorNames = colors.map(function(color) { return color.toLowerCase(); });
		
		var quantityFields = ['One-Train Tracks', 'Two-Train Tracks', 'Three-Train Tracks', 'Four-Train Tracks', 'Five-Train Tracks', 'Six-Train Tracks', 'Longest Track Length'];
		var quantityFieldNames = quantityFields.map(nameFormatter);
		
		var textFields = ['Destinations Reached Points', 'Destinations Failed Points', 'Extra Points Won or Lost'];
		var textFieldNames = textFields.map(nameFormatter);
		
		var allFieldNames = quantityFieldNames.concat(textFieldNames);
		
		var scorePrefix = TTRSC + 'scores-';
		
		
		var colorIsValid = function(color)
		{
			return allFieldNames.every(function(field)
			{
				return document.getElementsByClassName(field + color)[0].validity.valid;
			});
		};
		
		var addSpaceSeparatedNumbers = (function()
		{
			var arraySum = function(sum, current, index, array) { return sum + parseInt(current); };
			return function(numberString) { return numberString.split(/\s+/).reduce(arraySum, 0); };
		})();
		
		var calculateScoreForColor = (function()
		{
			return function(color, longestTracks)
			{
				if (!colorIsValid(color))
					return '<span style="color:#f00;">error</span>';
				var score = document.getElementsByClassName(quantityFieldNames[0] + color)[0].valueAsNumber;
				score += document.getElementsByClassName(quantityFieldNames[1] + color)[0].valueAsNumber * 2;
				score += document.getElementsByClassName(quantityFieldNames[2] + color)[0].valueAsNumber * 4;
				score += document.getElementsByClassName(quantityFieldNames[3] + color)[0].valueAsNumber * 7;
				score += document.getElementsByClassName(quantityFieldNames[4] + color)[0].valueAsNumber * 10;
				score += document.getElementsByClassName(quantityFieldNames[5] + color)[0].valueAsNumber * 15;
				score += longestTracks.indexOf(color) >= 0 ? 10 : 0;
				score += addSpaceSeparatedNumbers(document.getElementsByClassName(textFieldNames[0] + color)[0].value);
				score -= addSpaceSeparatedNumbers(document.getElementsByClassName(textFieldNames[1] + color)[0].value);
				score += addSpaceSeparatedNumbers(document.getElementsByClassName(textFieldNames[2] + color)[0].value);
				return score;
			};
		})();
		
		var longestTrackColors = function()
		{
			var maxLength = 0;
			var longestColors = [];
			var longestRouteClassNamePrefix = quantityFieldNames[6];
			
			colorNames.forEach(function(color)
			{
				var length = document.getElementsByClassName(longestRouteClassNamePrefix + color)[0].valueAsNumber;
				if (!isNaN(length))
				{
					if (length > maxLength)
					{
						maxLength = length;
						longestColors = [color];
					}
					else if (length == maxLength)
					{
						longestColors.push(color);
					}
				}
			});
			return maxLength == 0 ? [] : longestColors;
		};
		
		ticketToRideCalculateScores = function()
		{
			var longestTracks = longestTrackColors();
			
			colorNames.forEach(function(color)
			{
				document.getElementsByClassName(scorePrefix + color)[0].innerHTML = calculateScoreForColor(color, longestTracks);
			});
		};
		
		clearValues = function()
		{
			colorNames.forEach(function(color)
			{
				allFieldNames.forEach(function(field)
				{
					document.getElementsByClassName(field + color)[0].value = '0';
				});
				document.getElementsByClassName(scorePrefix + color)[0].innerHTML = 0;
			});
		};
		
		
		var tableBody = document.createElement('tbody');
		var tableHead = document.createElement('thead');
		var tableFoot = document.createElement('tfoot');
		
		var table = document.createElement('table');
		table.appendChild(tableHead);
		table.appendChild(tableBody);
		table.appendChild(tableFoot);
		
		var parent = (function(coll) { return coll[coll.length - 1]; })(document.getElementsByTagName('script')).parentNode;
		parent.appendChild(table);
		
		
		var headerRow = document.createElement('tr');
		tableHead.appendChild(headerRow);
		headerRow.className = TTRSC + 'table-header';
		
		var firstHeaderCell = document.createElement('th');
		headerRow.appendChild(firstHeaderCell);
		
		firstHeaderCell.innerText = 'Fields';
		colors.forEach(function(color)
		{
			var headerColorCell = document.createElement('th');
			headerRow.appendChild(headerColorCell);
			
			headerColorCell.innerText = color;
		});
		
		
		quantityFieldNames.forEach(function(field, fieldIndex)
		{
			var fieldRow = document.createElement('tr');
			var fieldLabel = document.createElement('td');
			fieldLabel.innerText = quantityFields[fieldIndex];
			fieldLabel.style = 'font-style:italic;text-align:right;';
			fieldRow.appendChild(fieldLabel);
			
			colorNames.forEach(function(color)
			{
				var fieldCell = document.createElement('td');
				fieldRow.appendChild(fieldCell);
				
				var fieldInput = document.createElement('input');
				fieldCell.appendChild(fieldInput);
				
				fieldInput.type = 'number';
				fieldInput.min = 0;
				fieldInput.className = field + color;
				fieldInput.style = 'width:50px;';
				fieldInput.setAttribute('value', 0);
				fieldInput.setAttribute('onkeydown', 'if (event.keyCode === 13) ticketToRideCalculateScores();');
			});
			tableBody.appendChild(fieldRow);
		});
		
		textFieldNames.forEach(function(field, fieldIndex)
		{
			var fieldRow = document.createElement('tr');
			var fieldLabel = document.createElement('td');
			fieldRow.appendChild(fieldLabel);
			
			fieldLabel.innerText = textFields[fieldIndex];
			fieldLabel.style = 'font-style:italic;text-align:right;';
			
			colorNames.forEach(function(color)
			{
				var fieldCell = document.createElement('td');
				fieldRow.appendChild(fieldCell);
				
				var fieldInput = document.createElement('input');
				fieldCell.appendChild(fieldInput);
				
				fieldInput.type = 'text';
				fieldInput.pattern = '^-?\\d+(\\s+-?\\d+)*$';
				fieldInput.className = field + color;
				fieldInput.style = 'width:50px;';
				fieldInput.setAttribute('value', '0');
				fieldInput.setAttribute('onkeydown', 'if (event.keyCode === 13) ticketToRideCalculateScores();');
			});
			tableBody.appendChild(fieldRow);
		});
		
		
		var calculateButton = document.createElement('input');
		calculateButton.type = 'button';
		calculateButton.style = 'width:100%;';
		calculateButton.value = 'Calculate Scores';
		calculateButton.setAttribute('onclick', 'ticketToRideCalculateScores()');
		
		var calculateButtonTD = document.createElement('td');
		calculateButtonTD.appendChild(calculateButton);
		calculateButtonTD.colSpan = 4;
		
		var clearButton = document.createElement('input');
		clearButton.type = 'button';
		clearButton.style = 'width:100%;';
		clearButton.value = 'Clear';
		clearButton.setAttribute('onclick', 'clearValues()');
		
		var clearButtonTD = document.createElement('td');
		clearButtonTD.appendChild(clearButton);
		
		var buttonsRow = document.createElement('tr');
		buttonsRow.appendChild(document.createElement('td'));
		buttonsRow.appendChild(calculateButtonTD);
		buttonsRow.appendChild(clearButtonTD);
		tableFoot.appendChild(buttonsRow);
		
		var scoresRow = document.createElement('tr');
		var scoresLabel = document.createElement('td');
		scoresLabel.innerText = 'Scores';
		scoresLabel.style = 'font-style:italic;text-align:right;';
		scoresRow.appendChild(scoresLabel);
		
		colorNames.forEach(function(color)
		{
			var scoresRowResult = document.createElement('th');
			scoresRowResult.className = TTRSC + 'scores-' + color;
			scoresRowResult.style = 'font-weight:bold;';
			scoresRowResult.innerText = '0';
			scoresRow.appendChild(scoresRowResult);
		});
		tableFoot.appendChild(scoresRow);
	}
	scLoaded = true;
})();
