<template>
    <div>
      <div class="row">
        <div class="steppers d-flex flex-md-column col-md-3">
            <div v-for="(step, index) in steps" :key="step.title" :class="{ active: currentStepIndex === index, completed: index < currentStepIndex }">
                <div class="step-content cursor-pointer justify-content-between" @click="goToCurrentIndexClick(index)">
                    <small class="step-title d-none d-md-block">{{ step.title }}</small>
                    <div class="step-number">{{ index + 1 }}</div>
                </div>
            </div>
        </div>
        <div class="step-content order-form col-md border-bottom mb-4">
          <div class="step-header mb-3">
            <h2>{{ steps[currentStepIndex].title }}</h2>
          </div>
            <slot :name="steps[currentStepIndex].slotName"></slot>
        </div>
      </div>
      
      <div class="step-buttons d-flex justify-content-end">
        <button class="btn rounded-32" @click="prevStep" :disabled="currentStepIndex === 0">Précedent</button>
        <button class="btn btn-dark rounded-32 mx-2" @click="nextStep" :disabled="currentStepIndex === steps.length - 1">{{ steps[currentStepIndex].title }}</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const props = defineProps({
    steps: {
      type: Array,
      required: true,
    },
    validations: {
      type: Boolean,
      default: false,
      required: false,
    },
    submit: {
      type: Function,
      required: false,
    },
  })

  const currentStepIndex = ref(0)

    const prevStep = () => {
        if (currentStepIndex.value > 0) {
            currentStepIndex.value--
        }
    }

    const nextStep = () => {
        if(props.validations){
            if (currentStepIndex.value < props.steps.length - 1) {
            currentStepIndex.value++
            }
        }
    }

    const goToCurrentIndexClick = (index) => {
        if(props.validations){
            currentStepIndex.value = index
        }else{
          currentStepIndex.value = 0
        }
      }
  </script>