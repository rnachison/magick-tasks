<template>
  <div class="toggleWrapper" :style="cssProps">
    <input
      type="checkbox"
      v-model="value"
      :value="value"
      class="celestial-toggle"
      :id="'celestial-toggle-' + id"
      @change="$emit('toggle-change', value)"/>
    <label
      :for="'celestial-toggle-' + id"
      class="toggle">
      <span class="toggle__handler">
        <span class="crater crater--1"></span>
        <span class="crater crater--2"></span>
        <span class="crater crater--3"></span>
      </span>
      <span class="star star--1"></span>
      <span class="star star--2"></span>
      <span class="star star--3"></span>
      <span class="star star--4"></span>
      <span class="star star--5"></span>
      <span class="star star--6"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CelestialToggle',
  props: {
    onValue: String,
    offValue: String,
    modelValue: Boolean,
    id: Number
  },
  data() {
    return {
      value: false
    }
  },
  created () {
    this.value = this.modelValue;
  },
  computed: {
    cssProps() {
      return {
        '--off-value': JSON.stringify(this.offValue),
        '--on-value': JSON.stringify(this.onValue)
      }
    }
  }
}
</script>

<style lang="scss">

.toggleWrapper {
  // position: absolute;
  // top: 0%;
  // left: 0%;

  input {
    position: absolute;
    opacity: 0;
  }
}

.toggle {
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 90px;
  height: 50px;
  // background-color: $day-blue;
  border-radius: 90px - 6;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

  &:before, &:after {
    position: absolute;
    top: 50%;
    font-size: 1em;
  }

  &:before {
    content: var(--off-value);
    left: -10px;
    transform: translate(-100%, -50%);
    color: $gold;
  }

  &:after {
    content: var(--on-value);
    right: -10px;
    transform: translate(100%, -50%);
    color: $wood;
  }
}

.toggle__handler {
  display: inline-block;
  position: absolute;
  z-index: 1;
  top: 3px;
  left: 3px;
  width: 50px - 6;
  height: 50px - 6;
  background-color: $gold;
  border-radius: 50px;
  box-shadow: 0 0 1.5rem $magic-orange;
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform:  rotate(-45deg);

  .crater {
    position: absolute;
    background-color: darken($moon, 5%);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    border-radius: 100%;
  }

  .crater--1 {
    top: 18px;
    left: 10px;
    width: 4px;
    height: 4px;
  }

  .crater--2 {
    top: 28px;
    left: 22px;
    width: 6px;
    height: 6px;
  }

  .crater--3 {
    top: 10px;
    left: 25px;
    width: 8px;
    height: 8px;
  }
}

.star {
  position: absolute;
  background-color: $soft-gray;
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  border-radius: 50%;
}

.star--1 {
  top: 10px;
  left: 35px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--2 {
  top: 18px;
  left: 28px;
  z-index: 1;
  width: 30px;
  height: 3px;
}

.star--3 {
  top: 27px;
  left: 40px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--4,
.star--5,
.star--6 {
  opacity: 0;
  transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--4 {
  top: 16px;
  left: 11px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translateX(3px);
}

.star--5 {
  top: 32px;
  left: 17px;
  z-index: 0;
  width: 3px;
  height: 3px;
  transform: translateX(3px);
}

.star--6 {
  top: 36px;
  left: 28px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translateX(3px);
}

input:checked {
  + .toggle {
    // background-color: $midnight-purple;

    &:before {
      color: $wood;
    }

    &:after {
      color: $moon;
    }

    .toggle__handler {
      background-color: $moon;
      transform: translateX(40px) rotate(0);
      box-shadow: 0 0 2rem $magic-purple;

      .crater { opacity: 1; }
    }

    .star--1 {
      width: 2px;
      height: 2px;
    }

    .star--2 {
      width: 4px;
      height: 4px;
      transform: translateX(-5px);
    }

    .star--3 {
      width: 2px;
      height: 2px;
      transform: translateX(-7px);
    }

    .star--4,
    .star--5,
    .star--6 {
      opacity: 1;
      transform: translateX(0);
    }
    .star--4 {
      transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .star--5 {
      transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .star--6 {
      transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
  }
}
</style>
