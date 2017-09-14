# RemObjects Train

RemObjects Train é uma ferramenta de automação de build baseada em JavaScript (http://remobjects.github.io/train/).

Você cria um arquivo JavaScript, usando uma API específica que permite efetuar diversas operações, inclusive _Compilar Delphi_

## Script Básico

1. Criar Diretórios

```javascript
    folder.create("Artifacts");
    folder.create("Bin");
    folder.create("Lib")
```

2. Compilar Delphi

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

3. Executar Testes Unitários

```javascript
    shell.cd("Bin")
    shell.system("Project1Tests.exe", wd);
    shell.cd("..");
```

4. Executar Code Coverage

```javascript
    folder.create("Bin\\Coverage");
    var cccomand = "\"Coverage\\CodeCoverage.exe\" -e \"Bin\\Project1Tests.exe\" -m \"Bin\\Project1Tests.map\" -sd \"src\" -u uCalculadora.pas -html -emma -xml -od \"Bin\\Coverage\"";
    file.write("cc.bat", cccomand);
    shell.system("cc.bat", wd);
```

5. Copiar Artefatos

```javascript
    file.copy("Bin\\*.exe", "Artifacts");
    file.copy("Bin\\dunit-report.xml", "Artifacts");
    file.copy("Bin\\Coverage", "Artifacts\\Coverage");
```

6. Compactar Artefatos

```javascript
    // zip artifacts
    zip.compress("Build.zip", "Artifacts", "*.*", true);
    file.move("Build.zip", "Artifacts")
```

7. Limpar Recursos

```javascript
    file.remove("cc.bat");
    file.remove("dunit-report.xml");
```