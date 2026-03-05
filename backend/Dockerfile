FROM node:20-bookworm-slim AS builder

WORKDIR /app

#Install OpenSSL so Prisma can detect correct version (OpenSSL 3 on bookworm)
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build


FROM node:20-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

#Install OpenSSL in runtime image too (Prisma engine loads libssl at runtime)
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD ["npm", "run", "start"]