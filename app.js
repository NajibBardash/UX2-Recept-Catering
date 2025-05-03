import Chip from './components/Chip.js';
import ChipSection from './components/ChipSection.js';
import RangeSection from './components/RangeSection.js';
import FilterButton from './components/FilterButton.js';
import Recipe from './components/Recipe.js';

const app = {
  data() {
    return {
      seeRecipes: false,
      recipeDetails: false,
      numberOfRecipes: Number(0),

      selectedChips: [],

      sections: [
        {
          header: 'Event',
          imageTooltip: 'Välj vilken typ av event ni planerar att ha',
          chips: ['Firmafest', 'Bröllop', 'Begravning', 'Födelsedag', 'Dop'],
          sectionClass: 'event-section'
        },
        {
          header: 'Måltidstyp',
          imageTooltip: 'Välj vilken typ av måltid som önskas',
          chips: ['Huvudrätt', 'Buffé', 'Förrätt', 'Mellanrätt', 'Apertiff', 'Efterrätt'],
          sectionClass: 'category-section'
        },
        {
          header: 'Protein',
          imageTooltip: 'Välj huvudingrediens för måltiden',
          chips: ['Nötkött', 'Fisk', 'Vegetariskt', 'Veganskt', 'Fläsk'],
          sectionClass: 'protein-section'
        },
        {
          header: 'Allergier & preferenser',
          imageTooltip: 'Bocka för de matpreferenser som önskas',
          chips: ['Glutenfri', 'Mjölkfri', 'Nötfri', 'Laktosfri', 'Vegetarisk', 'Kosher', 'Halal'],
          sectionClass: 'allergies-section',
          extraClass: 'allergy'
        },
        {
          header: 'Tema',
          imageTooltip: 'Här kan du välja måltider efter tema/kök',
          chips: ['Europeiskt', 'Mellanöstern', 'Asiatisk', 'Amerikanskt'],
          sectionClass: 'theme-section'
        },
        {
          header: 'Förberedelsetid',
          imageTooltip: 'Ungefärlig tid för att laga rätten',
          chips: ['< 1 timme', '< 12 timmar', '< 24 timmar', '< 36 timmar'],
          sectionClass: 'preptime-section'
        }
      ],

      range: {
        header: 'Pris per portion',
        sectionClass: 'range-section'
      },

      searchChip: {
        label: 'Sök recept',
        extraClass: 'search'
      },

      recipes: [
        {
          header: 'Gräddstuvad pyttipanna',
          profit: '65',
          chips: ['Vegetarisk', 'Glutenfri', 'Skandinaviskt']
        },
        {
          header: 'Napolitansk Pizza',
          profit: '65',
          chips: ['Vegetarisk', '< 24 timmar>', 'Skandinaviskt']
        },
        {
          header: 'Fänkålsrisotto',
          profit: '54',
          chips: ['Vegetarisk', 'Glutenfri', 'Skandinaviskt']
        },
        {
          header: 'Vinkokta musslor',
          profit: '54',
          chips: ['Vegetarisk', 'Glutenfri', 'Skandinaviskt']
        }
      ],

      searchText: '',

      commonIngredients: [
        { amount: '2 gul', item: 'lök' },
        { amount: '4 msk', item: 'neutral olja' },
        { amount: '600 gram', item: 'gram potatis' },
        { amount: '400 gram', item: 'gram biff' },
        { amount: '1/2 krm', item: 'malen peppar' },
        { amount: '2 dl', item: 'vispgrädde' },
        { amount: '2 msk', item: 'senap' },
        { amount: '4 st', item: 'ägg' }
      ],

      showIngredients: false,

      instructionsStep1: `Skala och finhacka löken och stek i olja i en stor stekpanna 
      tills den mjuknar. Lägg löken åt sidan. Skär potatisen i små tärningar och 
      stek i olja i en stor stekpanna på medelvärme tills den är gyllene och mjuk, 
      ca 10 minuter.`,

      instructionsStep2: `Skala och skär biffen i små bitar. Tillsätt till pannan med
       olja och stek tills varmt. Tillsätt lök, grädde och senap och låt koka ihop ett
        par minuter. Smaka av med salt och nymalen peppar.`,

      instructionsStep3: `Stek äggen i en annan panna i oljan. Servera pytten toppad
       med ägg, Apelsinpicklade rödbetor och persilja.`,

    }
  },

  methods: {
    toggleChipSelection(chip) {
      const index = this.selectedChips.findIndex(c => c.label === chip.label);
      if (index === -1) {
        this.selectedChips.push(chip);
      } else {
        this.selectedChips.splice(index, 1);
      }
    },

    removeFromTopBar(chip) {
      this.toggleChipSelection(chip);
    },

    toggleRecipes() {
      this.seeRecipes = !this.seeRecipes;
    },

    toggleRecipeDetails() {
      this.seeRecipes = !this.seeRecipes;
      this.recipeDetails = !this.recipeDetails;
    },

    addSearchTextAsChip() {
      const trimmedText = this.searchText.trim();
      if (
        trimmedText.length > 0 &&
        !this.selectedChips.some(chip => chip.label.toLowerCase() === trimmedText.toLowerCase())
      ) {
        this.selectedChips.push({ label: trimmedText, extraClass: 'search-chip' });
        this.searchText = '';
      }
    }
  },

  watch: {
    seeRecipes(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          const recipeList = document.getElementById('recipe-list');
          if (recipeList) {
            this.numberOfRecipes = recipeList.children.length;
          }
        });
      }
    },
  },

  template: `
      <div class="app-container">

        <header v-if="!recipeDetails" class="topBar">
          <div class="search-bar">
          <input
            type="text"
            placeholder="Sökfilter"
            minlength="1"
            maxlength="20"
            v-model="searchText"
           @keydown.enter="addSearchTextAsChip"
            />
              <button @click="addSearchTextAsChip">+</button>
          </div>

          <div id="filter-container">
            <chip-button v-for="(chip, index) in selectedChips"
              :key="index"
              :extra-class="[chip.extraClass, 'active']"
              @click="toggleChipSelection(chip)"
              >
              {{ chip.label }}
              <img src="assets/close-chip-icon.png"
                alt="remove" 
                class="close-chip-icon"
              >
            </chip-button>
          </div>
          <button v-if="seeRecipes" 
            @click="toggleRecipes" 
            class="return-button">
            <img src="assets/close-arrow-icon.png" alt="close arrow" class="close-arrow-icon">
            Tillbaka
          </button>
        </header>

        <main v-if="!seeRecipes && !recipeDetails" class="content">
          <h2>SNABB FILTRERING</h2>
          <chip-section
            v-for="(section, index) in sections"
            :key="index"
            :header="section.header"
            :chips="section.chips"
            :section-class="section.sectionClass"
            :extra-class="section.extraClass"
            :selected-chips="selectedChips"
            @chip-clicked="toggleChipSelection"
          >
            <img src="assets/info-icon.png" 
              alt="info" 
              class="info-icon"
              :title="section.imageTooltip">
          </chip-section>

          <range-section
            :header="range.header"
            :section-class="range.sectionClass"
          />

          <div class="search-exec">
            <chip-button
              :extra-class="searchChip.extraClass"
              :label="searchChip.label"
              @click="toggleRecipes"
            >
            </chip-button>
          </div>

        </main>

        <section v-if="seeRecipes" class="recipe-view">
          <div id="recipe-topbar">
            <span>{{ numberOfRecipes }} recept</span>
            <filter-button></filter-button>
          </div>
          <div id="recipe-list">
            <recipe
              v-for="(recipe, index) in recipes"
              :key="index"
              :header="recipe.header"
              :profit="recipe.profit"
              :chips="recipe.chips"
              @click="toggleRecipeDetails">
            </recipe>
          </div>
        </section>
        <section v-if="recipeDetails" class="recipe-details-view">
          <recipe
            :header="recipes[0].header"
            :profit="recipes[0].profit"
            :chips="recipes[0].chips">
            <p>
              Pyttipanna med rostbiff, potatis och lök stuvas krämig i grädde och senap 
              och serveras med stekt ägg och inlagda rödbetor. En klassisk husmanskost som aldrig 
              slår fel!
            </p>
            <button 
              @click="toggleRecipeDetails" 
            class="return-button">
            <img src="assets/close-arrow-icon.png" alt="close arrow" class="close-arrow-icon">
            Tillbaka
            </button>
          </recipe>

          <button class="toggle-details" @click="showIngredients = !showIngredients">
            {{ showIngredients ? 'Dölj ingredienser ▲' : 'Ingredienser ▼' }}
          </button>
        <div v-if="showIngredients" class="recipe-details">
          <ul>
        <li v-for="(ing, index) in commonIngredients" :key="index">
      <strong>{{ ing.amount }}</strong> {{ ing.item }}
        </li>
          </ul>
        </div>

        <h3 class="instructions-heading">Gör så här</h3>

<div class="instructions-box">
  <p>{{ instructionsStep1 }}</p>
</div>

<div class="instructions-box">
  <p>{{ instructionsStep2 }}</p>
</div>

<div class="instructions-box">
  <p>{{ instructionsStep3 }}</p>
</div>
        </section>
      </div>
  `
};


const vueApp = Vue.createApp(app);

vueApp.component('chip-button', Chip);
vueApp.component('chip-section', ChipSection);
vueApp.component('range-section', RangeSection);
vueApp.component('filter-button', FilterButton);
vueApp.component('recipe', Recipe);

vueApp.mount("#app");