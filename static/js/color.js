var step = 0;
var gaps = [64, 64, 64, 64, 48, 48, 48, 48, 32, 32, 32, 32, 16, 16, 16, 16, 16, 16, 16, 16, 8, 8, 8, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
var rowChosen;
var colChosen;
function initBlocks() {
    for(var i=0;i<8;i++) {
        var code = '<div>';
        for(var j=0;j<8;j++) {
            var blockCode = '<a class="block" id="block_' + i + '_' + j + '" data-row="' + i + '" data-col="' + j + '"></a>';
            code += blockCode;
        }
        code += "</div>";
        $("#blocks").append(code);
    }
    $(".block").click(chooseBlock);
    $(".block").css('height', $(".block").width());
}

function shuffleColor() {
    var indice = Math.floor(Math.random() * 3);
    var value = Math.floor(Math.random() * 128 + 64);
    var color = "#";
    for(var i=0;i<3;i++) {
        if(i == indice) {
            color += "00";
        } else {
            color += value.toString(16);
        }
    }
    $('.block').css('background-color', color);
    var gap = 1;
    if(step < gaps.length) {
        gap = gaps[step];
    }
    var chosenValue = value + gap;
    var chosenColor = "#";
    for(var i=0;i<3;i++) {
        if(i == indice) {
            chosenColor += "00";
        } else {
            chosenColor += chosenValue.toString(16);
        }
    }
    rowChosen = Math.floor(Math.random() * 8);
    colChosen = Math.floor(Math.random() * 8);
    $("#block_" + rowChosen + "_" + colChosen).css('background-color', chosenColor);
    step += 1;
    $('#stepper').html(step);
}

function chooseBlock() {
    var row = $(this).data("row");
    var col = $(this).data("col");
    if(row == rowChosen && col == colChosen) {
        shuffleColor();
    } else {
		$.post('/color/finish.json', data={'step': step - 1}, function(data) {
			showResult(data);
		});
    }
}

function showResult(ranks) {
	$('#blocks').hide();
	if(step > 1) {
		$('#grade').html('你完成了 ' + (step-1) + ' 步');
	} else {
		$('#grade').html('你好像是个盲人');
	}
	var code = '';
	var total = 0;
	for(var i in ranks) {
		total += parseInt(ranks[i]);
	}
	var percents = {};
	for(var i in ranks) {
		percents[i] = Math.round(100 * ranks[i] / total)
	}
	for(var i in ranks) {
		var style = 'progress-bar-success';
		if(i == step - 1) {
			style = 'progress-bar-danger';
		}
		code += '<div class="progress"><div class="progress-bar ' + style + ' progress-bar-striped" style="min-width: 2em;width:' + percents[i] +'%">'+ percents[i] +'%</div>'+ i +' 步</div>';
	}
	$('#ranks').html(code);
	$('#result').show();
	$('#replay').click(function() {
		step = 0;
		$('#result').hide();
		$('#blocks').show();
		shuffleColor();
	});
}

$(document).ready(function() {
    initBlocks();
    shuffleColor();
});
