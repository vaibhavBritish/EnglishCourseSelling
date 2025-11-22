# --------------------------
# 1) Base image
# --------------------------
FROM node:20-alpine AS base
WORKDIR /app

# --------------------------
# 2) Copy ONLY package files first (for Docker caching)
# --------------------------
COPY package*.json ./

# --------------------------
# 3) Copy Prisma schema BEFORE install
# --------------------------
COPY prisma ./prisma

# --------------------------
# 4) Install dependencies
# --------------------------
RUN npm install

# --------------------------
# 5) Copy full project now
# --------------------------
COPY . .

# --------------------------
# 6) Generate Prisma Client
# --------------------------
RUN npx prisma generate

# --------------------------
# 7) Build Next.js App
# --------------------------
RUN npm run build

# --------------------------
# 8) Expose and Start
# --------------------------
EXPOSE 3000
CMD ["npm", "start"]
