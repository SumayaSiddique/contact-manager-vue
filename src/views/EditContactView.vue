<template>
  <div>

    <div class=" flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px]">
        <form @submit.prevent="updateContact">
          <div class="mb-5">
            <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">Full Name</label>
            <input type="text" placeholder="Full Name"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              v-model="contact.name" required>
          </div>
          <div class="mb-5">
            <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">Email Address</label>
            <input type="email" placeholder="example@domain.com"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              v-model="contact.email" required>
          </div>
          <div class="mb-5">
            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">Phone Number</label>
            <input type="text" placeholder="phone Number"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              v-model="contact.phone" required>
          </div>
          <div class="mt-6 flex items-center justify-center gap-4">
            <button
              class="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700">Update
              Contact</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,

  updateDoc,

  doc
} from '@firebase/firestore'
import { db } from '../firebase'

export default {
  name: 'EditContactView',
  data() {
    return {
      contact: {}
    }
  },

  methods: {
    async getContact(id) {
      const contactsRef = collection(db, 'contacts')
      const contactsSnapshot = await getDocs(contactsRef)
      const contact = contactsSnapshot.docs.map(doc => doc).find(doc => doc.id === id)

      this.contact = contact.data()
    },

    async updateContact() {
      const contactRef = doc(db, 'contacts', this.$route.params.id)
      await updateDoc(contactRef, {
        name: this.contact.name,
        phone: this.contact.phone,
        email: this.contact.email
      })
      this.$router.push('/contacts')
    }

  },
  created() {
    this.getContact(this.$route.params.id)
  }
}
</script>