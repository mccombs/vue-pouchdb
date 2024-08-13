import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'

PouchDB.plugin(PouchdbFind)
const db = new PouchDB('my_database')

export const addDocument = async (doc: object) => {
    try {
        const response = await db.put(doc)
        return response
    } catch (error) {
        console.error('Error adding document:', error)
    }
}

export const getDocument = async (id: string) => {
    try {
        const doc = await db.get(id)
        return doc
    } catch (error) {
        console.error('Error getting document:', error)
    }
}

export const getAllDocuments = async () => {
    try {
        const result = await db.allDocs({ include_docs: true })
        return result.rows.map((row: any) => row.doc)
    } catch (error) {
        console.error('Error getting all documents:', error)
    }
}

export const deleteDocument = async (doc: any) => {
    try {
        const response = await db.remove(doc)
        return response
    } catch (error) {
        console.error('Error deleting document:', error)
    }
}

export const syncWithRemote = (remoteUrl: any) => {
    const remoteDB = new PouchDB(remoteUrl)
    db.sync(remoteDB, {
        live: true,
        retry: true
    })
        .on('change', (change) => {
            console.log('Sync change:', change)
        })
        .on('error', (err) => {
            console.error('Sync error:', err)
        })
}
