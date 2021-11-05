$('#main_test').hide();
	function checkRequiredFields() {
		let error = 0;
		$("[required]").each(function(){
			if($(this).val() === ''){
				$(this).next('span.error').text($(this).attr('data-required'));
				error = 1;
			}else{
				$(this).next('span.error').text('');
			}
		});
		if(error == 0){
			loadTest(0);
			$('#basic_info').hide(300);
			$('#main_test').show(300);
		}
	}

	function loadTest(question_no) {
		$.ajax({
			url: 'api/load_question',
			type: 'POST',
			dataType: 'json',
			data: {
				question_no: question_no,
			},
			beforeSend: function(){
				$('#other_opt').val('');
			},
			success: function(resp){
				$('#questionRound').val(resp.questionRound);
				let div = "<p>Q"+resp.data.questionId+": "+resp.data.content+"</p><div class='row'>";
				$.each(resp.data.option, function(i, options){
					$.each(options, function(ii, option){
						let ext = option.split('.').pop();
						if (option.match(/.(jpg|jpeg|png|gif)$/i)){
							option_value = "<img src='"+option+"' class='img-thumbnail' style='width: 150px; height:150px'>";
					    }else{
					    	option_value = option;
					    }
						div += "<div class='col-md-6'><input type='radio' id='option_"+ii+"' name='option' value='"+ii+"' option-value='"+option+"' onclick='enableNext(\""+option+"\")'> <label for='option_"+ii+"'>"+option_value+"</label></div>";
					});
				});
				let check_next = (resp.next == resp.total_questions)?'Submit':'Next';
				let next_on_click = "onclick='saveData("+resp.data.questionId+", "+resp.next+", "+resp.total_questions+")'";
				div += "</div><div class='pull-right'><button type='button' class='btn btn-info next' "+next_on_click+" disabled>"+check_next+"</button></div>";
				$('.template').html(div);
			}
		})
	}

	function enableNext(option) {
		if(~option.indexOf("other.[Input answer]")){
			$('.modal').modal('show').fadeIn('slow');
		}else{
			$('.next').attr('disabled', false);
		}
	}

	function saveOption() {
		let option = 'other.['+$('#other_opt').val()+']';
		$('input[name="option"]:checked').attr('option-value', option);
		$('input[name="option"]:checked').next('label').text(option);
		$('.modal').modal('hide').fadeOut('slow');
		$('.next').attr('disabled', false);
	}

	function saveData(questionId, next, total_questions) {
		$.ajax({
			url: 'api/question/save',
			type: 'POST',
			dataType: 'json',
			data:{
				questionId: questionId,
				userChoice: {
					option: $('input[name="option"]:checked').val(),
					optionValue: $('input[name="option"]:checked').attr('option-value')
				}
			},
			beforeSend: function(){
				$('.next').attr('disabled', true);
			},
			success: function(data){
				if(data.code == 200){
					if(next == total_questions){
						saveTest();
					}else{
						loadTest(next);
					}
				}
			}
		})
	}

	function saveTest() {
		$.ajax({
			url: 'api/save/test',
			type: 'POST',
			dataType: 'json',
			data:{
				questionRound: $('#questionRound').val(),
				basicInfo:{
					name: $('#name').val(),
					email: $('#email').val(),
					phone: $('#phone').val(),
				}
			},
			success: function(data){
				if(data.code == 200){
					$('#basic_info').html('');
					$('.template').html('<div class="alert alert-success">'+data.msg+'</div>');
				}
			}
		})
	}