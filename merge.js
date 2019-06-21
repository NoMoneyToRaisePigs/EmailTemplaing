var modal = {
    userName: 'Din Jian',
    runId: 12345,
    runStatus: 'closed'
};

var template = `
    Hello {{userName}},

    You run {{runId}} is {{runStatus}}.

    Thanks.
`;

const pattern = '\{\{((?!\}\})(.|\n))*\}\}';

// function merge(template, modal){
//     template.replace(pattern, function(x,y){
//         console.log(x,y);
//         return '1';
//     });
// }

// merge(template,modal);

function merge(template, modal){
    template.replace('/{{[a-zA-Z]*}}/g', function(x,y){
        console.log(x,y);
        return '1';
    });
}

merge(template,modal);