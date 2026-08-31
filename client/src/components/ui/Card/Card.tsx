import * as React from 'react'
import { cn } from '@/lib/utils'

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.Ref<HTMLDivElement>
}

export function Card({ className, ref, ...props }: DivProps) {
	return (
		<div
			ref={ref}
			className={cn(
				'rounded-xl border bg-card text-card-foreground shadow',
				className,
			)}
			{...props}
		/>
	)
}

export function CardHeader({ className, ref, ...props }: DivProps) {
	return (
		<div
			ref={ref}
			className={cn('flex flex-col space-y-1.5 p-4', className)}
			{...props}
		/>
	)
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	ref?: React.Ref<HTMLHeadingElement>
}

export function CardTitle({ className, ref, ...props }: HeadingProps) {
	return (
		<h3
			ref={ref}
			className={cn('font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	)
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
	ref?: React.Ref<HTMLParagraphElement>
}

export function CardDescription({ className, ref, ...props }: ParagraphProps) {
	return (
		<p
			ref={ref}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	)
}

export function CardContent({ className, ref, ...props }: DivProps) {
	return <div ref={ref} className={cn('p-4 pt-0', className)} {...props} />
}

export function CardFooter({ className, ref, ...props }: DivProps) {
	return (
		<div
			ref={ref}
			className={cn('flex items-center p-4 pt-0', className)}
			{...props}
		/>
	)
}
