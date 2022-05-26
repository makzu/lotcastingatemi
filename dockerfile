FROM ruby:2.7.6

# RUN apt-get update && \
#     apt-get install -y \
#         apt-utils \
#     && \
#     apt-get install -y \
#         curl \
#         build-essential \
#         libpq-dev

# Get package keys going
#Nodejs 8
# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Yarn
# RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list

# Install node and yarn
RUN apt-get update \
    && \
    apt-get install -y \
        nano \
        nodejs \
        python2
        # yarn

#RUN gem install bundler

# RUN npm i -g corepack
RUN corepack enable
WORKDIR /myapp
COPY Gemfile Gemfile.lock package.json yarn.lock /myapp/
#COPY yarn.lock /myapp/yarn.lock
RUN bundle install
RUN yarn install --check-files
EXPOSE 3000
