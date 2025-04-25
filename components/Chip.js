export default {
    props: {
        label: {
            type: String,
            required: true
        },
        extraClass: {
            type: String,
            default: ''
        }
    },

    emits: ['click'],

    template: `
      <button
        :class="['chip', extraClass]"
        @click="$emit('click', $event)">
        <slot>{{ label }}</slot>
      </button>
    `
};