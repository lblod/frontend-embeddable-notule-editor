import fs from "node:fs/promises";

await fs.mkdir("types/node_modules/@lblod/ember-rdfa-editor/core", {
  recursive: true,
});

const sayControllerDeclarations = await fs.readFile(
  "node_modules/@lblod/ember-rdfa-editor/declarations/core/say-controller.d.ts",
  {
    encoding: "utf-8",
  }
);

await fs.writeFile(
  "types/node_modules/@lblod/ember-rdfa-editor/core/say-controller.d.ts",
  sayControllerDeclarations.replace(/#root/g, "@lblod/ember-rdfa-editor")
);

await fs.cp("type-imports/", "types/node_modules/", {
  recursive: true,
});
