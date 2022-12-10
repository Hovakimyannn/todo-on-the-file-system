"use strict"

const fs = require('fs');
const uuid = require('uuid');
const path = require("path");
const absolutePath = path.resolve("./storage/todos.json");

class FileManager {

    /**
     * @param filePath
     *
     * @returns {Promise<null|string>}
     */
    async read(filePath = absolutePath) {
        try {
            return await fs.promises.readFile(
                filePath,
                {
                    encoding: 'utf8',
                    flag: 'r'
                }
            );
        } catch (e) {
            if (e.code === 'ENOENT')
                return null;

            throw e;
        }
    }

    /**
     * @param data
     * @param filePath
     *
     * @returns {Promise<void>}
     */
    async write(data, filePath = absolutePath) {
        try {
            let text = await this.read(filePath)
            let todos = JSON.parse(text || '{}');
            let todo = {
                todo: data.todo,// data must be have todo and status
                status: data.status
            }

            data = {
                ...todos,
                [uuid.v1()]: {
                    ...todo
                }
            }

            await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param data
     * @param id
     * @param filePath
     *
     * @returns {Promise<void>}
     */
    async edit(data, id, filePath = absolutePath) {
        let text = await this.read(filePath);
        let todos = JSON.parse(text);
        let todo = {
            todo: data.todo ?? todos[id].todo,// data must be have todo and/or status
            status: data.status = data.status ?? todos[id].status
        }

        if (!todos[id]) {
            throw new Error();
        }

        todos = {
            ...todos,
            [id]: {
                ...todos[id],
                ...todo
            }
        }

        await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2))
    }

    /**
     * @param id
     * @param filePath
     *
     * @returns {Promise<void>}
     */
    async remove(id, filePath = absolutePath) {
        let text = await this.read(filePath);
        let todos = JSON.parse(text);
        delete todos[id];

        await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2))
    }
}

module.exports = FileManager;
