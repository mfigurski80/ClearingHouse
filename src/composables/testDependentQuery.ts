import { computed, ref, Ref } from "vue";
import { useQuery } from "vue-query";

function getUserByEmail(email: string) {
  return { id: email, name: "John Doe" };
}

function getProjectsByUser(userId: string) {
  return 2;
}

// Main Query - get the user
function useUserQuery(email: Ref<string>) {
  return useQuery(["user", email], () => getUserByEmail(email.value));
}

// Dependant query - get the user's projects
function useUserProjectsQuery(
  userId: Ref<string | undefined>,
  { enabled }: { enabled: Ref<boolean> }
) {
  return useQuery(
    ["projects", userId],
    () => getProjectsByUser(userId.value as string),
    {
      enabled, // The query will not execute until `enabled == true`
    }
  );
}

// Get the user
const email = ref("email");
const { data: user } = useUserQuery(email);

const userId = computed(() => user.value?.id);
const enabled = computed(() => !!user.value?.id);

// Then get the user's projects
const { isIdle, data: projects } = useUserProjectsQuery(userId, { enabled });

// isIdle will be `true` until `enabled` is true and the query begins to fetch.
// It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
