import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSavedPlaces, savePlace, unsavePlace } from '@/api/savedPlaces'
import { useAuth } from '@/hooks/useAuth'

export function useSavedPlaces() {
	const { isAuth } = useAuth()
	const queryClient = useQueryClient()

	const { data: savedPlaces } = useQuery({
		queryKey: ['savedPlaces'],
		queryFn: getSavedPlaces,
		enabled: isAuth,
	})

	const saveMutation = useMutation({
		mutationFn: savePlace,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['savedPlaces'] }),
	})

	const unsaveMutation = useMutation({
		mutationFn: unsavePlace,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['savedPlaces'] }),
	})

	const savedPlaceIds = new Set(savedPlaces?.map(sp => sp.placeId))

	const toggleSave = (placeId: string) => {
		if (savedPlaceIds.has(placeId)) {
			unsaveMutation.mutate(placeId)
		} else {
			saveMutation.mutate(placeId)
		}
	}

	return { savedPlaceIds, toggleSave }
}
