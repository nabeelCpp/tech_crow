$('#actionButton').click(function(e){
		let role = $(this).attr('role');
		if(role == 0){
			$('img').attr('src', 'assets/img/random.png');
			$(this).attr('role', 1);
			$(this).removeClass('btn-danger');
			$(this).addClass('btn-success');
			$(this).text('Play');
		}
		if(role == 1){
			$('img').attr('src', 'assets/img/dice-roll.gif');
			$(this).attr('role', 0);
			$(this).addClass('btn-danger');
			$(this).removeClass('btn-success');
			$(this).text('Pause');
		}
		
	})