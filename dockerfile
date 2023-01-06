FROM ruby:2.7.7-alpine

RUN apk add \
  build-base \
  git \
  nodejs \
  postgresql-dev \
  tzdata \
  yarn

WORKDIR /myapp
COPY Gemfile Gemfile.lock package.json yarn.lock /myapp/
RUN bundle install
RUN yarn install --check-files
EXPOSE 3000
