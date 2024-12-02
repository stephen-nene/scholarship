# syntax=docker/dockerfile:1
# Dev-friendly Dockerfile for Rails
ARG RUBY_VERSION=3.3.6
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Rails app lives here
WORKDIR /rails

# Install base dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    git \
    curl \
    nodejs \
    npm \
    libjemalloc2 \
    libvips \
    sqlite3 \
    postgresql-client \
    libpq-dev \ # <-- Add this line\
    && rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set environment variables for development
ENV BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="test" \
    RAILS_ENV="development"

# Install Gems
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

# Copy application code
COPY . .

# Expose ports for development server
EXPOSE 3000

# Entrypoint prepares the database and boots the Rails server in dev mode
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
