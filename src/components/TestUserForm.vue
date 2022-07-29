<template>
  <form
    action="https://getform.io/f/dda2d02f-e219-4356-9b93-04791bb1a963"
    method="POST"
    @submit="handleSubmit($event)"
  >
    <columns-layout>
      <div class="full-col">
        <div class="input-block">
          <h4><label for="name">How should we address you?</label></h4>
          <input-text
            type="text"
            v-model="name"
            name="name"
            id="email"
            placeholder="John Doe"
          />
        </div>
        <div class="input-block">
          <h4><label for="email">What is your email address?</label></h4>
          <input-text
            type="email"
            v-model="email"
            name="email"
            id="email"
            placeholder="john@doe.com"
          />
        </div>
        <div class="input-block">
          <h4><label for="cat">How would you classify yourself?</label></h4>
          <multi-select
            v-model="categoriesChosen"
            :options="categories"
            optionLabel="value"
            placeholder="Select Classificiation"
            display="chip"
          />
        </div>
      </div>
      <div class="full-col">
        <div class="input-block">
          <h4><label for="message">Tell us why you're applying!</label></h4>
          <Textarea v-model="message" rows="11" name="message" id="message" />
        </div>
      </div>
    </columns-layout>
    <Button
      type="submit"
      class="p-button-raised p-button-text submit-button"
      icon="pi pi-upload"
      :loading="isSubmitting"
      label="Send"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

import ColumnsLayout from "@/layouts/ColumnsLayout.vue";

export default defineComponent({
  name: "TestUserForm",
  data: () => ({
    name: "",
    email: "",
    categoriesChosen: [],
    message: "",
    categories: [
      { value: "Developer" },
      { value: "Investor" },
      { value: "Entrepreneur" },
      { value: "Crypto Enthusiast" },
      { value: "Other" },
    ],
    isSubmitting: false,
  }),
  components: {
    InputText,
    MultiSelect,
    Textarea,
    ColumnsLayout,
    Button,
  },
  methods: {
    handleSubmit(e: Event) {
      e.preventDefault();
      this.isSubmitting = true;
      console.log("Submitting form");
    },
  },
});
</script>

<style scoped lang="scss">
// Assuming this will be placed on a light background (ideally, primary gradient)
form {
  padding: 15px 0;
  .input-block {
    margin-top: 25px;
    margin-bottom: 6px;
    h4 {
      margin: 8px 0;
    }
  }
  .p-button.submit-button {
    margin-top: 30px;
    background: var(--color-background);
    color: var(--color-text-alt);
    font-weight: thin;
    &:hover {
      background: var(--color-background);
      color: var(--color-text-alt);
      border-color: var(--color-primary);
    }
  }
}
.full-col {
  flex: 1;
  max-width: 700px;
}
input {
  width: 100%;
  max-width: 400px;
  display: block;
}
textarea {
  width: 100%;
  min-width: 300px;
}
</style>
