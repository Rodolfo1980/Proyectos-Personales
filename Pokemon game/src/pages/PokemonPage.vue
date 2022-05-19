<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Quién es este Pokemón?</h1>
        <!--img-->
        <PokemonPicture 
        :pokemonId="pokemon.id" 
        :showPokemon="showPokemon"/>
        <!--Opciones-->
        <PokemonOptions 
        :pokemons="pokemonArray"
        @selection="checkAnswer"/>
    <template v-if="showAnswer">
        <h2 class="fade-in">{{ message }}</h2>
        <button @click="newGame" class="ansbtn">Jugar de nuevo</button>
    </template>
    </div>
</template>
<script>
import PokemonOptions from '@/components/PokemonOptions'
import PokemonPicture from '@/components/PokemonPicture'
import getPokemonOptions from '@/helpers/getPokemonOptions'

console.log( getPokemonOptions() )

export default {
    components: {
        PokemonOptions,
        PokemonPicture
    },
    data() {
        return {
            pokemonArray: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArray = await getPokemonOptions()
            const rndInt = Math.floor( Math.random() * 4)
            this.pokemon = this.pokemonArray[rndInt]
        },
        checkAnswer( selectedId ) {
            this.showPokemon = true
            this.showAnswer = true
            if ( selectedId === this.pokemon.id ) {
                this.message = `¡Correcto, es ${ this.pokemon.name }!`
            } else {
                this.message = `¡No, es ${ this.pokemon.name }!`
            }
        },
        newGame() {
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArray = []
            this.pokemon = null
            this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray()
    }
}
</script>
<style scoped>
h1, h2 {
    font-size: 2em;
    margin-top: 0;
    margin-left: 50px;
}
</style>
