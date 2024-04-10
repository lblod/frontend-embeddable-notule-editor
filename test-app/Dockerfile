# NOTE Needs to be built with the root of the monorepo as the context
FROM node:lts-iron as builder

LABEL maintainer="info@redpencil.io"

# Do pnpm installs first to allow for caching
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY embeddable-say-editor/package.json embeddable-say-editor/
COPY test-app/package.json test-app/
RUN pnpm i --frozen-lockfile
COPY . .

# Pack module
WORKDIR /app/embeddable-say-editor
RUN pnpm pack
RUN mv lblod-embeddable-say-editor-*.tgz lblod-embeddable-say-editor.tgz

# Build test app
WORKDIR /app/test-app
RUN pnpm install /app/embeddable-say-editor/lblod-embeddable-say-editor.tgz
RUN pnpm run build

FROM semtech/static-file-service:0.2.0
COPY --from=builder /app/test-app/dist /data
