# Salesforce Selenium Framework

Enterprise-style Selenium Java framework for Salesforce login UI testing.

## Structure

- `src/test/java/com/sushma/qa/base`: WebDriver setup and teardown
- `src/test/java/com/sushma/qa/pages`: Salesforce login Page Object
- `src/test/java/com/sushma/qa/tests`: Valid and invalid login TestNG tests
- `src/test/resources/testng.xml`: TestNG suite

## Prerequisites

- Java 17
- Maven 3.9+
- Google Chrome

## Run headed tests

```powershell
$env:JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-17.0.21.9-hotspot"
$env:PATH="$env:JAVA_HOME\bin;C:\Tools\apache-maven-3.9.9\bin;$env:PATH"
Set-Location "C:\Users\hp\Sushma\AITesterBlueprint5x\Chapter_02_Prompt_engineering\RicePot\SeleniumFramework"
mvn clean test
```

## Credentials

The valid-login test skips unless both environment variables are configured:

```powershell
$env:SALESFORCE_USERNAME="your-salesforce-username"
$env:SALESFORCE_PASSWORD="your-salesforce-password"
mvn test
```

Credentials are read at runtime and are not committed to the repository.

## Reports

TestNG reports are written to `target/surefire-reports`.
Allure results are written to `target/allure-results`.
