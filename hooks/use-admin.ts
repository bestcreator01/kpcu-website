import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useAdmin() {
  const { data, mutate, isLoading } = useSWR("/api/auth/check", fetcher)

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    mutate({ isAdmin: false })
  }

  return {
    isAdmin: data?.isAdmin ?? false,
    isLoading,
    logout,
    mutate,
  }
}
