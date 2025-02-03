import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useNotifications = (userId?: string) => {    
    const url = userId ? `/api/notifications?userId=${userId}` : '/api/notifications';
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    return { data, error, isLoading, mutate };};
    
    export default useNotifications;