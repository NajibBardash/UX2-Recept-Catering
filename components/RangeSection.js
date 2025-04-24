export default {
    data() {
        return {
            minAmount: Number(0),
            maxAmount: Number(500)
        }
    },

    props: {
        title: String,
        sectionClass: String,
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 500
        },
        step: {
            type: Number,
            default: 1
        },

        minGap: {
            type: Number,
            default: 50
          }

    },

    computed: {
        rangeStyle() {
          const rangeTotal = this.max - this.min;
          const left = ((this.minAmount - this.min) / rangeTotal) * 100;
          const right = ((this.max - this.maxAmount) / rangeTotal) * 100;
          return {
            left: `${left}%`,
            right: `${right}%`
          };
        }
      },

    methods: {
        handleMinChange(e) {
            const val = parseInt(e.target.value, 10);
            if (val + this.minGap <= this.maxAmount) {
              this.minAmount = val;
            } else {
              this.minAmount = this.maxAmount - this.minGap;
            }
          },
          handleMaxChange(e) {
            const val = parseInt(e.target.value, 10);
            if (val - this.minGap >= this.minAmount) {
              this.maxAmount = val;
            } else {
              this.maxAmount = this.minAmount + this.minGap;
            }
          }
    },

    template: `
      <section :class="sectionClass">
        <h2>{{ title }}</h2>
        <div id="min-max">
            <span>{{ minAmount }} kr</span>
            <span>{{ maxAmount }} kr</span>
        </div>
        <div class="range-slider">
            <div class="slider-track"></div>
            <div class="slider-range" :style="rangeStyle"></div>
            <input type="range" 
                :min="min" :max="max" :step="step" 
                v-model="minAmount"
                @input="handleMinChange">
            <input type="range" 
                :min="min" :max="max" :step="step" 
                v-model="maxAmount"
                @input="handleMaxChange">
        </div>
        <div id="price-spread">
            <span>0</span>
            <span> 100</span>
            <span> 200</span>
            <span> 300</span>
            <span> 400</span>
            <span> 500+</span>
        </div>
      </section>
    `
}