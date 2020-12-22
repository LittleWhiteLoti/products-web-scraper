<template>
    <div>
</template>

<script>

/* eslint vue/no-dupe-keys:off */

export default {
    props: {
        display: {
            type: String,
            required: false
        },
        websiteImage: {
            type: String,
            required: false
        },
        websiteLink: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            display: this.$props.display,
            websiteImage: this.$props.websiteImage,
            websiteLink: this.$props.websiteLink
        }
    }
}
</script>