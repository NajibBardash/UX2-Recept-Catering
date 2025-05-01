export default {
    props: {
        label: {
            type: String,
        },
        extraClass: {
            type: [String, Array],
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