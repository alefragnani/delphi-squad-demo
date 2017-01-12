# Jenkins Notes

## Compilação Básica

1. Gerenciamento de código fonte / Git / Repository URL: 

  `file:///`

2. Trigger de Builds / Consultar Periodicamente o SCM: 

  `*/1 * * * *`

3. Build / Executar Comando no Windows: 

  `"D:\program files\FinalBuilder 8\FBCMD.exe" /p"%WORKSPACE%\Squad.fbp8"`

4. Ações Pós Build / Arquivar os Artefados: 

  `Artifacts/Build.zip`

## Compilação com DUnit

1. Ações Pós Build / Publish NUnit report:

  `Artifacts/dunit-report.xml`

## Compilação com Code Coverage

1. Ações Pós Build / Record emma:

  `Artifacts/Coverage/CodeCoverage_Summary.xml`

