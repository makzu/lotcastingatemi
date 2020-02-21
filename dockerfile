FROM ruby:2.5.1

RUN apt-get update && \
    apt-get install -y \
        apt-utils \
    && \
    apt-get install -y \
        curl \
        build-essential \
        libpq-dev

# Get package keys going
#Nodejs 8
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

# Yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list

# Install node and yarn
RUN apt-get update \
    && \
    apt-get install -y \
        nodejs \
        yarn

RUN gem install bundler

WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
COPY package.json /myapp/package.json
COPY yarn.lock /myapp/yarn.lock
RUN bundle install
