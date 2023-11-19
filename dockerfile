FROM ruby:3.2.2

# Will be needed for Nodejs 18 until webpack/other packages are updated to use newer openssl code:
# ENV NODE_OPTIONS=--openssl-legacy-provider

# Nodejs
RUN set -uex; \
  NODE_MAJOR=18; \
  apt-get update; \
  apt-get install -y ca-certificates curl gnupg; \
  mkdir -p /etc/apt/keyrings; \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg; \
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" \
  > /etc/apt/sources.list.d/nodesource.list; \
  apt-get -qy update; \
  apt-get -qy install nodejs;

RUN corepack enable
RUN gem update --system

WORKDIR /myapp
COPY .ruby-version Gemfile Gemfile.lock package.json yarn.lock /myapp/
RUN bundle install
RUN yarn install --check-files
EXPOSE 3000
