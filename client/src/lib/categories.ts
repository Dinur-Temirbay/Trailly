import type { Category } from '@/types'

export const categoryLabels: Record<Category, string> = {
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

export const categoryOrder: Category[] = [
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
