"use strict"

const FileManager = new (require('../file_system/fileManager.js'));

class ListController {

    /**
     * @param req
     * @param res
     *
     * @returns {Promise<*>}
     */
    async get(req, res) {
        try {
            return res
                .status(200)
                .json(JSON.parse((await FileManager.read()) || '{}'));
        } catch (e) {
            return res
                .status(400)
                .json('Something went wrong');
        }
    }

    /**
     * @param req
     * @param res
     *
     * @returns {Promise<*>}
     */
    async getById(req, res) {
        try {
            let todo = JSON.parse(await FileManager.read() || '{}')[req.params.id]

            if (!todo) {
                return res
                    .status(400)
                    .json('Something went wrong');
            }

            return res
                .status(200)
                .json(todo);
        } catch (e) {
            return res
                .status(400)
                .json('Something went wrong');
        }
    }

    /**
     * @param req
     * @param res
     *
     * @returns {Promise<*>}
     */
    async create(req, res) {
        const data = req.body;

        if (data.status === undefined) {
            data.status = false;
        }

        try {
            await FileManager.write(data);

            return res
                .status(201)
                .json();
        } catch (e) {
            return res
                .status(400)
                .json('Something went wrong');
        }
    }

    /**
     * @param req
     * @param res
     *
     * @returns {Promise<*>}
     */
    async update(req, res) {
        try {
            await FileManager.edit(req.body, req.params.id);

            return res
                .status(200)
                .json();
        } catch (e) {
            return res
                .status(400)
                .json('Something went wrong');
        }
    }

    /**
     * @param req
     * @param res
     *
     * @returns {Promise<*>}
     */
    async destroy(req, res) {
        try {
            await FileManager.remove(req.params.id);

            return res
                .status(200)
                .json();
        } catch (e) {
            return res
                .status(400)
                .json('Something went wrong');
        }
    }
}

module.exports = ListController;
