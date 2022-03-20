<template>
  <div class="fullwidth-checkbox">
    <label>
      <input :checked="checked" type="checkbox" @change="$emit('change', $event.target.checked)" />
      <span>{{ label }}</span>
    </label>
    <a @click="$emit('view-more')">{{ $t('viewMore') }}</a>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
    label: String,
    link: String,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.fullwidth-checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 0 1rem;
  height: 3rem;
  border-radius: 5px;
  background-color: rgba($color: #000000, $alpha: 0.03);
  label {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
    input {
      margin-right: 5px;
      &:checked + span {
        opacity: 1;
      }
    }
    span {
      opacity: 0.5;
    }
  }
  a {
    display: flex;
    align-items: center;
    color: $grey;
    font-size: $font-sm;
    height: 100%;
  }
}
</style>
