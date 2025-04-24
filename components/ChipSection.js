export default {
    name: 'ChipSection',
    props: {
        title: String,
        chips: Array,
        sectionClass: String,
        extraClass: {
            type: String,
            default: ''
        }
    },

    methods: {
        activateChip(evt) {
            const buttonElement = evt.target;

            buttonElement.classList.toggle('active');
        }
    },

    template: `
      <section :class="sectionClass">
        <h2>{{ title }}</h2>
        <div class="chip-container">
          <button
            v-for="(chip, index) in chips"
            :key="index"
            :class="['chip', extraClass]"
            @click="activateChip">
            {{ chip }}
          </button>
        </div>
      </section>
    `
};
