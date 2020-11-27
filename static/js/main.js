function decorateWord() {
    let word = arguments[0];
    let is_loanword = Boolean(arguments[1]);
    let result = ''
    if (is_loanword) {
        result += `<span style="background-color: #1e7e34">${word}</span>`
    } else {
        result += `<span>${word}</span>`
    }
    return result;

}

$(function () {
    $('#submitText').click(function () {
        let q = $('#textEvaluationArea').val();
        console.log(q)
        $.get('/api/search?q=' + encodeURIComponent(q), function (data) {
            let $div = $('.results');
            let text = []
            $(data.results).each(function () {
                // $div.append(decorateWord(this['word'], this['is_loanword']));
                text.push(decorateWord(this['word'], this['is_loanword']))
            });
            text = text.join(' ');
            $div.empty();
            $div.append(text);
        });
        return false;
    })

});
