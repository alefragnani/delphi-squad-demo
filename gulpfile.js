// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    zip = require('gulp-zip'),
    runSequence = require('run-sequence'),
    path = require('path'),
    fs = require('fs'),
    cp = require('child_process'),
    pp = require('process');

// This will run in this order: 
// * create-folders
// * compile the main project
// * compile the tests
// * run the tests
// * coverage
// * zip 
// * Finally call the callback function 
gulp.task('build', function(callback) {
  runSequence('create-folders',
              'compile',
              'compile-tests',
              'unit-test',
              'code-coverage',
              'zip',
              callback);
});

// the default task is.....
gulp.task('default', ["create-folders"]);

// create additional folders, used by the building process
gulp.task("create-folders", function() {
  gutil.log('create-folders:started');
  if (!fs.existsSync(path.join(__dirname, 'Artifacts'))) {
    fs.mkdirSync(path.join(__dirname, 'Artifacts'));
  }
  if (!fs.existsSync(path.join(__dirname, 'Bin'))) {
    fs.mkdirSync(path.join(__dirname, 'Bin'));
  }
  if (!fs.existsSync(path.join(__dirname, 'Bin\\Coverage'))) {
    fs.mkdirSync(path.join(__dirname, 'Bin\\Coverage'));
  }
  if (!fs.existsSync(path.join(__dirname, 'Lib'))) {
    fs.mkdirSync(path.join(__dirname, 'Lib'));
  }
  return gutil.log('create-folders:ended');
});

// compile the main project
gulp.task("compile", ["create-folders"], function() {
  gutil.log('compile-entrando-chdir');
  gutil.log(__dirname);
  pp.chdir(path.join(__dirname, "src"));
  gutil.log('compile-entrando-spawn');
  var bb = cp.spawnSync(path.join(__dirname, 'src\\dcc.bat'));
  gutil.log(bb.output.toString());
  return gutil.log('COMPILE exit');
});

// compile the test project
gulp.task("compile-tests", ["compile"], function() {
  gutil.log('compile-tests-entrando-chdir');
  gutil.log(__dirname);
  pp.chdir(path.join(__dirname, "tests"));
  gutil.log('compile-tests-entrando-spawn');
  var bb = cp.spawnSync(path.join(__dirname, 'tests\\dcc.bat'));
  gutil.log(bb.output.toString());
  return gutil.log('COMPILE-TESTS exit');
});

// run unit tests
gulp.task("unit-test", ["compile-tests"], function() {
  gutil.log('unit-test');
  gutil.log(__dirname);
  pp.chdir(path.join(__dirname, "Bin"));
  gutil.log('unit-test-spawn');
  var bb = cp.spawnSync(path.join(__dirname, 'Bin\\Project1Tests.exe'));
  gutil.log(bb.output.toString());
  return gutil.log('UNIT-TEST exit');
});

function create_cc_bat(projectName, unitName) {
  var ccexe = path.join(__dirname, "Coverage\\CodeCoverage.exe")
  var cccomand = path.join(__dirname, "Coverage\\CodeCoverage.exe") + " -e " + path.join(__dirname, "Bin",  projectName + ".exe") + " -m " + path.join(__dirname, "Bin", projectName + ".map") + " -sd " + path.join(__dirname, "src") + " -u " + unitName + " -html -emma -xml -od " + path.join(__dirname, "Bin", "Coverage");
  fs.writeFileSync(path.join(__dirname, 'Coverage\\ccX.bat'), cccomand);
}

// run code coverage
gulp.task("code-coverage", function() {
  gutil.log('code-coverage');
  gutil.log(__dirname);
  // pp.chdir(path.join(__dirname, "Bin"));
  // gutil.log('code-coverage-spawn');
  create_cc_bat('Project1Tests', 'uCalculadora.pas');
  var bb = cp.spawnSync(path.join(__dirname, 'Coverage\\ccX.bat'));
  gutil.log(bb.output.toString());
  return gutil.log('code-coverage exit');
});


// zip the artifacts
gulp.task("zip", function() {
  return gulp.src('./Bin/**')
    .pipe(zip('Build.zip'))
    .pipe(gulp.dest('./Artifacts'));

  return gutil.log('ZIP');
});

// watch
gulp.task("watch", function() {
  gulp.watch("src/*.*", ["build"]);
  gulp.watch("tests/*.*", ["compile-tests"]);
  gulp.watch("Artifacts/*.*", ["zip"]);
});
