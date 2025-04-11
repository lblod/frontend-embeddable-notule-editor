import type { EditorElement } from '../app/editor-element.ts';
import './router.css';

declare global {
  interface Window {
    editor?: EditorElement;
    editors?: Record<string, EditorElement>;
  }
}
const navbar = document.createElement('template');

const html = String.raw;
navbar.innerHTML = html`<div class="navbar">
  <a href="/test-app/">index</a>
  <a href="/test-app/multiple-editors/">Multiple Editors</a>
  <a href="/test-app/multiple-growing-editors/">Multiple growing editors</a>
  <a href="/test-app/plugins/">Plugins</a>
  <a href="/test-app/plugins-with-rdfa-editor/">Plugins with RDFa editor</a>
  <a href="/test-app/cipal-plugins/">cipal-plugins</a>
</div>`;

export const router = navbar.content;
