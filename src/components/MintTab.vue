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
        <div class="answer">
          <label for="currency">Currency Id to be used</label>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">#</span>
            <InputNumber
              id="currency"
              v-model="formData.currency"
              :min="0"
              :useGrouping="false"
            />
          </div>
        </div>
      </template>

      <template #payments>
        <div class="prompt">
          <h2>Payments</h2>
        </div>
        <div class="answer">
          <label for="couponSize">Coupon Size</label>
          <div>
            <InputNumber
              id="couponSize"
              v-model="formData.couponSize"
              :min="0"
            />
          </div>
          <label for="faceValue">Face Value (repayed at end)</label>
          <div>
            <InputNumber id="faceValue" v-model="formData.faceValue" :min="0" />
          </div>
        </div>
      </template>

      <template #duration>
        <div class="prompt">
          <h2>Duration</h2>
        </div>
        <div class="answer">
          <label for="periodDuration">Period Duration (seconds)</label>
          <div>
            <InputNumber
              id="periodDuration"
              v-model="formData.periodDuration"
              :min="0"
            />
          </div>
          <label for="nPeriods">Number of Periods</label>
          <div>
            <InputNumber id="nPeriods" v-model="formData.nPeriods" :min="0" />
          </div>
          <label for="startTime">Start Time (seconds)</label>
          <div>
            <InputNumber id="startTime" v-model="formData.startTime" :min="0" />
          </div>
          <label for="curPeriod">Period to Fast-Forward To (uncommon)</label>
          <div>
            <InputNumber id="curPeriod" v-model="formData.curPeriod" :min="0" />
          </div>
        </div>
      </template>

      <template #beneficiary>
        <div class="prompt">
          <h2>Beneficiaries</h2>
        </div>
        <div class="answer">
          <label for="beneficiary">Beneficiary of payments</label>
          <div>
            <InputText id="beneficiary" v-model="formData.beneficiary" />
          </div>
          <label for="owner">Original Owner</label>
          <div>
            <InputText id="owner" v-model="formData.owner" />
          </div>
        </div>
      </template>

      <template #submit>
        <div class="prompt"></div>
        <div class="answer">
          <p>SUBMIIIT</p>
        </div>
      </template>
    </FormWizard>
  </form>
  <missing-content
    v-if="formData.preset && !questions[formData.preset]"
    title="Not Implemented"
    subtitle="This preset is not yet implemented. Please use the CUSTOM preset instead to set-up this functionality yourself"
  />
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import SelectButton from "primevue/selectbutton";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";

import MissingContent from "@/components/MissingContent";
import FormWizard from "@/components/FormWizard";
import { FetchBondResult } from "@/queries/chainQueries";

// STATIC DATA FOR FORM STRUCTURE
const presets = ["Custom", "Debt", "Short", "Option"];
const questions = {
  Custom: ["currency", "payments", "duration", "beneficiary", "submit"],
};

// ACTUAL DATA FOR TRACKING USER
const formData = reactive({
  preset: null,
});
// const progress = ref(0);
// watch(formData, (n, old) => {})

// DERIVED DATA FOR FEEDBACK
const bond = ref<FetchBondResult>({});
</script>

<style lang="scss" scoped>
.question :deep(.p-button) {
  background: var(--color-background);
  border-color: var(--color-background-alt);
  &:hover {
    border-color: var(--color-text);
  }
  &.p-highlight {
    background: var(--color-primary);
    border-color: var(--color-primary);
    &:hover {
      background: var(--color-primary-alt);
      border-color: var(--color-primary-alt);
    }
  }
  // outline: 10px solid red;
}
:deep(.question) {
  // max-width: 1300px;
  width: 80%;
  min-width: 1200px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: 2fr 400px 3fr;
  & > * {
    padding: 20px;
    padding-bottom: 0px;
  }
  // align-items: baseline;
  .prompt {
    h2 {
      font-size: 45px;
      line-height: 50px;
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
    padding-bottom: 20px;
    &:after {
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }
}
</style>
