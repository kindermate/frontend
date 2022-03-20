<template>
  <transition name="modal" appear>
    <div class="modal">
      <div @click.prevent="$emit('close')" class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <slot></slot>
        </div>
      </div>
      <button @click.prevent="$emit('close')" class="modal-close is-large" aria-label="close"></button>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  .modal-content {
    padding: 2rem;
    .box {
      padding: 2rem 1.5rem;
    }
  }
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
  .modal-content {
    opacity: 0;
    transform: translateY(-20px);
  }
}
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active,
.modal-leave-to {
  transition: all 0.3s ease;
  .modal-content {
    transition: all 0.3s ease;
  }
}
</style>
