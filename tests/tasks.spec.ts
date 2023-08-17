import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker';

test('Deve poder cadastrar uma nova tarefa', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/')
    
    //locator = definição de objeto
    const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
    await inputTaskName.fill('Ler um livro de Typescript');
    await inputTaskName.press('Enter');

    //await page.fill('#newTask', 'Ler um livro de Typescript')
    //await page.fill('input[placeholder="Add a new Task"]', 'Ler um livro de Typescript')
})

test('Com XPAth', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/')
    const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
    await inputTaskName.fill('Ler um livro de Typescript');
    await page.click('//button[contains(text(), "Create")]')
})

test('Com Selector do Playwright', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/')
    const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
    await inputTaskName.fill('Ler um livro de Typescript');
    await page.click('css=button >> text=Create')
})

test('Aula 16 - Com Faker', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/')
    const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
    await inputTaskName.fill(faker.lorem.words());
    await page.click('css=button >> text=Create')
})

test('Aula 17 - Sem faker e consumindo API Helper', async ({ page, request }) => {
    const taskName = 'Ler um livro de Typescript'
    
    await request.delete('http://127.0.0.1:3333/helper/tasks/' + taskName)
    
    await page.goto('http://127.0.0.1:8080/')
    const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
    await inputTaskName.fill(taskName);
    await page.click('css=button >> text=Create')
})

test('Aula 19 - Validando o comportamento esperado', async ({ page, request }) => {
    // Dado que eu tenho uma nova tarefa
    const taskName = 'Ler um livro de Typescript'
    await request.delete('http://127.0.0.1:3333/helper/tasks/' + taskName)
    
    // E que estou na página de cadastro
    await page.goto('http://127.0.0.1:8080/')

    // Quando faço o cadastro dessa tarefa
    const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
    await inputTaskName.fill(taskName);
    await page.click('css=button >> text=Create')

    //Então essa tarefa deve ser exibida na lista
    //const target = page.getByTestId('task-item')//pega elemento pelo data testid
    //const target = page.locator('.task-item')
    
    //Melhor dos mundos abaixo:
    //const target = page.locator('div[class*=listItem]')
    const target = page.locator(`css=.task-item p >> text=${taskName}`)
    await expect(target).toBeVisible()
})