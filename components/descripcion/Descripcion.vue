<template>
    <div>
        <v-card class="mx-auto"  max-width="1000" elevation="0">
            <v-card-title>
                <v-card-title>Descripción</v-card-title>
            </v-card-title>
            <v-card-subtitle>
                <div v-html="descripcionHTML"></div>
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: ['descripcion'],
        data() {
            return  {
            }
        },
        computed: {
            descripcionHTML() {
                let aConvertir = JSON.parse(this.descripcion)
                let descripcion = ''
                aConvertir.forEach( bloque => {
                    switch (bloque.type) {
                        case 'header':
                            descripcion = descripcion.concat(
                                `<h2>${bloque.data.text}</h2><br>`
                            )
                            break
                        case 'paragraph':
                            descripcion = descripcion.concat(
                                `<p>${bloque.data.text}</p>`
                            )
                            break
                        case 'list':
                            descripcion = descripcion.concat(`<ul>`)
                            bloque.data.items.forEach( elemento => {
                                descripcion = descripcion.concat(
                                    `<li>${elemento}</li>`
                                )
                            })
                            descripcion = descripcion.concat(`</ul>`)
                            break
                    }
                });
                return descripcion
            }
        }
    }
</script>