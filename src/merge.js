

export function merge(template, modal){
    template.replace(/{{([a-zA-Z0-9])*}}/g, function(match,a,b){
        let property = match.substring(2, match.length-2);
        let value = modal[property];
        template = template.replace(match, value.toString());
        console.log(template);
    });
    return template;
}

