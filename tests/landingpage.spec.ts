import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display main heading and carousel', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Check for main heading
    await expect(page.getByRole('heading', { name: 'ArtHub Weekly Featured Artist Showcase' })).toBeVisible();

    // Optional: check for carousel existence using role or selector
    await expect(page.locator('#landing-page')).toBeVisible();
  });

  test('should display all upcoming event cards', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Check for Upcoming Events section
    await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();

    // Check all event images (you can use alt text or image count)
    const images = page.locator('img.gallery-img');
    await expect(images).toHaveCount(3);

    // Optional: validate event date text
    await expect(page.locator('text=March 28-29th')).toBeVisible();
    await expect(page.locator('text=April 12th')).toBeVisible();
    await expect(page.locator('text=May 16-18th')).toBeVisible();
  });

  test('should navigate to events page when "see more events" is clicked', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Click the button
    const button = page.getByRole('button', { name: /see more events/i });
    await expect(button).toBeVisible();
    await button.click();

    // You can validate the navigation either by URL or content
    await expect(page).toHaveURL(/.*eventsPage/);
    // Optional: check for some heading or text on the events page
  });
});
