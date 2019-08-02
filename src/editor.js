var quill;

export function init(){
    quill = new Quill('#editor', {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
            [{'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00"]}]
          ]
        },
        theme: 'snow'
    });
}


