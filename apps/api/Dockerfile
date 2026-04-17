FROM node:22-slim AS builder
WORKDIR /app

COPY package.json ./
COPY apps/api/package.json apps/api/
RUN npm install --workspace=api

COPY apps/api apps/api
RUN npm run build --workspace=api

FROM node:22-slim AS runner
WORKDIR /app

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/index.js"]
