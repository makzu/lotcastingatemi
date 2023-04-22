FROM ruby:3.2.0

# Will be needed for Nodejs 18 until webpack/other packages are updated to use newer openssl code:
# ENV NODE_OPTIONS=--openssl-legacy-provider

# Get package keys going
# Nodejs 16
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -

# Install node and yarn
RUN apt-get update && \
  apt-get install -y \
  nano \
  nodejs \
  python2
#   yarn

RUN corepack enable
RUN gem update --system

WORKDIR /myapp
COPY .ruby-version Gemfile Gemfile.lock package.json yarn.lock /myapp/
RUN bundle install
RUN yarn install --check-files
EXPOSE 3000
