import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSavedPlaces, savePlace, unsavePlace } from '@/api/savedPlaces'
import { useAuth } from '@/hooks/useAuth'

export function useSavedPlaces() {
	const { isAuth } = useAuth()
	const queryClient = useQueryClient()

	const { data: savedPlaces = [], isLoading } = useQuery({
		queryKey: ['savedPlaces'],
		queryFn: getSavedPlaces,
		enabled: isAuth,
	})

	const savedPlaceIds = new Set(savedPlaces.map(sp => sp.placeId))

	const { mutate: toggleSave } = useMutation({
		mutationFn: (placeId: string) =>
			savedPlaceIds.has(placeId) ? unsavePlace(placeId) : savePlace(placeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['savedPlaces'] })
		},
	})

	return { savedPlaces, savedPlaceIds, toggleSave, isLoading }
}
