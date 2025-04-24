import { test, expect } from '@playwright/test';

test.describe('Friends Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/friends'); // adjust if route is different
  });

  test('should display Friends, Followers, and Followed headers', async ({ page }) => {
    const headers = await page.locator('#friends-page h4').allTextContents();
    expect(headers).toContain('Friends');
    expect(headers).toContain('Followers');
    expect(headers).toContain('Followed');
  });

  test('should show multiple "THAD" profiles with buttons', async ({ page }) => {
    const thadButtons = page.getByRole('button', { name: 'THAD' });
    const followersButtons = page.getByRole('button', { name: 'Followers' });
    const friendsButtons = page.getByRole('button', { name: 'Friends' });

    expect(await thadButtons.count()).toBeGreaterThan(1);
    expect(await followersButtons.count()).toBeGreaterThan(1);
    expect(await friendsButtons.count()).toBeGreaterThan(1);
  });

  test('should display "Artists you might know" section and artist cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Artists you might know' })).toBeVisible();

    const artistNames = ['Joji', 'OfficialPikachu', 'THAD', 'ManagedDemo...', 'PlzBuyIt'];
    for (const name of artistNames) {
      // eslint-disable-next-line no-await-in-loop
      await expect(page.getByText(name)).toBeVisible();
    }

    const followButtons = page.getByRole('button', { name: 'Follow' });
    expect(await followButtons.count()).toBeGreaterThan(4);
  });

  test('should have at least one visible "See All" button', async ({ page }) => {
    const seeAllButtons = page.getByRole('button', { name: /see all/i });
    expect(await seeAllButtons.count()).toBeGreaterThan(0);
  });
});
