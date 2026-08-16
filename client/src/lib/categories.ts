import type { TCategory } from '@/types'

export const categoryLabels: Record<TCategory, string> = {
	CAFE: 'Кафе',
	RESTAURANT: 'Рестораны',
	MUSEUM: 'Музеи',
	PARK: 'Парки',
	NIGHTLIFE: 'Ночная жизнь',
	SHOPPING: 'Шоппинг',
	LANDMARK: 'Достопримечательности',
	HOTEL: 'Отели',
	OTHER: 'Другое',
}

export const categoryOrder: TCategory[] = [
	'CAFE',
	'RESTAURANT',
	'MUSEUM',
	'PARK',
	'LANDMARK',
	'NIGHTLIFE',
	'SHOPPING',
	'HOTEL',
	'OTHER',
]
