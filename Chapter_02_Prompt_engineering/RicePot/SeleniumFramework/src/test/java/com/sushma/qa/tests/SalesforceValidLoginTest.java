package com.sushma.qa.tests;

import com.sushma.qa.base.BaseTest;
import com.sushma.qa.pages.LoginPage;
import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.Test;

@Epic("Salesforce Authentication")
@Feature("Login")
public class SalesforceValidLoginTest extends BaseTest {
    @Test(priority = 1)
    @Story("Valid credentials")
    @Description("Verifies that configured valid credentials leave the Salesforce login page.")
    public void validCredentialsShouldLogin() {
        String username = System.getenv("SALESFORCE_USERNAME");
        String password = System.getenv("SALESFORCE_PASSWORD");
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            throw new SkipException(
                    "Set SALESFORCE_USERNAME and SALESFORCE_PASSWORD to run the valid login test.");
        }

        LoginPage loginPage = new LoginPage(driver);
        loginPage.open();
        loginPage.setRememberMe(false);
        loginPage.login(username, password);

        Assert.assertTrue(loginPage.waitForNavigationAwayFromLogin(),
                "Valid Salesforce credentials did not navigate away from the login page.");
    }
}
