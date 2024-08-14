<template>
    <div class="md:max-w-xl mx-auto my-20">
        <section class="flex flex-col items-center justify-center mx-auto">
            <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Vue.js + Vite + PouchDB
            </h1>
            <p class="text-xl text-muted-foreground">
                A quick example of vue.js and pouchdb working together!
            </p>
            <div class="flex justify-center space-x-20 my-10">
                <img src="/vue.png" alt="Vue logo" class="w-14 h-14" />
                <img src="/vite.png" alt="Vite logo" class="w-14 h-14" />
                <img src="/pouchdb.png" alt="PouchDB logo" class="w-14 h-14" />
            </div>
        </section>

        <Card>
            <CardHeader>
                <CardTitle>Add Document</CardTitle>
            </CardHeader>
            <CardContent>
                <form class="space-y-6" @submit.prevent="addNewDocument">
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="text"
                                    v-model="newDocContent"
                                    placeholder="Enter document content"
                                    v-bind="componentField"
                                />
                            </FormControl>
                            <FormDescription> Give your pouchdb document a name </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <Button type="submit"> Submit </Button>
                </form>
            </CardContent>
        </Card>

        <Separator class="my-10" />

        <Table class="mx-auto">
            <TableHeader>
                <TableRow>
                    <TableHead class="w-4/5"> Document Name </TableHead>
                    <TableHead class="w-1/5 text-right"> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="doc in documents" :key="doc._id">
                    <TableCell class="font-medium"> {{ doc.content }} </TableCell>
                    <TableCell class="text-right"
                        ><span @click="deleteDocumentHandler(doc)" class="cursor-pointer"
                            >Delete</span
                        ></TableCell
                    >
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <footer class="my-20">
        <p class="text-center text-gray-500">
            Built with ❤️ using <a href="https://vuejs.org/">Vue</a>,
            <a href="https://vitejs.dev/">Vite</a>,
            <a href="https://www.shadcn-vue.com/">shadcn-vue</a> &
            <a href="https://pouchdb.com/">PouchDB</a> by
            <a href="https://taechotech.substack.com/">Taecho Tech</a>.
        </p>
    </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addDocument, getAllDocuments, deleteDocument } from '@/services/pouchdb'

const newDocContent = ref('')
const documents = ref([])

const fetchDocuments = async () => {
    documents.value = await getAllDocuments()
}

const addNewDocument = async () => {
    if (newDocContent.value.trim()) {
        const doc = {
            _id: new Date().toISOString(),
            content: newDocContent.value
        }
        await addDocument(doc)
        newDocContent.value = ''
        fetchDocuments()
    }
}

const deleteDocumentHandler = async (doc) => {
    await deleteDocument(doc)
    fetchDocuments()
}

onMounted(() => {
    fetchDocuments()
    // Optional: Sync with a remote database
    // syncWithRemote('http://localhost:5984/my_remote_db');
})
</script>

<style>
a {
    color: #42b983;
}
</style>
