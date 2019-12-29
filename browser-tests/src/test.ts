import { Builder, By, until, WebDriver } from "selenium-webdriver";

let driver: WebDriver;

beforeAll(async () => {
  driver = await new Builder().forBrowser("safari", "13", "ios").build();
  await driver.get("http://192.168.100.10:3000")
})

afterAll(async () => {
  driver && await driver.quit();
});

describe('Div100vh component', () => {
  it('should pass sanity check', async () => {
    await driver.wait(until.elementLocated(By.tagName('h1')))
  })

})