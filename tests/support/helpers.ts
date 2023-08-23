import { expect, APIRequestContext } from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"

const baseAPI = process.env.BASE_API

export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`${baseAPI}/helper/tasks/${taskName}`)
}

export async function postTask(request: APIRequestContext, task: TaskModel) {
    const newTask = await request.post(`${baseAPI}/tasks/`, { data: task })
    expect(newTask.ok()).toBeTruthy()
}