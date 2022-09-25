<template>
  
  <section class="py-24 flex items-center min-h-screen justify-center bg-white">
  <div class="mx-auto max-w-[43rem]">
    <div class="text-center">
      <p class="text-lg font-medium leading-8 text-indigo-600/95">Contact organizer</p>
      <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">One place to organize<br>your contacts</h1>
      <p class="mt-3 text-lg leading-relaxed text-slate-400">I made this website to make it easier for you to organize and keep track of your contacts. It's easy to save contacts, look at your list of contacts, and change contacts.</p>
    </div>

    <div class="mt-6 flex items-center justify-center gap-4">
      <router-link to="/createContact" class="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700" >Create New Contact</router-link>
    </div>
  </div>
</section>
</template>
