import { useDashboardStore } from "../store/useDashboardStore";
import { useAsyncAction } from "./useAsyncAction";

export const useDashboard = () => {
  const store = useDashboardStore();
  const { loading, error, execute } = useAsyncAction();

  return {
    ...store,
    loading,
    error,
    fetchDashboardInfo: () => execute(() => store.fetchDashboardInfo()),
  };
};