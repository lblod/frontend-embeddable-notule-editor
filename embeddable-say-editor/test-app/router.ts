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
  <a href="/">index</a>
  <a href="/multiple-editors/">Multiple Editors</a>
  <a href="/multiple-growing-editors/">Multiple growing editors</a>
  <a href="/plugins/">Plugins</a>
  <a href="/cipal-plugins/">cipal-plugins</a>
  <a href="/headless-test/">Headless test</a>
  <a href="/locked-placeholders/">Locked placeholders</a>
  <a href="/custom-headless-editing/">custom-headless-editing</a>
</div>`;

export const router = navbar.content;
