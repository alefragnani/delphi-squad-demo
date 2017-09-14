# Gulp

Gulp _"é um conjunto de ferramentas para automatizar tarefas dolorosas ou demoradas em seu fluxo de trabalho de desenvolvimento, para que você possa parar de mexer e construir algo"_ (http://www.gulpjs.com)

Você cria um arquivo JavaScript, usando uma API específica que permite efetuar diversas operações.

## Script Básico

1. Criar Diretórios

```javascript
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
```

2. Compilar Delphi

```javascript
    // compile the main project
    gulp.task("compile", ["create-folders"], function() {
        gutil.log('compile:started');
        pp.chdir(path.join(__dirname, "src"));
        var bb = cp.spawnSync(path.join(__dirname, 'src\\dcc.bat'));
        return gutil.log('compile:ended');
    });

    // compile the test project
    gulp.task("compile-tests", ["compile"], function() {
        gutil.log('compile-tests:ended');
        pp.chdir(path.join(__dirname, "tests"));
        var bb = cp.spawnSync(path.join(__dirname, 'tests\\dcc.bat'));
        return gutil.log('compile-tests:ended');
    });

```

3. Executar Testes Unitários

```javascript
    gulp.task("unit-test", ["compile-tests"], function() {
        gutil.log('unit-test:started');
        pp.chdir(path.join(__dirname, "Bin"));
        var bb = cp.spawnSync(path.join(__dirname, 'Bin\\Project1Tests.exe'));
        return gutil.log('unit-test:ended');
    });

```

4. Executar Code Coverage

```javascript
    // create .bat to run 
    function create_cc_bat(projectName, unitName) {
        var ccexe = path.join(__dirname, "Coverage\\CodeCoverage.exe")
        var cccomand = path.join(__dirname, "Coverage\\CodeCoverage.exe") + " -e " + path.join(__dirname, "Bin",  projectName + ".exe") + " -m " + path.join(__dirname, "Bin", projectName + ".map") + " -sd " + path.join(__dirname, "src") + " -u " + unitName + " -html -emma -xml -od " + path.join(__dirname, "Bin", "Coverage");
        fs.writeFileSync(path.join(__dirname, 'Coverage\\ccX.bat'), cccomand);
    }

    // run code coverage
    gulp.task("code-coverage", function() {
        gutil.log('code-coverage:started');
        create_cc_bat('Project1Tests', 'uCalculadora.pas');
        var bb = cp.spawnSync(path.join(__dirname, 'Coverage\\ccX.bat'));
        return gutil.log('code-coverage:ended');
    });
```

5. Compactar Artefatos

```javascript
    // zip the artifacts
    gulp.task("zip", function() {
        gutil.log('zip:started');
        return gulp.src('./Bin/**')
            .pipe(zip('Build.zip'))
            .pipe(gulp.dest('./Artifacts'));
        return gutil.log('zip:ended');
    });
```

6. Monitorar Fontes

```javascript
    // watch
    gulp.task("watch", function() {
        gulp.watch("src/*.*", ["build"]);
        gulp.watch("tests/*.*", ["compile-tests"]);
        gulp.watch("Artifacts/*.*", ["zip"]);
    });

```