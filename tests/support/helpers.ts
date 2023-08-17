import { expect, APIRequestContext } from "@playwright/test"

import { TaskModel } from "../fixtures/task.model"

export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete('http://127.0.0.1:3333/helper/tasks/' + taskName)
}

export async function postTask(request: APIRequestContext, task: TaskModel) {
    const newTask = await request.post('http://127.0.0.1:3333/tasks/', { data: task })
    expect(newTask.ok()).toBeTruthy()
}