<template>
    <div>
    <ul>
        <li v-for="book in books" :key="book.id">{{ book.volumeInfo.title }}</li>
    </ul>
    </div>
</template>

<script>
export default {
    props: ['books']
};
</script>
