FROM node:22-alpine AS builder
WORKDIR /app

# Install deps (runs on linux/amd64 — resolves correct native bindings)
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/
RUN npm install

# Build
COPY . .
RUN npm run build --workspace=web

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/web/dist ./dist

EXPOSE 3000
CMD ["sh", "-c", "npx serve -s dist -p ${PORT:-3000}"]
