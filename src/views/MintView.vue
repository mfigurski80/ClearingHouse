<template>
  <ScreenAndWalletFilter>
    <form id="mint-form" @submit.prevent="mint">
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
            depending on how you are using the platform. Select the one that
            seems most appropriate, or select CUSTOM to have full control over
            all fields of the minted data structure
          </p>
        </label>
      </div>

      <FormWizard
        :completedCheck="sectionCompletedCheck"
        :questionIds="questions[formData.preset] ?? []"
        innerClass="question"
        :showAll="false"
      >
        <template #currency="{ position, nSteps }">
          <div class="prompt">
            <h2>Currency</h2>
            <h4>{{ position }} / {{ nSteps }}</h4>
          </div>
          <div class="answer">
            <currency-select
              :label="'Currency Id to be used'"
              v-model="formData.currency"
            />
            <h5
              class="warning"
              v-if="
                formData.currency?.type === CurrencyType.ERC721 ||
                formData.currency?.type === CurrencyType.ERC1155NFT
              "
            >
              Warning: Look Out! This currency may have only a single instance
              of the token -- this is an NFT. Make sure you are minting with the
              correct currency, or ensure you will only have to pay once to
              complete the bond!
            </h5>
          </div>
        </template>

        <template #payments="{ position, nSteps }">
          <div class="prompt">
            <h2>Payments</h2>
            <h4>{{ position }} / {{ nSteps }}</h4>
          </div>
          <div class="answer">
            <label for="couponSize">Coupon Size</label>
            <div>
              <InputNumber
                id="couponSize"
                v-model="formData.couponSize"
                mode="decimal"
                :prefix="`${formData.currency?.symbol ?? '??'} `"
                :maxFractionDigits="formData.currency?.decimals || 18"
                :placeholder="`${formData.currency?.symbol ?? '??'} 100`"
              />
            </div>
            <label for="faceValue">Face Value (repayed at end)</label>
            <div>
              <InputNumber
                id="faceValue"
                v-model="formData.faceValue"
                mode="decimal"
                :prefix="`${formData.currency?.symbol ?? '??'} `"
                :maxFractionDigits="formData.currency?.decimals || 18"
                :placeholder="`${formData.currency?.symbol ?? '??'} 1,000`"
              />
            </div>
          </div>
        </template>

        <template #duration="{ position, nSteps }">
          <div class="prompt">
            <h2>Duration</h2>
            <h4>{{ position }} / {{ nSteps }}</h4>
          </div>
          <div class="answer">
            <DurationInput
              v-model="formData.periodDuration"
              label="Period Duration"
            />
            <label for="nPeriods">Number of Periods</label>
            <div>
              <InputNumber
                id="nPeriods"
                v-model="formData.nPeriods"
                :min="0"
                :placeholder="36"
              />
            </div>
            <label for="startTime">Start Date/Time</label>
            <div>
              <Calendar
                id="startTime"
                v-model="formData.startTime"
                :showTime="true"
                dateFormat="yy/mm/dd"
              />
            </div>
            <label for="curPeriod">Period to Fast-Forward To (uncommon)</label>
            <div>
              <InputNumber
                id="curPeriod"
                v-model="formData.curPeriod"
                :min="0"
                :placeholder="0"
              />
            </div>
          </div>
        </template>

        <template #beneficiary="{ position, nSteps }">
          <div class="prompt">
            <h2>Beneficiaries</h2>
            <h4>{{ position }} / {{ nSteps }}</h4>
          </div>
          <div class="answer">
            <AddressInput
              v-model="formData.beneficiary"
              label="Beneficiary of Payments"
            />
            <AddressInput v-model="formData.owner" label="Initial Owner" />
          </div>
        </template>

        <template #collateral="{ position, nSteps }">
          <div class="prompt">
            <h2>Collateral</h2>
            <h4>{{ position }} / {{ nSteps }}</h4>
          </div>
          <div class="answer">
            <missing-content title="Not yet implemented" />
          </div>
        </template>

        <template #submit>
          <div class="prompt" />
          <div class="answer">
            <h6>
              *By performing this action, you agree to the terms outlined by the
              contract's intended behavior and guarantee you are aware that any
              or all assets attached as collateral may be lost if the intended
              behavior, as modified by the parameters inputted by you in this
              form, is not upheld. Neither the BOND ClearingHouse nor any of its
              creators are responsible for any loss of assets associated with
              the financial agreement you are about to create.
            </h6>
            <Button type="submit" label="Mint" :loading="isLoading" />
            <h5 v-if="isError" class="warning">Error: {{ error }}</h5>
          </div>
        </template>
      </FormWizard>
    </form>

    <missing-content
      v-if="formData.preset && !questions[formData.preset]"
      title="Not Implemented"
      subtitle="This preset is not yet implemented. Please use the CUSTOM preset instead to set-up this functionality yourself"
    />
  </ScreenAndWalletFilter>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import SelectButton from "primevue/selectbutton";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Calendar from "primevue/calendar";

