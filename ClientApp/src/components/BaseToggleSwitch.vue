<template>
    <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>
</template>

<style scoped>
      /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: var(--switch-width);
  aspect-ratio: var(--switch-aspect-ratio);
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  background-color: blue;
  transition: .4s;
  padding: 4px;
}

.slider:before {
  position: absolute;
  content: "";
  height: var(--slider-size);
  width: var(--slider-size);
  /* left: 4px;
  bottom: 4px; */
  background-color: white;
  transition: .4s;

}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(var(--slider-size));
}

/* Rounded sliders */
.slider.round {
  border-radius: var(--slider-border-radius);
}

.slider.round:before {
  border-radius: 50%;
}
</style>