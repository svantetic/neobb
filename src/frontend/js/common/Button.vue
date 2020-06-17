<template>
  <button class="p-4 block my-2 text-white" :class="buttonVariant" @click="handleClick">
      <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

type IButtonType = "success" | "danger" | "info";

@Component
export default class Button extends Vue {
    @Prop({ required: false, default: "info" }) 
    variant: IButtonType;

    @Prop({required: false, default: false })
    isDisabled: boolean;
    
    @Emit('button-clicked')
    handleClick() {
        return;
    }

    get buttonVariant() {
        if (this.isDisabled) {
            return 'bg-gray-600';
        } else {
            return {
                'bg-green-500': this.variant === 'success',
                'bg-red-700': this.variant === 'danger',
                'bg-blue-700': this.variant === 'info',
            }

        }
    }
}
</script>

<style>

</style>