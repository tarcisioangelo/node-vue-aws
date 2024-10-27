<template>
    <div class="card">
        <img v-if="image" :src="image" alt="Card Image" class="card-image" />
        <div class="card-content">
            <h2 class="card-title">{{ title }}</h2>
            <p class="card-description">{{ description }}</p>
            <slot></slot>
        </div>
        <div v-if="$slots.actions" class="card-actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'DefaultCard',
    props: {
        title: {
            type: String as PropType<string>,
            default: '',
        },
        description: {
            type: String as PropType<string>,
            default: '',
        },
        image: {
            type: String as PropType<string>,
            default: '',
        },
    },
})
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px;
}

.card-image {
    width: 100%;
    height: auto;
}

.card-content {
    padding: 16px;
}

.card-title {
    font-size: 1.25em;
    margin-bottom: 8px;
}

.card-description {
    font-size: 1em;
    color: #666;
}

.card-actions {
    padding: 8px 16px;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: flex-end;
}
</style>
