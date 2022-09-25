<template>
  <div class="contacts-list">
    <div class="search">
      <div class="flex items-center justify-center p-12">
        <form class="min-w-full flex items-center">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <input id="simple-search"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search Name" type="text" v-model="filter">
          </div>
          <button @click.prevent="onsubmit"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
      </div>
    </div>
    <div class="flex items-center justify-center pt-0 p-12">
      <table class="min-w-full border-collapse block md:table">
        <thead class="block md:table-header-group">
          <tr
            class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th
              class="bg-indigo-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name</th>
            <th
              class="bg-indigo-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Email Address</th>
            <th
              class="bg-indigo-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Mobile</th>
            <th
              class="bg-indigo-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions</th>
          </tr>
        </thead>
        <tbody class=" block md:table-row-group">
          <tr class="bg-white border border-grey-500 md:border-none block md:table-row"
            v-for="contactDocument in contacts" :key="contactDocument.id">
            <td class=" p-2 md:border md:border-indigo-500 text-left block md:table-cell">{{contactDocument.data().name
            }}</td>
            <td class="p-2 md:border md:border-indigo-500 text-left block md:table-cell">{{ contactDocument.data().email
            }}</td>
            <td class="p-2 md:border md:border-indigo-500 text-left block md:table-cell">{{ contactDocument.data().phone
            }}</td>
            <td class="p-2 md:border md:border-indigo-500 text-left block sm:table-cell">
              <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
              <div class="flex item-center justify-center">
                <!-- edit button -->
                <router-link :to="{
                  path: '/contacts/edit/'+contactDocument.id,
                  props: contactDocument
                }" class="text-blue-500 w-6 mr-2 transform hover:text-indigo-500 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </router-link>
                <!-- delete button -->
                <button @click="deleteContact(contactDocument)"
                  class="w-6 mr-2 transform hover:text-indigo-500 hover:scale-110 text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  where,
  doc
} from '@firebase/firestore'
import { db } from '../firebase'

export default {
  name: 'ContactsView',
  data() {
    return {
      contacts: []
    }
  },
  computed: {
    ...mapState(['contacts'])
  },
  methods: {
    async getContacts() {
      const contactsRef = collection(db, 'contacts')
      const contactsSnapshot = await getDocs(contactsRef)
      const contactsList = contactsSnapshot.docs.map(doc => doc)
      this.contacts = contactsList
    },

    async deleteContact(contactDocument) {
      const confirmDelete = confirm('Are you sure you want to delete this contact?')
      if (confirmDelete) {
        const contactRef = doc(db, 'contacts', contactDocument.id)
        // calling the firestore method to delete the document by the reference
        await deleteDoc(contactRef)
        this.getContacts()
      }

    },

    async onsubmit() {
      if (this.filter == '') {
        this.getContacts()
      } else {

        const contactsRef = collection(db, 'contacts')
        const q = query(contactsRef, where("name", "==", this.filter));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc)
        this.contacts = data
      }
    }
  },
  created() {
    this.getContacts()
  }
}
</script>