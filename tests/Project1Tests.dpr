program Project1Tests;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  SysUtils,
  TestFrameWork,
  TextTestRunner,
  XMLTestRunnerNUnit in 'XMLTestRunnerNUnit.pas',
  uCalculadoraTests in 'uCalculadoraTests.pas',
  uCalculadora in '..\src\uCalculadora.pas';

begin
  // para relatório em console
//  TextTestRunner.RunRegisteredTests;

  // para relatório em XML (Jenkins)
  XMLTestRunnerNUnit.RunRegisteredTests;
end.
