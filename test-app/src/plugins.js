import { renderEditor } from '@lblod/embeddable-say-editor';
import { router } from './router';

const container = document.createElement('div');
document.body.appendChild(router);
document.body.appendChild(container);
const editor = await renderEditor({
  element: container,
  title: 'my editor',
  width: '100%',
  height: '500px',
  plugins: [
    'citation',
    'besluit',
    'article-structure',
    'variable',
    'table-of-contents',
    'roadsign-regulation',
    'formatting-toggle',
    'template-comments',
    'confidentiality',
    'html-edit',
    'html-preview',
  ],
  options: {
    docContent:
      'table_of_contents? ((block|chapter)+|(block|title)+|(block|article)+)',
    citation: {
      type: 'ranges',
      activeInRanges: (state) => [[0, state.doc.content.size]],
    },
  },
});

editor.setHtmlContent(
  `<div typeof="besluit:Besluit ext:BesluitNieuweStijl https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34" property="prov:generated" resource="http://data.lblod.info/id/besluiten/5204eaad-a317-45bd-ae48-c8800ba43c43" __rdfaid="bc2ffaed-4895-4002-ac9a-071ac48ceda5"><p data-indentation-level="0">Openbare titel besluit:</p><h4 property="eli:title" datatype="xsd:string" __rdfaid="24a17479-0a3c-4d74-b777-4518ee906aed"><p data-indentation-level="0"><span class="mark-highlight-manual" placeholdertext="Geef titel besluit op" contenteditable="false">Geef titel besluit op</span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p></h4><span typeof="skos:Concept" property="eli:language" resource="http://publications.europa.eu/resource/authority/language/NLD" __rdfaid="cf537c9e-c931-4039-bdbf-4904f5aa04ba" style="style=&quot;display:none;&quot;" contenteditable="false"></span><p data-indentation-level="0"><br><br class="ProseMirror-trailingBreak"></p><p data-indentation-level="0">Korte openbare beschrijving:</p><div property="eli:description" datatype="xsd:string" __rdfaid="288be735-4a79-408b-8dbc-0c3881dac7fc"><p data-indentation-level="0"><span class="mark-highlight-manual" placeholdertext="Geef korte beschrijving op" contenteditable="false">Geef korte beschrijving op</span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p></div><p data-indentation-level="0"><br><br class="ProseMirror-trailingBreak"></p><div property="besluit:motivering" lang="nl" __rdfaid="1267b75b-5010-4f24-859d-139390ee1251"><p data-indentation-level="0"><span class="mark-highlight-manual" placeholdertext="geef bestuursorgaan op" contenteditable="false">geef bestuursorgaan op</span>,</p><p data-indentation-level="0"><br><br class="ProseMirror-trailingBreak"></p><h5 data-indentation-level="0" __rdfaid="37cc4793-f4a9-4065-87b5-0bb78fbb21f1">Bevoegdheid</h5><ul __rdfaid="aee66b9a-e001-4caf-b824-042eb42bf0c1"><li __rdfaid="a1b7cf71-42d9-4c98-b36a-d00a2cfcc200"><p data-indentation-level="0"><span class="mark-highlight-manual" placeholdertext="Rechtsgrond die bepaalt dat dit orgaan bevoegd is." contenteditable="false">Rechtsgrond die bepaalt dat dit orgaan bevoegd is.</span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p></li></ul><p data-indentation-level="0"><br><br class="ProseMirror-trailingBreak"></p><h5 data-indentation-level="0" __rdfaid="b0cb40ff-986f-49c8-a6e1-26edf46717d2">Juridische context</h5><ul __rdfaid="0684cd7c-44cc-4809-9d13-90e31e22cfdf"><li __rdfaid="27c3ab12-cce4-4d4c-aaae-5498fb76c505"><p data-indentation-level="0"><span class="mark-highlight-manual" placeholdertext="Voeg juridische context in" contenteditable="false">Voeg juridische context in</span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p></li></ul><p data-indentation-level="0"><br><br class="ProseMirror-trailingBreak"></p><h5 data-indentation-level="0" __rdfaid="803097b6-a894-4f50-81a8-9dd423044106">Feitelijke context en argumentatie</h5><ul __rdfaid="4986a393-cc33-4ad7-b1ce-a550ac7bbc86"><li __rdfaid="4c0b4d44-4eb5-49fa-a53b-63fa90846b50"><p data-indentation-level="0"><span class="mark-highlight-manual" placeholdertext="Voeg context en argumentatie in" contenteditable="false">Voeg context en argumentatie in</span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p></li></ul></div><p data-indentation-level="0"><br><br><br class="ProseMirror-trailingBreak"></p><h5 data-indentation-level="0" __rdfaid="6cc4b50b-ffe8-4f5d-9bd0-642b8bf84372">Beslissing</h5><div property="prov:value" datatype="xsd:string" __rdfaid="ae0ea15b-9560-4715-be29-2f14f370aadd"><div typeof="besluit:Artikel" property="eli:has_part" resource="http://data.lblod.info/artikels/44a42dfb-b6be-41a8-8c8f-214b14110106" __rdfaid="e34f3a0b-3c43-49be-9507-f5233bfd5be1"><div __rdfaid="c9514bfc-91db-4f81-8ca5-ac3e1481c79a" contenteditable="false">Artikel <span property="eli:number" datatype="xsd:string">1</span></div><span typeof="skos:Concept" property="eli:language" resource="http://publications.europa.eu/resource/authority/language/NLD" __rdfaid="4b809eca-6ed2-4aee-ad10-62f3213988e1" style="style=&quot;display:none;&quot;" contenteditable="false"></span><div property="prov:value" datatype="xsd:string" __rdfaid="abe164e0-800a-48ce-b483-2b737428d520"><p data-indentation-level="0"><span class="mark-highlight-manual" placeholdertext="Voer inhoud in" contenteditable="false">Voer inhoud in</span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p></div></div></div></div>`
);

// Facilitate development by making editor globally available
window.editor = editor;
