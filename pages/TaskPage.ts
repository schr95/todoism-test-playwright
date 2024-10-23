import { Page,Locator } from '@playwright/test';

export class TaskPage {
    readonly page: Page;
    readonly taskInput: Locator;
    readonly clearAllTasks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.taskInput=page.getByPlaceholder('What needs to be done?');
        this.clearAllTasks=page.getByText('clear_allClear');
    }

    async addTask(taskName: string) {
        await this.taskInput.click();
        await this.taskInput.fill(taskName);
        await this.taskInput.press('Enter');
    }

    async completeTask(taskName: string) {
        await this.page.locator('span').filter({ hasText: `check_box_outline_blank ${taskName}` }).locator('i').click();
    }

    async clearTasks() {
        await this.clearAllTasks.click();
    }

    async verifyTaskVisible(taskName: string) {
        await this.page.waitForSelector(`text=${taskName}`);
    }
}
