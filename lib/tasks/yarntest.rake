task :yarntest do
  sh "yarn test"
end

task :yarntestcov do
  sh "yarn testcov"
end
