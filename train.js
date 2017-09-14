// prepare
folder.create("Artifacts");
folder.create("Bin");
folder.create("Lib");

// compile
delphi.build("src\\Project1.dpr", 
  { "delphi": "xe10",
    "destinationFolder": "Bin",
    "dcuDestinationFolder": "Lib",
    "unitSearchPath": "src",
    "otherParameters": "-GD" });
delphi.build("tests\\Project1Tests.dpr", 
  { "delphi": "xe10",
    "destinationFolder": "Bin",
    "dcuDestinationFolder": "Lib",
    "unitSearchPath": "src",
    "otherParameters": "-GD" });

// run unit tests
shell.cd("Bin")
shell.system("Project1Tests.exe", wd);
shell.cd("..");

// run code coverage
folder.create("Bin\\Coverage");
var cccomand = "\"Coverage\\CodeCoverage.exe\" -e \"Bin\\Project1Tests.exe\" -m \"Bin\\Project1Tests.map\" -sd \"src\" -u uCalculadora.pas -html -emma -xml -od \"Bin\\Coverage\"";
file.write("cc.bat", cccomand);
shell.system("cc.bat", wd);

// copy artifacts
file.copy("Bin\\*.exe", "Artifacts");
file.copy("Bin\\dunit-report.xml", "Artifacts");
file.copy("Bin\\Coverage", "Artifacts\\Coverage");

// zip artifacts
zip.compress("Build.zip", "Artifacts", "*.*", true);
file.move("Build.zip", "Artifacts")

// clean up
file.remove("cc.bat");
file.remove("dunit-report.xml");