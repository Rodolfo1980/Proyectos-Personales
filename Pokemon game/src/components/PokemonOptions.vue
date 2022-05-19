<template>
    <div class="options-container">  
        <ul>
            <li v-for="pokemon in pokemons" 
            :key="pokemon.id"
            @click="$emit( 'selection', pokemon.id)">
            {{ pokemon.name }}    
            </li>          
        </ul> 
    </div>    
</template>
<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true
    }
  }  
}   
</script>
<style scoped>
ul {
    list-style-type: none;
}
li {
    background-color: #DED40C;
    border-radius: 10px;
    border: 3px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 5px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>