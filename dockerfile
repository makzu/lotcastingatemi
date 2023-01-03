FROM ruby:2.7.7

# RUN apt-get update && \
#     apt-get install -y \
#         apt-utils \
#     && \
#     apt-get install -y \
#         curl \
#         build-essential \
#         libpq-dev

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
# RUN corepack prepare yarn@stable --activate

WORKDIR /myapp
COPY Gemfile Gemfile.lock package.json yarn.lock /myapp/
RUN bundle install
RUN yarn install --check-files
EXPOSE 3000
