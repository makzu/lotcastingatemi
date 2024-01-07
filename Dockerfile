FROM ruby:3.3.0

# Nodejs 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  nano \
  nodejs

RUN npm install --global yarn
RUN gem update --system

WORKDIR /myapp

COPY .ruby-version Gemfile Gemfile.lock /myapp/
RUN bundle install

COPY package.json yarn.lock /myapp/
RUN yarn install --check-files

EXPOSE 3000
