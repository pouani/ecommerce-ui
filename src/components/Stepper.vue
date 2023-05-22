<template>
    <div>
      <div class="step-header">
        <h2>{{ steps[currentStepIndex].title }}</h2>
      </div>
      <div class="row">
        <div class="steppers d-flex flex-column col-2">
            <div v-for="(step, index) in steps" :key="step.title" :class="{ active: currentStepIndex === index, completed: index < currentStepIndex }">
                <div class="step-content justify-content-between">
                    <small class="step-title">{{ step.title }}</small>
                    <div class="step-number">{{ index + 1 }}</div>
                </div>
            </div>
        </div>
        <div class="step-content col">
            <slot :name="steps[currentStepIndex].slotName"></slot>
        </div>
      </div>
      
      <div class="step-buttons">
        <button class="btn" @click="prevStep" :disabled="currentStepIndex === 0">Previous</button>
        <button class="btn btn-primary" @click="nextStep" :disabled="currentStepIndex === steps.length - 1">Next</button>
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
  </script>