<template>
    <div>
     <div class="w-full justify-center p-5 font-black text-5xl text-[#005C53]">
            <h1>Vos disponibiliter</h1>
        </div>
    <div class="flex lg:flex-row space-y-5 flex-col space-x-5 justify-start items-start">
       

        <div class="lg:w-1/4 w-full px-5">
            <Calendar />
        </div>
        <div>
            <VisiteCardList />
        </div></div>
    </div>
</template>

<script setup>
import VisiteCardList from './VisiteCardList.vue';
import Calendar from '~/components/common/Calender.vue'

</script>