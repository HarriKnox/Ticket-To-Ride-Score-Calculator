(function()
{
	if (typeof scLoaded === 'undefined')
	{
		var TTRSC = 'ticket-to-ride-score-calculator-';
		var nameFormatter = function(field) { return TTRSC + field.toLowerCase().replace(/\s+/, "-") + '-'; };
		
		var colors = ['Black', 'Blue', 'Green', 'Red', 'Yellow'];
		var colorNames = colors.map(function(color) { return color.toLowerCase(); });
		
		var quantityFields = ['One-Train Tracks', 'Two-Train Tracks', 'Three-Train Tracks', 'Four-Train Tracks', 'Five-Train Tracks', 'Six-Train Tracks', 'Longest Track Length'];
		var quantityFieldNames = quantityFields.map(nameFormatter);
		
		var textFields = ['Destinations Reached Points', 'Destinations Failed Points', 'Extra Points'];
		var textFieldNames = textFields.map(nameFormatter);
		
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
				fieldInput.pattern = '^\\d+(\\s+\\d+)*$';
				fieldInput.value = 0;
				fieldInput.className = field + color;
				
				var fieldCell = document.createElement('td');
				fieldCell.appendChild(fieldInput);
				fieldRow.appendChild(fieldCell);
			});
			tableBody.appendChild(fieldRow);
		});
		
		var table = document.createElement('table');
		table.appendChild(tableHead);
		table.appendChild(tableBody);
		
		var parent = (function(coll) { return coll[coll.length - 1]; })(document.getElementsByTagName('script')).parentNode;
		parent.appendChild(table);
	}
	scLoaded = true;
})();