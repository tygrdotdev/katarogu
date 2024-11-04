'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

const genres = [
	'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery',
	'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'
]

export default function GenreSelection({ value, setValue }: { value: string[], setValue: React.Dispatch<React.SetStateAction<string[]>> }) {
	const [open, setOpen] = React.useState(false)

	const toggleGenre = (genre: string) => {
		setValue((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
		)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild className='py-2 px-3'>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className='h-auto'
				>
					<div className="flex flex-wrap gap-1 items-center text-start w-full">
						{value.length > 0 ? (
							value.map((genre) => (
								<Badge
									key={genre}
									variant="default"
									className="text-xs font-normal"
								>
									{genre}
								</Badge>
							))
						) : (
							<span className="text-muted-foreground">Select genres</span>
						)}
					</div>
					<ChevronsUpDown className="ml-2 h-2 w-2 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0" align="start">
				<Command>
					<CommandInput placeholder="Search genres..." />
					<CommandList>
						<CommandEmpty>No genres found.</CommandEmpty>
						<CommandGroup>
							{genres.map((genre) => (
								<CommandItem
									key={genre}
									onSelect={() => toggleGenre(genre)}
									className="cursor-pointer"
								>
									<Check
										className={`mr-2 h-4 w-4 ${value.includes(genre) ? "opacity-100" : "opacity-0"}`}
									/>
									{genre}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}