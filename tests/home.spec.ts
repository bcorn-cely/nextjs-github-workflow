import { test, expect } from '@playwright/test'

test('homepage has correct title and articles', async ({ page }) => {
  await page.goto('/')
  
  // Check the page title
  await expect(page).toHaveTitle('News Site')
  
  // Check if the main heading is present
  const heading = page.locator('h1')
  await expect(heading).toHaveText('Latest News')
  
  // Check if there are articles present
  const articles = page.locator('.card')
  await expect(articles).toHaveCount(20)
  
  // Check if each article has a title, author, and content
  const firstArticle = articles.first()
  await expect(firstArticle.locator('img')).toBeVisible();
  await expect(firstArticle.locator('.card-title')).toBeVisible()
  await expect(firstArticle.locator('p >> nth=0')).toContainText('By')
  await expect(firstArticle.locator('p >> nth=1')).toBeVisible()
})