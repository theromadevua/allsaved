import { api } from "../api";
import type { IDashboardInfo } from "../modules/shared/interfaces/dashboard/IDashboardInfo";


export const dashboardService = {
  getInfo: () => api.get<IDashboardInfo>('/dashboard'),
};
