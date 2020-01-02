import { Builder, By, until, WebDriver } from "selenium-webdriver";
import {writeFile} from 'fs'
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

let driver: WebDriver;

beforeAll(async () => {
  driver = process.env.CI ? await getBrowserstackDriver() : await getLocalDriver()
  await driver.get("http://localhost:8080/")
})

afterAll(async () => {
  driver && await driver.quit();
});

// A sanity check to make sure the setup works
describe('The Div100vh test app', () => {
  it('should have the right title via driver.getTitle()', async () => {
    expect(await driver.getTitle()).toBe('The Div100vh test app')
  })

  it('should have the right h1 tag', async () => {
    const locator = By.tagName('h1')
    const h1Text = await driver.wait(until.elementLocated(locator), 5000).getText()
    expect(h1Text).toBe('The Div100vh component test app')
  })
})

describe('Div100vh component', () => {
  it('should take the whole viewport', async () => {
    const base64Snapshot = await driver.takeScreenshot()
    expect(base64Snapshot).toMatchImageSnapshot()
  })
})

function getBrowserstackDriver() {
  const {browserstack_user, browserstack_key} = process.env;
  if (!browserstack_user || !browserstack_key) throw Error('Specify browserstack_user and browserstack_key env vars!')
  const capabilities = {
    'browserName' : 'iPhone',
    'device' : 'iPhone 8 Plus',
    'realMobile' : 'true',
    'os_version' : '11',
    'browserstack.user' : browserstack_user,
    'browserstack.key' : browserstack_key,
    'browserstack.console': 'warnings',
    'browserstack.networkLogs': true,
    
    'name' : 'Div100vh test'
   }
  return new Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(capabilities).build();
}

function getLocalDriver() {
  return new Builder().forBrowser("safari" /*, "13", "ios" */).build();
}