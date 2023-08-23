import { test, expect, request } from '@playwright/test'
import { TaskModel } from "./fixtures/task.model"
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({page}) => {
    tasksPage = new TasksPage(page)
})

test.describe('Cadastro', () => {
    test('Aula 19 - Validando o comportamento esperado', async ({ request }) => {
        const task = data.success as TaskModel

        await deleteTaskByHelper(request, task.name)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)
    })

    test('Aula 20 - Não deve permitir tarefa duplicada', async ({ request }) => {
        const task = data.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already existsa!')

    })

    test('Campo Obrigatório', async () => {
        const task = data.required as TaskModel

        await tasksPage.go()
        await tasksPage.create(task)


        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')

    })
})

test.describe('Atualização', () => {

    test('Deve concluir uma tarefa', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        //Automatizar o botão de toggle
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)
    })

})

test.describe('Exclusão', () => {

    test('Deve excluir uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel
    
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)
    
        await tasksPage.go()
        //Automatizar o botão de toggle
        await tasksPage.delete(task.name)
        await tasksPage.shouldNotExist(task.name)
    })
})
