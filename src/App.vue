<template>
    <div>
        <h1>PouchDB with Vue.js</h1>
        <form @submit.prevent="addNewDocument">
            <input v-model="newDocContent" placeholder="Enter document content" />
            <button type="submit">Add Document</button>
        </form>

        <ul>
            <li v-for="doc in documents" :key="doc._id">
                {{ doc.content }}
                <button @click="deleteDocumentHandler(doc)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { addDocument, getAllDocuments, deleteDocument, syncWithRemote } from '@/services/pouchdb';

const newDocContent = ref('');
const documents = ref([]);

const fetchDocuments = async () => {
    documents.value = await getAllDocuments();
};

const addNewDocument = async () => {
    if (newDocContent.value.trim()) {
        const doc = {
            _id: new Date().toISOString(),
            content: newDocContent.value
        };
        await addDocument(doc);
        newDocContent.value = '';
        fetchDocuments();
    }
};

const deleteDocumentHandler = async (doc) => {
    await deleteDocument(doc);
    fetchDocuments();
};

onMounted(() => {
    fetchDocuments();
    // Optional: Sync with a remote database
    // syncWithRemote('http://localhost:5984/my_remote_db');
});
</script>