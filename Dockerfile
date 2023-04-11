# Specify a base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the root package.json and pnpm-lock.yaml files to the container
COPY package*.json pnpm-lock.yaml ./

# Install dependencies for the entire monorepo using PNPM
RUN npm install -g pnpm && pnpm install

# Copy the server package.json and pnpm-lock.yaml files to the container
COPY ./apps/server/package*.json  ./apps/server/

# Install server-specific dependencies using PNPM
RUN cd ./apps/server && pnpm install --production

# Copy the TypeScript source code to the container
COPY ./apps/server/ .

# Compile the TypeScript code
RUN cd ./apps/server && npm run build

# Copy the pruned server directory to the container
COPY ./apps/server/ .

# Set the environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Expose the port used by the application
EXPOSE ${PORT}

# Start the application
CMD ["node", "dist/index.js"]
