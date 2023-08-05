/* global Event */

const puppeteer = require('puppeteer'); // v13.0.0 or later

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  const timeout = 5000
  page.setDefaultTimeout(timeout)

  {
    const targetPage = page
    await targetPage.setViewport({
      width: 1379,
      height: 1102
    })
  }
  {
    const targetPage = page
    const promises = []
    promises.push(targetPage.waitForNavigation())
    await targetPage.goto('http://localhost:8080/#/landing')
    await Promise.all(promises)
  }
  {
    const targetPage = page
    await scrollIntoViewIfNeeded([
      'aria/Kong node admin API[role="combobox"]',
      '#mat-input-0',
      'xpath///*[@id="mat-input-0"]',
      'pierce/#mat-input-0'
    ], targetPage, timeout)
    const element = await waitForSelectors([
      'aria/Kong node admin API[role="combobox"]',
      '#mat-input-0',
      'xpath///*[@id="mat-input-0"]',
      'pierce/#mat-input-0'
    ], targetPage, { timeout, visible: true })
    const inputType = await element.evaluate(el => el.type)
    if (inputType === 'select-one') {
      await changeSelectElement(element, 'http://localhost:8001')
    } else if ([
      'textarea',
      'text',
      'url',
      'tel',
      'search',
      'password',
      'number',
      'email'
    ].includes(inputType)) {
      await typeIntoElement(element, 'http://localhost:8001')
    } else {
      await changeElementValue(element, 'http://localhost:8001')
    }
  }
  {
    const targetPage = page
    await scrollIntoViewIfNeeded([
      [
        'form mat-icon'
      ],
      [
        'xpath///*[@id="header-container"]/form/button/span[1]/mat-icon'
      ],
      [
        'pierce/form mat-icon'
      ]
    ], targetPage, timeout)
    const element = await waitForSelectors([
      [
        'form mat-icon'
      ],
      [
        'xpath///*[@id="header-container"]/form/button/span[1]/mat-icon'
      ],
      [
        'pierce/form mat-icon'
      ]
    ], targetPage, { timeout, visible: true })
    await element.click({
      offset: {
        x: 12,
        y: 11.234375
      }
    })
  }

  await page.waitForFunction(`document.querySelector("body").innerText.includes("Connected to node")`)
  console.log('Validation passed')

  await browser.close()

  async function waitForSelectors (selectors, frame, options) {
    for (const selector of selectors) {
      try {
        return await waitForSelector(selector, frame, options)
      } catch (err) {
        console.error(err)
      }
    }
    throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors))
  }

  async function scrollIntoViewIfNeeded (selectors, frame, timeout) {
    const element = await waitForSelectors(selectors, frame, { visible: false, timeout })
    if (!element) {
      throw new Error(
        'The element could not be found.'
      )
    }
    await waitForConnected(element, timeout)
    const isInViewport = await element.isIntersectingViewport({ threshold: 0 })
    if (isInViewport) {
      return
    }
    await element.evaluate(element => {
      element.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'auto'
      })
    })
    await waitForInViewport(element, timeout)
  }

  async function waitForConnected (element, timeout) {
    return waitForFunction(() => element.getProperty('isConnected'), timeout)
  }

  async function waitForInViewport (element, timeout) {
    return waitForFunction(() => element.isIntersectingViewport({ threshold: 0 }), timeout)
  }

  async function waitForSelector (selector, frame, options) {
    if (!Array.isArray(selector)) {
      selector = [selector]
    }
    if (!selector.length) {
      throw new Error('Empty selector provided to waitForSelector')
    }
    let element = null
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i]
      if (element) {
        element = await element.waitForSelector(part, options)
      } else {
        element = await frame.waitForSelector(part, options)
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('>>'))
      }
      if (i < selector.length - 1) {
        element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement()
      }
    }
    if (!element) {
      throw new Error('Could not find element: ' + selector.join('|'))
    }
    return element
  }

  async function waitForFunction (fn, timeout) {
    let isDone = false
    let result = false
    const check = async () => {
      result = await fn()
      if (!result && !isDone) {
        setTimeout(check, 100)
      }
    }
    const timeoutId = setTimeout(() => {
      isDone = true
    }, timeout)
    await check()
    clearTimeout(timeoutId)
    if (!result) {
      throw new Error('Timed out')
    }
  }

  async function changeSelectElement (element, value) {
    await element.select(value)
    await element.evaluateHandle((e) => {
      e.blur()
      e.focus()
    })
  }

  async function changeElementValue (element, value) {
    await element.focus()
    await element.evaluate((input, value) => {
      input.value = value
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    }, value)
  }

  async function typeIntoElement (element, value) {
    const textToType = await element.evaluate((input, newValue) => {
      if (
        newValue.length <= input.value.length ||
        !newValue.startsWith(input.value)
      ) {
        input.value = ''
        return newValue
      }
      const originalValue = input.value
      input.value = ''
      input.value = originalValue
      return newValue.substring(originalValue.length)
    }, value)
    await element.type(textToType)
  }
})().catch(err => {
  console.error(err)
  process.exit(1)
})
