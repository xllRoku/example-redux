import { toast } from "sonner";

export const succesMessage = (message: string) => toast.success(message);
export const errorMessage = (message: string) => toast.error(message);
