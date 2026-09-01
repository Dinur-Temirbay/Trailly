import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card/Card'
import { Button } from '@/components/ui/Button/Button'
import type { IPlace } from '@/types'

interface PlaceCardProps {
	place: IPlace
	isSaved?: boolean
	onToggleSave?: (place: IPlace) => void
}

export function PlaceCard({ place, isSaved, onToggleSave }: PlaceCardProps) {
	return (
		<Card className='flex flex-col overflow-hidden'>
			<div className='aspect-4/3 w-full bg-muted'>
				{place.photoUrl ? (
					<img
						src={place.photoUrl}
						alt={place.name}
						className='h-full w-full object-cover'
						loading='lazy'
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center text-muted-foreground'>
						<MapPin className='h-8 w-8' />
					</div>
				)}
			</div>

			<CardHeader className='flex-1'>
				<CardTitle className='line-clamp-1 text-base'>{place.name}</CardTitle>
				{place.address && (
					<p className='line-clamp-1 text-sm text-muted-foreground'>
						{place.address}
					</p>
				)}
			</CardHeader>

			<CardContent className='flex items-center gap-2 pt-0'>
				{place.rating != null && (
					<span className='flex items-center gap-1 text-sm'>
						<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
						{place.rating.toFixed(1)}
					</span>
				)}
			</CardContent>

			{onToggleSave && (
				<CardFooter className='pt-0'>
					<Button
						variant={isSaved ? 'secondary' : 'outline'}
						size='sm'
						className='w-full'
						onClick={() => onToggleSave(place)}
					>
						{isSaved ? 'В избранном' : 'Сохранить'}
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
