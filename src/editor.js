export var quill;

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

    quill.on('text-change', function(delta, oldDelta, source) {
      let insert;

      if(delta.ops.length === 1){
        if(delta.ops[0].insert)
          window.editorLastIndex = window.editorLastIndex + delta.ops[0].insert.length;
        else
          window.editorLastIndex = window.editorLastIndex - delta.ops[0].delete.length;
      }
      else{
        if(delta.ops[1].insert)
          window.editorLastIndex = window.editorLastIndex + delta.ops[1].insert.length;
        else
          window.editorLastIndex = window.editorLastIndex - delta.ops[1].delete.length;
      }
    });

    quill.on('selection-change', function(range, oldRange, source) {
      if(range)
       window.editorLastIndex = range.index + range.length || 0;
    });

    window.myquill = quill;
}


