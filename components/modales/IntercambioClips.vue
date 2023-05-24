<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="1000"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-chip class="ma-2" color="#b8b8b8" small outlined pill 
            v-bind="attrs"
            v-on="on"
        >
            {{$auth.user.clips}}
            <v-icon right>
                mdi-paperclip
            </v-icon>
        </v-chip>
      </template>
      <v-card>
        <v-container> 
            <v-row align="center" justify="center">
                <v-tabs v-model="tab" scrollable grow> 
                    <v-tab>Clips por Dclips</v-tab>
                    <v-tab>Dclips por Clips</v-tab>
                </v-tabs>
            </v-row>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <ComprarDclips />
                </v-tab-item>
                <v-tab-item>
                    <ComprarClips />
                </v-tab-item>
            </v-tabs-items>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="red" @click="dialog = !dialog">
                Cancelar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import ComprarDclips from '@/components/clips/ComprarDclips'
    import ComprarClips from '@/components/clips/ComprarClips'

    export default {
        components: {
            ComprarClips,
            ComprarDclips
        },
        data () {
            return {
                dialog: false,
                tab : '',
            }
        },
        methods: {
        }
    }
</script>
<style scoped>
    
</style>