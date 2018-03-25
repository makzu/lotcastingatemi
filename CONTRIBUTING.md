# Contribute to Lot-Casting Atemi

If you would like to help out by contributing code, art assets, beer money, or
whatever, contact [/u/hushnowquietnow](https://reddit.com/u/hushnowquietnow) on
Reddit.

### What is this?

This is a web app with a backend written in Ruby on Rails and a frontend written
with React.  It's held together with wishes, dreams, and the webpacker gem in
Rails 5.1.

### How can I run it?

Make sure you have Ruby *2.4.2*, along with a recent version of Postgres. You'll
also need [Yarn](https://yarnpkg.com/en/) and Node.js installed

Once you have the repo cloned, run `bin/setup` and it *should* get everything
set up for you.  Then run `bin/server` to launch webpack-dev-server and the
Rails backend, and point your browser to `localhost:5000`. Your mileage may
vary.

You can run the code's test suite with `rails lca:test`.
