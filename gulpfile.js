// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    fs = require('fs'),
    cp = require('child_process'),
    pp = require('process');

// create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running!')
// });
gulp.task('default', ["create-folders"]);

// create folders
gulp.task("create-folders", function() {
  if (!fs.existsSync(path.join(__dirname, 'Artifacts'))) {
    fs.mkdirSync(path.join(__dirname, 'Artifacts'));
  }
  if (!fs.existsSync(path.join(__dirname, 'Bin'))) {
    fs.mkdirSync(path.join(__dirname, 'Bin'));
  }
  if (!fs.existsSync(path.join(__dirname, 'Lib'))) {
    fs.mkdirSync(path.join(__dirname, 'Lib'));
  }
  return gutil.log('CREATE-FOLDERS');
});

// compile
gulp.task("compile", ["create-folders"], function() {
  gutil.log('compile-entrando-chdir');
  gutil.log(__dirname);
  pp.chdir(path.join(__dirname, "src"));
  gutil.log('compile-entrando-spawn');
  var bb = cp.spawnSync(path.join(__dirname, 'src\\dcc.bat'));
  //gutil.log(bb);
  gutil.log(bb.output.toString());
  // bb.stdout.on('data', function (data) {
  //   gutil.log(data.toString());
  // });
  // bb.stderr.on('data', function (data) {
  //   gutil.log('ERRO: ' + data.toString());
  // });
  // bb.on('exit', function (code) {
  //   console.log('child process exited with code ' + code.toString());
  //   pp.chdir("..\\");
  return gutil.log('COMPILE exit');
  });
// // compile
// gulp.task("compile", ["create-folders"], function() {
//   gutil.log('compile-entrando-chdir');
//   gutil.log(__dirname);
//   pp.chdir(path.join(__dirname, "src"));
//   gutil.log('compile-entrando-spawn');
//   var bb = cp.spawn(path.join(__dirname, 'src\\dcc.bat'));
//   bb.stdout.on('data', function (data) {
//     gutil.log(data.toString());
//   });
//   bb.stderr.on('data', function (data) {
//     gutil.log('ERRO: ' + data.toString());
//   });
//   bb.on('exit', function (code) {
//     console.log('child process exited with code ' + code.toString());
//     pp.chdir("..\\");
//     return gutil.log('COMPILE exit');
//   });




  ////////////////////////////////

  // var bb = cp.spawn('D:\\Program Files\\Embarcadero\\Studio\\17.0\\bin\\DCC32.EXE', ['Project1.dpr', '-B   -NUD:\\_Fragnani\\_Apps\\GitHub\\delphi-squad-demo\\Lib  -UD:\\_Fragnani\\_Apps\\GitHub\\delphi-squad-demo\\src']);

  //var bb = cp.spawn('D:\\Program Files\\Embarcadero\\Studio\\17.0\\bin\\DCC32.EXE', ['Project1.dpr -B -E..\Bin -NU..\Lib -GD']);

  // cp.execFile('D:\\Program Files\\Embarcadero\\Studio\\17.0\\bin\\DCC32.EXE', ['Project1.dpr', '-B -E..\Bin -NU..\Lib -GD'], (err, stdout, stderr) => {

  //       if (err) {
  //         console.log('Erro ERR: ' + err);
  //         return 'Error';
  //       }

  //       if (stderr.toString() != '') {
  //         console.log('Erro STDERR: ' + stderr);
  //         return 'Error: ' + stderr.toString();
  //       }

  //       console.log(stdout.toString());
  //     });
  

  // "D:\Program Files\Embarcadero\Studio\17.0\Bin\dcc32.exe" "D:\_Fragnani\_Apps\GitHub\delphi-squad-demo\src\Project1.dpr" -b d:\_Fragnani\_Apps\GitHub\delphi-squad-demo\src\Project1.dpr -E..\Bin -NU..\Lib -GD
  
  // var bb = cp.spawn('D:\\Program Files\\Embarcadero\\Studio\\17.0\\bin\\DCC32.EXE', ['Project1.dpr', '-B   -NUD:\\_Fragnani\\_Apps\\GitHub\\delphi-squad-demo\\Lib -LED:\\_Fragnani\\_Apps\\GitHub\\delphi-squad-demo\\Bin  -LND:\\_Fragnani\\_Apps\\GitHub\\delphi-squad-demo\\Bin -ED:\\_Fragnani\\_Apps\\GitHub\\delphi-squad-demo\\Bin -UD:\\_Fragnani\\_Apps\\GitHub\\delphi-squad-demo\\src -GD']);
  
  // output spawn
  // bb.stdout.on('data', function (data) {
  //   gutil.log(data.toString());
  // });
  // bb.stderr.on('data', function (data) {
  //   gutil.log('ERRO: ' + data.toString());
  // });
  // bb.on('exit', function (code) {
  //   console.log('child process exited with code ' + code.toString());
  //   pp.chdir("..\\");
  //   return gutil.log('COMPILE');
  // });

//});

gulp.task("compile-tests", ["compile"], function() {
  gutil.log('compile-tests-entrando-chdir');
  gutil.log(__dirname);
  pp.chdir(path.join(__dirname, "tests"));
  gutil.log('compile-tests-entrando-spawn');
  var bb = cp.spawnSync(path.join(__dirname, 'tests\\dcc.bat'));
  gutil.log(bb.output.toString());
  // bb.stdout.on('data', function (data) {
  //   gutil.log(data.toString());
  // });
  // bb.stderr.on('data', function (data) {
  //   gutil.log('ERRO: ' + data.toString());
  // });
  // bb.on('exit', function (code) {
  //   console.log('child process exited with code ' + code.toString());
  //   pp.chdir("..\\");
    return gutil.log('COMPILE-TESTS exit');
//  });
});
// // compile
// gulp.task("compile", ["create-folders"], function() {
//   var bb = cp.spawn('D:\\Program Files\\Embarcadero\\Studio\\17.0\\bin\\DCC32.EXE', ['src\\Project1.dpr']);
//   bb.stdout.on('data', function (data) {
//     gutil.log(data.toString());
//   });
//   bb.stderr.on('data', function (data) {
//     gutil.log('ERRO: ' + data.toString());
//   });
//   bb.on('exit', function (code) {
//     console.log('child process exited with code ' + code.toString());
//     return gutil.log('COMPILE');
//   });

// });

// run unit tests
gulp.task("unit-test", ["compile-tests"], function() {
  gutil.log('unit-test');
  gutil.log(__dirname);
  pp.chdir(path.join(__dirname, "Bin"));
  gutil.log('unit-test-spawn');
  var bb = cp.spawnSync(path.join(__dirname, 'Bin\\Project1Tests.exe'));
  gutil.log(bb.output.toString());
  // bb.stdout.on('data', function (data) {
  //   gutil.log(data.toString());
  // });
  // bb.stderr.on('data', function (data) {
  //   gutil.log('ERRO: ' + data.toString());
  // });
  // bb.on('exit', function (code) {
  //   console.log('child process exited with code ' + code.toString());
  //   pp.chdir("..\\");
    return gutil.log('UNIT-TEST exit');
//  });
});

// run code coverage
gulp.task("code-coverage", function() {
  return gutil.log('code-coverage');
});


// zip
gulp.task("zip", function() {
  return gutil.log('ZIP');
});

// watch
gulp.task("watch", function() {
  gulp.watch("src/*.*", ["compile"]);
  gulp.watch("tests/*.*", ["compile-tests"]);
  gulp.watch("Artifacts/*.*", ["zip"]);
});
