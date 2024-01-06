FROM ruby:3.2.1

# Nodejs 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update && \
  apt-get install -y \
  nano \
  nodejs \
  python2

RUN npm install --global yarn
RUN gem update --system

WORKDIR /myapp

COPY .ruby-version Gemfile Gemfile.lock /myapp/
RUN bundle install

COPY package.json yarn.lock /myapp/
RUN yarn install --check-files

EXPOSE 3000
