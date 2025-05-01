import Chip from "./Chip.js";

export default {
    props: {
        label: {
            type: String,
        },

        header: {
            type: String,
            default: ''
        },

        profit: {
            type: String,
            default: ''
        },

        extraClass: {
            type: [String, Array],
            default: ''
        },

        chips: Array,
        sectionClass: String,

    },

    components: {
        'chip': Chip
    },

    emits: ['click'],

    template: `
      <div class="recipe"
        @click="$emit('click', $event)">
        <div class="recipe-info">
            <div class="recipe-text">
                <h2>{{ header }}</h2>
                <slot></slot>
            </div>
            <div class="recipe-icons">
                <img src="assets/recipe-icons.png" alt="recipe icons" class="recipe-stat-icons">
            </div>
        </div>
        <div class="recipe-filters">
            <div class="profit">
                <p>Vinst {{ profit }} kr/port.</p>
            </div>
            <div class="recipe-chips">
                <chip v-for="(chip, index) in chips"
                    :key="index"
                    :label="chip"
                    :class="['chip', extraClass]"
                />
            </div>
        </div>

      </div>
    `
};