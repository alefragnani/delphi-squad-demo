# RemObjects Train

RemObjects Train is a JavaScript based automated build engine (http://remobjects.github.io/train/).

You create a JavaScript file, using an API that allows you to execute a set of operations, including _Delphi Compilation_

## Basic Script

1. Create Diretories

```javascript
    folder.create("Artifacts");
    folder.create("Bin");
    folder.create("Lib")
```

2. Compile Delphi

```javascript
    delphi.build("src\\Project1.dpr", 
        {   "delphi": "xe10",
            "destinationFolder": "Bin",
            "dcuDestinationFolder": "Lib",
            "unitSearchPath": "src",
            "otherParameters": "-GD" });
    delphi.build("tests\\Project1Tests.dpr", 
        {   "delphi": "xe10",
            "destinationFolder": "Bin",
            "dcuDestinationFolder": "Lib",
            "unitSearchPath": "src",
            "otherParameters": "-GD" });
```

3. Execute Unit Tests

```javascript
    shell.cd("Bin")
    shell.system("Project1Tests.exe", wd);
    shell.cd("..");
```

4. Execute Code Coverage

```javascript
    folder.create("Bin\\Coverage");
    var cccomand = "\"Coverage\\CodeCoverage.exe\" -e \"Bin\\Project1Tests.exe\" -m \"Bin\\Project1Tests.map\" -sd \"src\" -u uCalculadora.pas -html -emma -xml -od \"Bin\\Coverage\"";
    file.write("cc.bat", cccomand);
    shell.system("cc.bat", wd);
```

5. Copy Artifacts

```javascript
    file.copy("Bin\\*.exe", "Artifacts");
    file.copy("Bin\\dunit-report.xml", "Artifacts");
    file.copy("Bin\\Coverage", "Artifacts\\Coverage");
```

6. Zip Artifacts

```javascript
    // zip artifacts
    zip.compress("Build.zip", "Artifacts", "*.*", true);
    file.move("Build.zip", "Artifacts")
```

7. Clean up Resources

```javascript
    file.remove("cc.bat");
    file.remove("dunit-report.xml");
```