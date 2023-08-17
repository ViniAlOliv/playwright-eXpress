import { test, expect, request } from '@playwright/test'
import { TaskModel } from "./fixtures/task.model"
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

test.describe('Cadastro', () => {
    test('Aula 19 - Validando o comportamento esperado', async ({ page, request }) => {
        const task = data.success as TaskModel

        await deleteTaskByHelper(request, task.name)

        const tasksPage: TasksPage = new TasksPage(page)
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)
    })

    test('Aula 20 - Não deve permitir tarefa duplicada', async ({ page, request }) => {
        const task = data.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        const tasksPage: TasksPage = new TasksPage(page)
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')

    })

    test('Campo Obrigatório', async ({ page }) => {
        const task = data.required as TaskModel

        const tasksPage: TasksPage = new TasksPage(page)
        await tasksPage.go()
        await tasksPage.create(task)


        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')

    })
})

test.describe('Atualização', () => {

    test('Deve concluir uma tarefa', async ({ page, request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        const tasksPage: TasksPage = new TasksPage(page)
        await tasksPage.go()
        //Automatizar o botão de toggle
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)
    })

})

test.describe('Exclusão', () => {

    test('Deve excluir uma tarefa', async ({ page, request }) => {
        const task = data.delete as TaskModel
    
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)
    
        const tasksPage: TasksPage = new TasksPage(page)
        await tasksPage.go()
        //Automatizar o botão de toggle
        await tasksPage.delete(task.name)
        await tasksPage.shouldNotExist(task.name)
    })
})
