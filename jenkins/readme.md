# Configuração do Jenkins

A instalação e configuração inicial do Jenkins é bem simples. Um _Wizard_ o ajudará nesse processo.

Depois disso será necessário instalar 3 _plugins_ para que seja possível visualizar os testes unitários e a cobertura de código. Para instalar plugins, depois de inicializado o Jenkins, clique no link **Gerenciar Jenkins** e em seguida, a direita no link **Gerenciar Plugins**. Alterne para a aba **Disponíveis** e instale os seguintes plugins:

* NUnit Plugin
* Emma plugin
* HTML Publisher plugin 

> Será necessário reiniciar o Jenkins para que os plugins estejam disponíveis para configuração nos jobs

# Configuração do Job

## Compilação Básica

1. Gerenciamento de código fonte / Git / Repository URL: 

```
  file:///C:\Delphi\delphi-squad-demo
```

2. Trigger de Builds / Consultar Periodicamente o SCM: 

```
  */1 * * * *
```

3. Build / Executar Comando no Windows: 

```
  "C:\program files\FinalBuilder 8\FBCMD.exe" /p"%WORKSPACE%\Build.fbp8"
```

4. Ações Pós Build / Arquivar os Artefados: 

```
  Artifacts/Build.zip
```

## Compilação com DUnit

1. Ações Pós Build / Publish NUnit report:

```
  Artifacts/dunit-report.xml
```

## Compilação com Code Coverage

1. Ações Pós Build / Record emma:

```
  Artifacts/Coverage/CodeCoverage_Summary.xml
```

2. Ações Pós Build / Record HTML Reports:

```
  HTML directory to archive: Bin/Coverage
  Index page[s]: CodeCoverage_summary.html
  Report title: Relatório de Cobertura de Código
```

