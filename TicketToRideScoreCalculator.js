(function()
{
	if (typeof ticketToRideCalculateScores === 'undefined')
	{
		var TTRSC = 'ticket-to-ride-score-calculator-';
		var nameFormatter = function(field) { return TTRSC + field.toLowerCase().replace(/\s+/g, '-') + '-'; };
		
		var colors = ['Black', 'Blue', 'Green', 'Red', 'Yellow'];
		 colorNames = colors.map(function(color) { return color.toLowerCase(); });
		
		var quantityFields = ['One-Train Tracks', 'Two-Train Tracks', 'Three-Train Tracks', 'Four-Train Tracks', 'Five-Train Tracks', 'Six-Train Tracks', 'Longest Track Length'];
		var quantityFieldNames = quantityFields.map(nameFormatter);
		
		var textFields = ['Destinations Reached Points', 'Destinations Failed Points', 'Extra Points Won or Lost'];
		var textFieldNames = textFields.map(nameFormatter);
		
		var allFieldNames = quantityFieldNames.concat(textFieldNames);
		
		var headerRow = document.createElement('tr');
		headerRow.className = TTRSC + 'table-header';
		
		var tableHead = document.createElement('thead');
		tableHead.appendChild(headerRow);
		
		var firstHeaderCell = document.createElement('th');
		firstHeaderCell.innerText = 'Fields';
		headerRow.appendChild(firstHeaderCell);
		colors.forEach(function(color)
		{
			var headerColorCell = document.createElement('th');
			headerColorCell.innerText = color;
			headerRow.appendChild(headerColorCell);
		});
		
		var tableBody = document.createElement('tbody');
		
		quantityFieldNames.forEach(function(field, fieldIndex)
		{
			var fieldRow = document.createElement('tr');
			var fieldLabel = document.createElement('td');
			fieldLabel.innerText = quantityFields[fieldIndex];
			fieldLabel.style = 'font-style:italic;text-align:right;';
			fieldRow.appendChild(fieldLabel);
			
			colorNames.forEach(function(color)
			{
				var fieldInput = document.createElement('input');
				fieldInput.type = 'number';
				fieldInput.value = 0;
				fieldInput.min = 0;
				fieldInput.className = field + color;
				fieldInput.style = 'width:50px;';
				
				var fieldCell = document.createElement('td');
				fieldCell.appendChild(fieldInput);
				fieldRow.appendChild(fieldCell);
			});
			tableBody.appendChild(fieldRow);
		});
		
		textFieldNames.forEach(function(field, fieldIndex)
		{
			var fieldRow = document.createElement('tr');
			var fieldLabel = document.createElement('td');
			fieldLabel.innerText = textFields[fieldIndex];
			fieldLabel.style = 'font-style:italic;text-align:right;';
			fieldRow.appendChild(fieldLabel);
			
			colorNames.forEach(function(color)
			{
				var fieldInput = document.createElement('input');
				fieldInput.type = 'text';
				fieldInput.pattern = '^-?\\d+(\\s+-?\\d+)*$';
				fieldInput.value = 0;
				fieldInput.className = field + color;
				fieldInput.style = 'width:50px;';
				
				var fieldCell = document.createElement('td');
				fieldCell.appendChild(fieldInput);
				fieldRow.appendChild(fieldCell);
			});
			tableBody.appendChild(fieldRow);
		});
		
		var colorIsValid = function(color)
		{
			for (var i = 0, len = allFieldNames.length; i < len; i++)
			{
				var field = allFieldNames[i];
				if (!(document.getElementsByClassName(field + color)[0].validity.valid))
					return false;
			}
			return true;
		}
		
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
			return longestColors;
		}
		
		ticketToRideCalculateScores = function()
		{
			var longestTracks = longestTrackColors();
			var scorePrefix = TTRSC + 'scores-';
			
			colorNames.forEach(function(color)
			{
				var scoreCell = document.getElementsByClassName(scorePrefix + color)[0];
				if (colorIsValid(color))
				{
					var score = 0;
				}
				else
				{
					scoreCell.innerHTML = '<span style="color:#f00;">error</span>';
				}
			});
		}
		
		var tableFoot = document.createElement('tfoot');
		
		var calculateButton = document.createElement('input');
		calculateButton.type = 'button';
		calculateButton.style = 'width:100%;';
		calculateButton.value = 'Calculate Scores';
		
		var calculateButtonTD = document.createElement('td');
		calculateButtonTD.appendChild(calculateButton);
		calculateButtonTD.colSpan = 5;
		
		var calculateButtonRow = document.createElement('tr');
		calculateButtonRow.appendChild(document.createElement('td'));
		calculateButtonRow.appendChild(calculateButtonTD);
		tableFoot.appendChild(calculateButtonRow);
		
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
		
		var table = document.createElement('table');
		table.appendChild(tableHead);
		table.appendChild(tableBody);
		table.appendChild(tableFoot);
		
		var parent = (function(coll) { return coll[coll.length - 1]; })(document.getElementsByTagName('script')).parentNode;
		parent.appendChild(table);
	}
	scLoaded = true;
})();