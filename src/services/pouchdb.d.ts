declare module 'pouchdb.js' {
    export function addDocument(doc: { name: string }): Promise<{ name: string }>
    export function getAllDocuments(): Promise<Array<{ name: string }>>
    export function deleteDocument(doc: { name: string }): Promise<void>
    export function syncWithRemote(): Promise<any>
}
