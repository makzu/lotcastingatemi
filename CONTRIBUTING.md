# Contribute to Lot-Casting Atemi

If you would like to help out by contributing code, art assets, beer money, or
whatever, contact [/u/hushnowquietnow](https://reddit.com/u/hushnowquietnow) on
Reddit.

### What is this?

This is a web app written in React.js, with a backend written in Ruby on Rails. It uses the Webpacker gem to package everything up.

### How can I run it?

Make sure you have Ruby _2.7.1_, along with a recent version of Postgres. You'll
also need [Yarn](https://yarnpkg.com/en/) and Node.js installed

Once you have the repo cloned, run `bin/setup` and it _should_ get everything
set up for you. Then run `bin/server` to launch webpack-dev-server and the
Rails backend, and point your browser to `localhost:5000`. Your mileage may
vary.

You can run the code's test suite with `rails lca:test`.
