package com.sushma.qa.tests;

import com.sushma.qa.base.BaseTest;
import com.sushma.qa.pages.LoginPage;
import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.testng.Assert;
import org.testng.annotations.Test;

@Epic("Salesforce Authentication")
@Feature("Login")
public class SalesforceInvalidLoginTest extends BaseTest {
    @Test(priority = 1)
    @Story("Invalid credentials")
    @Description("Verifies that invalid credentials display a Salesforce login error.")
    public void invalidCredentialsShouldShowError() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.open();
        loginPage.setRememberMe(true);
        loginPage.login(
                "invalid.user@example.invalid",
                "InvalidPassword123!");

        String error = loginPage.getLoginError();
        Assert.assertFalse(error == null || error.trim().isEmpty(),
                "Salesforce did not display an invalid-login error.");
        Assert.assertTrue(loginPage.isLoginPageDisplayed(),
                "Salesforce should remain on the login page after invalid credentials.");
    }
}
