import ChipSection from './components/ChipSection.js'

const app = {
  data() {
    return {
      sections: [
        {
          title: 'Event',
          chips: ['Firmafest', 'Bröllop', 'Begravning', 'Födelsedag', 'Dop'],
          sectionClass: 'event-section'
        },
        {
          title: 'Måltidstyp',
          chips: ['Huvudrätt', 'Buffé', 'Förrätt', 'Mellanrätt', 'Apertiff', 'Efterrätt'],
          sectionClass: 'category-section'
        },
        {
          title: 'Protein',
          chips: ['Nötkött', 'Fisk', 'Vegetariskt', 'Veganskt', 'Fläsk'],
          sectionClass: 'protein-section'
        },
        {
          title: 'Allergier & preferenser',
          chips: ['Glutenfri', 'Mjölkfri', 'Nötfri', 'Laktosfri', 'Vegetarisk', 'Kosher', 'Halal'],
          sectionClass: 'allergies-section',
          extraClass: 'allergy'
        },
        {
          title: 'Tema',
          chips: ['Europeiskt', 'Mellanöstern', 'Asiatisk', 'Amerikanskt'],
          sectionClass: 'theme-section'
        },
        {
          title: 'Förberedelsetid',
          chips: ['Under 1 timme', 'Under 12 timmar', 'Under 24 timmar', 'Under 36 timmar'],
          sectionClass: 'preptime-section'
        }
      ]
    }
  },

  methods: {

  },
  
  template: `
      <div class="app-container">
        <header class="topbar">
          <div class="search-bar">
            <input type="search" placeholder="Sökfilter" minlength="3" maxlength="20" />
            <button>+</button>
          </div>
        </header>

        <main class="content">
          <chip-section
            v-for="(section, index) in sections"
            :key="index"
            :title="section.title"
            :chips="section.chips"
            :section-class="section.sectionClass"
            :extra-class="section.extraClass"
          />
        </main>
      </div>
  `
};


const vueApp = Vue.createApp(app);

vueApp.component('chip-section', ChipSection)

vueApp.mount("#app");