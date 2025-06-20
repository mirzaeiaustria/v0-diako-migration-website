"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

interface MethodsParams {
  searchTerm?: string
  category?: string
  country?: string
  page?: number
  limit?: number
}

interface ImmigrationMethod {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  imageUrl?: string
  category: string
  country: string
  requirements: string
  detailedRequirements?: string
  steps?: string
  documents?: string
  prosAndCons?: string
  approximateCosts?: string
  keywords?: string
  isActive?: boolean
  createdAt: string
  updatedAt: string
}

interface MethodsResponse {
  methods: ImmigrationMethod[]
  totalMethods: number
  totalPages: number
  currentPage: number
}

export function useMethods(params: MethodsParams = {}) {
  const queryParams = new URLSearchParams()

  if (params.searchTerm) queryParams.set("searchTerm", params.searchTerm)
  if (params.category) queryParams.set("category", params.category)
  if (params.country) queryParams.set("country", params.country)
  if (params.page) queryParams.set("page", params.page.toString())
  if (params.limit) queryParams.set("limit", params.limit.toString())

  return useQuery<MethodsResponse>({
    queryKey: ["/api/methods", queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/methods?${queryParams}`)
      if (!response.ok) {
        throw new Error("Failed to fetch methods")
      }
      return response.json()
    },
  })
}

export function useMethod(id: number) {
  return useQuery<ImmigrationMethod>({
    queryKey: ["/api/methods", id],
    queryFn: async () => {
      const response = await fetch(`/api/methods/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch method")
      }
      return response.json()
    },
    enabled: !!id,
  })
}

export function useCreateConsultationRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/consultation-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create consultation request")
      }

      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "درخواست ارسال شد",
        description: "درخواست مشاوره شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.",
      })
      queryClient.invalidateQueries({ queryKey: ["/api/consultation-requests"] })
    },
    onError: (error) => {
      toast({
        title: "خطا در ارسال درخواست",
        description: "لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      })
    },
  })
}
