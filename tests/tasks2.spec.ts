import { test, expect } from '@playwright/test'
import { TaskModel } from "../tests/fixtures/task.model"
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

test('Aula 19 - Validando o comportamento esperado', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'Ler um livro de Typescript',
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)

    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)
})

test('Aula 20 - Não deve permitir tarefa duplicada', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'Comprar ketchup',
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')

})

test('Campo Obrigatório', async ({ page }) => {
    const task: TaskModel = {
        name: '',
        is_done: false
    }

    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)


    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect (validationMessage).toEqual('This is a required field')

})