import Chip from "./Chip.js";

export default {

    components: {
        'chip': Chip
    },

    props: {
        header: String,
        imageTooltip: String,
        chips: Array,
        sectionClass: String,
        selectedChips: Array,
        extraClass: {
            type: String,
            default: ''
        }
    },

    emits: ['chip-clicked'],

    methods: {
        isSelected(chipLabel) {
            return this.selectedChips.some(c => c.label === chipLabel);
        },

        handleChipClick(chip, extraClass) {
            this.$emit('chip-clicked', { label: chip, extraClass });
        }
    },

    template: `
      <section :class="sectionClass">
        <div class="section-header">
            <h2>{{ header }}</h2>
            <slot></slot>
        </div>
        <div class="chip-container">
          <chip v-for="(chip, index) in chips"
            :key="index"
            :label="chip"
            :class="['chip', extraClass, isSelected(chip) ? 'active' : '']"
            @click="handleChipClick(chip, extraClass)"
          />
        </div>
      </section>
    `
};
