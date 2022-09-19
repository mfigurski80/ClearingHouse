<template>
  <form @submit.prevent="handleSubmit()" class="p-fluid">
    <columns-layout v-if="state !== FormState.DONE">
      <div class="full-col">
        <!-- NAME FIELD -->
        <div class="input-field">
          <h4><label for="name">How should we address you?</label></h4>
          <input-text
            type="text"
            v-model="name"
            name="name"
            id="email"
            placeholder="John Doe"
          />
        </div>
        <!-- EMAIL FIELD -->
        <div class="input-field">
          <h4><label for="email">What is your email address?</label></h4>
          <input-text
            type="email"
            v-model="email"
            name="email"
            id="email"
            placeholder="john@doe.com"
          />
        </div>
        <!-- TEST-USER INPUT -->
        <div class="input-field inline">
          <Checkbox
            id="test-user"
            name="test-user"
            :binary="true"
            v-model="isTestUser"
            class="checkbox"
            tabindex="0"
          />
          <h4>
            <label for="test-user">Request beta access as a test user?</label>
          </h4>
        </div>
      </div>
      <div class="full-col">
        <!-- CATEGORY INPUT -->
        <div class="input-field">
          <h4><label for="cat">How would you classify yourself?</label></h4>
          <multi-select
            v-model="categoriesChosen"
            :options="categories"
            optionLabel="value"
            placeholder="Select Classificiation"
            display="chip"
          />
        </div>
        <!-- MESSAGE INPUT -->
        <div class="input-field">
          <h4><label for="message">Send us a message!</label></h4>
          <Textarea v-model="message" rows="4" name="message" id="message" />
        </div>
      </div>
    </columns-layout>
    <columns-layout v-else class="done-message">
      <h3>The form has been submitted. Thank you for your interest!</h3>
    </columns-layout>
    <Button
      type="submit"
      class="p-button-raised p-button-text submit-button"
      :loading="state === FormState.LOADING"
      :disabled="state === FormState.DONE"
      :icon="`pi ${state === FormState.DONE ? 'pi-check' : 'pi-upload'}`"
      :label="buttonText[state] || 'Submit'"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mixpanel from "mixpanel-browser";
import TrackEvent from "@/types/trackEvent";

import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

import ColumnsLayout from "@/layouts/ColumnsLayout.vue";

enum FormState {
  INITIAL,
  INPUT_ERROR,
  LOADING,
  SERVER_ERROR,
  DONE,
}
const COOKIE_KEY = "subscribe_form_submitted";

export default defineComponent({
  name: "TestUserForm",
  beforeMount() {
    this.state = this.$cookies.isKey(COOKIE_KEY)
      ? FormState.DONE
      : FormState.INITIAL;
  },
  setup: () => ({
    FormState,
    buttonText: {
      [FormState.LOADING]: "Sending...",
      [FormState.DONE]: "Done",
    },
  }),
  data: () => ({
    name: "",
    email: "",
    categoriesChosen: [] as { value: string }[],
    isTestUser: false,
    message: "",
    categories: [
      { value: "Developer" },
      { value: "Investor" },
      { value: "Entrepreneur" },
      { value: "Crypto Enthusiast" },
      { value: "Other" },
    ],
    state: FormState.INITIAL,
  }),
  components: {
    InputText,
    MultiSelect,
    Textarea,
    ColumnsLayout,
    Button,
    Checkbox,
  },
  methods: {
    handleSubmit() {
      this.state = FormState.LOADING;
      const data = {
        name: this.name,
        email: this.email,
        categories: this.categoriesChosen.map((c) => c.value),
        isTestUser: this.isTestUser,
        message: this.message,
        time: new Date().toISOString(),
      };
      mixpanel.identify(data.email);
      mixpanel.people.union({
        name: data.name,
        email: data.email,
        categories: data.categories,
        isTestUser: data.isTestUser,
        createdAt: Date.now(),
      });
      mixpanel.track(TrackEvent.SUBSCRIBE_FORM_SUBMIT);
      fetch("https://getform.io/f/dda2d02f-e219-4356-9b93-04791bb1a963", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((resp) => {
        if (resp.ok) {
          this.state = FormState.DONE;
          this.$cookies.set(COOKIE_KEY, "_");
        } else {
          alert("An error occurred. Please try again later.");
          this.state = FormState.SERVER_ERROR;
        }
      });
    },
  },
});
</script>

<style scoped lang="scss">
// Assuming this will be placed on a light background (ideally, gradient primary-secondary)
form {
  padding: 12px 0;
  .input-field {
    margin-top: 25px;
    margin-bottom: 6px;
    &.inline {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
    }
    h4 {
      margin: 8px 0;
    }
    input {
      width: 100%;
    }
    textarea {
      width: 100%;
    }
    .p-checkbox .p-checkbox-box.p-highlight {
      background-color: #fff;
    }
  }
  .full-col {
    min-width: 300px;
    flex: 1;
  }
  .p-button.submit-button {
    margin-top: 30px;
    background: var(--color-background);
    color: var(--color-text-alt);
    width: auto;
    &:hover {
      background: var(--color-background);
      color: var(--color-text-alt);
      border-color: var(--color-primary);
    }
  }
  .done-message {
    text-align: center;
    padding: 30px 0 10px;
  }
}

::v-deep(.checkbox.p-checkbox) {
  .p-checkbox-box.p-highlight {
    border-color: var(--color-background);
  }
  &:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover,
  .p-checkbox-box.p-highlight {
    background-color: var(--color-background);
  }

  .p-checkbox-box .p-checkbox-icon {
    color: var(--color-text);
  }
}
</style>
