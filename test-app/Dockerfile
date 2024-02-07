FROM node:lts-iron as builder

LABEL maintainer="info@redpencil.io"

# Do npm installs first to allow for caching
WORKDIR /app
COPY package.json package-lock.json ./
COPY embeddable-say-editor/package.json embeddable-say-editor/package-lock.json embeddable-say-editor/
COPY test-app/package.json test-app/
RUN npm ci
COPY . .

# Pack module
WORKDIR /app/embeddable-say-editor
RUN npm pack
RUN mv lblod-embeddable-say-editor-*.tgz lblod-embeddable-say-editor.tgz

# Build test app
WORKDIR /app/test-app
RUN npm install /app/embeddable-say-editor/lblod-embeddable-say-editor.tgz
RUN npm run build

FROM semtech/static-file-service:0.2.0
COPY --from=builder /app/test-app/dist /data
