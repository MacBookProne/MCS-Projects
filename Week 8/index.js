class Pokemon {
    constructor(name, type, description) {
        this.name = name;
        this.type = type;
        this.description = description;
    }

    describe() {
        return `${this.name} is a ${this.type} type.`;
    }
}

class PokemonTypes {
    constructor(name) {
        this.name = name;
        this.description = '';
        this.pokemons = []; // Corrected from 'types' to 'pokemons'
    }

    addPokemon(pokemon) {
        if (pokemon instanceof Pokemon) {
            this.pokemons.push(pokemon); // Corrected to use 'pokemons'
        } else {
            throw new Error(`You can only add an instance of Pokemon. Argument is not a pokemon: ${pokemon}`);
        }
    }

    describe() {
        return `${this.name} has ${this.pokemons.length} Pokemon.`; // Corrected to use 'pokemons'
    }
}
class Menu {
    constructor() {
        this.types = [];
        this.selectedType = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createType();
                    break;
                case '2':
                    this.viewType();
                    break;
                case '3':
                    this.deleteType();
                    break;
                case '4':
                    this.displayTypes();
                    break;
                    default:
                        selection = 0;
            }

            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }


    showMainMenuOptions() {
    return prompt(`
    0) exit
    1) create a new type
    2) view a type
    3) delete a type
    4) display all types
    `);
    }

    showTypeMenuOptions(typeInfo) {
    return prompt(`
    0) back
    1) add a new Pokemon
    2) delete a Pokemon
    -----------------
    ${typeInfo}
    `);
    }

    displayTypes() {
    let typeString = '';
    for (let i = 0; i < this.types.length; i++) {
    typeString += i+ ') ' + this.types[i].name + '\n';
    }
    alert(typeString);
    }

    createType() {
    let name = prompt('Enter name for new Pokemon: ');
    this.types.push(new PokemonTypes(name));
    }

    viewType() {
    let index = prompt("Enter the index of the type that you want to view:");
    if (index > -1 && index < this.types.length) {
    this.selectedType = this.types[index];
    let description = 'Type Name: ' + this.selectedType.name + '\n';
    description += ' ' + this.selectedType.describe() + '\n ';
    for (let i = 0; i < this.selectedType.pokemons.length; i++) {
    // description += i + ') ' + this.selectedType.pokemons[i].name + ' - '
    // + this.selectedType.pokemon[i].position + '\n';
    description += i + ') ' + this.selectedType.pokemons[i].describe() + '\n';
    }
    let selection = this.showTypeMenuOptions(description);
    switch (selection) {
    case '1' :
    this.createPokemon();
    break;
    case '2' :
    this.deletePokemon();
    }
    } // validate user input
    }

    deleteType() {
    let index = prompt('Enter the index of the type that you wish to delete: ');
    if (index > -1 && index < this.types.length) {
    this.types.splice(index,1);
    }
    }

    displayTypes() {
        let typeString = '';
        for (let i = 0; i < this.types.length; i++) {
            typeString += i + ') ' + this.types[i].name + '\n';
        }
        alert(typeString);
    }
    createPokemon() {
    let name = prompt('Enter name for new pokemon: ');
    let type = prompt('Enter type for new pokemon: ');
    let description = prompt('Enter description for new pokemon;')
    //this.selectedType.pokemons.push(new pokemon(name, position));
    this.selectedType.addPokemon(new Pokemon(name, type, description));
    }

    deletePokemon() {
    let index = prompt('Enter the index of the pokemon that you wish to delete: ');
    if (index > -1 && index < this.selectedType.pokemons.length) { this.selectedType.pokemons.splice(index,1);
    }
    }
    }
    let menu = new Menu();
    menu.start();
