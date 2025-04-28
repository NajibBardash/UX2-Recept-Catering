import Chip from './components/Chip.js';
import ChipSection from './components/ChipSection.js';
import RangeSection from './components/RangeSection.js';

const app = {
  data() {
    return {
      seeRecipes: false,
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

      }

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

    goToRecipes() {
      this.seeRecipes = true;
    }
  },

  template: `
      <div class="app-container">

        <header class="topBar">
          <div class="search-bar">
            <input type="search" placeholder="Sökfilter" minlength="3" maxlength="20" />
            <button>+</button>
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
        </header>

        <main v-if="!seeRecipes" class="content">
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
              @click="goToRecipes"
            >
              {{ searchChip.label }}
            </chip-button>
          </div>

        </main>
      </div>
  `
};


const vueApp = Vue.createApp(app);

vueApp.component('chip-button', Chip);
vueApp.component('chip-section', ChipSection);
vueApp.component('range-section', RangeSection);

vueApp.mount("#app");