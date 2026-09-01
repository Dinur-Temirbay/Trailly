import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

const searchSchema = z.object({
	city: z.string().min(2, 'Введите хотя бы 2 символа'),
})

type SearchFormValues = z.infer<typeof searchSchema>

interface CitySearchFormProps {
	onSearch: (city: string) => void
}

export function CitySearchForm({ onSearch }: CitySearchFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SearchFormValues>({
		resolver: zodResolver(searchSchema),
	})

	const onSubmit = (values: SearchFormValues) => {
		onSearch(values.city)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-2 sm:flex-row sm:items-start'
		>
			<div className='flex-1'>
				<Input placeholder='Город, например Алматы' {...register('city')} />
				{errors.city && (
					<p className='mt-1 text-sm text-destructive'>{errors.city.message}</p>
				)}
			</div>
			<Button type='submit'>Найти места</Button>
		</form>
	)
}
