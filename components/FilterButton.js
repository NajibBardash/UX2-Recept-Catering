export default {
  data() {
    return {
      selected: 'sortera'
    };
  },

  mounted() {
    this.updateWidth();
  },

  methods: {
    updateWidth() {
      const mirror = this.$refs.mirror;
      const select = this.$refs.select;
      select.style.width = mirror.offsetWidth + 60 + 'px';
    }
  },

    template: `
    <div class="select-wrapper">
      <img src="assets/arrow-black-icon.png" class="arrow-black-icon" alt="black arrow">  
      <select v-model="selected" @change="updateWidth" ref="select" name="sortera" class="search-filter">
        <option value="sortera" selected>Sortera</option>
        <option value="pris-fallande">Pris fallande</option>
        <option value="pris-stigande">Pris stigande</option>
        <option value="förberedelsetid-stigande">Förberedelsetid stigande</option>
        <option value="förberedelsetid-fallande">Förberedelsetid fallande</option>
        <option value="vinstmarginal-stigande">Vinstmarginal fallande</option>
        <option value="vinstmarginal-fallande">Vinstmarginal fallande</option>
      </select>
      <span ref="mirror" class="mirror">{{ selected }}</span>
    </div>
    `
};