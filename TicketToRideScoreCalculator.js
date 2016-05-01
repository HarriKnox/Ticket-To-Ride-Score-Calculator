(function()
{
	if (typeof scLoaded === 'undefined')
	{
		var TTRSC = "ticket-to-ride-score-calculator";
		
		var scTableHeaderRow = document.createElement('tr');
		scTableHeaderRow.className = TTRSC + '-table-header';
		
		var scTableHead = document.createElement('thead');
		scTableHead.appendChild(scTableHeaderRow);
		
		var scTableBody = document.createElement('tbody');
		scTableBody.className = TTRSC + '-table-body';
		
		var scTable = document.createElement('table');
		scTable.appendChild(scTableHead);
		scTable.appendChild(scTableBody);
		
		
		var parent = (function(coll) { return coll[coll.length - 1]; })(document.getElementsByTagName('script')).parentNode;
		parent.appendChild(scTable);
		
		var colors = ['Black', 'Blue', 'Green', 'Red', 'Yellow'];
		var fields = ['One-Train Tracks', 'Two-Train Tracks', 'Three-Train Tracks', 'Four-Train Tracks', 'Five-Train Tracks', 'Six-Train Tracks', 'Longest Track Length', 'Destinations Reached Points', 'Destinations Failed Points', 'Extra Points'];
		var fieldNamesFormatted = fields.map(function(field) { return field.toLowerCase().replace(/\s+/, "-"); })
		var fieldRowClasses = fieldNamesFormatted.map(function(fieldName) { return TTRSC + '-' + fieldName + '-row'; });
		
		var scTableHeaderFirstCell = document.createElement('th');
		scTableHeaderFirstCell.innerText = 'Fields';
		scTableHeaderRow.appendChild(scTableHeaderFirstCell);
		colors.forEach(function(color)
		{
			var scTableHeaderRowColor = document.createElement('th');
			scTableHeaderRowColor.innerText = color;
			scTableHeaderRow.appendChild(scTableHeaderRowColor);
		});
	}
	scLoaded = true;
})();