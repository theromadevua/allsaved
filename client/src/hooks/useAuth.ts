import { useAuthStore } from "../store/authStore";
import { useAsyncAction } from "./useAsyncAction";

export const useAuth = () => {
  const store = useAuthStore();
  const { loading, error, execute } = useAsyncAction();

  return {
    ...store,
    loading,
    error,
    login: (email: string, password: string) => execute(() => store.login(email, password)),
    register: (name: string, email: string, password: string, confirmation: string) =>
      execute(() => store.register(name, email, password, confirmation)),
    logout: () => execute(() => store.logout()),
    fetchUser: () => execute(() => store.fetchUser()),
  };
};