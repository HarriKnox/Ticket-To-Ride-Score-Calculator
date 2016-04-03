(function($)
{
	$(document).ready(function()
	{
		var $scColorButtonRow = $('<tr class="ticket-to-ride-score-calculator-color-button-row"></tr>');
		var $scColorInputRow = $('<tr class="ticket-to-ride-score-calculator-color-input-row"></tr>');
		var $scColorScoreRow = $('<tr class="ticket-to-ride-score-calculator-color-score-row"></tr>');
		
		var $scDiv = $('.ticket-to-ride-score-calculator-div').append('<table><tbody class="ticket-to-ride-score-calculator-table-body"></tbody></table>');
		$('.ticket-to-ride-score-calculator-table-body').append($scColorButtonRow).append($scColorInputRow).append($scColorScoreRow);
		
		
		var colors = ['Black', 'Blue', 'Green', 'Red', 'Yellow'];
		
		colors.forEach(function(color)
		{
			$scColorButtonRow.append('<td><input type="checkbox" name="color" value="' + color + '" /> ' + color + '</td>');
			
		});
	});
})(jQuery);