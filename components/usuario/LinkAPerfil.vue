<template>
    <a class="enlaceAPerfil" :href="`/${string_to_slug(nombre)}?id=${id}`">
        {{nombre}}
    </a>
</template>

<script>
export default {
    props: ['nombre','id'],
    methods : {
        string_to_slug (str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();
        
            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to   = "aaaaeeeeiiiioooouuuunc------";
            for (var i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return str;
        }
    }
}
</script>

<style scoped>
    .enlaceAPerfil {
        text-decoration: none;
        color: black;
        margin-right: 10px;
    }
</style>