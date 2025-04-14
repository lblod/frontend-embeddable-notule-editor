import { afterRender, Component, ElementRef } from '@angular/core';
import { type EditorElement, renderEditor } from '@lblod/embeddable-say-editor';
import '@lblod/embeddable-say-editor/style.css';

@Component({
  selector: 'say-editor',
  standalone: true,
  imports: [],
  template: ` <div id="editorContainer"></div> `,
})
export class SayEditor {
  editor?: EditorElement;

  constructor(elementRef: ElementRef) {
    afterRender({
      write: async () => {
        const container =
          elementRef.nativeElement.querySelector('#editorContainer');
        this.editor = await renderEditor({
          element: container,
          title: 'angular embedded say editor',
          width: '1000px',
          height: '500px',
        });
        this.editor?.setHtmlContent('Hello Angular');
      },
    });
  }
}
