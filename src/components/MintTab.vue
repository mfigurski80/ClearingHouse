<template>
  <form id="mint-form">
    <div class="question">
      <div class="prompt">
        <h2>Preset</h2>
      </div>
      <label class="answer">
        <SelectButton
          id="preset"
          v-model="formData.preset"
          :options="presets"
        />
        <p>
          Several presets are available to simplify the minting process,
          depending on how you are using the platform. Select the one that seems
          most appropriate, or select CUSTOM to have full control over all
          fields of the minted data structure
        </p>
      </label>
    </div>

    <FormWizard
      :questionIds="questions[formData.preset] ?? []"
      class="question"
    >
      <template #currency>
        <div class="prompt">
          <h2>Currency</h2>
        </div>
        <label class="answer">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">#</span>
            <InputNumber
              v-model="formData.currency"
              :min="0"
              :useGrouping="false"
            />
          </div>
          Currency Id to be used
        </label>
      </template>

      <template #period>
        <div class="prompt">
          <h2>Period Payments</h2>
        </div>
        <div class="answer">
          <p>PENDINGGG</p>
        </div>
      </template>

      <template #face>
        <div class="prompt">
          <h2>Face Value</h2>
        </div>
        <div class="answer">
          <p>PENDINGGG</p>
        </div>
      </template>
    </FormWizard>
  </form>
  <missing-content
    v-if="formData.preset && !questions[formData.preset]"
    title="Not Implemented"
    subtitle="This preset is not yet implemented. Please use CUSTOM preset instead to set-up this functionality yourself"
  />
</template>

<script setup lang="ts">
import { reactive } from "vue";
import SelectButton from "primevue/selectbutton";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";

import MissingContent from "@/components/MissingContent.vue";
import FormWizard from "@/components/FormWizard.vue";

// STATIC DATA FOR FORM FORMAT
const presets = ["Custom", "Debt", "Short", "Option"];
const questions = {
  Custom: ["currency", "period", "face"],
};
// FORM DATA
const formData = reactive({
  preset: null,
});
</script>

<style lang="scss" scoped>
::v-deep .question {
  // max-width: 1300px;
  width: 80%;
  min-width: 1200px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: 2fr 3fr 3fr;
  & > * {
    padding: 20px;
  }
  // align-items: baseline;
  .prompt {
    h2 {
      font-size: 45px;
      line-height: 42px;
      color: var(--color-primary);
      transition: color 0.2s ease-in-out;
    }
  }

  .answer {
    background: var(--color-background-alt);
    position: relative;
    & > * {
      margin-bottom: 20px;
    }
    &:after {
      content: "";
      // background: red;
      display: inline-block;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      box-shadow: var(--shadow-1);
    }
  }
  &:first-child .answer {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    &:after {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }
  }
  &:last-child .answer {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    &:after {
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }
}
</style>
