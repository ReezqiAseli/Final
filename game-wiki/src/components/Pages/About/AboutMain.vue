<template>
    <div class="page=shell page-bg-home min-h-screen flex flex-col font-['Finger_Paint'] text-white">
        <main class="flex-1 w-full max-w-7x1 mx-auto px-4 md:px6 py:8 md:py-12 flex flex-col items-center gap:6  md:gap-8">
            <PageWrap class="w-full max-w-[1250px] min-h-[600px] flex flex-col items-start gap-6 md:gap-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl lg:text-5xl m-0">
                        Moochammad Reezqi Pratama
                    </h1>
                    <h2 class="text-3xl md:text-3xl lg:text-3xl">
                        11231041 - Informatika - ITK
                    </h2>
                    <p class="text-base md:text-lg lg:text-xl mt-5 opacity-80 ">
                        Saya adalah Mahasiswa Informatika Institut Teknologi Kalimantan wowowowow. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                        including versions of Lorem Ipsum.
                        <img src= "@/assets/img/Miwa.png" class="md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]"></img>
                    </p>
                </div>
            </PageWrap>
        </main>
    </div>

</template>

<script setup>
import PageWrap from '@/components/Reusable/PageWrap.vue'

</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>