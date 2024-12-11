# Define base image
FROM mcr.microsoft.com/dotnet/sdk:7.0.403-alpine3.18 AS builder

# Copy project files
WORKDIR /source
COPY ./*.csproj .

# Restore
RUN dotnet restore

# Copy all source code
COPY . .

# Publish
WORKDIR /source
RUN dotnet publish "backend.csproj" -c Release -o /publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0.13-alpine3.18
WORKDIR /app
COPY --from=builder /publish .

EXPOSE 80

RUN addgroup -S runner && adduser -S runner -G runner
USER runner
ENTRYPOINT ["dotnet", "backend.dll"]
