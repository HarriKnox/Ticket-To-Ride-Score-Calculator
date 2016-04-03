(function($)
{
	$(document).ready(function()
	{
		var TTRSC = "ticket-to-ride-score-calculator";
		
		var $scTableHeaderRow = $('<tr class="' + TTRSC + '-table-header"><th></th></tr>');
		var $scTableHead = $('<thead></thead>').append($scTableHeaderRow);
		var $scTableBody = $('<tbody class="' + TTRSC + '-table-body"></tbody>');
		var $scTable = $('<table></table>').append($scTableHead).append($scTableBody);
		var $scDiv = $('.' + TTRSC + '-div').append($scTable);
		
		
		var colors = ['Black', 'Blue', 'Green', 'Red', 'Yellow'];
		var fields = ['One-Train Tracks', 'Two-Train Tracks', 'Three-Train Tracks', 'Four-Train Tracks', 'Five-Train Tracks', 'Six-Train Tracks', 'Longest Track Length', 'Destinations Reached Points', 'Destinations Failed Points', 'Extra Points'];
		var fieldNamesFormatted = fields.map(function(field) { return field.toLowerCase().replace(/\s+/, "-"); })
		var fieldRowClasses = fieldNamesFormatted.map(function(fieldName) { return TTRSC + '-' + fieldName + '-row'; });
		
		fields.forEach(function(field)
		{
			//$scTableBody.append('<tr class="
		});
		
		colors.forEach(function(color)
		{
			$scTableHeaderRow.append('<th>' + color + '</th>');
			
		});
	});
})(jQuery);