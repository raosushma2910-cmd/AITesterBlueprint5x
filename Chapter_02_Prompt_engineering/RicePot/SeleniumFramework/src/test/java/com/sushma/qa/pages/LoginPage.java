package com.sushma.qa.pages;

import java.time.Duration;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.SearchContext;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    @FindBy(xpath = "//input[@id='username']")
    private WebElement username;

    @FindBy(xpath = "//input[@id='password']")
    private WebElement password;

    @FindBy(xpath = "//input[@id='Login']")
    private WebElement loginButton;

    @FindBy(xpath = "//input[@type='checkbox']")
    private WebElement rememberMe;

    @FindBy(xpath = "//div[contains(@class,'loginError')] | //div[@role='alert']")
    private WebElement loginError;

    @FindBy(xpath = "//identity-login-app")
    private WebElement loginAppHost;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        try {
            PageFactory.initElements(driver, this);
        } catch (RuntimeException exception) {
            throw new IllegalStateException("Unable to initialize Salesforce login page elements.", exception);
        }
    }

    public void open() {
        try {
            driver.get("https://login.salesforce.com/?locale=in");
            wait.until(ExpectedConditions.visibilityOf(loginAppHost));
            findElementInShadowDom("//input");
        } catch (TimeoutException exception) {
            String pageSource = "";
            try {
                pageSource = driver.getPageSource();
            } catch (RuntimeException ignored) {
            }
            throw new IllegalStateException(
                    "Salesforce login page did not load. Current URL: " + driver.getCurrentUrl()
                            + ". Page title: " + driver.getTitle()
                            + ". Page source length: " + pageSource.length(),
                    exception);
        } catch (RuntimeException exception) {
            if (exception.getMessage() != null
                    && exception.getMessage().contains("Unable to find element")) {
                String renderedHost = (String) ((JavascriptExecutor) driver).executeScript(
                        "return arguments[0].shadowRoot ? arguments[0].shadowRoot.innerHTML : arguments[0].outerHTML;",
                        loginAppHost);
                throw new IllegalStateException(
                        "Salesforce login component did not render inputs. Rendered host length: "
                                + renderedHost.length() + ". Host: " + renderedHost,
                        exception);
            }
            throw new IllegalStateException("Unable to open Salesforce login page.", exception);
        }
    }

    public void setRememberMe(boolean selected) {
        try {
            WebElement rememberMeControl = findElementInShadowDom(
                    "//input[@type='checkbox']");
            wait.until(ExpectedConditions.elementToBeClickable(rememberMeControl));
            if (rememberMeControl.isSelected() != selected) {
                rememberMeControl.click();
            }
        } catch (ElementClickInterceptedException exception) {
            throw new IllegalStateException("Remember Me control could not be clicked.", exception);
        } catch (RuntimeException exception) {
            throw new IllegalStateException("Unable to set Remember Me.", exception);
        }
    }

    public void login(String usernameValue, String passwordValue) {
        try {
            WebElement usernameInput = findElementInShadowDom(
                    "//input[@type='text'] | //input[@type='email']");
            wait.until(ExpectedConditions.visibilityOf(usernameInput)).clear();
            usernameInput.sendKeys(usernameValue);
            WebElement continueButton = findElementInShadowDom(
                    "//button[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'continue')]");
            wait.until(ExpectedConditions.elementToBeClickable(continueButton)).click();
            WebElement passwordInput = findElementInShadowDom("//input[@type='password']");
            wait.until(ExpectedConditions.visibilityOf(passwordInput)).clear();
            passwordInput.sendKeys(passwordValue);
            WebElement loginButtonControl = findElementInShadowDom(
                    "//button[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'log in')]");
            wait.until(ExpectedConditions.elementToBeClickable(loginButtonControl)).click();
        } catch (RuntimeException exception) {
            throw new IllegalStateException("Unable to submit Salesforce login credentials.", exception);
        }
    }

    public String getLoginError() {
        try {
            WebElement error = findElementInShadowDom(
                    "//*[contains(@class,'error') or @role='alert']");
            return wait.until(ExpectedConditions.visibilityOf(error)).getText();
        } catch (TimeoutException exception) {
            throw new IllegalStateException("Salesforce login error was not displayed.", exception);
        } catch (RuntimeException exception) {
            throw new IllegalStateException("Unable to read the Salesforce login error.", exception);
        }
    }

    public boolean isLoginPageDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(loginAppHost)).isDisplayed();
        } catch (RuntimeException exception) {
            return false;
        }
    }

    public boolean waitForNavigationAwayFromLogin() {
        try {
            wait.until(ExpectedConditions.not(
                    ExpectedConditions.urlContains("login.salesforce.com")));
            return true;
        } catch (TimeoutException exception) {
            return false;
        }
    }

    private WebElement findElementInShadowDom(String xpath) {
        long deadline = System.currentTimeMillis() + 30000;
        while (System.currentTimeMillis() < deadline) {
            Deque<SearchContext> contexts = new ArrayDeque<>();
            try {
                contexts.add(loginAppHost.getShadowRoot());
            } catch (RuntimeException ignored) {
                waitForRetry();
                continue;
            }
            while (!contexts.isEmpty()) {
                SearchContext context = contexts.removeFirst();
                try {
                    List<WebElement> matches = context.findElements(By.xpath(xpath));
                    if (!matches.isEmpty()) {
                        return matches.get(0);
                    }
                    for (WebElement element : context.findElements(By.xpath("//*"))) {
                        try {
                            contexts.addLast(element.getShadowRoot());
                        } catch (RuntimeException ignored) {
                        }
                    }
                } catch (RuntimeException ignored) {
                }
            }
            waitForRetry();
        }
        throw new IllegalStateException("Unable to find element with XPath: " + xpath);
    }

    private void waitForRetry() {
        try {
            new WebDriverWait(driver, Duration.ofMillis(500))
                    .pollingEvery(Duration.ofMillis(100))
                    .until(webDriver -> true);
        } catch (RuntimeException exception) {
            throw new IllegalStateException("Unable to wait for Salesforce page.", exception);
        }
    }
}