import ScreenAndWalletFilter from "@/layouts/ScreenAndWalletFilter.vue";
import MissingContent from "@/components/MissingContent";
import CurrencySelect from "@/components/inputs/CurrencySelect";
import DurationInput from "@/components/inputs/DurationInput";
import AddressInput from "@/components/inputs/AddressInput";
import FormWizard from "@/components/FormWizard";

import { CurrencyType } from "@/types/enums";
import { useBondMintMutation } from "@/composables/useMutations";

// STATIC DATA FOR FORM STRUCTURE
const presets = ["Custom", "Debt", "Short", "Option"];
const questions = {
  Custom: [
    "currency",
    "payments",
    "duration",
    "beneficiary",
    "collateral",
    "submit",
  ],
};
const ex = (x: unknown) => x !== undefined && x !== null && x !== "";
const sectionCompletedCheck = {
  currency: () => ex(formData.currency),
  payments: () => ex(formData.couponSize) && ex(formData.faceValue),
  duration: () =>
    ex(formData.periodDuration) &&
    ex(formData.nPeriods) &&
    ex(formData.startTime),
  beneficiary: () => ex(formData.beneficiary) && ex(formData.owner),
  collateral: () => true,
};

// ACTUAL DATA FOR TRACKING USER && FUNCTIONALITY
const formData = reactive({
  preset: null,
});

// FUNCTIONS FOR MINTING -- RECEIVING
const mint = () =>
  mutate({
    flag: false,
    currencyRef: formData.currency.id,
    nPeriods: formData.nPeriods,
    curPeriod: formData.curPeriod ?? 0,
    startTime: Math.floor(formData.startTime.getTime() / 1000),
    periodDuration:
      formData.periodDuration.duration * formData.periodDuration.multiplier,
    couponSize: formData.couponSize * 10 ** formData.currency.decimals,
    faceValue: formData.faceValue * 10 ** formData.currency.decimals,
    beneficiary: formData.beneficiary,
    owner: formData.owner,
  });

const onFormat = (fmt: [string, string]) => {
  console.log("FORMATTED BOND", fmt);
};

const router = useRouter();
const onSuccess = (res) => {
  console.log(res);
  // TODO: register new bond id
  alert("successfully minted");
  router.push("/dashboard");
};

const { isLoading, isError, error, mutate } = useBondMintMutation(
  { onSuccess },
  onFormat
);
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
form {
  padding-top: 50px;
  padding-bottom: 100px;
  :deep(.question) {
    // max-width: 1300px;
    width: 60%;
    min-width: 1200px;
    margin: 0px auto;
    display: grid;
    grid-template-columns: 1fr 398px 1fr;
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
      }
      h4 {
        color: var(--color-text-alt);
        opacity: 0.3;
        font-size: 20px;
        line-height: 20px;
        margin-top: -5px;
        transition: opacity 0.15s ease-in-out;
      }
    }
    &:hover .prompt h4 {
      opacity: 1;
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
}
</style>
