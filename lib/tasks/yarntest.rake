task :yarntest do
  sh "yarn test"
end

task :yarntestu do
  sh "yarn test -- -u"
end

task :yarntestcov do
  sh "yarn testcov"
end
