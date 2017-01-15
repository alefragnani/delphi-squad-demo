unit uCalculadoraTests;

interface

uses
  uCalculadora, TestFramework;

type
  TCalculadoraTests = class(TTestCase)
  private
    FObject: TCalculadora;
  protected
    procedure SetUp; override;
    procedure TearDown; override;
  published
    procedure TestSomar;
    procedure TestSubtrair;
    procedure TestMultiplicar;
    procedure TestDividir;
   // procedure TestDividirPorZero;
  end;

implementation

procedure TCalculadoraTests.SetUp;
begin
  inherited;

  FObject := TCalculadora.Create;
end;

procedure TCalculadoraTests.TearDown;
begin
  FObject.Free;

  inherited;
end;


procedure TCalculadoraTests.TestSomar;
begin
  CheckEquals(2, FObject.Somar(1, 1));
end;

procedure TCalculadoraTests.TestSubtrair;
begin
  CheckEquals(10, FObject.Subtrair(15, 5));
end;

procedure TCalculadoraTests.TestMultiplicar;
begin
  CheckEquals(12, FObject.Multiplicar(3, 4));
end;

procedure TCalculadoraTests.TestDividir;
begin
  CheckEquals(0.5, FObject.Dividir(1, 2));
end;

//procedure TCalculadoraTests.TestDividirPorZero;
//begin
//  CheckEquals(0, FObject.Dividir(12, 0));
//end;


initialization
  TestFramework.RegisterTest(TCalculadoraTests.Suite);

end.
