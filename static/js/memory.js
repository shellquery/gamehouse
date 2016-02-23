var actor_nums = [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8];
var gap = 1;
var step = 0;
var numbers = [];

function get_actor_num() {
	var actor_num = 8;
	if(step < actor_nums.length) {
		actor_num = actor_nums[step];
	}
	return actor_num;
}

function shuffle_numbers() {
	var actor_num = get_actor_num();
	numbers = [];
	for(var i=0;i<actor_num;i++) {
		numbers.push(Math.floor(Math.random() * 100));
	}
	var code = '';
	for(var i=0;i<numbers.length;i++) {
		code += '<div id="number-'+ i +'" class="number">' + numbers[i] + '</div>';
	}
	$('#stage').html(code);
}

function perform_numbers() {
	for(var i=0;i<numbers.length;i++) {
		setTimeout((i+1) * gap * 1000, function() {
			$('#number-' + i).fadeIn();
			if(i > 0) {
				$('#number-' + (i-1)).fadeOut();
			}
		});
	}
}

function display_question() {

}

$(document).ready(function() {
	shuffle_numbers();
	perform_numbers();
});
