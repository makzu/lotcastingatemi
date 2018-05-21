# Contribute to Lot-Casting Atemi

If you would like to help out by contributing code, art assets, beer money, or
whatever, contact [/u/hushnowquietnow](https://reddit.com/u/hushnowquietnow) on
Reddit.

### What is this?

This is a web app written in React.js, with a backend written in Ruby on Rails. It uses the Webpacker gem to package everything up.

### How can I run it?

1. Install docker.
1. `docker-compose up -d`
1. wait for containers to warm up
1. if first time setup, run `docker-compose exec ruby ./bin/setup`
1. Browse to http://localhost:5000/

You can run the code's test suite with

```shell
docker-compose exec ruby bundle exec rails lca:test
```

Your mileage may vary.

If it fails to start up, try...

* Stopping the containers and removing the db stuff with `docker-compose down -v`
* Running `docker-compose exec ruby ./bin/setup` again. It's finnicky.
