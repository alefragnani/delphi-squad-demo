# Jenkins Configuration

The initial installation and settings are very simple. A _Wizar_ will help you in the process.

After that you have to install 3 _plugins_ in order to publish Unit Tests and Code Coverage reports. To install these _plugins_, after Jenkins is started, click on  **Manage Jenkins** link, then at the right in **Manage Plugins** link. After that, goes to **Available** tab and select the following plugins:

* NUnit Plugin
* Emma plugin
* HTML Publisher plugin 

> You have to restart Jenkins

# Job Settings

## Basic Build

1. Source Code Management / Git / Repository URL: 

```
  file:///C:\Delphi\delphi-squad-demo
```

2. Build Triggers / Pool SCM: 

```
  */1 * * * *
```

3. Build / Execute Windows batch Command: 

```
  "C:\program files\FinalBuilder 8\FBCMD.exe" /p"%WORKSPACE%\Build.fbp8"
```

4. Post-Build Actions / Archive the Artifacts: 

```
  Artifacts/Build.zip
```

## DUnit Build

1. Post-Build Actions / Publish NUnit report:

```
  Artifacts/dunit-report.xml
```

## Code Coverage Build

1. Post-Build Actions / Record emma:

```
  Artifacts/Coverage/CodeCoverage_Summary.xml
```

2. Post-Build Actions / Record HTML Reports:

```
  HTML directory to archive: Bin/Coverage
  Index page[s]: CodeCoverage_summary.html
  Report title: Code Coverage Report
```

